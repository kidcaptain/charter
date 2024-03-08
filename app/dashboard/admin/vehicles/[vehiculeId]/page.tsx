"use client"
import FicheTechnique from "@/components/ui/ficheTechnique"
import Link from "next/link"
import { FormEvent, useState, useEffect } from "react"

interface Vehicules {
    marque: string,
    modele: string,
    typeBus: string,
    capacite: number,
    panneVehicule: string,
    employeId: number
}
interface IPrams {
    vehiculeId?: string
}
export default function Page({ params }: { params: IPrams }) {
    const [bus, setBus] = useState<Vehicules>(
        {
            marque: "",
            modele: "",
            typeBus: "",
            capacite: 0,
            panneVehicule: "",
            employeId: 0
        }
    )
    const [chauffeur, setChauffeur] = useState<any>(null)
    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`/api/bus/${params.vehiculeId}`, { method: "GET", cache: "no-store" })

            if (!res.ok) {
                throw new Error("Failed")
            }
            const val = await res.json();
            setBus(val);
            return val
        };
        const getChauffeur = async () => {
            const val = await getData()
            const res = await fetch(`/api/employes/${val.employeId}`, { cache: "no-store" })
            if (!res.ok) {
                console.log("error")
            }
            const data = await res.json();
            setChauffeur(data)
        };
        getChauffeur();
    }, [])

    return (
        <div className="p-10 w-full">
            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="lowercase text-sm  text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/admin/vehicles"}>Vehicules</Link> / <Link className="hover:text-blue-600" href="#">Fiche technique </Link></h1>
            </div>
            <div className="">
                <h2 className="p-4 rounded-md font-bold text-xl bg-white uppercase border-b shadow-2xl border">Fiche technique</h2>

                <div className="mt-4">
                    <FicheTechnique item={{
                        marque: bus.marque,
                        modele: bus.modele,
                        typeBus: bus.typeBus,
                        capacite: bus.capacite,
                        panneVehicule: bus.panneVehicule
                    }} />
                </div>
            </div>
        </div>
    )

}