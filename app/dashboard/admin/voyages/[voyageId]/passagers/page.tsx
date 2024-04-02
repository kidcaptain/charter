"use client"

import { useState, useEffect } from "react";
import EditFormPassager from '@/components/passager/editFormPassager';
import PassagerTable from '@/components/passager/passagerTable';
import AddFormPassager from '@/components/passager/AddFormPassager';
import Popup from "@/components/ui/popup";
import svg from "@/public/images/valide.svg"
import Image from "next/image";
import { getDateFormat } from "@/functions/actionsClient";
import ProgressBar from "@/components/ui/progressbar";
import Link from "next/link";

interface IPrams {
    voyageId?: string
}
export default function Page({ params }: { params: IPrams }) {
    const [isOpenEditForm, setIsOpenEditForm] = useState<boolean>(false);
    const [voyage, setVoyage] = useState<any>();
    const [passagers, setPassagers] = useState<any[]>([])
    const [agence, setAgence] = useState<any[]>([])
    const [trajet, setTrajet] = useState<any[]>([])
    const deletePassager = async (id: number, idTicket: number, idrecette: number) => {
        if (confirm("Confimer l'opération ")) {
            const res = await fetch(`/api/ticket/${idTicket}`, { method: "DELETE", cache: "no-store" })
            if (res.ok) {
                alert("Ticket retiré")
                if (idrecette) {
                    const res2 = await fetch(`/api/recette/${idrecette}`, { method: "DELETE", cache: "no-store" })
                    if (res2.ok) {
                        editVoyage(voyage)
                        postLigneRecette(voyage)
                    }
                }
            }
        }
    }
    const postLigneRecette = async (voyage: any) => {
        const date = new Date()
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        const data = {
            busId: voyage.busId,
            voyageId: voyage.id,
            montant: voyage.prixVoyage,
            signature: "",
            date: `${year}-${month}-${day}T00:00:00.000Z`,
            agenceId: voyage.agenceId
        }

        try {
            const res = await fetch(`/api/lignerecette?date=${data.date}&busId=${data.busId}&voyageId=${data.voyageId}`, {
                method: 'GET', cache: 'no-store'
            })
            const tab: any[] = await res.json();
            if (tab.length > 0) {
                const updateData = {
                    busId: tab[0].busId,
                    voyageId: tab[0].voyageId,
                    montant: parseInt(tab[0].montant) - parseInt(voyage.prixVoyage),
                    signature: tab[0].signature,
                    date: tab[0].date,
                    agenceId: tab[0].agenceId,
                }
                // console.log(updateData)
                const resupdate = await fetch(`/api/lignerecette/${tab[0].id}`, {
                    method: 'PUT', cache: 'no-store', body: JSON.stringify(updateData)
                })
            } else {
                const respost = await fetch(`/api/lignerecette`, {
                    method: 'POST', cache: 'no-store', body: JSON.stringify(data)
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    const editVoyage = async (item: any) => {
        if (parseInt(item.placeDisponible) > parseInt(item.placesOccupees)) {
            // alert(1)
            const voyageData = {
                dateDepart: getDateFormat(item.dateDepart),
                heureArrivee: item.heureArrivee,
                placeDisponible: item.placeDisponible,
                prixVoyage: item.prixVoyage,
                busId: item.busId,
                trajetId: item.trajetId,
                agenceId: item.agenceId,
                ready: item.ready,
                chauffeurId: item.chauffeurId,
                heureDepart: item.heureDepart,
                numVoyage: item.numVoyage,
                placesOccupees: parseInt(item.placesOccupees) - 1,
            }
            console.log(voyageData)
            try {
                const res = await fetch(`/api/voyages/${item.id}`, {
                    method: 'PUT', cache: 'no-store', body: JSON.stringify(voyageData)
                })
            } catch (error) {
                console.log(error)
            }
        } else {
            alert("Les tickets pour ce voyage sont indisponibles!")
        }
    }
    useEffect(() => {
        const getPassager = async () => {
            const res = await fetch("/api/passagers", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data;
        };
        const getRecettes = async () => {
            const res = await fetch("/api/recette", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data;
        };
        const getTickets = async (id: number) => {
            const res = await fetch(`/api/ticket?voyageId=${id}`, { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
        };
        const getTrajet = async (id: number) => {
            const res = await fetch("/api/trajets/" + id, { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setTrajet(data)
        };
        const getData = async () => {
            const res = await fetch(`/api/voyages/${params.voyageId}`, { method: "GET", cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const val = await res.json();
            setVoyage(val);
            getTrajet(val.trajetId);
            const tab: any[] = []
            const tickets: any[] = await getTickets(val.id);
            const a: any[] = await getPassager();
            const b: any[] = await getRecettes();
            tickets.map((i: any) => {
                a.map((k) => {
                    if (k.id == i.passagerId) {
                        if (b.length > 0) {
                            b.map((j) => {
                                if (k.id == j.passagerId && params.voyageId == j.voyageId) {
                                    tab.push({ passager: k, ticket: i, recette: j })
                                }
                            })
                        } else {
                            tab.push({ passager: k, ticket: i })
                        }
                    }
                })
            })
            setPassagers(tab)
        };
        const getAgence = async () => {
            const res = await fetch("/api/agences", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setAgence(data)
        };
        getData();
        getAgence();
    }, [passagers])

    return (
        <div className="w-full p-10">
             <div className=" py-4 flex lowercase text-sm justify-between items-start mb-2">
                <h1 className=" text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/admin/voyages"}>Voyages</Link> / <Link className="hover:text-blue-600 font-semibold" href="#">Liste des passagers</Link></h1>
            </div>
            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="text-xl text-gray-900">Les Passagers du voyage N° {voyage?.numVoyage}</h1>
            </div>
            <div className="mt-4 gap-4 grid items-start  grid-cols-4 mx-auto ">
                <section className={`  shadow-2xl overflow-hidden border rounded-md ${(isOpenEditForm) ? " col-span-3 " : "col-span-full"} `}>
                    <div className="bg-white shadow-xl rounded-sm">
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-left text-sm rtl:text-right text-gray-900 " >
                                <thead className=" text-gray-900  ">
                                    <tr>
                                        <th scope="col" className="p-4 py-3 border-b-2">
                                            Nom et Prenom
                                        </th>
                                        <th scope="col" className="p-4 py-3 border-b-2">
                                            Téléphone
                                        </th>
                                        <th scope="col" className="p-4 py-3 border-b-2">
                                            CNI
                                        </th>
                                        <th scope="col" className="p-4 py-3 border-b-2 ">
                                            Destination
                                        </th>
                                        <th scope="col" className="p-4 py-3 border-b-2">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {passagers.map((item: any, index: number) => (
                                        <tr key={index} className="border-b font-semibold uppercase border-gray-200 bg-stone-100 ">
                                            <td className=" p-4 py-2 border">
                                                {item.passager?.nom} {item.passager?.prenom}
                                            </td>
                                            <td className=" p-4 py-2 border">
                                                {item.passager?.telephone}
                                            </td>
                                            <td className=" p-4 py-2 border">
                                                {item.passager?.numCNI}
                                            </td>
                                            <td className=" p-4 py-2 border">
                                                {item.ticket?.destination}
                                            </td>
                                            <td className=" p-4 py-2 border font-normal flex gap-2">
                                                <button onClick={() => deletePassager(item.passager?.id, item.ticket?.id, item.recette?.id)} className="text-white text-sm w-1/2 hover:bg-red-700 rounded-sm bg-red-500 p-2">Retirer du voyage et suppprimer son ticket</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div >
                </section>
                {/* {isOpenEditForm ? (
                    <section className='bg-white shadow-2xl col-span-1'>
                        <EditFormPassager onEmit={setIsOpenEditForm} item={data} />
                    </section>
                ) : null} */}
            </div>
            {/* <ProgressBar time={400} text="Suppresion de ticket" onShow={() => {}} /> */}
        </div>
    )
}