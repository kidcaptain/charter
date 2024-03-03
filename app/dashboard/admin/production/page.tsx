"use client"
import FicheProduction from "@/components/ui/ficheProduction"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"


interface IPrams {
    vehiculeId?: string
}

export default function Page() {

    const [depenses, setDepenses] = useState<any[]>([])
    const [totalRecette, setTotalRecette] = useState<number[]>([])
    const [date1, setdate1] = useState<string>("")
    const [isloading, setIsloading] = useState<boolean>(false)
    const [date2, setdate2] = useState<string>("")
    const router = useRouter();
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

    const getDepense = async (e: any) => {
        e.preventDefault()
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

        let tab2: any[] = []
        const lundi: any[] = [];
        const mardi: any[] = [];
        const mercredi: any[] = [];
        const jeudi: any[] = [];
        const vendredi: any[] = [];
        const samedi: any[] = [];
        const dimanche: any[] = [];
        const bu: any[] = await getBus();
        const total: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
                        let somme = 0;
                        const de: any[] = await getDepenseByDate(element, b.id);
                        if (de.length > 0) {
                            de.map((j) => {
                                somme = somme + parseInt(j.montant);
                            })
                        }
                        if (k == 0) {
                            if (type == "aller") {
                                tabVoyageRecette.push({ typeVoyage: type, jour: "Dimanche", montant: r.montant })
                                tabVoyageRecette.push({ typeVoyage: "retour", jour: "Dimanche", montant: 0 })
                                total[13] += r.montant
                            } else {
                                tabVoyageRecette.push({ typeVoyage: "aller", jour: "Dimanche", montant: 0 })
                                tabVoyageRecette.push({ typeVoyage: type, jour: "Dimanche", montant: r.montant })
                                total[12] += r.montant
                            }
                            tab2.push({ jour: "Dimanche", montant: somme })
                        }
                        if (k == 1) {
                            if (type == "aller") {
                                tabVoyageRecette.push({ typeVoyage: type, jour: "Lundi", montant: r.montant })
                                tabVoyageRecette.push({ typeVoyage: "retour", jour: "Lundi", montant: 0 })
                                total[0] += r.montant
                            } else {
                                tabVoyageRecette.push({ typeVoyage: "aller", jour: "Lundi", montant: 0 })
                                tabVoyageRecette.push({ typeVoyage: type, jour: "Lundi", montant: r.montant })
                                total[1] += r.montant
                            }
                            tab2.push({ jour: "Lundi", montant: somme })
                        }
                        if (k == 2) {
                            if (type == "aller") {
                                tabVoyageRecette.push({ typeVoyage: type, jour: "Mardi", montant: r.montant })
                                tabVoyageRecette.push({ typeVoyage: "retour", jour: "Mardi", montant: 0 })
                                total[2] += r.montant
                            } else {
                                tabVoyageRecette.push({ typeVoyage: "aller", jour: "Mardi", montant: 0 })
                                tabVoyageRecette.push({ typeVoyage: type, jour: "Mardi", montant: r.montant })
                                total[3] += r.montant
                            }
                            tab2.push({ jour: "Mardi", montant: somme })
                        }
                        if (k == 3) {
                            if (type == "aller") {
                                tabVoyageRecette.push({ typeVoyage: type, jour: "Mercredi", montant: r.montant })
                                tabVoyageRecette.push({ typeVoyage: "retour", jour: "Mercredi", montant: 0 })
                                total[4] += r.montant
                            } else {
                                tabVoyageRecette.push({ typeVoyage: "aller", jour: "Mercredi", montant: 0 })
                                tabVoyageRecette.push({ typeVoyage: type, jour: "Mercredi", montant: r.montant })
                                total[5] += r.montant
                            }
                            tab2.push({ jour: "Mercredi", montant: somme })
                        }
                        if (k == 4) {
                            if (type == "aller") {
                                tabVoyageRecette.push({ typeVoyage: type, jour: "Jeudi", montant: r.montant })
                                tabVoyageRecette.push({ typeVoyage: "retour", jour: "Jeudi", montant: 0 })
                                total[6] += r.montant
                            } else {
                                tabVoyageRecette.push({ typeVoyage: "aller", jour: "Jeudi", montant: r.montant })
                                tabVoyageRecette.push({ typeVoyage: type, jour: "Jeudi", montant: 0 })
                                total[7] += r.montant
                            }
                            tab2.push({ jour: "Jeudi", montant: somme })
                        }
                        if (k == 5) {
                            if (type == "aller") {
                                tabVoyageRecette.push({ typeVoyage: type, jour: "Vendredi", montant: r.montant })
                                tabVoyageRecette.push({ typeVoyage: "retour", jour: "Vendredi", montant: 0 })
                                total[8] += r.montant
                            } else {
                                tabVoyageRecette.push({ typeVoyage: "aller", jour: "Vendredi", montant: 0 })
                                tabVoyageRecette.push({ typeVoyage: type, jour: "Vendredi", montant: r.montant })
                                total[9] += r.montant
                            }
                            tab2.push({ jour: "Vendredi", montant: somme })
                        }
                        if (k == 6) {
                            if (type == "aller") {
                                tabVoyageRecette.push({ typeVoyage: type, jour: "Samedi", montant: r.montant })
                                tabVoyageRecette.push({ typeVoyage: "retour", jour: "Samedi", montant: 0 })
                                total[10] += r.montant
                            } else {
                                tabVoyageRecette.push({ typeVoyage: "aller", jour: "Samedi", montant: 0 })
                                tabVoyageRecette.push({ typeVoyage: type, jour: "Samedi", montant: r.montant })
                                total[11] += r.montant
                            }
                            tab2.push({ jour: "Samedi", montant: somme })
                        }


                    })
                } else {
                    const k = new Date(element).getDay();
                    if (k == 0) {
                        tabVoyageRecette.push({ typeVoyage: "aller", jour: "Dimanche", montant: 0 })
                        tabVoyageRecette.push({ typeVoyage: "retour", jour: "Dimanche", montant: 0 })
                    }
                    if (k == 1) {
                        tabVoyageRecette.push({ typeVoyage: "aller", jour: "Lundi", montant: 0 })
                        tabVoyageRecette.push({ typeVoyage: "retour", jour: "Lundi", montant: 0 })
                    }
                    if (k == 2) {
                        tabVoyageRecette.push({ typeVoyage: "aller", jour: "Mardi", montant: 0 })
                        tabVoyageRecette.push({ typeVoyage: "retour", jour: "Mardi", montant: 0 })
                    }
                    if (k == 3) {
                        tabVoyageRecette.push({ typeVoyage: "aller", jour: "Mercredi", montant: 0 })
                        tabVoyageRecette.push({ typeVoyage: "retour", jour: "Mercredi", montant: 0 })
                    }
                    if (k == 4) {
                        tabVoyageRecette.push({ typeVoyage: "aller", jour: "Jeudi", montant: 0 })
                        tabVoyageRecette.push({ typeVoyage: "retour", jour: "Jeudi", montant: 0 })
                    }
                    if (k == 5) {
                        tabVoyageRecette.push({ typeVoyage: "aller", jour: "Vendredi", montant: 0 })
                        tabVoyageRecette.push({ typeVoyage: "retour", jour: "Vendredi", montant: 0 })
                    }
                    if (k == 6) {
                        tabVoyageRecette.push({ typeVoyage: "aller", jour: "Samedi", montant: 0 })
                        tabVoyageRecette.push({ typeVoyage: "retour", jour: "Samedi", montant: 0 })
                    }
                }

            }
            bus.push({ bus: b, data: tabVoyageRecette });
        })
        console.log(tab2)
        setDepenses(tab2)
        tab2.length = 0;
        setRecettes(bus)
        setTotalRecette(total)

        setWeek({
            lundi: lundi,
            mardi: mardi,
            mercredi: mercredi,
            jeudi: jeudi,
            vendredi: vendredi,
            samedi: samedi,
            dimanche: dimanche
        })
            setTimeout(() => {
                router.refresh()
            }, 3000);
    };


    return (
        <div className="p-10 w-full">
            <div>
                <div className="shadow-2xl border rounded-md overflow-hidden">
                    <h2 className="p-4 bg-white uppercase border-b font-bold">Production</h2>
                    <div>
                        <div className="p-4">
                            <form onSubmit={getDepense}>
                                <label htmlFor="" className="text-sm font-bold text-gray-900 mr-2">Généré le rapport de production de la semaine du </label>
                                <input required type="date" name="" onChange={e => { setDate(e.target.value) }} className="inline-block p-2 text-xs text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " id="" />
                                <button type="submit" className=" hover:bg-green-600 inline-block text-xs border p-2 rounded-sm text-white bg-green-500">Génerer</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="py-20 px-5  shadow-2xl m-auto mt-4 min-h-screen bg-white">

                    <button>Afficher</button>
                    {
                        (recettes.length > 0) ? (
                            <FicheProduction item={{
                                production: recettes,
                                depense: depenses,
                                date1: date1,
                                date2: date2,
                                totalRecette: totalRecette
                            }} />

                        ) : null
                    }

                </div>
            </div>
        </div>
    )
}