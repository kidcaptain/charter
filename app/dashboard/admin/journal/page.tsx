"use client"
import FicheJournal from "@/components/ui/ficheJournal"
import FicheProduction from "@/components/ui/ficheProduction"
import { getDateFormat } from "@/functions/actionsClient"
import { useState, useEffect } from "react"


interface IPrams {
    vehiculeId?: string
}

export default function Page() {

    const [depenses, setDepenses] = useState<any[]>([])
    const [date1, setdate1] = useState<string>("")
    const [date2, setdate2] = useState<string>("")

    const [depenseM, setdepenseM] = useState<any[]>([])
    const [date, setDate] = useState<string>("");
    const [week, setWeek] = useState<string[]>([])
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
        console.table(data)
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
                        num2+= r.montant
                        if (k == 0) {
                            tab3.push({ intu: r.typeDepense, jour: "Dimanche", montant: r.montant })

                        }
                        if (k == 1) {
                            tab3.push({ typeVoyage: r.typeDepense, jour: "Lundi", montant: r.montant })
                        }
                        if (k == 2) {
                            tab3.push({ typeVoyage: r.typeDepense, jour: "Mardi", montant: r.montant })

                        }
                        if (k == 3) {
                            tab3.push({ typeVoyage: r.typeDepense, jour: "Mercredi", montant: r.montant })

                        }
                        if (k == 4) {
                            tab3.push({ typeVoyage: r.typeDepense, jour: "Jeudi", montant: r.montant })

                        }
                        if (k == 5) {
                            tab3.push({ typeVoyage: r.typeDepense, jour: "Vendredi", montant: r.montant })
                        }
                        if (k == 6) {
                            tab3.push({ typeVoyage: r.typeDepense, jour: "Samedi", montant: r.montant })

                        }
                    } else {
                        const k = new Date(element).getDay();
                        num3+= r.montant
                        if (k == 0) {
                            tab2.push({ intu: r.typeDepense, jour: "Dimanche", montant: r.montant })

                        }
                        if (k == 1) {
                            tab2.push({ typeVoyage: r.typeDepense, jour: "Lundi", montant: r.montant })

                        }
                        if (k == 2) {
                            tab2.push({ typeVoyage: r.typeDepense, jour: "Mardi", montant: r.montant })

                        }
                        if (k == 3) {
                            tab2.push({ typeVoyage: r.typeDepense, jour: "Mercredi", montant: r.montant })

                        }
                        if (k == 4) {
                            tab2.push({ typeVoyage: r.typeDepense, jour: "Jeudi", montant: r.montant })

                        }
                        if (k == 5) {
                            tab2.push({ typeVoyage: r.typeDepense, jour: "Vendredi", montant: r.montant })

                        }
                        if (k == 6) {
                            tab2.push({ typeVoyage: r.typeDepense, jour: "Samedi", montant: r.montant })

                        }
                    }
                }
            })
        }
        setDepenses(tab2)
        setdepenseM(tab3)
        setdate1(tab[0])
        setdate2(tab[6])
        setWeek(tab)
        settotal2(num2)
        settotal(num3)
    };


    return (
        <div className="p-10 w-full">


            <div>
                <div className="shadow-2xl border rounded-md overflow-hidden">
                    <h2 className="p-4 bg-white uppercase border-b font-bold">Production</h2>
                    <div>
                        <div className="p-4">
                            <div>
                                <label htmlFor="" className="text-sm font-bold text-gray-900 mr-2">Semaine du </label>
                                <input type="date" name="" onChange={e => { setDate(e.target.value) }} className="inline-block p-2 text-xs text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " id="" />
                                <button type="button" onClick={() => getDepense(date)} className=" hover:bg-green-600 inline-block text-xs border p-2 rounded-sm text-white bg-green-500">Génerer</button>
                            </div>
                        </div>
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
                        semaine: week
                    }} />
                </div>
            </div>
        </div>
    )
}