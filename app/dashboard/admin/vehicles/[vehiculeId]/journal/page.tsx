import Link from "next/link"

interface IPrams {
    vehiculeId?: string
}

export default function Page({ params }: { params: IPrams }) {

    return (
        <div className="p-10 w-full">
        <div className=" py-4 flex justify-between items-start mb-2">
            <h1 className="text-lg text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/admin/vehicles"}>Vehicules</Link>/<Link className="hover:text-blue-600" href={`/dashboard/admin/vehicles/${params.vehiculeId}`}>n°{params.vehiculeId}</Link>/<Link className="hover:text-blue-600" href="">Fiche de suivie</Link></h1>
        </div>
        <div className="bg-white">
            <h2 className="p-4 uppercase border-b">Fiche de suivie</h2>
            <div className="border-b p-2">
                <button className="bg-gray-50 text-stone-800 border hover:bg-gray-200 text-xs p-2">Imrpimer</button>
            </div>
            <div className="p-4">
            <div className="text-center font-bold my-8">
                        <h2 className="underline">CHARTER EXPRESS VOYAGES</h2>
                        <h4>Fiche de suivie</h4>
                    </div>
                <div>
                    <table className="border uppercase text-sm border-black w-full">
                        <thead>
                            <tr className="border">
                                <td  className="border font-bold border-black">Numéro d’immatriculation </td>
                                <td  className="border border-black"></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border">
                                <td className="border border-black">Type du véhicule</td>
                                <td className="border border-black"></td>
                            </tr>
                            <tr className="border">
                                <td className="border border-black">Dimensions (Hauteur x Largeur)</td>
                                <td className="border border-black"></td>
                            </tr>
                            <tr className="border">
                                <td className="border border-black">Nombre de places assises disponibles</td>
                                <td className="border border-black"></td>
                            </tr>
                            <tr className="border">
                                <td className="border border-black">Charge maximale autorisée</td>
                                <td className="border border-black"></td>
                            </tr>
                            <tr className="border">
                                <td className="border border-black">Pression de gonflage des pneus (avant / arrière)</td>
                                <td className="border border-black"></td>
                            </tr>
                            <tr className="border">
                                <td className="border border-black">Type de permis requis</td>
                                <td className="border border-black"></td>
                            </tr>
                            <tr className="border">
                                <td className="border border-black">Dates des contrôles techniques</td>
                                <td className="border border-black"></td>
                            </tr>
                            <tr className="border">
                                <td className="border border-black">Autres</td>
                                <td className="border border-black"></td>
                            </tr>
                            <tr className="border">
                                <td className="border border-black">Autres</td>
                                <td className="border border-black"></td>
                            </tr>
                            <tr>
                                <td className="text-center p-2 bg-stone-800 text-white"> informations au conducteur </td>
                            </tr>
                            <tr className="border">
                                <td className="border border-black">Nom et prénom</td>
                                <td className="border border-black"></td>
                            </tr>
                            <tr className="border">
                                <td className="border border-black">Date de prise de véhicule</td>
                                <td className="border border-black"></td>
                            </tr>
                            <tr className="border">
                                <td className="border border-black">Nombre de passagers transportés </td>
                                <td className="border border-black"></td>
                            </tr>
                            <tr className="border">
                                <td className="border border-black">Vérifications des dispositifs</td>
                                <td className="border border-black"></td>
                            </tr> 
                            <tr className="border">
                                <td className="border border-black">Anomalies et dysfonctionnements </td>
                                <td className="border border-black"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>
    )
}