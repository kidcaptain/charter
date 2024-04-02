"use client"

import React, { useEffect, useState } from "react";
// @ts-ignore
import { DayPilot, DayPilotMonth } from "@daypilot/daypilot-lite-react";
import Image from "next/image";
import loaderSvg from "@/public/images/loader.svg"
const Planning = (props: { id: string | undefined }) => {

    const [vo, setVO] = useState<DayPilot.EventData[]>([]);
    const [dates, setDates] = useState<string>(DayPilot.Date.today())
    const styles = {
        wrap: {
            display: "flex"
        },
        left: {
            marginRight: "10px"
        },
        main: {
            flexGrow: "1"
        }
    };

    const colors = [
        { name: "Green", id: "#6aa84f" },
        { name: "Blue", id: "#3d85c6" },
        { name: "Turquoise", id: "#00aba9" },
        { name: "Light Blue", id: "#56c5ff" },
        { name: "Yellow", id: "#f1c232" },
        { name: "Orange", id: "#e69138" },
        { name: "Red", id: "#cc4125" },
        { name: "Light Red", id: "#ff0000" },
        { name: "Purple", id: "#af8ee5" },
    ];

    const participants = [
        { name: "1", id: 1 },
        { name: "2", id: 2 },
        { name: "3", id: 3 },
        { name: "4", id: 4 },
    ];

    const [calendar, setCalendar] = useState<DayPilot.Calendar>();

    const editEvent = async (e: DayPilot.Event) => {
        const form = [
            { name: "Event text", id: "text", type: "text", },
            { name: "Event color", id: "backColor", type: "select", options: colors },
            { name: "Number of participants", id: "tags.participants", type: "select", options: participants },
        ];

        const modal = await DayPilot.Modal.form(form, e.data);
        if (modal.canceled) { return; }
        e.data.text = modal.result.text;
        e.data.backColor = modal.result.backColor;
        e.data.tags.participants = modal.result.tags.participants;
        calendar?.events.update(e);
    };

    const contextMenu = new DayPilot.Menu({
        items: [
            {
                text: "Delete",
                onClick: async (args: { source: any; }) => {
                    calendar?.events.remove(args.source);
                },
            },
            {
                text: "-"
            },
            {
                text: "Edit...",
                onClick: async (args: { source: any; }) => {
                    await editEvent(args.source);
                }
            }
        ]
    });

    const onBeforeEventRender = (args: DayPilot.CalendarBeforeEventRenderArgs) => {
        args.data.areas = [
            {
                top: 5,
                right: 5,
                width: 20,
                height: 20,
                symbol: "/images/logo.png",
                fontColor: "#fff",
                backColor: "#00000033",
                style: "border-radius: 25%; cursor: pointer;",
                toolTip: "Show context menu",
                action: "ContextMenu",
            },
        ];


        const participants = args.data.tags?.participants || 0;
        if (participants > 0) {
            args.data.areas.push({
                bottom: 5,
                left: 5,
                width: 24,
                height: 24,
                action: "None",
                backColor: "#00000033",
                fontColor: "#fff",
                text: participants,
                style: "border-radius: 50%; border: 2px solid #fff; font-size: 18px; text-align: center;",
            });
        }
    };

    const initialConfig: DayPilot.CalendarConfig = {
        viewType: "Month",
        durationBarVisible: false,
        weeks: 2,
    };

    const [config, setConfig] = useState(initialConfig);

    useEffect(() => {
        const getTrajet = async () => {
            const res = await fetch("/api/trajets", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
        };

        const getData = async () => {
            const res = await fetch("/api/voyages", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
        };
        const getBus = async () => {
            const res = await fetch("/api/bus/" + props.id, { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
        };

        const selectVoyage = async () => {
            const tabVoyages: any[] = await getData();
            const tab: DayPilot.EventData[] = [];
            const tabTrajets: any[] = await getTrajet();
            const busData: any = await getBus();
            tabVoyages.map((r, index: number) => {
                if ((parseInt(r.busId) === busData.id)) {
                    tabTrajets.map((i) => {
                        if (r.trajetId == i.id) {
                            const dates1 = new Date(r.dateDepart);
                            let year = dates1.getFullYear();
                            let month = dates1.getMonth() + 1;
                            let day = dates1.getDate();
                            const daym2 = (day) < 10 ? `0${day}` : `${day}`;
                            const monthm2 = (month) < 10 ? `0${month}` : `${month}`;
                            let heureA = r.heureArrivee
                            if (r.heureArrivee == "") {
                                heureA = "23:00"
                            }
                            if (month >= (new Date().getMonth() + 1) && day >= new Date().getDate() && year >= new Date().getFullYear()) {
                                tab.push({
                                    id: index,
                                    text: `VOYAGE N°${r.numVoyage}`,
                                    start: `${year}-${monthm2}-${daym2}T${r.heureDepart}:00`, end: `${year}-${monthm2}-${daym2}T${heureA}:00`, backColor: "#d5641d", fontColor: "#fff",
                                    height: 50, tags: {
                                        participants: r.busId,
                                    }
                                })
                            } else {
                                tab.push({
                                    id: index,
                                    text: `VOYAGE N°${r.numVoyage} `,
                                    start: `${year}-${monthm2}-${daym2}T${r.heureDepart}:00`, end: `${year}-${monthm2}-${daym2}T${heureA}:00`, backColor: "#747475", fontColor: "#fff",
                                    height: 50, tags: {
                                        participants: r.busId,
                                    }
                                })
                            }

                        }
                    })
                }
            })
            setVO(tab)
            if (tab.length == 0) {
                setIsNull(true)
            }
        }

        selectVoyage();
        if (vo.length > 0) {

            if (!calendar || calendar?.disposed()) {
                return;
            }
            const events: DayPilot.EventData[] = vo;
            const startDate = dates;

            calendar.update({ startDate, events });
        }
    }, [calendar, vo]);

    const onTimeRangeSelected = async (args: DayPilot.CalendarTimeRangeSelectedArgs) => {
        const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
        calendar?.clearSelection();
        if (modal.canceled) {
            return;
        }
        // console.log("modal.result", modal.result, calendar);
        calendar?.events.add({
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            text: modal.result,
            tags: {
                participants: 1,
            }
        });
    };
    const [isNull, setIsNull] = useState<boolean>(false)
    const emptyData = () => {
        if (!isNull) {
            return <Image src={loaderSvg} className='animate-spin mx-auto' width={25} height={25} alt='Loader image' />;
        } else {
            return <p className='text-center'>Planning indisponible pour ce véhicule!</p>
        }
    }

    return (
        <div className="relative">
            {
                vo.length == 0 ?
                    emptyData() : (

                        <>
                            <div>
                                <label htmlFor="" className=" mb-1 text-sm  text-gray-900 font-bold">Sélectionner le mois</label>
                                <input onChange={(e) => { setDates(`${e.target.value}-01`) }} required autoComplete="off" type="month" id="dateDepart" name="dateDepart" className="block w-96 p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-sm focus-visible:ring-blue-400 " />
                            </div>
                            <DayPilotMonth
                                startDate={DayPilot.Date.today()}
                                controlRef={setCalendar}
                            />
                        </>
                    )
            }

        </div>
    )
}

export default Planning