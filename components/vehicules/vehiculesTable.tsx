import Link from 'next/link';
import { useEffect, useState } from 'react';
import DropDown from '../ui/dropdown';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import { Vehicules } from '@/app/dashboard/admin/vehicles/[vehiculeId]/page';


const VehiculeTable = (props: { childToParent: Function, setData: Function, isAdmin: string }) => {

    const [bus, setBus] = useState<Vehicules[]>([])
    const csvConfig = mkConfig({ useKeysAsHeaders: true });

    const arrayAction = [
        { action: "edit", text: "Editer" },
        { action: "add", text: "Afficher les pièces du véhicule" },
        { action: "horsService", text: "Mettre Hors Service" },
        { action: "signal", text: "Signaler une panne" },
        { action: "fiche", text: "Afficher la fiche technique" },
        { action: "planning", text: "Consulter le planning" },
        { action: "suivie", text: "Afficher la fiche de suivie" },
        { action: "rapport", text: "Consulter les rapports" },
        { action: "delete", text: "Supprimer" },
    ]

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
    // const titleKeys = Object.keys(bus[0]);
    // const refinedData = [];
    // refinedData.push(titleKeys);
    
    // const csv = generateCsv(csvConfig)(bus);
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

            <div className="p-4 relative ">
                {/* <button onClick={() => download(csvConfig)(csv)}>Télécharger la liste</button> */}
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-sm text-gray-700 uppercase ">
                        <tr>
                            <th scope="col" className="p-2 border-2 border-stone-800 ">
                                Id#
                            </th>
                            <th scope="col" className="p-2 border-2 border-stone-800">
                                Immatriculation
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
                            Nombre de places assises
                            </th>

                            <th scope="col" className="p-2 border-2 border-stone-800">
                                Pannes
                            </th>
                            <th scope="col" className="p-2 border-2 border-stone-800">
                                hors service
                            </th>
                            <th scope="col" className="p-2 border-2 border-stone-800">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {bus.map((item: any, index: number) => (
                            <tr key={index} className={` border-gray-200 text-center uppercase  ${item.horsService == "oui" ? "bg-red-500 text-white " : "bg-white text-stone-900"}`}>
                                <th scope="row" className="p-2 border-2 border-stone-700">
                                    {index + 1}
                                </th>
                                <td className="p-2 border-2 border-stone-700">
                                    {item.immatriculation}
                                </td>
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
                                    {item.capacite}
                                </td>

                                <td className="p-2 border-2 border-stone-700">
                                    {item.panneVehicule}
                                </td>
                                <td className={`p-2 border-2 lef border-stone-700 ${item.horsService == "oui" ? "text-stone-800 font-bold" : "text-stone-500"}`}>
                                    {item.horsService}
                                </td>
                                <td className=" border relative border-b-2 border-r-2 border-stone-700 flex gap-1 flex-wrap">
                                    <DropDown array={arrayAction} left="0" onEmit={(action: string) => {
                                        if (action == "delete") {
                                            deleteBus(item.id)
                                        } else {
                                            props.setData({ action: action, item: item })
                                        }
                                    }} />
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