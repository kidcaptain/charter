"use client"

import { useEffect, useState } from "react";


const CardRecettes = () => {
    const [depense, setDepense] = useState<number>(0)
    useEffect(() => {
        const getDepense = async () => {
            const res = await fetch("/api/recette", { cache: "no-store" })
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
        <div className="p-5 border rounded-md bg-blue-800 from-blue-500 bg-gradient-to-br">
            <h2 className="text-gray-100 font-bold">Total recettes</h2>
            <p className="text-white">{depense}</p>
        </div>
    )
}

export default CardRecettes