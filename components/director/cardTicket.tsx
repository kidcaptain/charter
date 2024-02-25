"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import svg from '@/public/images/ticket.svg'
const CardTicket = () => {

    const [employees, setEmployees] = useState<any[]>([]);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {

        const agence = localStorage.getItem("agence");


        const getVoyage = async (id: number) => {
            const res = await fetch("/api/voyages?agenceId=" + id, { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
        }

        const getData = async () => {
            const res = await fetch("/api/ticket", { cache: "no-store" })
            if (!res.ok) {
                return []
            }
            if (agence) {
                const s = JSON.parse(agence)
                const data: any[] = await res.json();
                const tab: any[] = await getVoyage(s.agenceId);

                let compteur: number = 0;
                data.map((i) => {
                    tab.map((j) => {
                        if (j.id === i.voyageId) {
                            compteur++;
                        }
                    })
                })
                setTotal(compteur)
            }
        };
        getData()

    }, [employees])
    return (
        <div className="bg-blue-500 border-2 border-blue-300 ring-2 ring-violet-400 bg-gradient-to-bl from-indigo-400 p-6 rounded-3xl overflow-hidden">
            <div className='bg-white w-14 h-14 items-center justify-center flex rounded-2xl shadow-2xl'>
                <Image src={svg} width={45} height={45} alt='User Image' />
            </div>
            <h1 className=" pt-4 text-white text-sm font-bold uppercase">Tickets vendus ({total})</h1>
            <ul className="relative overflow-x-auto bg-white">

            </ul>
        </div >
    )
}

export default CardTicket