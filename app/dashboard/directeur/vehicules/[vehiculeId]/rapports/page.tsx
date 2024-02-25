"use client"

import Link from "next/link";


interface IPrams {
    vehiculeId?: string
}

export default function Page({ params }: { params: IPrams }) {

    return (
        <div className="p-10 h-full">
            <div className=" py-4 flex lowercase text-sm justify-between items-start mb-2">
                <h1 className=" text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/directeur/vehicules"}>Vehicules</Link> / <Link className="hover:text-blue-600" href="">Rapports</Link></h1>
            </div>
            <div className="bg-white shadow-2xl">
                <h2 className="p-4  uppercase border-b">
                    Les rapports
                </h2>
                <div className="p-4">
                    <Link className="bg-gray-50 hover:bg-gray-100 text-gray-800 font-bold text-xs p-2 border rounded-md" href={`/dashboard/directeur/vehicules/${params.vehiculeId}/rapports/rapportJournalier`} >Rapport Journalière </Link>
                    <Link className="bg-gray-50 hover:bg-gray-100 text-gray-800 font-bold text-xs p-2 border rounded-md" href={`/dashboard/directeur/vehicules/${params.vehiculeId}/rapports/rapportHebdo`} >Rapport Hebdomadaire </Link>
                    <Link className="bg-gray-50 hover:bg-gray-100 text-gray-800 font-bold text-xs p-2 border rounded-md" href={`/dashboard/directeur/vehicules/${params.vehiculeId}/rapports/rapportJournalier`} >Rapport Annuel </Link>
                </div>
                 
            </div>
           
        </div>
    )
}