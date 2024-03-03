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

    const getLigneRecette = async (date: string) => {
        const res = await fetch("/api/lignerecette?date="+date, { cache: "no-store" })
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

    const selecteFicheRecette = async (e:any) => {
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

    useEffect(() => {
        const getLigneRecette = async () => {
            const dates = new Date();
            const year = dates.getFullYear();
            const month = (dates.getMonth() + 1) < 10 ? `0${dates.getMonth() + 1}` : `${dates.getMonth() + 1}`;
            const day = (dates.getDate()) < 10 ? `0${dates.getDate()}` : `${dates.getDate()}`;
            const res = await fetch("/api/lignerecette?date=" + `${year}-${month}-${day}T00:00:00.000Z`, { cache: "no-store" })
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
    //         } else {
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
                    <div className="p-4">
                        <form onSubmit={selecteFicheRecette}>
                            <label htmlFor="" className="text-sm font-bold text-gray-900 mr-2">Généré le rapport de production de la semaine du </label>
                            <input required type="date" name="" onChange={e => { setDate(e.target.value) }} className="inline-block p-2 text-xs text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " id="" />
                            <button type="submit" className=" hover:bg-green-600 inline-block text-xs border p-2 rounded-sm text-white bg-green-500">Génerer</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="p-4 w-full h-full min-h-full">
                <FicheRecette item={{ retour: ficheRetour, simple: fiche, date: date, total: total }} />
            </div>
        </div>
    )
}