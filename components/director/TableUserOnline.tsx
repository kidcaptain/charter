"use client"
import { getDateFormat } from "@/functions/actionsClient";
import { useState, useEffect } from "react";


export default function TableUserOnline() {

    const [utilisateurs, setUtilisateurs] = useState<any[]>([]);
    useEffect(() => {

        const getPoste = async () => {
            const res = await fetch("/api/postes", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
        };

        const getUtilisateur = async () => {
            const res = await fetch("/api/utilisateurs", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();

            return data
        };

        const getData = async (id:number) => {
            const res = await fetch("/api/employes?agenceId="+id, { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
        };
        const agence = localStorage.getItem("agence");
        const selectUtilisateur = async () => {
            if (agence) {
                const s = JSON.parse(agence)
                const tabEmploye: any[] = await getData(s.agenceId);
                const tab: any[] = [];
                const tabPoste: any[] = await getPoste();
                const tabUser: any[] = await getUtilisateur();
                tabUser.map((r) => {
                    tabEmploye.map((i) => {
                        tabPoste.map((j) => {
                            if ((r.employeId == i.id) && (i.posteId == j.id)) {
                                tab.push({ ...r, ...{ poste: j.titre }, employe: i })
                            }
                        })

                    })
                })
                tab.length = 5
                setUtilisateurs(tab)
            }
        }

        selectUtilisateur()

    }, [])

    return (
        <div className="w-full font-semibold text-left p-4 rtl:text-right text-gray-50">

                {utilisateurs.map((item: any, index: number) => {
                    return (
                        <div key={index} className={` text-gray-800 text-sm rounded-2xl border grid grid-cols-3 shadow-xl py-3 ${item.blocke == "divue" ? " bg-red-100" : null}`}>
                            <div className="p-2">
                                {item.nomUtilisateur} {item.employe.prenom}
                            </div>
                            {
                                item.isConnected === "yes" ? null : (  <p className="p-2 text-yellow-400">
                                    Dernière connexion
                                <span> {getDateFormat(item.dateDerniereConnexion)}</span>
                            </p>)
                            }

                            <div className="p-2">
                                {item.poste}
                            </div>
                           
                        </div>
                    );
                })}

        </div>
    )
}