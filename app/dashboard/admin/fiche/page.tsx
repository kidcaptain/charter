"use client"

import FicheDepense from "@/components/ui/ficheDepense";
import FicheRecette from "@/components/ui/ficheRecette";
import HelpPopup from "@/components/ui/helpPopup";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
    const [fiche, setFiche] = useState<any[]>([]);
    const [ficheRetour, setFicheRetour] = useState<any[]>([]);

    const [date, setDate] = useState<string>("");
    const [caissiere, setCaissiere] = useState<string>("");
    const [caissieres, setCaissieres] = useState<any[]>([]);
    const [total, setTotal] = useState<number>(0)
    const [totalDepense, setTotalDepense] = useState<number>(0)
    useEffect(() => {
        const getPoste = async () => {
            const res = await fetch("/api/postes?titre=caissier", { cache: "no-store" })
            if (!res.ok) {
                console.log("error")
            }
            const data = await res.json();
            return data
        };
        const getEmploye = async () => {
            const res = await fetch("/api/employes", { cache: "no-store" })
            if (!res.ok) {
                console.log("error")
            }
            const data = await res.json();
            return data
        };
        const getData = async () => {
            const post = await getPoste()
            const tabEmploye: any[] = await getEmploye();
            let tab2: any[] = []
            tabEmploye.map((k) => {
                if (k.posteId == post[0].id) {
                    tab2.push(k)
                }
            })
            setCaissieres(tab2);
        }
        getData()
    }, [])
    const getLigneRecette = async (dates: string) => {
        const res = await fetch("/api/lignerecette?date=" + dates, { cache: "no-store" })
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
    const getVoyage = async () => {
        const res = await fetch("/api/voyages", { cache: "no-store" })
        if (!res.ok) {
            console.log("error")
        }
        const data = await res.json();
        return data
    };


    const getEmploye = async () => {
        const res = await fetch("/api/employes", { cache: "no-store" })
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
        setFicheRetour([])
        setFiche([])
        e.preventDefault();
        const tabBus: any[] = await getBus();
        const tabVoyage: any[] = await getVoyage();
        const tabEmploye: any[] = await getEmploye();
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
        let tab2: any[] = []
        tabLigne.map((e) => {
            let voyage: any = null;
            let bus: any = null;
            let chauffeur: string = "aucun";
            tabVoyage.map((j) => {
                if (e.voyageId == j.id) {
                    voyage = e;
                    tabEmploye.map((k) => {
                        if (k.id == j.chauffeurId) {
                            chauffeur = `${k.nom} ${k.prenom} `
                        }
                    })
                }
            })
            tabBus.map((i) => {
                if (i.id == e.busId) {
                    bus = i;
                }
            })
            total = total + parseInt(e.montant);
            tab.push({ ligne: e, voyage: voyage, bus: bus, chauffeur: chauffeur })
        })

        tabDepense.map((e: any) => {
            totalDepense += parseInt(e.montant)
        })
        setDate(`${year}-${month}-${day}`)
        setFiche(tab);
        setTotal(total)
        setTotalDepense(totalDepense)

    }


    return (
        <div className="p-10 ">

            <div className="bg-white shadow-2xl border rounded-md">
                <h2 className="p-4  uppercase border-b">
                    Fiche des recettes <HelpPopup message="Veuillez si necessaire remplir les zones de texte au niveau des avances!" />
                </h2>
                <div className="p-4">
                    <div className="p-4">
                        <form onSubmit={selecteFicheRecette}>
                            <label htmlFor="" className="text-sm font-bold text-gray-900 mr-2">Générer la fiche de recette du </label>
                            <input required type="date" name="" onChange={e => { setDate(e.target.value) }} className="inline-block p-2 text-xs text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " id="" />
                            <button type="submit" className=" hover:bg-green-600 inline-block text-xs border p-2 rounded-sm text-white bg-green-500">Génerer</button>
                        </form>
                        <div>
                            <label className=" mb-1  text-sm font-bold text-gray-800">Caissièr(e)s:</label>
                            <select id="agenceId" name="agenceId" onChange={e => setCaissiere(e.target.value)} className=" min-w-82 p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 ">
                                <option></option>
                                {
                                    caissieres.map((i: any, index: number) => (
                                        <option key={index} value={`${i.nom} ${i.prenom}`}>{i.nom} {i.prenom}</option>
                                    ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 w-full h-full min-h-full">
                <FicheRecette item={{ totalDepense: totalDepense, caissiere: caissiere, simple: fiche, date: date, total: total }} />
            </div>
        </div>
    )
}