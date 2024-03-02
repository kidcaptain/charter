import Link from 'next/link';
import { useEffect, useState } from 'react';

const VehiculeTable = (props: { childToParent: Function, setData: Function, isAdmin: string }) => {

    const [bus, setBus] = useState<any[]>([])

    useEffect(() => {
        const getData = async () => {
            const res = await fetch("/api/bus", { method: "GET", cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setBus(data)
        };
        getData();
    }, [bus])

    const deleteBus = async (id: number) => {
        if (confirm("Confimer la suppression")) {
            const res = await fetch(`/api/bus/${id}`, { method: "DELETE", cache: "no-store" })
            if (!res.ok) {
                props.childToParent(false)
            } else {
                props.childToParent(true)
            }
        }
    }



    return (
        <div className="bg-white shadow-2xl rounded-md border-2 border-stone-50">
            <h1 className=" p-4 text-gray-900 font-bold uppercase border-b">Nos véhicules</h1>
            <div className="p-4 relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-sm text-gray-700 uppercase dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-2 border-2 border-stone-800 ">
                                Id#
                            </th>
                            <th scope="col" className="p-2 border-2 border-stone-800">
                                Marque
                            </th>
                            <th scope="col" className="p-2 border-2 border-stone-800 ">
                                Modèle
                            </th>
                            <th scope="col" className="p-2 border-2 border-stone-800">
                                Type de Bus
                            </th>
                            <th scope="col" className="p-2 border-2 border-stone-800">
                                Année de Fabrication
                            </th>
                            <th scope="col" className="p-2 border-2 border-stone-800">
                                Capacité
                            </th>
                            <th scope="col" className="p-2 border-2 border-stone-800">
                                Places Disponible
                            </th>
                            <th scope="col" className="p-2 border-2 border-stone-800">
                                Places Total
                            </th>
                            <th scope="col" className="p-2 border-2 border-stone-800">
                                Pannes
                            </th>
                            <th scope="col" className="p-2 border-2 border-stone-800">
                                En hors service
                            </th>
                            <th scope="col" className="p-2 border-2 border-stone-800">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {bus.map((item: any, index: number) => (
                            <tr key={index} className={`border-b border-gray-200 dark:border-gray-700 ${item.horsService == "oui" ? "bg-red-50 text-stone-900" : "bg-white"}`}>
                                <th scope="row" className="p-2 border-2 border-stone-700">
                                    {index + 1}
                                </th>
                                <td className="p-2 border-2 border-stone-700">
                                    {item.marque}
                                </td>
                                <td className="p-2 border-2 border-stone-700 ">
                                    {item.modele}
                                </td>
                                <td className="p-2 border-2 border-stone-700">
                                    {item.typeBus}
                                </td>
                                <td className="p-2 border-2 border-stone-700">
                                    {item.anneeFabrication}
                                </td>
                                <td className="p-2 border-2 border-stone-700">
                                    {item.capacite}
                                </td>
                                <td className="p-2 border-2 border-stone-700">
                                    {item.placesDisponible}
                                </td>
                                <td className="p-2 border-2 border-stone-700">
                                    {item.placesTotal}
                                </td>
                                <td className="p-2 border-2 border-stone-700">
                                    {item.panneVehicule}
                                </td>
                                <td className={`p-2 border-2 border-stone-700 ${item.horsService == "oui" ? "text-red-500 font-bold" : "text-stone-500"}`}>
                                    {item.horsService}
                                </td>
                                <td className="p-2 border-2 border-stone-700">
                                    <button type="button" onClick={() => deleteBus(item.id)} className="bg-red-500 text-white text-sm p-1 px-2">Retirer</button>
                                    <button type="button" onClick={() => props.setData({ action: "edit", item: item })} className="bg-yellow-500 text-white text-sm p-1 px-2">Editer</button>
                                    <button type="button" onClick={() => props.setData({ action: "horsService", item: item })} className="bg-green-500 text-white text-sm p-1 px-2">Mettre Hors Service</button>
                                    <button type="button" onClick={() => props.setData({ action: "signal", item: item })} className="bg-cyan-500 text-white text-sm p-1 px-2">Signaler une panne</button>
                                    <button type="button" onClick={() => props.setData({ action: "fiche", item: item })} className="bg-blue-500 text-white text-sm p-1 px-2 ">Fiche technique </button>
                                    { 
                                    props.isAdmin === "admin" ? ( <>
                                     <Link href={`/dashboard/admin/vehicles/${item.id}/rapports`} onClick={() => props.setData({ action: "fiche", item: item })} className="bg-purple-600 text-white text-sm p-1 px-2 ">Rapport </Link>
                                     <Link href={`/dashboard/admin/vehicles/${item.id}/suivi`} onClick={() => props.setData({ action: "fiche", item: item })} className="bg-purple-600 text-white text-sm p-1 px-2 ">Fiche de suivi </Link></>) : 
                                (  <Link href={`/dashboard/directeur/vehicules/${item.id}/rapports`} onClick={() => props.setData({ action: "fiche", item: item })} className="bg-purple-600 text-white text-sm p-1 px-2 ">Rapport </Link>)}
                                  
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default VehiculeTable