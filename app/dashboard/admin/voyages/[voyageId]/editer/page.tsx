"use client"
import { getDateFormat } from "@/functions/actionsClient";
import Link from "next/link";

import { FormEvent, useState, useEffect } from "react"
interface IPrams {
    voyageId?: string
}
export default function Page({ params }: { params: IPrams }) {
    const [employe, setemploye] = useState<any[]>([])
    const [data, setData] = useState<any>(
        {
            dateDepart: "",
            dateArrivee: "",
            busId: 0,
            trajetId: 0,
            typeVoyage: "",
            prixVoyage: 0,
            placeDisponible: 0
        }
    )
    const [bus, setBus] = useState<any[]>([])
    const [trajet, setTrajet] = useState<any[]>([])

    const handleInputChange = (event: any) => {
        const target = event.target
        const data = target.type === 'checkbox' ? target.checked : target.value
        setData((oldValue: any) => {
            return { ...oldValue, [target.name]: data }
        })
    }

    const HandlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const str = data.busId;
        const array = str.split(',').map(Number);
        let trajet = JSON.parse(data.trajetId);
        const voyage = {
            agenceId: data.agenceId,
            dateDepart: data.dateDepart,
            dateArrivee: getDateFormat(data.dateArrivee),
            busId: `${array[0]}`,
            trajetId: trajet.id,
            typeVoyage: data.typeVoyage,
            prixVoyage: trajet.prix,
            placeDisponible: array[1],
            chauffeurId: data.chauffeurId,
            heureDepart: data.heureDepart,
            numVoyage: data.numVoyage,
        }
        try {
            const response = await fetch(`/api/voyages/${params.voyageId}`, {
                method: 'PUT',
                cache: "no-store",
                body: JSON.stringify(voyage),
            })
            if (response.ok) {
                alert("Voyage programmé")
            }
        } catch (err) {
            console.log(err)
            alert("Une erreur s'est produite!")
        }
    }




    useEffect(() => {
        const getTrajet = async () => {
            const res = await fetch("/api/trajets", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setTrajet(data)
        };
        const getData = async () => {
            const res = await fetch(`/api/voyages/${params.voyageId}`, { method: "GET", cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const val = await res.json();
            setData({ ...val });
            // setValue({ ...val });
        };
        getData()
        const getBus = async () => {
            const res = await fetch("/api/bus", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setBus(data)
        };
        const getEmploye = async () => {
            const resc = await fetch(`/api/postes`, { cache: "no-store" })
            if (!resc.ok) {
                throw new Error("Failed")
            }

            const data: any[] = await resc.json();
            data.map(async (z) => {
                if (z.titre == "chauffeur") {
                    const res = await fetch(`/api/employes?posteId=${z.id}`, { cache: "no-store" })
                    if (!res.ok) {
                        throw new Error("Failed")
                    }
                    const datas = await res.json();
                    setemploye(datas)
                }
            })
        };
        getBus();
        getTrajet();
    }, [])

    return (
        <div className=" w-full p-10">
            <div className=" py-4 flex lowercase text-sm justify-between items-start mb-2">
                <h1 className=" text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/admin/voyages"}>Voyages</Link> / <Link className="hover:text-blue-600" href="#">Editer</Link></h1>
            </div>
            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="text-xl text-gray-900">Programmer un voyage</h1>
            </div>
            <div className=" m-auto">
                <div className="">

                    <form onSubmit={HandlerSubmit} className="col-span-1 bg-white shadow-xl rounded-sm  ">
                        <h2 className=" text-gray-100 p-4 bg-cyan-500  uppercase">
                            Modification
                        </h2>
                        <div className=" m-auto p-4">
                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Numéro Voyage</label>
                                <input onChange={handleInputChange}  type="text" id="numVoyage" placeholder="Identifiant du voyage" name="numVoyage" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Date de Départ</label>
                                <input onChange={handleInputChange} value={getDateFormat(data.dateDepart)} required type="date" id="dateDepart" placeholder="Départ" name="dateDepart" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Heure de Départ</label>
                                <input onChange={handleInputChange}  type="time" id="heureDepart" placeholder="Heure de départ" name="heureDepart" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                            </div>

                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Bus</label>
                                <select id="busId" name="busId" value={data.busId} required onChange={handleInputChange} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                    <option></option>
                                    {bus.map((item: any, i: number) => (
                                        <option key={i} value={[item.id, item.capacite]}>{item.marque} {item.modele} ({item.typeBus})</option>
                                    ))}
                                </select>
                            </div>
                            {/* <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Trajet</label>
                                <select id="trajetId" value={data.trajetId} name="trajetId" required onChange={handleInputChange} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                    <option></option>
                                    {trajet.map((item: any, i: number) => (
                                        <option key={i} value={JSON.stringify({id: item.id, prix: item.prix})}>{item.lieuDepart} - {item.lieuArrivee} ({item.heureArrivee} - {item.heureDepart})</option>
                                    ))}
                                </select>
                            </div> */}
                          
                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Type de voyages:</label>
                                <select id="typeVoyage" value={data.typeVoyage} name="typeVoyage"  onChange={handleInputChange} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                    <option value="aller-retour">Aller-Retour</option>
                                    <option value="aller simple">Aller Simple</option>
                                </select>
                            </div>

                            <div className="mt-4">
                                <label className="  text-sm uppercase">Attribuer un chauffeur</label>
                                <select id="chauffeurId" name="chauffeurId" value={data.chauffeurId} onChange={handleInputChange} className="block w-full text-sm p-2 uppercase text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                    <option></option>
                                    {employe.map((item: any, i: number) => (
                                        <option key={i} value={JSON.stringify({ id: item.id, nom: `${item.nom} ${item.prenom}` })}>{item.nom} {item.prenom}</option>
                                    ))}
                                </select>
                            </div>
                            {/* <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Prix du voyage</label>
                                <input onChange={handleInputChange} value={data.prixVoyage} required type="number" id="prixVoyage" name="prixVoyage" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                            </div> */}
                            <div className="mt-4 flex">
                                <button type="submit" className="text-white text-sm flex px-4  hover:shadow-md  hover:from-cyan-700 rounded-sm bg-cyan-500  from-cyan-600 bg-gradient-to-t p-2">
                                    Modifier
                                </button>
                                <button type="reset" id="resetbtn" className="text-white text-sm flex px-4  hover:shadow-md  hover:from-stone-700 rounded-sm bg-stone-500  from-stone-600 bg-gradient-to-t p-2">
                                    Effacer
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}