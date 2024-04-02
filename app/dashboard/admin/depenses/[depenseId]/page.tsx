"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import EditFormVehicule from "@/components/vehicules/editFormVehicule"
import Planning from "@/components/ui/planning"
import { getDateFormat } from "@/functions/actionsClient"
interface IPrams {
    depenseId: string
}

export default function Page({ params }: { params: IPrams }) {
    const [value, setValue] = useState<any>()
    const [depenses, setdepenses] = useState<any>()
    const [agences, setAgences] = useState<any[]>([])
    const [employes, setEmployes] = useState<any[]>([]);
    const [bus, setBus] = useState<any[]>([]);
    const [voyage, setvoyage] = useState<any[]>([])
    const typeDepense = useRef<any>(null)
    useEffect(() => {
        const getAgence = async () => {
            const res = await fetch("/api/agences", { cache: "no-store" })
            if (!res.ok) {
                console.log("error")
            }
            const data = await res.json();
            setAgences(data)
            return data
        };
        const getEmploye = async () => {
            const res = await fetch("/api/employes", { cache: "no-store" })
            if (!res.ok) {
                console.log("error")
            }
            const data = await res.json();
            setEmployes(data)
        };
        const getVoyage = async () => {
            const res = await fetch("/api/voyages", { cache: "no-store" })
            if (!res.ok) {
                console.log("error")
            }
            const data = await res.json();
            setvoyage(data)
        };
        getVoyage()
        getEmploye()
        const getBus = async () => {
            const res = await fetch("/api/bus", { cache: "no-store" })
            if (!res.ok) {
                console.log("error")
            }
            const data = await res.json();
            setBus(data)
        };
        getBus()


        getAgence();

        const getData = async () => {
            const res = await fetch("/api/depenses/" + params.depenseId, { cache: "no-store" })
            if (!res.ok) {
                alert("Impossible d'afficher les données. Veuillez actualiser la page!");
            }
            const data = await res.json();
            setValue(data)
        };
        getData();
    }, [depenses]);

    const handleInputChange = (event: any) => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setValue((oldValue: any) => {
            return { ...oldValue, [target.name]: value }
        })
    }
    const HandlerSubmit = async (e: any) => {
        e.preventDefault()
        let au: string = value.typeDepense;
        if (value.autre) {
            au = value.autre
        }
        try {
            const datas = {
                agenceId: value.agenceId,
                description: value.description,
                montant: value.montant,
                date: value.date,
                typeDepense: au,
                idTypeDepense: value.idTypeDepense ?? "0",
                motif: value.motif
            }
            const res = await fetch('/api/depenses/' + params.depenseId, {
                method: 'PUT',
                cache: 'no-store',
                body: JSON.stringify(datas),
            })
            const data = await res.json();
            setValue(data)
            if (res.ok) {
                alert("Dépense enregistré!");
            }
        } catch (err: any) {
            console.log(err)

        }

    }
    return (
        <div className=" w-full p-10">
            <div className=" py-4 flex lowercase text-sm justify-between items-start mb-2">
                <h1 className=" text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/admin/depenses"}>Dépenses</Link> / <Link className="hover:text-blue-600 font-semibold" href="#">éditer</Link></h1>
            </div>
            <div className="w-full  my-4 bg-white  row-span-2 overflow-hidden rounded-md border">
                <h2 className="uppercase font-bold  text-gray-800 p-4 border-b">
                    Enregistrer une dépense
                </h2>

                <form onSubmit={HandlerSubmit} className=" mx-auto grid grid-cols-2 p-4">
                    <div className="px-5">
                        <div className="mt-2" >
                            <label className="  text-sm font-bold">Agence</label>
                            <select id="agenceId" name="agenceId" value={value?.agenceId} onChange={handleInputChange} className="block text-sm w-full p-2 uppercase text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                <option></option>
                                {agences.map((item: any, i: number) => (
                                    <option key={i + 1} value={item.id}>{item.nom}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mt-4">
                            <label className="block mb-1 text-sm font-bold">Motif</label>
                            <input type="text" min={0} name="motif" value={value?.motif} onChange={handleInputChange} id="large-input" className="block w-full p-1.5 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                        </div>


                        <div className="mt-4">
                            <label className="block mb-1 text-sm font-bold">Montant</label>
                            <input type="number" min={0} name="montant" value={value?.montant} onChange={handleInputChange} id="large-input" className="block w-full p-1.5 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                        </div>

                        <div className="mt-2">
                            <label className="  text-sm font-bold">Type de dépenses</label>
                            <select id="countries" ref={typeDepense} value={value?.typeDepense} name="typeDepense" onChange={handleInputChange} className="block text-sm w-full p-2  text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                <option value=""></option>
                                <option value="salaire">Salaire</option>
                                <option value="employe">Employé</option>
                                <option value="voyage">Voyage</option>
                                <option value="ration">Ration</option>
                                <option value="bus">Bus</option>
                                <option value="carburant">Carburant</option>
                                <option value="peage">Peage</option>
                                <option value="autre">Autres</option>
                            </select>
                        </div>
                    </div>
                    <div className="px-5">
                        <div className="mt-4">
                            <label className="block mb-1 text-sm font-bold">Description</label>
                            <textarea id="large-input" name="description" value={value?.description} onChange={handleInputChange} className="block h-24 resize-none w-full p-1.5 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 "></textarea>
                        </div>
                        <div className="mt-4">
                            <label className="block mb-1 text-sm font-bold">Piece justificative</label>
                            <input type="file" min={0} name="piece" value={value?.piece} onChange={handleInputChange} id="large-input" className="block w-full p-1.5 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                        </div>
                        {
                            value?.typeDepense == "autre" ? (
                                <div className="mt-2">
                                    <label className="block mb-1 text-sm font-bold">Dépense liée à </label>
                                    <input type="text" required name="autre"  onChange={handleInputChange} id="large-input" className="block w-full p-1.5 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                </div>
                            ) : null
                        }
                        {
                            value?.typeDepense == "bus" ? (
                                <div className="mt-2">
                                    <label className="  text-sm font-bold">Bus</label>
                                    <select id="idTypeDepense" name="idTypeDepense"  value={value?.idTypeDepense}  onChange={handleInputChange} className="block text-sm w-full p-2 uppercase text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                        <option></option>
                                        {bus.map((item: any, i: number) => (
                                            <option key={i + 1} value={item.id}>BUS - {item.immatriculation}</option>
                                        ))}
                                    </select>
                                </div>
                            ) : null
                        }
                        {
                            (value?.typeDepense == "employe") || (value?.typeDepense == "salaire") ? (
                                <div className="mt-2">
                                    <label className="  text-sm font-bold">Employé</label>
                                    <select id="idTypeDepense" name="idTypeDepense"  value={value?.idTypeDepense}  onChange={handleInputChange} className="block text-sm w-full p-2 uppercase text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                        <option></option>

                                        {employes.map((item: any, i: number) => (
                                            (parseInt(item.agenceId) == parseInt(value?.agenceId) && value?.agenceId) ? (<option key={i + 1} value={item.id}>{item.nom} {item.prenom}</option>) : null

                                        ))}
                                    </select>
                                </div>
                            ) : null
                        }
                        {
                            (value?.typeDepense == "ration") || (value?.typeDepense == "carburant") || (value?.typeDepense == "peage") || (value?.typeDepense == "voyage") ? (
                                <div className="mt-2">
                                    <label className="  text-sm font-bold">Voyage</label>
                                    <select id="idTypeDepense" name="idTypeDepense" value={value?.idTypeDepense} onChange={handleInputChange} className="block text-sm w-full p-2 uppercase text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                        <option></option>
                                        {voyage.map((item: any, i: number) => (
                                            (parseInt(item.agenceId) == parseInt(value?.agenceId) && value?.agenceId) ? (<option key={i + 1} value={item.id}>N°  {item.numVoyage} Départ le {getDateFormat(item.dateDepart)}</option>) : null

                                        ))}
                                    </select>
                                </div>
                            ) : null
                        }

                    </div>
                    <div className="flex gap-2 px-5  mt-4">
                        <button type="submit" className="text-white w-2/3 hover:bg-blue-700 rounded-sm bg-blue-500 text-sm p-2">
                            Enregistrer
                        </button>
                        <button id="buttonReset" type="reset" className="text-white w-2/3 hover:bg-stone-700 rounded-sm bg-stone-500 text-sm p-2">Recommencer</button>
                    </div>
                </form>
            </div>
        </div>

    )
}
