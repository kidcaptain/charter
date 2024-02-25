"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import svg from '@/public/images/bus-logo.svg'
const CardVoyage = () => {

    const [total, setTotal] = useState<number>(0);

    useEffect(() => {

        const agence = localStorage.getItem("agence")

        const getData = async () => {

            if (agence) {
                const s = JSON.parse(agence)
                const res = await fetch("/api/voyages?agenceId=" + s.agenceID, { cache: "no-store" })
                if (!res.ok) {
                    throw new Error("Failed")
                }
                const data: any[] = await res.json();
                setTotal(data.length)
            }
        };

        getData()
    }, [])
    return (
        <div className="bg-blue-500 border-2 border-purple-300 ring-2 ring-purple-400 bg-gradient-to-bl from-purple-400 p-6 rounded-3xl overflow-hidden">
            <div className='bg-white w-14 h-14 items-center justify-center flex rounded-2xl shadow-2xl'>
                <Image src={svg} width={45} height={45} alt='User Image' />
            </div>
            <h1 className=" pt-5 text-sm text-white font-bold uppercase">Voyage effectué aujourd'hui ({total})</h1>
        </div >
    )
}

export default CardVoyage