"use client"

import { useEffect, useState } from "react";


const CardDepense = () => {
    const [depense, setDepense] = useState<number>(0)
    useEffect(() => {
        const getDepense = async () => {
            const res = await fetch("/api/depenses", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data: any[] = await res.json();
            let total = 0;
            data.map((i) => {
                total=+i.montant
            })
            setDepense(total)
        };
        getDepense()
    }, [])
    
    return(
        <div className="p-10 border rounded-md bg-blue-400 text-xl">
            <h2 className="text-gray-100 font-bold">Total dépenses</h2>
            <p className="text-white">{depense} fcfa</p>
        </div>
    )
}

export default CardDepense