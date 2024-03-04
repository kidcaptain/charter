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
    useEffect(() => {
        const getLigneRecette = async () => {
            const res = await fetch("/api/lignerecette", { cache: "no-store" })
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

        const selecteFicheRecette = async () => {
            const tabLigne: any[] = await getLigneRecette();
            const tabBus: any[] = await getBus();
            const tabVoyage: any[] = await getVoyage();
            const tabEmploye: any[] = await getEmploye();
            const tab: any[] = [];
            const tabretour: any[] = [];
            const date = new Date();
            const year = date.getFullYear();
            const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
            const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
            let total = 0;
            tabLigne.map((e) => {
                tabVoyage.map((j) => {
                    tabBus.map((i) => {
                        tabEmploye.map((k) => {
                            if (e.busId == j.id && e.voyageId == i.id) {
                                
                                if (j.typeVoyage == "aller-retour") {
                                    let chauffeur = "aucun"
                                    if (k.id == i.employeId) {
                                        chauffeur = `${k.nom} ${k.prenom} `
                                    }
                                    tabretour.push({ ligne: e, voyage: j, bus: i, chauffeur: chauffeur })
                                } else {
                                    let chauffeur = "aucun"
                                    if (k.id == i.employeId) {
                                        chauffeur = `${k.nom} ${k.prenom} `
                                    }
                                    tab.push({ ligne: e, voyage: j, bus: i, chauffeur: chauffeur })
                                }
                                total = total + parseInt(e.montant);

                            }
                        })
                    })
                })
            })
            setDate(`${year}-${month}-${day}`)
            setFiche(tab);
            setFicheRetour(tabretour)
            setTotal(total)
        }
        selecteFicheRecette();
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
    //         } else 
    //             tab.push(i)
    //         }
    //     })

    //     setDate(dateUpdate)
    //     setDepenses(tab)
    //     setDepensesBus(tabBus)
    // }
    return (
        <div className="p-10 ">

            <div className="bg-white">
                <h2 className="p-4  uppercase border-b">
                    Fiche des recettes
                </h2>
                <div className="p-4">
                    {/* <div>
                        <input type="date" onChange={e => setDateUpdate(e.target.value)} name="" className="inline-block p-2 text-xs text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " id="" />
                        <button onClick={onSubmit} className=" hover:bg-green-600 inline-block text-xs border p-2 rounded-sm text-white bg-green-500">Génerer</button>
                    </div> */}
                </div>
            </div>

            <div className="p-4 w-full h-full min-h-full">
                <FicheRecette item={{retour:ficheRetour, simple: fiche, date: date, total: total }} />
            </div>
        </div>
    )
}