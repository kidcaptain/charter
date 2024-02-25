"use client"
import FicheTechnique from "@/components/ui/ficheTechnique"
import Link from "next/link"
import { FormEvent, useState, useEffect } from "react"

interface Vehicules {
    marque: string,
    modele: string,
    typeBus: string,
    anneeFabrication: string,
    capacite: number,
    placesDisponible: number,
    placesTotal: number,
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
            anneeFabrication: "",
            capacite: 0,
            placesDisponible: 0,
            placesTotal: 0,
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
                <h2 className="p-4  bg-white uppercase border-b">Fiche technique</h2>
                <div className="border-b bg-white p-2">
                   <Link className="bg-green-400 hover:bg-green-600 text-sm p-2 text-white" href={`/dashboard/admin/vehicles/${params.vehiculeId}/suivie`}>Fiche de suivie </Link>
                </div>

               <FicheTechnique item={{
                marque: bus.marque,
                modele: bus.modele,
                typeBus: bus.typeBus,
                anneeFabrication: bus.anneeFabrication,
                capacite: bus.capacite,
                placesDisponible: bus.placesDisponible,
                placesTotal: bus.placesTotal,
                panneVehicule: bus.panneVehicule
                }} />
            </div>
        </div>
    )

}