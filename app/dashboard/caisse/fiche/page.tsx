"use client"

import FicheDepense from "@/components/ui/ficheDepense";
import FicheRecette from "@/components/ui/ficheRecette";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
    const [fiche, setFiche] = useState<any[]>([]);
    const [ficheRetour, setFicheRetour] = useState<any[]>([]);

    const [date, setDate] = useState<string>("");
    const [total, setTotal] = useState<number>(0)
    const [totalDepense, setTotalDepense] = useState<number>(0)



    const getLigneRecette = async (date: string) => {
        const res = await fetch("/api/lignerecette?date=" + date, { cache: "no-store" })
        if (!res.ok) {
            console.log("error")
        }
        const data = await res.json();
        return data
    };
    const getBus = async () => {
        const res = await fetch("/api/bus", { cache: "no-store" })
        if (!res.ok) {
            console.log("error")
        }
        const data = await res.json();
        return data
    };
    const getVoyage = async (id: number) => {
        const res = await fetch("/api/voyages?agenceId=" + id, { cache: "no-store" })
        if (!res.ok) {
            console.log("error")
        }
        const data = await res.json();
        return data
    };

    const getEmploye = async (id: number) => {
        const res = await fetch("/api/employes?agenceId=" + id, { cache: "no-store" })
        if (!res.ok) {
            console.log("error")
        }
        const data = await res.json();
        return data
    };
    const getDepenses = async (dates: string) => {
        const res = await fetch("/api/depenses?date=" + dates, { cache: "no-store" })
        if (!res.ok) {
            console.log("error")
        }
        const data = await res.json();
        return data
    };
    const selecteFicheRecette = async (e: any) => {
        const agence = localStorage.getItem("agence")
        setFicheRetour([])
        setFiche([])
        e.preventDefault();
        if (agence) {
            const t = JSON.parse(agence)
            const tabBus: any[] = await getBus();
            const tabVoyage: any[] = await getVoyage(t.agenceId);
            const tabEmploye: any[] = await getEmploye(t.agenceId);
            const tab: any[] = [];
            const tabretour: any[] = [];
            const dates = new Date(date);
            const year = dates.getFullYear();
            const month = (dates.getMonth() + 1) < 10 ? `0${dates.getMonth() + 1}` : `${dates.getMonth() + 1}`;
            const day = (dates.getDate()) < 10 ? `0${dates.getDate()}` : `${dates.getDate()}`;
            const tabLigne: any[] = await getLigneRecette(`${year}-${month}-${day}T00:00:00.000Z`);
            const tabDepense: any[] = await getDepenses(`${year}-${month}-${day}`);
            let totalDepense = 0;
            let total = 0;
            tabLigne.map((e) => {
                if (parseInt(e.agenceId) == parseInt(t.agenceId)) {
                    let voyage: any = null;
                    let bus: any = null;
                    let chauffeur: string = "aucun";
                    tabVoyage.map((j) => {
                        if (e.voyageId == j.id) {
                            voyage = e;
                        }
                    })
                    tabBus.map((i) => {
                        if (i.id == e.busId) {
                            bus = i;
                            tabEmploye.map((k) => {
                                if (k.id == i.employeId) {
                                    chauffeur = `${k.nom} ${k.prenom} `
                                }
                            })
                        }
                    })
                    total = total + parseInt(e.montant);
                    tab.push({ ligne: e, voyage: voyage, bus: bus, chauffeur: chauffeur })
                }

            })
            tabDepense.map((e: any) => {
                if (parseInt(e.agenceId) == parseInt(t.agenceId)) {
                    totalDepense += parseInt(e.montant)
                }
            })
            setDate(`${year}-${month}-${day}`)
            setFiche(tab);
            setTotal(total)
            setTotalDepense(totalDepense)

        }
    }


    return (
        <div className="p-10 ">
            <div className="bg-white shadow-2xl border rounded-md">
                <h2 className="p-4  uppercase border-b">
                    Fiche des recettes
                </h2>
                <div className="p-4">
                    <div className="p-4">
                        <form onSubmit={selecteFicheRecette}>
                            <label htmlFor="" className="text-sm font-bold text-gray-900 mr-2">Générer la fiche de recette du </label>
                            <input required type="date" name="" onChange={e => { setDate(e.target.value) }} className="inline-block p-2 text-xs text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " id="" />
                            <button type="submit" className=" hover:bg-green-600 inline-block text-xs border p-2 rounded-sm text-white bg-green-500">Génerer</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="p-4 w-full h-full min-h-full">
                <FicheRecette item={{ totalDepense: totalDepense, simple: fiche, date: date, total: total }} />
            </div>
        </div>
    )
}