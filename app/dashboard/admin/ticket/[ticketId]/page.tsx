"use client"

import { useEffect, useState } from "react";

import { getDateFormat } from "@/functions/actionsClient";
import Link from "next/link";
import ComponentTicketPrint from "@/components/ui/ComponentToPrint";
import { useSession } from "next-auth/react";
interface IPrams {
    ticketId?: string
}

export default function Page({ params }: { params: IPrams }) {
    const [isOpenEditForm, setIsOpenEditForm] = useState<boolean>(false);
    const [data, setData] = useState<any>();
    const [ticket, setTicket] = useState<any>();
    const { data: session, status } = useSession()
    const [numTicket, setNumTicket] = useState<number>(0);

    const replace = (str: string) => {
        return str.replaceAll("-", "")
    }
    const date = new Date()

    useEffect(() => {
        const getLenghtTicket = async () => {
            const res = await fetch("/api/ticket", { cache: "no-store" })
            if (!res.ok) {
                return null
            }
            const data: any[] = await res.json();
            setNumTicket(data.length)
        }
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

        const getRecette = async (id: number) => {
            const response = await fetch(`/api/recette?ticketId=${id}`, {
                method: 'GET',
                body: JSON.stringify(data),
            })
            const res: any[] = await response.json()
            return res[0]
        }

        const getBus = async (id: number) => {
            const response = await fetch(`/api/bus/${id}`, {
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
                    const tabRecette = await getRecette(a.id);
                    const tabBus = await getBus(tabVoyage.busId)
                    setTicket({ passager: tabPassager, voyage: tabVoyage, ticket: a, bus: tabBus, recette: tabRecette })
                }
            } catch (error) {
                console.log(error)

            }
        }
        selectTicker()
    }, [])

    return (
        <div className="w-full p-10">
            <div className=" py-2 flex justify-between items-start">
                <h1 className="lowercase text-sm  text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/admin/ticket"}>Ticket</Link> / <Link className="hover:text-blue-600 font-semibold" href="#">Imprimer</Link></h1>
            </div>
            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="text-xl text-gray-900 uppercase">Ticket de bus </h1>
            </div>
            <div className="mt-4 gap-4 grid items-start grid-cols-4 mx-auto ">
                <section className={`p-4  rounded-sm col-span-full`}>
                    {ticket ?
                        (
                            <>
                                <ComponentTicketPrint item={{
                                    client: `${ticket?.passager?.nom ?? ""} ${ticket?.passager?.prenom ?? ""}`,
                                    tel: ticket?.passager?.telephone ?? "Pas disponible",
                                    depart: getDateFormat(ticket?.voyage?.dateDepart ?? "Pas disponible"),
                                    voyage: `${ticket?.voyage?.numVoyage.trim() == "" ? "VOY" + ticket?.voyage?.id : ticket?.voyage?.numVoyage.trim()}`,
                                    montant: ticket?.ticket?.prixTicket ?? 0,
                                    remboursement: ticket?.tabRecette?.remboursement ?? 0,
                                    caisse: `GUICHET ${session?.user?.name ?? "Pas disponible"}`,
                                    numticket: `${params.ticketId}`,
                                    bus: `${ticket?.bus?.immatriculation}`,
                                    trajet: ticket?.ticket.destination,
                                    siege: ticket?.ticket?.numeroSiege ?? 0
                                }} />
                            </>
                        )
                        : null}
                </section>
            </div>
        </div>
    )
}