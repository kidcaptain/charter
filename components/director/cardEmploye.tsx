"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import svg from '@/public/images/user.svg'
const CardEmploye = () => {

    const [employees, setEmployees] = useState<any[]>([]);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {

        const agence = localStorage.getItem("agence")

        const getPoste = async () => {
            
            const res = await fetch("/api/postes", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
            
        };

        const getData = async () => {
            if (agence) {
                const s = JSON.parse(agence)
                const res = await fetch("/api/employes?agenceId=" + s.agenceId, { cache: "no-store" })
                if (!res.ok) {
                    return []
                }
                const data = await res.json();
                return data
            }
         
        };


        const selectEmploye = async () => {
            const tabEmploye: any[] = await getData();
            const tab: any[] = [];
            const tabPoste: any[] = await getPoste();
            tabEmploye.map((r) => {
                tabPoste.map((i) => {
                    if (r.posteId === i.id) {
                        tab.push({ poste: i, employe: r })
                    }
                })
            })
            setEmployees(tab);
            setTotal(tab.length)
        }
        selectEmploye()

    }, [employees])
    return (
        <div className="bg-blue-500 border-2 border-blue-300 ring-2 ring-blue-400 bg-gradient-to-bl from-blue-400 p-6 rounded-3xl overflow-hidden">
            <div className='bg-white w-14 h-14 items-center justify-center flex rounded-2xl shadow-2xl'>
                <Image src={svg} width={45} height={45} alt='User Image' />
            </div>
            <h1 className=" pt-4 text-sm text-white font-bold uppercase">Employes ({total})</h1>
            <ul className="relative overflow-x-auto bg-white">
                {/* {employees.map((item: any, index: number) => (
                    <li key={item.id} className="border-b flex p-2 gap-4 border-gray-200  dark:border-gray-700">
                        <div className='bg-blue-300 w-7 h-7 items-center flex justify-center font-bold text-white p-1 rounded-full'>{index + 1}</div>
                        <div>
                            - {item.employe.nom} {item.employe.prenom} ({item.poste.titre})
                        </div>
                    </li>
                ))} */}
            </ul>
        </div >
    )
}

export default CardEmploye