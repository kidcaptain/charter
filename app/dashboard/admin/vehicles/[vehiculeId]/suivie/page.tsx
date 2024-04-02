"use client"
import FicheSuivie from "@/components/ui/ficheSuivi"
import HelpPopup from "@/components/ui/helpPopup"
import { getDateFormat } from "@/functions/actionsClient"
import Link from "next/link"
import { FormEvent, useState, useEffect } from "react"


interface IPrams {
    vehiculeId?: string
}

export default function Page({ params }: { params: IPrams }) {
    // const [chauffeur, setChauffeur] = useState<any>(null)
    const [bus, setBus] = useState<any>(null)
    // const [fiche, setFiche] = useState<any>(null)
    const [depenses, setDepenses] = useState<any[]>([])
    const [agences, setAgences] = useState<any[]>([])
    // const [agence, setAgence] = useState<any>()
    // const [agenceNom, setAgenceNom] = useState<any>()
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


    const [data, setData] = useState<any>()


    const getDepenseByDate = async (date: string) => {
        const res = await fetch(`/api/depenses?date=${date}&idTypeDepense=${params.vehiculeId}&typeDepense=bus`, { cache: "no-store" })
        if (!res.ok) {
            console.log("error")
        }
        const data = await res.json();
        console.table(data)
        return data
    };

    const getRecetteByDate = async (date: string) => {
        const res = await fetch(`/api/lignerecette?date=${date}&busId=${params.vehiculeId}`, { cache: "no-store" })
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
            console.log(tab);
            for (let i = 0; i < tab.length; i++) {
                const element = tab[i];
                let somme = 0;
                let sommeRec = 0;
                const de: any[] = await getDepenseByDate(element);
                const re: any[] = await getRecetteByDate(element);
                // const g = await getAgenceById(agence);
                // setAgenceNom(g)
                const k = new Date(element).getDay();
                if (de.length > 0) {
                    de.map((j) => {
                        if (k == 0) {
                            dimanche.push({ montant: j.montant, description: j.description })
                        } else {
                            dimanche.push({ montant: 0, description: "" })
                        }
                        if (k == 1) {
                            lundi.push({ montant: j.montant, description: j.description })
                        } else {
                            lundi.push({ montant: 0, description: "" })
                        }
                        if (k == 2) {
                            mardi.push({ montant: j.montant, description: j.description })
                        } else {
                            mardi.push({ montant: 0, description: "" })
                        }
                        if (k == 3) {
                            mercredi.push({ montant: j.montant, description: j.description })
                        } else {
                            mercredi.push({ montant: 0, description: "" })
                        }
                        if (k == 4) {
                            jeudi.push({ montant: j.montant, description: j.description })
                        } else {
                            jeudi.push({ montant: 0, description: "" })
                        }
                        if (k == 5) {
                            vendredi.push({ montant: j.montant, description: j.description })
                        } else {
                            vendredi.push({ montant: 0, description: "" })
                        }
                        if (k == 6) {
                            samedi.push({ montant: j.montant, description: j.description })
                        } else {
                            samedi.push({ montant: 0, description: "" })
                        }
                    })

                }
                if (re.length > 0) {
                    re.map((j) => {
                        sommeRec = sommeRec + parseInt(j.montant);
                    })
                }
                switch (k) {
                    case 0:
                        tab3.push({ label: "Dimanche", montant: sommeRec, date: element })

                        break;
                    case 1:

                        tab3.push({ label: "Lundi", montant: sommeRec, date: element })
                        break;
                    case 2:

                        tab3.push({ label: "Mardi", montant: sommeRec, date: element })
                        break;
                    case 3:

                        tab3.push({ label: "Mercredi", montant: sommeRec, date: element })
                        break;
                    case 4:

                        tab3.push({ label: "Jeudi", montant: sommeRec, date: element })
                        break;
                    case 5:

                        tab3.push({ label: "Vendredi", montant: sommeRec, date: element })
                        break;
                    case 6:

                        tab3.push({ label: "Samedi", montant: sommeRec, date: element })
                        break;
                    default:
                        break;
                }
            }
            setDepenses(tab2)
            setRecettes(tab3)
            
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
    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`/api/bus/${params.vehiculeId}`, { method: "GET", cache: "no-store" })

            if (!res.ok) {
                throw new Error("Failed")
            }
            const val = await res.json();
            setBus(val)
        };
        getData()
        const getAgences = async () => {
            const res = await fetch("/api/agences/", { cache: "no-store" })
            if (!res.ok) {
                console.log("error")
            }
            const data = await res.json();
            setAgences(data)
        };
        getAgences()

    }, [])

    return (
        <div className="p-10 w-full">
            <div className=" py-4 flex lowercase text-sm justify-between items-start mb-2">
                <h1 className=" text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/admin/vehicles"}>Vehicules</Link> / <Link className="hover:text-blue-600 font-semibold" href="">Fiche de suivie</Link></h1>
            </div>

            <div>
                <div className="shadow-2xl border rounded-md ">
                    <h2 className="p-4 bg-white uppercase border-b font-bold">Fiche de suivie</h2>
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
                    <FicheSuivie item={{
                        production: recettes,
                        depense: depenses,
                        date: date,
                        semaine: week,
                        bus: bus
                    }} />
                </div>
            </div>
        </div>
    )
}