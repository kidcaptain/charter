
import Link from "next/link";


interface IPrams {
    vehiculeId?: string
}

export default function Page() {

    return (
        <div className="p-10 h-full">
            <div className="bg-white shadow-2xl">
                <h2 className="p-4  uppercase border-b">
                    Production
                </h2>
                <div className="p-4">
                    <Link className="bg-gray-50 block hover:bg-gray-100 text-gray-800 font-bold text-sm p-4 border rounded-md" href={`/dashboard/comptable/rapports/rapportJournalier`} >Rapport Journalière d&apos;un véhicule</Link>
                    <Link className="bg-gray-50 block hover:bg-gray-100 text-gray-800 font-bold text-sm p-4 border rounded-md" href={`/dashboard/comptable/rapports/rapportHebdo`} >Rapport Hebdomadaire d&apos;un véhicule</Link>
                    <Link className="bg-gray-50 block hover:bg-gray-100 text-gray-800 font-bold text-sm p-4 border rounded-md" href={`/dashboard/comptable/rapports/rapportJournalier`} >Rapport de chaque type de dépenses </Link>
                    <Link className="bg-gray-50 block hover:bg-gray-100 text-gray-800 font-bold text-sm p-4 border rounded-md" href={`/dashboard/comptable/rapports/rapportJournalier`} >Fiche de recettes </Link>
                    <Link className="bg-gray-50 block hover:bg-gray-100 text-gray-800 font-bold text-sm p-4 border rounded-md" href={`/dashboard/comptable/rapports/rapportHebdo`} >Salaires </Link>
                    <Link className="bg-gray-50 block hover:bg-gray-100 text-gray-800 font-bold text-sm p-4 border rounded-md" href={`/dashboard/comptable/rapports/rapportJournalier`} >Bordereau de route </Link>
                </div>
                 
            </div>
           
        </div>
    )
}