"use client"

import { useEffect, useState } from "react";

import { getDateFormat } from "@/functions/actionsClient";
import Link from "next/link";
import ComponentTicketPrint from "@/components/ui/ComponentToPrint";

export default function Page({ params }: { params: { ticketId: string } }) {
    const [isOpenEditForm, setIsOpenEditForm] = useState<boolean>(false);
    const [data, setData] = useState<any>();
    const [ticket, setTicket] = useState<any>();

    const date = new Date()

    useEffect(() => {

        const getVoyage = async (id: number) => {
            const response = await fetch(`/api/voyages/${id}`, {
                method: 'GET',
                body: JSON.stringify(data),
            })
            const res = await response.json()
            return res
        }

        const getPassager = async (id: number) => {
            const response = await fetch(`/api/passagers/${id}`, {
                method: 'GET',
                body: JSON.stringify(data),
            })
            const res = await response.json()
            return res
        }

        const getTrajet = async (id: number) => {
            const response = await fetch(`/api/trajets/${id}`, {
                method: 'GET',
                body: JSON.stringify(data),
            })
            const res = await response.json()
            return res
        }

        const selectTicker = async () => {
           try {
            const response = await fetch(`/api/ticket/${params.ticketId}`, {
                method: 'GET',
                body: JSON.stringify(data),
            })
            const a = await response.json()

            if (response.ok) {
                const tabVoyage = await getVoyage(a.voyageId);
                const tabPassager = await getPassager(a.passagerId);
                const tabTrajet = await getTrajet(tabVoyage.trajetId)
                console.log(tabVoyage)
                console.log(tabPassager)
                console.log(tabTrajet)

                setTicket({passager: tabPassager, voyage: tabVoyage, ticket: a, trajet: tabTrajet})
                console.log(ticket)
            }else{
                console.log(a)
            }
           } catch (error) {
            console.log(error)
            
           }
        }
        selectTicker()
    }, [])

    return (
        <div className="w-full p-10">
            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="text-xl text-gray-900 uppercase">Ticket de bus </h1>
            </div>
            <div className="mt-4 gap-4 grid items-start grid-cols-4 mx-auto ">
                <section className={`p-4  rounded-sm col-span-full`}>
                    {ticket ?
                        (
                            <ComponentTicketPrint item={{
                                client: `${ticket?.passager?.nom} ${ticket?.passager?.prenom}`,
                                tel: ticket?.passager?.telephone,
                                depart: getDateFormat(ticket?.voyage?.dateDepart),
                                voyage: `C${ticket?.voyage?.id}`,
                                montant: ticket?.voyage?.prixVoyage,
                                remboursement: 0,
                                caisse: `GUICHET ${ticket?.user?.name}`,
                                numticket: `${getDateFormat(ticket?.voyage?.dateDepart)}`,
                                type: ticket?.voyage?.typeVoyage,
                                trajet: `${ticket?.trajet?.lieuDepart} / ${ticket?.trajet.lieuArrivee}`,
                                siege: ticket?.voyage?.placeDisponible
                            }} />
                        )
                        : null}
                    <div>

                    </div>
                </section>
            </div>
        </div>
    )
}