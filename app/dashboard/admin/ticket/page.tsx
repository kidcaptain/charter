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

    const handleButtonClickEditForm = (val: boolean) => {
        setIsOpenEditForm(val);
        console.log(val)
    }

    const getItem = (val: any) => {
        setData(val)
    }

    const [isOpenAddForm, setIsOpenAddForm] = useState<boolean>(false);

    const handleButtonClickAddForm = (val: boolean) => {
        setIsOpenAddForm(val);
    }
    const handleOnEmit = (val: boolean) => {
        if (val) {
            alert("Walter white")
        } else {
            alert("Better Call Saul")
        }
    }

    useEffect(() => {

        const selectTicker = async () => {
            const response = await fetch(`/api/ticket`, {
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
                                <tr key={i} className="border-b hover:bg-gray-200  border-gray-200 text-sm bg-gray-50  dark:border-gray-700">
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
                                    <td className="p-2 border" >
                                        <Link href={"/dashboard/admin/ticket/"+item.id} className="hover:text-stone-900 hover:font-medium">Imprimer</Link>
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