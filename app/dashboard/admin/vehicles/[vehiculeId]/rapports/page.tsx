"use client"

import Link from "next/link";


interface IPrams {
    vehiculeId?: string
}

export default function Page({ params }: { params: IPrams }) {

    return (
        <div className="p-10 h-full">
            <div className=" py-4 flex lowercase text-sm justify-between items-start mb-2">
                <h1 className=" text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/admin/vehicles"}>Vehicules</Link> / <Link className="hover:text-blue-600" href="">Rapports</Link></h1>
            </div>
            <div className="bg-white shadow-2xl border rounded-md">
                <h2 className="p-4 font-bold text-xl uppercase border-b">
                    Les rapports
                </h2>
                <div className="p-4 py-8">
                    <Link className="bg-gray-50 hover:bg-black hover:text-white border-black text-black font-bold text-sm p-3 border rounded-md" href={`/dashboard/admin/vehicles/${params.vehiculeId}/rapports/rapportJournalier`} >Rapport Journalière </Link>
                    <Link className="bg-gray-50 mx-5 hover:bg-black hover:text-white border-black text-black font-bold text-sm p-3 border rounded-md" href={`/dashboard/admin/vehicles/${params.vehiculeId}/rapports/rapportHebdo`} >Rapport Hebdomadaire </Link>
                    <Link className="bg-gray-50 hover:bg-black hover:text-white border-black text-black font-bold text-sm p-3 border rounded-md" href={`/dashboard/admin/vehicles/${params.vehiculeId}/rapports/rapportAnnuel`} >Rapport Annuel </Link>
                </div>
            </div>
        </div>
    )
}