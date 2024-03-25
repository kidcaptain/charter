'use client';

import React, { useEffect, useState, useRef } from "react";
// @ts-ignore
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import Image from "next/image";
import loaderSvg from "@/public/images/loader.svg"
const PlanningChauffeur = (props: { id: string | undefined }) => {

    const [vo, setVO] = useState<DayPilot.EventData[]>([]);
    const [dates, setDates] = useState<any>(new DayPilot.Date.today())
    const [isNull, setIsNull] = useState<boolean>(false)
    const [selected, setSelected] = useState();
    const calendarRef = useRef<any>();
    const next = () => {
        const dates1 = new Date(dates);
        let year = dates1.getFullYear();
        let month = dates1.getMonth() + 1;
        let day = dates1.getDate();
        day = day + 7;
        if (month % 2 == 0) {
            if (month == 2) {
                if (year == 2024 || year == 2028 || year == 2032 || year == 2036 || year == 2040) {
                    if (day > 29) {
                        day = day - 29;
                        month = month + 1;
                    }
                } else {
                    if (day > 28) {
                        day = day - 28;
                        month = month + 1;
                    }
                }
            } else {
                if (day > 30) {
                    day = day - 30;
                    month = month + 1;
                }
            }
        } else {
            if (day > 31) {
                day = day - 31;
                month = month + 1;
            }
        }
        if (month == 13) {
            month = 1;
            year = year + 1;
        }
        const daym2 = (day) < 10 ? `0${day}` : `${day}`;
        const monthm2 = (month) < 10 ? `0${month}` : `${month}`;
        setDates(`${year}-${daym2}-${monthm2}`);
    };
    const previous = () => {
        const dates1 = new Date(dates);
        let year = dates1.getFullYear();
        let month = dates1.getMonth() + 1;
        let day = dates1.getDate();
        day = day - 7;
        if (month % 2 == 0) {
            if (month == 2) {
                if (year == 2024 || year == 2028 || year == 2032 || year == 2036 || year == 2040) {
                    if (day < 29) {
                        day = Math.abs(day - 29);
                        month = month - 1;
                    }
                } else {
                    if (day < 28) {
                        day = Math.abs(day - 28);
                        month = month - 1;
                    }
                }
            } else {
                if (day < 30) {
                    day = Math.abs(day - 30);
                    month = month - 1;
                }
            }
        } else {
            if (day < 31) {
                day = Math.abs(day - 31);
                month = month - 1;
            }
        }
        if (month == 0) {
            month = 12;
            year = year - 1;
        }
        const daym2 = (day) < 10 ? `0${day}` : `${day}`;
        const monthm2 = (month) < 10 ? `0${month}` : `${month}`;
        setDates(`${year}-${daym2}-${monthm2}`);

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
            { name: "Event text", id: "text", type: "text" },
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



    const initialConfig: DayPilot.CalendarConfig = {
        viewType: "Week",
        durationBarVisible: false,
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
        const getEmploye = async () => {
            const res = await fetch("/api/employes/" + props.id, { cache: "no-store" })
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
            const employeData: any = await getEmploye();
            tabVoyages.map((r, index: number) => {
                if ((parseInt(r.chauffeurId) === employeData.id)) {
                    tabTrajets.map((i) => {
                        if (r.trajetId == i.id) {
                            const dates1 = new Date(r.dateDepart);
                            let year = dates1.getFullYear();
                            let month = dates1.getMonth() + 1;
                            let day = dates1.getDate();
                            const daym2 = (day) < 10 ? `0${day}` : `${day}`;
                            const monthm2 = (month) < 10 ? `0${month}` : `${month}`;
                            const dates2 = new Date(r.dateDepart);
                            let year2 = dates2.getFullYear();
                            let month2 = dates2.getMonth() + 1;
                            let day2 = dates2.getDate();
                            const daym = (day2) < 10 ? `0${day2}` : `${day2}`;
                            const monthm = (month2) < 10 ? `0${month2}` : `${month2}`;
                            tab.push({
                                id: index, 
                                text: `Voyage N°${r.numVoyage}`,
                                 start: `${year}-${daym2}-${monthm2}T${r.heureDepart}:00`, end: `${year2}-${daym}-${monthm}T${r.heureDepart}:00`, backColor: "#3b82f6", fontColor: "#fff", tags: {
                                    participants: r.busId,
                                }
                            })
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

            // console.log(events)

            const dates1 = new Date(dates);
            let year = dates1.getFullYear();
            let month = dates1.getMonth() + 1;
            let day = dates1.getDate();
            const daym2 = (day) < 10 ? `0${day}` : `${day}`;
            const monthm2 = (month) < 10 ? `0${month}` : `${month}`;
            const startDate = `${year}-${daym2}-${monthm2}`;
            calendar.update({ startDate, events });
        }
    }, [calendar, vo]);

    const emptyData = () => {
        if (!isNull) {
            return <Image src={loaderSvg} className='animate-spin mx-auto' width={25} height={25} alt='Loader image' />;
        } else {
            return <p className='text-center'>Planning indisponible pour ce chauffeur!</p>
        }
    }

    const onTimeRangeSelected = async (args: { start: any; end: any; resource: any; }) => {
        const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
        calendarRef.current?.control?.clearSelection();
        if (modal.canceled) { return; }
        setVO([...vo, {
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            resource: args.resource,
            text: modal.result
        }])

    };

    return (
        <div className="relative bg-white">
            {
                vo.length == 0 ?
                    emptyData() : (
                        <>
                            <div className={"toolbar"}>
                                {/* <ResourceGroups onChange={(args: any) => setSelected(args.selected)} items={[]}></ResourceGroups> */}
                                <span>Day:</span>
                                {/* <button className="bg-blue-400 text-sm p-2 hover:bg-blue-500" onClick={ev => previous()}>Semaine Précédente</button> */}
                                <button className="bg-blue-500 text-sm p-2 hover:bg-blue-600" onClick={ev => setDates(new DayPilot.Date.today())}>Date d'aujourd&lsquo;hui</button>
                                <button className="bg-blue-500 mx-2 text-sm p-2 hover:bg-blue-600" onClick={next}>Semaine suivante</button>
                            </div>

                            {/* <div className="p-2">
                                <label htmlFor="" className=" mb-1 text-sm  text-gray-900 font-bold">Sélectionner le mois</label>
                                <button className="" onClick={() => {setDates()}}>Semaine précédentes</button>
                                <button>Semaine suivante</button>
                            </div> */}
                            <DayPilotCalendar
                                {...config}
                            
                                controlRef={setCalendar}
           

                            />
                        </>
                    )
            }
        </div>
    )
}

export default PlanningChauffeur