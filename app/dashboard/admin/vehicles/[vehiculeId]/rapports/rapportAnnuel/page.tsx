"use client"

import RapportAnnuel from "@/components/ui/rapportAnnuel";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IPrams {
    vehiculeId?: string
}

export default function Page({ params }: { params: IPrams }) {

    const [moisRecette, setMoisRecette] = useState<any[]>([])
    const [date, setDate] = useState<string>("");
    const [total, setTotal] = useState<number>(0);
    const router = useRouter()
    const yearNumber: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 5, 5, 2, 2, 3, 4];
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
        if (str != "") {
            const bus = await getBus();
            const recette: any[] = await getLigneRecette(bus.id)
            let mois1: number = 0;
            let total: number = 0;
            let mois2: number = 0, mois3: number = 0, mois4: number = 0, mois5: number = 0, mois6: number = 0, mois7: number = 0, mois8: number = 0, mois9: number = 0, mois10: number = 0, mois11: number = 0, mois12: number = 0;
            recette.map((i) => {
                if (str == `${i.date[0]}${i.date[1]}${i.date[2]}${i.date[3]}`) {
                    total = total + parseInt(i.montant);
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
                }

            })
            setTotal(total)
            const t: any[] = [mois1, mois2, mois3, mois4, mois5, mois6, mois7, mois8, mois9, mois10, mois11, mois12];
            setMoisRecette(t)
            router.refresh()
        } else {
            alert("Entrer une date valide!")
        }
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
                        <label htmlFor="" className="text-sm font-bold text-gray-900 mr-2">Années</label>
                        <select name="year" onChange={(e) => setDate(e.target.value)} className=" min-w-40 p-1 border" id="year">
                            <option value=""></option>
                            {
                                yearNumber.map((i, index: number) => (
                                    <option key={index} value={2020 + index + 1}>{2020 + index + 1}</option>
                                ))
                            }
                        </select>
                        <button type="button" onClick={() => getRapportBus(date)} className=" hover:bg-green-600 inline-block text-xs border p-2 rounded-sm text-white bg-green-500">Génerer</button>
                    </div>
                </div>

            </div>

            <div className="p-4 w-full h-full min-h-full">
                <RapportAnnuel item={{ simple: moisRecette, bus: params.vehiculeId, date: date, total: total }} />
            </div>
        </div>
    )
}