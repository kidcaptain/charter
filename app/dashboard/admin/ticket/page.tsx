"use client"

import { useEffect, useState } from "react";
import EditFormPassager from '@/components/passager/editFormPassager';
import PassagerTable from '@/components/passager/passagerTable';
import AddFormPassager from '@/components/passager/AddFormPassager';
import ReservationTable from "@/components/reservation/reservationTable";
import { getDateFormat } from "@/functions/actionsClient";
import Link from "next/link";

export default function Page() {
    const [isOpenEditForm, setIsOpenEditForm] = useState<boolean>(false);
    const [data, setData] = useState<any>();
    const [ticket, setTicket] = useState<any[]>([]);
    const [voyage, setVoyage] = useState<any>();

    const handleButtonClickEditForm = (val: boolean) => {
        setIsOpenEditForm(val);
        console.log(val)
    }

    const getItem = (val: any) => {
        setData(val)
    }

    const [isOpenAddForm, setIsOpenAddForm] = useState<boolean>(false);

    const deletePassager = async (id: number, voyageId: number, passagerId: number) => {
        const a: any[] = await getPassager();
        const b: any[] = await getRecettes();
        // const res = await fetch(`/api/voyages/${voyageId}`, { method: "GET", cache: "no-store" })
        // if (!res.ok) {
        //     throw new Error("Failed")
        // }
        let idrecette
        a.map((k: any) => {
            if (k.id == passagerId) {
                if (b.length > 0) {
                    b.map((j) => {
                        if (k.id == j.passagerId && voyageId == j.voyageId) {
                            idrecette = j.id
                        }
                    })
                }
            }
        })
        if (confirm("Confimer l'opération ")) {
            const res = await fetch(`/api/ticket/${id}`, { method: "DELETE", cache: "no-store" })
            if (res.ok) {
                alert("Ticket retiré")
                if (idrecette) {
                    const res2 = await fetch(`/api/recette/${idrecette}`, { method: "DELETE", cache: "no-store" })
                    editVoyage(voyage)
                    postLigneRecette(voyage)
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
    const getRecettes = async () => {
        const res = await fetch("/api/recette", { cache: "no-store" })
        if (!res.ok) {
            throw new Error("Failed")
        }
        const data = await res.json();
        return data;
    };
    const getPassager = async () => {
        const res = await fetch("/api/passagers", { cache: "no-store" })
        if (!res.ok) {
            throw new Error("Failed")
        }
        const data = await res.json();
        return data;
    };

    useEffect(() => {

        const getTickets = async () => {
            const res = await fetch(`/api/ticket`, { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
        };
        const selectTicker = async () => {
            const tickets: any[] = await getTickets();
            setTicket(tickets)
        };

        selectTicker()
    }, [])

    return (
        <div className="w-full p-10">
            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="text-xl text-gray-900 uppercase">Ticket de bus</h1>
            </div>
            <div className="mt-4 gap-4 bg-white grid items-start grid-cols-4 mx-auto ">
                <section className={`p-4  shadow-2xl rounded-md overflow-hidden border col-span-full`}>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-400">
                        <thead className="text-sm border text-gray-700  dark:text-gray-400">
                            <tr>
                                <th rowSpan={1} scope="row" colSpan={1} className="border-b-2 p-2 border border-stone-700 ">
                                    <div className="items-center flex justify-between ">
                                        #Ref
                                    </div>
                                </th>
                                <th rowSpan={1} colSpan={1} scope="row" className="border-b-2 p-2 border border-stone-700 ">
                                    <div className=" items-center flex justify-between">
                                        #Numéro Siege
                                    </div>
                                </th>
                                <th rowSpan={1} colSpan={1} className="border-b-2 p-2 border border-stone-700 ">
                                    <div className=" items-center flex justify-between ">
                                        Prix Ticket
                                    </div>
                                </th>
                                <th rowSpan={1} colSpan={1} className="border-b-2 p-2 border border-stone-700 ">
                                    <div className=" items-center flex justify-between ">
                                        Type de Ticket
                                    </div>
                                </th>
                                <th rowSpan={1} colSpan={1} className="border-b-2 p-2 border border-stone-700 ">
                                    <div className="items-center flex justify-between ">
                                        Statut du Ticket
                                    </div>
                                </th>
                                <th rowSpan={1} colSpan={1} className="border-b-2 p-2 border border-stone-700 ">
                                    <div className="items-center flex justify-between ">
                                        Date
                                    </div>
                                </th>
                                <th className="border-b-2 p-2 border border-stone-700 ">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {ticket.map((item: any, i: number) => (
                                <tr key={i} className="border-b font-semibold border-gray-200 text-sm bg-gray-50  dark:border-gray-700">
                                    <th className="p-2 border ">
                                        {i + 1}
                                    </th>
                                    <th className="p-2 border ">
                                        {item.numeroSiege}
                                    </th>
                                    <td className="p-2 border text-right">
                                        {item.prixTicket} Fcfa
                                    </td>
                                    <td className="p-2 border">
                                        {item.typeTicket}
                                    </td>
                                    <td className="p-2 border ">
                                        {item.statusTicket}
                                    </td>
                                    <td className="p-2 border">
                                        {getDateFormat(item.dateCreation)}
                                    </td>
                                    <td className="p-2 border flex gap-2 items-center" >
                                        <Link href={"/dashboard/admin/ticket/" + item.id} className="hover:text-stone-900 bg-blue-300 p-2 hover:bg-blue-400">Imprimer</Link>
                                        <Link href={"/dashboard/admin/ticket/" + item.id + "/editer"} className="hover:text-stone-900  bg-yellow-300 p-2 hover:bg-yellow-400">Modifier</Link>
                                        <button type="button" onClick={() => deletePassager(item?.id, item.voyageId, item.passagerId)} className="hover:text-stone-900  bg-red-500 p-2 hover:bg-red-600">Supprimer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    )
}