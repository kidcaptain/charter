"use client"

import RapportJourn from "@/components/ui/RapportJourn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IPrams {
    vehiculeId?: string
}

export default function Page({ params }: { params: IPrams }) {
    const [fiche, setFiche] = useState<any[]>([]);
    const [ficheRetour, setFicheRetour] = useState<any[]>([]);
    const [bus, setBus] = useState<any[]>([]);
    const [chauffeur, setChauffeur] = useState<any[]>([]);
    const router = useRouter();
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
    const getVoyage = async (id: number, date: string) => {
        const res = await fetch(`/api/voyages?busId=${id}&date=${date}`, { cache: "no-store" })
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
    const getTrajet = async (id: number) => {
        const res = await fetch("/api/trajets/" + id, { cache: "no-store" })
        if (!res.ok) {
            console.log("error")
        }
        const data = await res.json();
        return data
    };
    const getTicket = async () => {
        const res = await fetch("/api/ticket", { cache: "no-store" })
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
    const getRapportBus = async (e: any, str: string) => {
        e.preventDefault()
        if (str != "") {
            const date = new Date(str);
            let year = date.getFullYear();
            const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
            const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
            let tab: any[] = []
            const t = 7 - date.getDay();
            const bus = await getBus();
            setBus(bus);

            const recette: any[] = await getLigneRecette(bus.id, `${year}-${month}-${day}`);
            const voyages: any[] = await getVoyage(bus.id, `${year}-${month}-${day}`);

            let compte: number = 0;
            let tick: string = "";
            let c: string = ""
            if (recette.length > 0) {
                recette.map((j) => {
                    voyages.map(async (i) => {
                        if (i.id === j.voyageId) {
                            compte = compte + parseInt(j.montant);
                            const d = await getEmploye(i.chauffeurId);
                            const trajet: any = await getTrajet(i.trajetId);
                            const ticket: any[] = await getTicket();

                            ticket.map(async (o) => {
                                if (o.voyageID == i.id) {
                                    tick = o.destination
                                }
                            })
                            if (d) {
                                tab.push({ voyage: i, recette: j, chauffeur: `${d.nom} ${d.prenom}`, trajet: trajet, ticket: tick })
                            } else {
                                tab.push({ voyage: i, recette: j, chauffeur: "", trajet: trajet, ticket: tick })
                            }
                        }
                    })
                })
            }
            setTotal(compte)
            setFiche(tab)
            router.refresh()
        } else {
            alert("Selectionner une date!")
        }
    }

    return (
        <div className="p-10 h-full">
            <div className=" py-4 flex lowercase text-sm justify-between items-start mb-2">
                <h1 className=" text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/admin/vehicles"}>Vehicules</Link> / <Link href={`/dashboard/admin/vehicles/${params.vehiculeId}/rapports`} className="hover:text-blue-600">Rapports</Link> / <Link className="hover:text-blue-600" href="">Rapport Journalière</Link></h1>
            </div>
            <div className="bg-white shadow-2xl">
                <h2 className="p-4  uppercase border-b">
                    Rapport Journalière
                </h2>
                <div className="p-4">
                    <form onSubmit={(e) => getRapportBus(e, date)}>
                        <label htmlFor="" className="text-sm font-bold text-gray-900 mr-2">Date</label>
                        <input type="date" name="" onChange={e => { setDate(e.target.value) }} className="inline-block p-2 text-xs text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " id="" />
                        <button type="submit" className=" hover:bg-green-600 inline-block text-xs border p-2 rounded-sm text-white bg-green-500">Génerer</button>
                    </form>
                </div>
            </div>
            <div className="p-4 w-full h-full min-h-full">
                <RapportJourn item={{ simple: fiche, date: date, total: total, bus: bus, chauffeur: chauffeur }} />
            </div>
        </div>
    )
}