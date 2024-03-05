"use client"

import FicheDepense from "@/components/ui/ficheDepense";
import FicheRecette from "@/components/ui/ficheRecette";
import RapportHebdo from "@/components/ui/rapportHebdo";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IPrams {
    vehiculeId?: string
}

export default function Page({ params }: { params: IPrams }) {
    const [fiche, setFiche] = useState<any[]>([]);
    const [bus, setBus] = useState<any>();
    
    const [date, setDate] = useState<string>("");
    const [date1, setDate1] = useState<string>("");
    const [date2, setDate2] = useState<string>("");
    const [total, setTotal] = useState<number>(0);
    const getLigneRecette = async (id: number, date: string) => {
        const res = await fetch(`/api/lignerecette?busId=${id}&date=${date}`, { cache: "no-store" })
        if (!res.ok) {
            console.log("error")
        }
        const data = await res.json();
        return data
    };

    const getBus = async () => {
        const res = await fetch("/api/bus/" + params.vehiculeId, { cache: "no-store" })
        if (!res.ok) {
            console.log("error")
        }
        const data = await res.json();
        setBus(data)
        return data
    };

    const getVoyage = async (id: number, busId: number) => {
        const res = await fetch("/api/voyages?busId"+ busId + "&id=" + id, { cache: "no-store" })
        if (!res.ok) {
            console.log("error")
        }
        const data = await res.json();
        return data
    };

    const getRapportBus = async (str: string) => {
      
        const buss = await getBus();
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
        day = date.getDate();
        month = date.getMonth() + 1;
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
        const tab2: any[] = []
        let somme = 0;
        for (let i = 0; i < tab.length; i++) {
            const element = tab[i];
          
            let sommeRec = 0;
            const recette: any[] = await getLigneRecette(buss.id, element)
            if (recette.length > 0) {
                recette.map( async (j) => {
                    sommeRec = sommeRec + parseInt(j.montant)
                    const voyage : any[] = await getVoyage(j.voyageId, buss.id)
                    somme+=parseInt(j.montant);
                })
            }
            
            const k = new Date(element).getDay();
            switch (k) {
                case 0:
                    tab2.push({ label: "Dimanche", montant: sommeRec, date: element })
                    break;
                case 1:
                    tab2.push({ label: "Lundi", montant: sommeRec, date: element })
                    break;
                case 2:
                    tab2.push({ label: "Mardi", montant: sommeRec, date: element })
                    break;
                case 3:
                    tab2.push({ label: "Mercredi", montant: sommeRec, date: element })
                    break;
                case 4:
                    tab2.push({ label: "Jeudi", montant: sommeRec, date: element })
                    break;
                case 5:
                    tab2.push({ label: "Vendredi", montant: sommeRec, date: element })
                    break;
                case 6:
                    tab2.push({ label: "Samedi", montant: sommeRec, date: element })
                    break;
                default:
                    break;
            }
        }
        
        setFiche(tab2)
        setDate1(tab[0])
        setDate2(tab[6])
        setTotal(somme)
    }
    useEffect(() => {

    }, [])

    // const onSubmit = async () => {
    //     const res = await fetch("/api/depenses?date=" + dateUpdate, { cache: "no-store" })
    //     if (!res.ok) {
    //         console.log("error")
    //     }
    //     const data = await res.json();
    //     const tabDepense: any[] = await data;
    //     const tab: any[] = [];
    //     const tabBus: any[] = [];
    //     console.log(tabDepense)
    //     tabDepense.map((i) => {
    //         if (i.typeDepense === "bus") {
    //             tabBus.push(i)
    //         } else {
    //             tab.push(i)
    //         }
    //     })

    //     setDate(dateUpdate)
    //     setDepenses(tab)
    //     setDepensesBus(tabBus)
    // }
    return (
        <div className="p-10 h-full">
            <div className=" py-4 flex lowercase text-sm justify-between items-start mb-2">
                <h1 className=" text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/admin/vehicles"}>Vehicules</Link> / <Link href={`/dashboard/admin/vehicles/${params.vehiculeId}/rapports`} className="hover:text-blue-600">Rapports</Link> / <Link className="hover:text-blue-600" href="">Rapport Hebdomadaire</Link></h1>
            </div>
            <div className="bg-white shadow-2xl">
                <h2 className="p-4  uppercase border-b">
                    Rapport hebdomadaire
                </h2>


                    <div className="p-4">
                        <div>
                            <label htmlFor="" className="text-sm font-bold text-gray-900 mr-2">Date</label>
                            <input type="date" name="" onChange={e => { setDate(e.target.value) }} className="inline-block p-2 text-xs text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " id="" />
                            <button type="button" onClick={() => getRapportBus(date)} className=" hover:bg-green-600 inline-block text-xs border p-2 rounded-sm text-white bg-green-500">Génerer</button>
                        </div>
                    </div>
             
            </div>

            <div className="p-4 w-full h-full min-h-full">
                <RapportHebdo item={{  simple: fiche, date: date1, date2: date2, total: total, bus: bus }} />
            </div>
        </div>
    )
}