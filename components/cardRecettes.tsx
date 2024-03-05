"use client"

import { useEffect, useState } from "react";


const CardRecettes = () => {
    const [depense, setDepense] = useState<number>(0)
    useEffect(() => {
        const getDepense = async () => {
            const res = await fetch("/api/lignerecette", { method: "GET", cache: "no-store" })
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
        <div className="p-10 border rounded-md bg-blue-800 text-xl from-blue-500 bg-gradient-to-br">
            <h2 className="text-gray-100 font-bold">Total recettes</h2>
            <p className="text-white">{depense} fcfa</p>
        </div>
    )
}

export default CardRecettes