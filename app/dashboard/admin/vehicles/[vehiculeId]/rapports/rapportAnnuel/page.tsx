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
    const [moisRecette, setMoisRecette] = useState<any[]>([])
    const [date, setDate] = useState<string>("");
    const [total, setTotal] = useState<number>(0);
    const getLigneRecette = async (id: number) => {
        const res = await fetch(`/api/lignerecette?busId=${id}`, { cache: "no-store" })
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

    const getRapportBus = async (str: string) => {
        const bus = await getBus();
        const recette: any[] = await getLigneRecette(bus.id)
        let mois1: number = 0;
        let mois2: number = 0, mois3: number = 0, mois4: number = 0, mois5: number = 0, mois6: number = 0, mois7: number = 0, mois8: number = 0, mois9: number = 0, mois10: number = 0, mois11: number = 0, mois12: number = 0;
        recette.map((i) => {
            switch (`${i.date[5]}${i.date[6]}`) {
                case "01":
                    mois1 = mois1 + parseInt(i.montant);
                    break;
                case "02":
                    mois2 = mois2 + parseInt(i.montant);
                    break;
                case "03":
                    mois3 = mois3 + parseInt(i.montant);
                    break;
                case "04":
                    mois4 = mois4 + parseInt(i.montant);
                    break;
                case "05":
                    mois5 = mois5 + parseInt(i.montant);
                    break;
                case "06":
                    mois6 = mois6 + parseInt(i.montant);
                    break;
                case "07":
                    mois7 = mois7 + parseInt(i.montant);
                    break;
                case "08":
                    mois8 = mois8 + parseInt(i.montant);
                    break;
                case "09":
                    mois9 = mois9 + parseInt(i.montant);
                    break;
                case "10":
                    mois10 = mois10 + parseInt(i.montant);
                    break;
                case "11":
                    mois11 = mois11 + parseInt(i.montant);
                    break;
                case "12":
                    mois12 = mois12 + parseInt(i.montant);
                    break;
                default:
                    break;
            }
        })
        const t: any[] = [mois1, mois2, mois3, mois4, mois5, mois6, mois7, mois8, mois9, mois10, mois11, mois12];
        setMoisRecette(t)
    }
    useEffect(() => {

    }, [])


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
                <RapportHebdo item={{ simple: fiche, date: date, total: total }} />
            </div>
        </div>
    )
}