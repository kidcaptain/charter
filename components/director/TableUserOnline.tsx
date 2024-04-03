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

        const getData = async (id: number) => {
            const res = await fetch("/api/employes?agenceId=" + id, { cache: "no-store" })
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
                            if ((r.employeId == i.id) && (i.posteId == j.id) && r.isConnected === "yes") {
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
        <div className="w-full font-semibold text-left overflow-y-auto h-96 p-4 rtl:text-right text-gray-50">
            {utilisateurs.map((item: any, index: number) => {
                return (
                    <div key={index} className={` bg-white my-2 text-gray-800 font-semibold text-sm rounded-2xl border border-green-400  grid grid-cols-2 shadow-xl  ${item.blocke == "divue" ? " bg-red-100" : null}`}>
                        <div className="p-2">
                            <span className="text-green-700 first-letter:uppercase">  {item.employe.nom} {item.employe.prenom}</span>
                            {
                                item.isConnected === "yes" ? null : (<p className="p-2 text-yellow-400">
                                    Dernière connexion
                                    <span> {getDateFormat(item.dateDerniereConnexion)}</span>
                                </p>)
                            }
                        </div>
                        <div className="p-2 bg-stone-800 rounded-2xl text-white uppercase text-center">
                            {item.poste}
                        </div>
                    </div>
                );
            })}
        </div>
    )
}