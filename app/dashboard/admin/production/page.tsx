"use client"
import FicheProduction from "@/components/ui/ficheProduction"
import { useState, useEffect } from "react"


interface IPrams {
    vehiculeId?: string
}

export default function Page() {

    const [depenses, setDepenses] = useState<any[]>([])
    const [date1, setdate1] = useState<string>("")
    const [date2, setdate2] = useState<string>("")

    const [recettes, setRecettes] = useState<any[]>([])
    const [date, setDate] = useState<string>("");
    const [week, setWeek] = useState<any>(
        {
            lundi: [],
            mardi: [],
            mercredi: [],
            jeudi: [],
            vendredi: [],
            samedi: [],
            dimanche: []
        }
    )

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

    const getBus = async () => {
        const res = await fetch(`/api/bus`, { cache: "no-store" })
        if (!res.ok) {
            console.log("error")
        }
        const data = await res.json();
        return data
    };

    const getDepenseByDate = async (date: string, id: string) => {
        const res = await fetch(`/api/depenses?date=${date}&idTypeDepense=${id}&typeDepense=voyage`, { cache: "no-store" })
        if (!res.ok) {
            console.log("error")
        }
        const data = await res.json();
        return data
    };

    const getRecetteByDate = async (date: string, id: number) => {
        const res = await fetch(`/api/lignerecette?date=${date}&busId=${id}`, { cache: "no-store" })
        if (!res.ok) {
            console.log("error")
        }
        const data = await res.json();
        return data
    };

    const getDepense = async (str: string) => {
        if (str != "") {
            const date = new Date(str);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let day2 = date.getDate();
            let tab: any[] = []
            const t = 7 - date.getDay();
            let d = date.getDay() - 1;
            if (d == -1) {
                d = 6
            };
            for (let index = 0; index < d; index++) {
                if ((day - 1) <= 0) {
                    if (year == 2024 || year == 2028 || year == 2032 || year == 2036 || year == 2040) {
                        if (month % 2 == 0) {
                            if (day == 1) {
                                month = month - 1;
                                if (month == 2) {
                                    day = 29;
                                } else {
                                    day = 30;
                                }
                                if (month == 0) {
                                    month = 12;
                                    day = 31;
                                }
                            } else {
                                day = day - 1;

                            }
                        } else {
                            if (day == 1) {
                                month = month - 1;
                                if (month == 2) {
                                    day = 29;
                                } else {
                                    day = 31;
                                }
                                if (month == 0) {
                                    month = 12;
                                    day = 31;
                                }
                            } else {
                                day = day - 1;
                            }
                        }

                    } else {
                        if (month % 2 == 0) {
                            if (day == 1) {
                                month = month - 1;
                                if (month == 2) {
                                    day = 28;
                                } else {
                                    day = 30;
                                }
                                if (month == 0) {
                                    month = 12;
                                    day = 31;
                                }
                            } else {
                                day = day - 1;
                            }
                        } else {
                            if (day == 1) {
                                day = 30;
                                if (month == 0) {
                                    month = 12;
                                    day = 31;
                                }
                            } else {
                                day = day - 1;
                            }
                        }

                    }
                } else {
                    day = day - 1;
                }
                const daym = (day) < 10 ? `0${day}` : `${day}`;
                const monthm = (month) < 10 ? `0${month}` : `${month}`;
                tab.push(`${year}-${monthm}-${daym}`)
            }
            tab = tab.reverse();
            day = date.getDate();
            month = date.getMonth() + 1;
            const daym2 = (day) < 10 ? `0${day}` : `${day}`;
            const monthm2 = (month) < 10 ? `0${month}` : `${month}`;
            tab.push(`${year}-${monthm2}-${daym2}`)
            if (d != 6) {
                for (let index = 0; index < t; index++) {
                    if (year == 2024 || year == 2028 || year == 2032 || year == 2036 || year == 2040) {
                        if (month % 2 == 0) {
                            if (day == 30 || day == 29) {
                                month = month + 1;
                                day = 1;
                                if (month == 13) {
                                    month = 1
                                }
                            } else {
                                day = day + 1;
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

                    } else {
                        if (month % 2 == 0) {
                            if (day == 30 || day == 28) {
                                month = month + 1;
                                day = 1;
                                if (month == 13) {
                                    month = 1
                                }
                            } else {
                                day = day + 1;
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
                    }

                    const daym = (day) < 10 ? `0${day}` : `${day}`;
                    const monthm = (month) < 10 ? `0${month}` : `${month}`;
                    tab.push(`${year}-${monthm}-${daym}`)
                    // console.log(`${year}-${monthm}-${daym}`)
                }
            }

            const tab2: any[] = []
            const tab3: any[] = []
            const lundi: any[] = [];
            const mardi: any[] = [];
            const mercredi: any[] = [];
            const jeudi: any[] = [];
            const vendredi: any[] = [];
            const samedi: any[] = [];
            const dimanche: any[] = [];
            const bu: any[] = await getBus();
            const bus: any[] = []
            setdate1(tab[0])
            setdate2(tab[6])
            bu.map(async (b) => {
                const tabVoyageRecette: any[] = []
                for (let i = 0; i < tab.length; i++) {
                    const element = tab[i];
                    const re: any[] = await getRecetteByDate(element, b.id);
                    if (re.length > 0) {
                        re.map(async (r) => {
                            const vo = await getVoyageByDate(r.voyageId);
                            let type = "";
                            if (vo.typeVoyage == "aller-retour") {
                                type = "retour"
                            } else {
                                type = "aller"
                            }
                            const k = new Date(element).getDay();
                            if (k == 0) {
                                if (type == "aller") {
                                    tabVoyageRecette.push({ typeVoyage: type, jour: "Dimanche", montant: r.montant })
                                    tabVoyageRecette.push({ typeVoyage: "retour", jour: "Dimanche", montant: 0 })
                                } else {
                                    tabVoyageRecette.push({ typeVoyage: "aller", jour: "Dimanche", montant: 0 })
                                    tabVoyageRecette.push({ typeVoyage: type, jour: "Dimanche", montant: r.montant })
                                }
                            }
                            if (k == 1) {
                                if (type == "aller") {
                                    tabVoyageRecette.push({ typeVoyage: type, jour: "Lundi", montant: r.montant })
                                    tabVoyageRecette.push({ typeVoyage: "retour", jour: "Lundi", montant: r.montant })
                                } else {
                                    tabVoyageRecette.push({ typeVoyage: "aller", jour: "Lundi", montant: r.montant })
                                    tabVoyageRecette.push({ typeVoyage: type, jour: "Lundi", montant: r.montant })
                                }
                            }
                            if (k == 2) {
                               if (type == "aller") {
                                tabVoyageRecette.push({ typeVoyage: type, jour: "Mardi", montant: r.montant })
                                tabVoyageRecette.push({ typeVoyage: "retour", jour: "Mardi", montant: r.montant })
                               }else{
                                tabVoyageRecette.push({ typeVoyage: "aller", jour: "Mardi", montant: r.montant })
                                tabVoyageRecette.push({ typeVoyage: type, jour: "Mardi", montant: r.montant })
                               }
                            }
                            if (k == 3) {
                                if (type == "aller") {
                                    tabVoyageRecette.push({ typeVoyage: type, jour: "Mercredi", montant: r.montant })
                                    tabVoyageRecette.push({ typeVoyage: "retour", jour: "Mercredi", montant: r.montant })
                                }else{
                                    tabVoyageRecette.push({ typeVoyage: "aller", jour: "Mercredi", montant: r.montant })
                                    tabVoyageRecette.push({ typeVoyage: type, jour: "Mercredi", montant: r.montant })
                                }
                            }
                            if (k == 4) {
                               if (type == "aller") {
                                tabVoyageRecette.push({ typeVoyage: type, jour: "Jeudi", montant: r.montant })
                                tabVoyageRecette.push({ typeVoyage: "retour", jour: "Jeudi", montant: r.montant })
                               }else{
                                tabVoyageRecette.push({ typeVoyage: "aller", jour: "Jeudi", montant: r.montant })
                                tabVoyageRecette.push({ typeVoyage: type, jour: "Jeudi", montant: r.montant })
                               }
                            }
                            if (k == 5) {
                                if (type == "aller") {
                                    tabVoyageRecette.push({ typeVoyage: type, jour: "Vendredi", montant: r.montant })
                                    tabVoyageRecette.push({ typeVoyage: "retour", jour: "Vendredi", montant: r.montant })
                                }else{
                                    tabVoyageRecette.push({ typeVoyage: "aller", jour: "Vendredi", montant: r.montant })
                                    tabVoyageRecette.push({ typeVoyage: type, jour: "Vendredi", montant: r.montant })
                                }
                            }
                            if (k == 6) {
                                if (type == "aller") {
                                    tabVoyageRecette.push({ typeVoyage: type, jour: "Samedi", montant: r.montant })
                                    tabVoyageRecette.push({ typeVoyage: "retour", jour: "Samedi", montant: r.montant })
                                }else{
                                    tabVoyageRecette.push({ typeVoyage: "aller", jour: "Samedi", montant: r.montant })
                                    tabVoyageRecette.push({ typeVoyage: type, jour: "Samedi", montant: r.montant })
                                }
                            }

                        })
                    } else {
                        const k = new Date(element).getDay();
                        if (k == 0) {
                            tabVoyageRecette.push({ typeVoyage: "", jour: "Dimanche", montant: 0 })
                        }
                        if (k == 1) {
                            tabVoyageRecette.push({ typeVoyage: "", jour: "Lundi", montant: 0 })
                        }
                        if (k == 2) {
                            tabVoyageRecette.push({ typeVoyage: "", jour: "Mardi", montant: 0 })
                        }
                        if (k == 3) {
                            tabVoyageRecette.push({ typeVoyage: "", jour: "Mercredi", montant: 0 })
                        }
                        if (k == 4) {
                            tabVoyageRecette.push({ typeVoyage: "", jour: "Jeudi", montant: 0 })
                        }
                        if (k == 5) {
                            tabVoyageRecette.push({ typeVoyage: "", jour: "Vendredi", montant: 0 })
                        }
                        if (k == 6) {
                            tabVoyageRecette.push({ typeVoyage: "", jour: "Samedi", montant: 0 })
                        }
                    }


                }
                bus.push({ bus: b, data: tabVoyageRecette });
            })

            // for (let i = 0; i < tab.length; i++) {
            //     const element = tab[i];
            //     const re: any[] = await getRecetteByDate(element)

            //     let sommeRec = 0;
            //     const de: any[] = await getDepenseByDate(element,"" );

            //     const k = new Date(element).getDay();
            //     if (re.length > 0) {
            //         re.map( async (j) => {
            //             const v = await getVoyageByDate(j.voyageId);
            //             const bu = await getBus(j.busId);
            //             if (k == 0) {
            //                 dimanche.push({montant: j.montant, typeVoyage: v.typeVoyage, voyageId: v.voyageId, busId:  bu.id })
            //             } else {
            //                 dimanche.push({montant: 0, typeVoyage: "", voyageId: 0 })
            //             }
            //             if (k == 1) {
            //                 lundi.push({montant: j.montant, typeVoyage: v.typeVoyage, voyageId: v.voyageId })
            //             } else {
            //                 lundi.push({montant: 0, typeVoyage: "", voyageId: 0 })
            //             }
            //             if (k == 2) {
            //                 mardi.push({montant: j.montant, typeVoyage: v.typeVoyage, voyageId: v.voyageId })
            //             } else {
            //                 mardi.push({montant: 0, typeVoyage: "", voyageId: 0 })
            //             }
            //             if (k == 3) {
            //                 mercredi.push({montant: j.montant, typeVoyage: v.typeVoyage, voyageId: v.voyageId })
            //             } else {
            //                 mercredi.push({montant: 0, typeVoyage: "", voyageId: 0 })
            //             }
            //             if (k == 4) {
            //                 jeudi.push({montant: j.montant, typeVoyage: v.typeVoyage, voyageId: v.voyageId })
            //             } else {
            //                 jeudi.push({montant: 0, typeVoyage: "", voyageId: 0 })
            //             }
            //             if (k == 5) {
            //                 vendredi.push({montant: j.montant, typeVoyage: v.typeVoyage, voyageId: v.voyageId })
            //             } else {
            //                 vendredi.push({montant: 0, typeVoyage: "", voyageId: 0 })
            //             }
            //             if (k == 6) {
            //                 samedi.push({montant: j.montant, typeVoyage: v.typeVoyage, voyageId: v.voyageId })
            //             } else {
            //                 samedi.push({montant: 0, typeVoyage: "", voyageId: 0 })
            //             }
            //         })

            //     }
            //     if (re.length > 0) {
            //         re.map((j) => {
            //             sommeRec = sommeRec + parseInt(j.montant);
            //         })
            //     }
            //     switch (k) {
            //         case 0:
            //             tab3.push({ label: "Dimanche", montant: sommeRec, date: element })

            //             break;
            //         case 1:

            //             tab3.push({ label: "Lundi", montant: sommeRec, date: element })
            //             break;
            //         case 2:

            //             tab3.push({ label: "Mardi", montant: sommeRec, date: element })
            //             break;
            //         case 3:

            //             tab3.push({ label: "Mercredi", montant: sommeRec, date: element })
            //             break;
            //         case 4:

            //             tab3.push({ label: "Jeudi", montant: sommeRec, date: element })
            //             break;
            //         case 5:

            //             tab3.push({ label: "Vendredi", montant: sommeRec, date: element })
            //             break;
            //         case 6:

            //             tab3.push({ label: "Samedi", montant: sommeRec, date: element })
            //             break;
            //         default:
            //             break;
            //     }
            // }

            setDepenses(tab2)
            setRecettes(bus)
            console.log(bus)
            // console.log(tab3)

            setWeek({
                lundi: lundi,
                mardi: mardi,
                mercredi: mercredi,
                jeudi: jeudi,
                vendredi: vendredi,
                samedi: samedi,
                dimanche: dimanche
            })
        } else {
            alert("Selectionner une date!")
        }
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
                    <FicheProduction item={{
                        production: recettes,
                        depense: depenses,
                        date1: date1,
                        date2: date2,
                        semaine: week
                    }} />
                </div>
            </div>
        </div>
    )
}