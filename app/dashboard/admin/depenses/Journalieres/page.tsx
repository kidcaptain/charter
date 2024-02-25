"use client"
import FicheDepense from "@/components/ui/ficheDepense";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
    const [agences, setAgences] = useState<any[]>([]);
    const [depenses, setDepenses] = useState<any[]>([]);
    const [depensesBus, setDepensesBus] = useState<any[]>([]);
    const [date, setDate] = useState<string>("");
    const [dateUpdate, setDateUpdate] = useState<string>("");
    useEffect(() => {
        const getAgence = async () => {
            const res = await fetch("/api/agences", { cache: "no-store" })
            if (!res.ok) {
                console.log("error")
            }
            const data = await res.json();
            setAgences(data)
            return data
        };

        const getDepense = async () => {
            const date = new Date();
            const year = date.getFullYear();
            const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
            const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
            const res = await fetch(`/api/depenses?date=${year}-${month}-${day}`, { cache: "no-store" })
            if (!res.ok) {
                console.log("error")
            }
            const data = await res.json();
            const tabDepense: any[] = await data;
            const tab: any[] = [];
            const tabBus: any[] = [];
            tabDepense.map((i) => {
                if (i.typeDepense === "bus") {
                    tabBus.push(i)
                } else {
                    tab.push(i)
                }
            })
            
            setDate(`${year}-${month}-${day}`)
            setDepenses(tab)
            setDepensesBus(tabBus)
        };
        getDepense()
    }, [])

    const onSubmit = async () => {
        const res = await fetch("/api/depenses?date="+dateUpdate, { cache: "no-store" })
        if (!res.ok) {
            console.log("error")
        }
        const data = await res.json();
        const tabDepense: any[] = await data;
        const tab: any[] = [];
        const tabBus: any[] = [];
        console.log(tabDepense)
        tabDepense.map((i) => {
            if (i.typeDepense === "bus") {
                tabBus.push(i)
            } else {
                tab.push(i)
            }
        })
        
        setDate(dateUpdate)
        setDepenses(tab)
        setDepensesBus(tabBus)
    }
    return (
        <div className="p-10 ">
            <div className=" py-2 flex justify-between items-start">
                <h1 className="lowercase text-sm  text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/admin/depenses"}>Dépenses et productions</Link> / <Link className="hover:text-blue-600" href="#">Fiche de dépenses</Link></h1>
            </div>
            <div className="bg-white">
                <h2 className="p-4  uppercase border-b">
                    Fiche de dépenses journalières
                </h2>
              
                <div className="p-4">
                    <div>
                        <input type="date" onChange={e => setDateUpdate(e.target.value)} name="" className="inline-block p-2 text-xs text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " id="" />
                        <button onClick={onSubmit} className=" hover:bg-green-600 inline-block text-xs border p-2 rounded-sm text-white bg-green-500">Génerer</button>
                    </div>
                </div>
            </div>
            <div className="p-4 w-full h-full min-h-full">
                <FicheDepense item={{ depense: depenses, depenseBus: depensesBus, date: date }} />
            </div>
        </div>
    )
}