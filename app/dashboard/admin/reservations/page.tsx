"use client"

import { useEffect, useState } from "react";
import EditFormPassager from '@/components/passager/editFormPassager';
import PassagerTable from '@/components/passager/passagerTable';
import AddFormPassager from '@/components/passager/AddFormPassager';
import ReservationTable from "@/components/reservation/reservationTable";
import { getDateFormat } from "@/functions/actionsClient";

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

    useEffect(() => {

        const selectTicker = async () => {
            const response = await fetch(`/api/reservations`, {
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
        <div className="w-full p-10 shadow-2xl">
            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="text-xl text-gray-900 uppercase">Reservations</h1>
            </div>
            <div className="mt-4 gap-4 grid items-start grid-cols-4 mx-auto ">
                <section className={`  shadow-xl rounded-sm col-span-full`}>
                    <ReservationTable />
                </section>
            </div>
        </div>
    )
}