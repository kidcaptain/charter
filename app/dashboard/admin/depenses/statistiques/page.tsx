"use client";

import { useEffect, useState } from "react";

export default function Page() {
    const [agences, setAgences] = useState<any[]>([]);
    const [depenses, setDepenses] = useState<any[]>([]);
    const [depensesBus, setDepensesBus] = useState<any[]>([]);
    const [date, setDate] = useState<string>("");

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
            const res = await fetch(`/api/depenses`, { cache: "no-store" })
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

    return(
    <div>

    </div>
    )
}