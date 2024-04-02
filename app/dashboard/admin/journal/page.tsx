"use client"
import FicheJournal from "@/components/ui/ficheJournal"
import FicheProduction from "@/components/ui/ficheProduction"
import { getDateFormat } from "@/functions/actionsClient"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import HelpPopup from "@/components/ui/helpPopup"
import Link from "next/link"

interface IPrams {
    vehiculeId?: string
}
export interface Jour {
    intitule: string,
    jour: string,
    montant: number
}
export default function Page() {

    const [depenses, setDepenses] = useState<
        {
            lundi: Jour[],
            mardi: Jour[],
            mercredi: Jour[],
            jeudi: Jour[],
            vendredi: Jour[],
            samedi: Jour[],
            dimanche: Jour[],
        }>({
            lundi: [],
            mardi: [],
            mercredi: [],
            jeudi: [],
            vendredi: [],
            samedi: [],
            dimanche: [],
        })
    const [date1, setdate1] = useState<string>("")
    const [date2, setdate2] = useState<string>("")
    const router = useRouter();
    const [depenseM, setdepenseM] = useState<any[]>([])
    const [date, setDate] = useState<string>("");
    const [week, setWeek] = useState<string[]>([])
    const [semaine, setSemaine] = useState<{
        lundi: Jour[],
        mardi: Jour[],
        mercredi: Jour[],
        jeudi: Jour[],
        vendredi: Jour[],
        samedi: Jour[],
        dimanche: Jour[],
    }>({
        lundi: [],
        mardi: [],
        mercredi: [],
        jeudi: [],
        vendredi: [],
        samedi: [],
        dimanche: [],
    })
    const [total, settotal] = useState<number>(0);
    const [total2, settotal2] = useState<number>(0)

    const getVoyageByDate = async (id: string) => {
        const res = await fetch(`/api/voyages/${id}`, { cache: "no-store" })
        if (!res.ok) {
            console.log("error")
        }
        const data = await res.json();
        return data
    };

    // const getVoyageById = async (id: string) => {
    //     const res = await fetch(`/api/voyages/${id}`, { cache: "no-store" })
    //     if (!res.ok) {
    //         console.log("error")
    //     }
    //     const data = await res.json();
    //     return data
    // };

    const getBusById = async (id: number) => {
        const res = await fetch(`/api/bus/${id}`, { cache: "no-store" })
        if (!res.ok) {
            console.log("error")
        }
        const data = await res.json();
        return data
    };

    const getDepenses = async () => {
        const res = await fetch(`/api/depenses`, { cache: "no-store" })
        if (!res.ok) {
            console.log("error")
        }
        const data = await res.json();
        return data
    };
    // const getAgenceById = async (id: number) => {
    //     const res = await fetch(`/api/agences/${id}`, { cache: "no-store" })
    //     if (!res.ok) {
    //         console.log("error")
    //     }
    //     const data = await res.json();
    //     return data
    // };
    const getRecetteByDate = async (date: string) => {
        const res = await fetch(`/api/lignerecette`, { cache: "no-store" })
        if (!res.ok) {
            console.log("error")
        }
        const data = await res.json();
        return data
    };

    const getDepense = async (str: string) => {
        // e.preventDefault()
        const dates = new Date(date);
        let year = dates.getFullYear();
        let month = dates.getMonth() + 1;
        let day = dates.getDate();
        let tab: any[] = []
        let d = dates.getDay() - 1;
        let t = (7 - dates.getDay());
        if (d == -1) {
            d = 6
        };
        for (let index = 0; index < d; index++) {
            if ((day - 1) <= 0) {
                month = month - 1
                if (month % 2 == 0) {
                    if (month == 2) {
                        if (year == 2024 || year == 2028 || year == 2032 || year == 2036 || year == 2040) {
                            day = 29;
                        } else {
                            day = 28;
                        }
                    } else {
                        day = 30;
                    }
                } else {
                    day = 31;
                }
            } else {
                day = day - 1;
            }
            const daym = (day) < 10 ? `0${day}` : `${day}`;
            const monthm = (month) < 10 ? `0${month}` : `${month}`;
            tab.push(`${year}-${monthm}-${daym}`)
        }

        tab = tab.reverse();
        let tab2: any[] = [];
        let tab3: any[] = [];

        let lundi: Jour[] = [];
        let mardi: Jour[] = [];
        let mercredi: Jour[] = [];
        let jeudi: Jour[] = [];
        let vendredi: Jour[] = [];
        let samedi: Jour[] = [];
        let dim: Jour[] = [];

        let lundiD: Jour[] = [];
        let mardiD: Jour[] = [];
        let mercrediD: Jour[] = [];
        let jeudiD: Jour[] = [];
        let vendrediD: Jour[] = [];
        let samediD: Jour[] = [];
        let dimD: Jour[] = [];

        let num2: number = 0;
        let num3: number = 0;
        day = dates.getDate();
        month = dates.getMonth() + 1;
        const daym2 = (day) < 10 ? `0${day}` : `${day}`;
        const monthm2 = (month) < 10 ? `0${month}` : `${month}`;
        tab.push(`${year}-${monthm2}-${daym2}`)
        if (d != 6) {
            for (let index = 0; index < t; index++) {
                if (month % 2 == 0) {
                    if (month == 2) {
                        if (year == 2024 || year == 2028 || year == 2032 || year == 2036 || year == 2040) {
                            if (day == 29) {
                                month = month + 1;
                                day = 1;
                            } else {
                                day = day + 1;
                            }
                        } else {
                            if (day == 28) {
                                month = month + 1;
                                day = 1;
                            } else {
                                day = day + 1;
                            }
                        }
                    } else {
                        if (day == 30) {
                            month = month + 1;
                            day = 1;
                            if (month == 13) {
                                month = 1
                            }
                        } else {
                            day = day + 1;
                        }
                    }
                } else {
                    if (day == 31) {
                        month = month + 1;
                        day = 1;
                        if (month == 13) {
                            month = 1
                        }
                    } else {
                        day = day + 1;
                    }
                }
                const daym = (day) < 10 ? `0${day}` : `${day}`;
                const monthm = (month) < 10 ? `0${month}` : `${month}`;
                tab.push(`${year}-${monthm}-${daym}`)
            }
        }
        const tabDe: any[] = await getDepenses()
        for (let i = 0; i < tab.length; i++) {
            const element = tab[i];
            tabDe.map((r) => {
                if (getDateFormat(r.date) == element) {
                    if (r.typeDepense == "bus") {
                        const k = new Date(element).getDay();
                        num2 += r.montant
                        if (k == 0) {
                            dim.push({ intitule: r.typeDepense, jour: "Dimanche", montant: r.montant })
                        } else {
                            dim.push({ intitule: "", jour: "Dimanche", montant: 0 })
                        }
                        if (k == 1) {
                            lundi.push({ intitule: r.typeDepense, jour: "Lundi", montant: r.montant })
                        } else {
                            lundi.push({ intitule: "", jour: "Lundi", montant: 0 })
                        }
                        if (k == 2) {
                            mardi.push({ intitule: r.typeDepense, jour: "Mardi", montant: r.montant })
                        } else {
                            mardi.push({ intitule: "", jour: "Mardi", montant: 0 })
                        }
                        if (k == 3) {
                            mercredi.push({ intitule: r.typeDepense, jour: "Mercredi", montant: r.montant })
                        } else {
                            mercredi.push({ intitule: "", jour: "Mercredi", montant: 0 })
                        }
                        if (k == 4) {
                            jeudi.push({ intitule: r.typeDepense, jour: "Jeudi", montant: r.montant })
                        } else {
                            jeudi.push({ intitule: "", jour: "Jeudi", montant: 0 })
                        }
                        if (k == 5) {
                            vendredi.push({ intitule: r.typeDepense, jour: "Vendredi", montant: r.montant })
                        } else {
                            vendredi.push({ intitule: "", jour: "Vendredi", montant: 0 })
                        }
                        if (k == 6) {
                            samedi.push({ intitule: r.typeDepense, jour: "Samedi", montant: r.montant })
                        } else {
                            samedi.push({ intitule: "", jour: "Samedi", montant: 0 })
                        }
                    } else {
                        const k = new Date(element).getDay();
                        num3 += r.montant
                        if (k == 0) {
                            dimD.push({ intitule: r.typeDepense, jour: "Dimanche", montant: r.montant })
                        } else {
                            dimD.push({ intitule: "", jour: "Dimanche", montant: 0 })
                        }
                        if (k == 1) {
                            lundiD.push({ intitule: r.typeDepense, jour: "Lundi", montant: r.montant })
                        } else {
                            lundiD.push({ intitule: "", jour: "Lundi", montant: 0 })
                        }
                        if (k == 2) {
                            mardiD.push({ intitule: r.typeDepense, jour: "Mardi", montant: r.montant })
                        } else {
                            mardiD.push({ intitule: "", jour: "Mardi", montant: 0 })
                        }
                        if (k == 3) {
                            mercrediD.push({ intitule: r.typeDepense, jour: "Mercredi", montant: r.montant })
                        } else {
                            mercrediD.push({ intitule: "", jour: "Mercredi", montant: 0 })
                        }
                        if (k == 4) {
                            jeudiD.push({ intitule: r.typeDepense, jour: "Jeudi", montant: r.montant })
                        } else {
                            jeudiD.push({ intitule: "", jour: "Jeudi", montant: 0 })
                        }
                        if (k == 5) {
                            vendrediD.push({ intitule: r.typeDepense, jour: "Vendredi", montant: r.montant })
                        } else {
                            vendrediD.push({ intitule: "", jour: "Vendredi", montant: 0 })
                        }
                        if (k == 6) {
                            samediD.push({ intitule: r.typeDepense, jour: "Samedi", montant: r.montant })
                        } else {
                            samediD.push({ intitule: "", jour: "Samedi", montant: 0 })
                        }
                    }
                }
            })
        }
        setDepenses({ lundi: lundiD, mardi: mardiD, mercredi: mercrediD, jeudi: jeudiD, vendredi: vendrediD, samedi: samediD, dimanche: dimD })
        setdepenseM(tab3)
        setdate1(tab[0])
        setdate2(tab[6])
        setWeek(tab)
        settotal2(num2)
        settotal(num3)
        setSemaine({ lundi: lundi, mardi: mardi, mercredi: mercredi, jeudi: jeudi, vendredi: vendredi, samedi: samedi, dimanche: dim })
        // console.log(depenses)

    };


    return (
        <div className="p-10 w-full">
  <div className=" py-4 flex lowercase text-sm justify-between items-start mb-2">
                <h1 className=" text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/admin/depenses"}>Dépenses</Link> / <Link className="hover:text-blue-600 font-semibold" href="#">Journal</Link></h1>
            </div>

            <div>
                <div className="shadow-2xl border rounded-md ">
                    <h2 className="p-4 bg-white uppercase border-b font-bold">Journal</h2>
                    <div>
                        <div className="p-4">
                            <HelpPopup message="Remplir les depenses annoncées avant de générer le journal" />
                            <div>
                                <label htmlFor="" className="text-sm font-bold text-gray-900 mr-2">Semaine du </label>
                                <input type="date" name="" onChange={e => { setDate(e.target.value) }} className="inline-block p-2 text-xs text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " id="" />
                                <button type="button" onClick={() => getDepense(date)} className=" hover:bg-green-600 inline-block text-xs border p-2 rounded-sm text-white bg-green-500">Génerer</button>
                            </div>
                        </div>
                        <button type="button" onClick={() => router.refresh()} className=" hover:bg-green-600 text-sm border p-2 rounded-sm text-white bg-green-500 flex gap-4">Rafraichir le journal  <HelpPopup message="Permet d'actualiser tout les données du tableau" /></button>
                        <button type="button" onClick={() => {
                            if (confirm("Cette opération actualisera toute la page")) {
                                window.location.reload()
                            }
                        }} className=" hover:bg-red-600 text-sm border p-2 rounded-sm text-white bg-red-500 flex gap-4">Vider</button>
                    </div>
                </div>
                <div className="py-20 px-5  shadow-2xl m-auto mt-4 min-h-screen bg-white">
                    <FicheJournal item={{
                        depenses: depenses,
                        recettes: depenseM,
                        date1: date1,
                        date2: date2,
                        totalRecette: total,
                        totalRecette2: total2,
                        semaine: week,
                        semaineD: semaine
                    }} />
                </div>
            </div>
        </div>
    )
}
