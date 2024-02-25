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
    const [ficheRetour, setFicheRetour] = useState<any[]>([]);
    
    const [date, setDate] = useState<string>("");
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
        return data
    };
    const getEmploye = async (id: number) => {
        const res = await fetch(`/api/employes/${id}`, { cache: "no-store" })
        if (!res.ok) {
            console.log("error")
        }
        const data = await res.json();
        return data
    };
    const getRapportBus = async (str: string) => {
        const date = new Date(str);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let day2 = date.getDate();
        let tab: any[] = []
        const t = 7 - date.getDay();
        const bus = await getBus();
        const chauffeur = await getEmploye(bus.employeId);

        for (let index = 0; index < date.getDay(); index++) {
            if ((day - index) <= 0) {
                if (month % 2 == 0) {
                    month = month - 1;
                    if (month == 2) {
                        day = 28;
                    } else {
                        day = 30;
                    }
                    if (month == 1) {
                        year = year - 1;
                    }
                }
            } else {
                day = day2 - index;

            }
            const daym = (day) < 10 ? `0${day}` : `${day}`;
            const monthm = (month) < 10 ? `0${month}` : `${month}`;
            tab.push(`${year}-${monthm}-${daym}`)
        }
        tab = tab.reverse();
        day = date.getDate();
        for (let index = 0; index < t; index++) {
            if ((day - index) <= 0) {
                if (month % 2 == 0) {
                    month = month - 1;
                    if (month == 2) {
                        day = 28;
                    } else {
                        day = 30;
                    }
                    if (month == 1) {
                        year = year - 1;
                    }
                }
            } else {
                day = day2 + index;
            }
            const daym = (day + 1) < 10 ? `0${day + 1}` : `${day + 1}`;
            const monthm = (month) < 10 ? `0${month}` : `${month}`;
            tab.push(`${year}-${monthm}-${daym}`)
        }
        for (let i = 0; i < tab.length; i++) {
            const element = tab[i];
            let somme = 0;
            let sommeRec = 0;
            const recette: any[] = await getLigneRecette(bus.id, element)
            if (recette.length > 0) {
                recette.map((j) => {
                    sommeRec = sommeRec + parseInt(j.montant);
                })
            }
            
            const tab2: any[] = []
            const k = new Date(element).getDay();
            switch (k) {
                case 0:
                    tab2.push({ label: "Dimanche", montant: somme, date: element })
                    break;
                case 1:
                    tab2.push({ label: "Lundi", montant: somme, date: element })
                    break;
                case 2:
                    tab2.push({ label: "Mardi", montant: somme, date: element })
                    break;
                case 3:
                    tab2.push({ label: "Mercredi", montant: somme, date: element })
                    break;
                case 4:
                    tab2.push({ label: "Jeudi", montant: somme, date: element })
                    break;
                case 5:
                    tab2.push({ label: "Vendredi", montant: somme, date: element })
                    break;
                case 6:
                    tab2.push({ label: "Samedi", montant: somme, date: element })
                    break;
                default:
                    break;
            }
            setFiche(tab2)
        }
        

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
                <RapportHebdo item={{  simple: fiche, date: date, total: total }} />
            </div>
        </div>
    )
}