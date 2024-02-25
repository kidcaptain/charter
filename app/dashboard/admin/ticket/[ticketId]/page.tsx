"use client"

import { useEffect, useState } from "react";
import EditFormPassager from '@/components/passager/editFormPassager';
import PassagerTable from '@/components/passager/passagerTable';
import AddFormPassager from '@/components/passager/AddFormPassager';
import ReservationTable from "@/components/reservation/reservationTable";
import { getDateFormat } from "@/functions/actionsClient";
import Link from "next/link";

export default function Page({ params }: { params: { ticketId: string } }) {
    const [isOpenEditForm, setIsOpenEditForm] = useState<boolean>(false);
    const [data, setData] = useState<any>();
    const [ticket, setTicket] = useState<any>();

    const date = new Date()

    useEffect(() => {

        const selectTicker = async () => {
            const response = await fetch(`/api/ticket/${params.ticketId}`, {
                method: 'GET',
                body: JSON.stringify(data),
            })
            const a = await response.json()

            if (response.ok) {
                setTicket(a)
            }
        }
        selectTicker()
    }, [])

    return (
        <div className="w-full p-10">
            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="text-xl text-gray-900 uppercase">Ticket de bus</h1>
            </div>
            <div className="mt-4 gap-4 grid items-start grid-cols-4 mx-auto ">
                <section className={`p-4  rounded-sm col-span-full`}>
                    {ticket ?
                        (<div className="font-mono max-w-2xl bg-white p-4 m-auto">
                            <h4 className="p-4 uppercase text-lg font-bold text-center border-b ">Reçu</h4>
                            <div className="p-4">
                                <h1 className="flex justify-between items-center my-2"><span>Nom:</span> <span></span></h1>
                                <h1 className="flex justify-between items-center my-2"><span>Prenom:</span> <span></span></h1>
                                <h1 className="flex justify-between items-center my-2"><span>Adresse:</span> <span></span></h1>
                                <h1 className="flex justify-between items-center my-2"><span>Telephone:</span> <span></span></h1>
                                <h1 className="flex justify-between items-center my-2"><span>Prix du ticket:</span> <span>{ticket.prixTicket}</span></h1>
                                <hr />
                                <h1 className="flex justify-between items-center my-2"><div><span>Date: {date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()}</span> </div><div><span>Heure: {date.getHours()}:{date.getMinutes()}:00</span></div></h1>
                                <h1 className="text-center">Charter Express</h1>
                            </div>
                            <button type="button" className="text-white mt-4 flex py-2 items-center gap-2 justify-center hover:shadow-md transition ease-linear hover:from-blue-700 rounded-sm bg-blue-500 text-sm from-blue-600 bg-gradient-to-t p-2">
                                Imprimer
                            </button>
                        </div>
                        )
                        : null}
                    <div>

                    </div>
                </section>
            </div>
        </div>
    )
}