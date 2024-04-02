"use client"

import CardLineChart from "@/components/cardLineChart";
import { getDateFormat } from "@/functions/actionsClient";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export default function Page() {
    const [tabulation, setTabulation] = useState<boolean>(false);
    const [agences, setAgences] = useState<any[]>([]);
    const [employes, setEmployes] = useState<any[]>([]);
    const [bus, setBus] = useState<any[]>([]);
    const [depenses, setDepenses] = useState<any[]>([]);
    const [value, setValue] = useState<any>();
    const [moisDepense, setMoisDepense] = useState<any[]>([])
    const [voyage, setvoyage] = useState<any[]>([])
    const [moisLigne, setMoisLigne] = useState<any[]>([])
    const typeDepense = useRef<any>(null)
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;

    const HandlerSubmit = async (e: any) => {
        const date = new Date()
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        const hours = (date.getHours()) < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
        const minutes = (date.getMinutes()) < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
        e.preventDefault()
        try {
            let au: string = value.typeDepense;
            if (value.autre) {
                au = value.autre
            }
            const datas = {
                agenceId: value.agenceId,
                description: value.description,
                montant: value.montant,
                date: `${year}-${month}-${day}T00:00:00.000Z`,
                typeDepense: au,
                idTypeDepense: value.idTypeDepense ?? "0",
                motif: value.motif
            }
            // console.log(datas)
            const res = await fetch('/api/depenses', {
                method: 'POST',
                cache: 'no-store',
                body: JSON.stringify(datas),
            })

            if (res.ok) {
                setValue(null);
                document.getElementById('buttonReset')?.click();
                alert("Dépense enregistrée")
            }
        } catch (err: any) {
            console.log(err)
        }
    }
    const handleInputChange = (event: any) => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setValue((oldValue: any) => {
            return { ...oldValue, [target.name]: value }
        })
    }
    const deleteItem = async (id: number) => {
        const res = await fetch("/api/depenses/" + id, { method: "DELETE", cache: "no-store" })
        if (!res.ok) {
            console.log("error")
        }
    }
    const getAgence = async () => {
        const res = await fetch("/api/agences", { cache: "no-store" })
        if (!res.ok) {
            console.log("error")
        }
        const data = await res.json();
        setAgences(data)
        return data
    };
    const getDepense = async () => {
        const res = await fetch("/api/depenses", { cache: "no-store" })
        if (!res.ok) {
            console.log("error")
        }
        const data = await res.json();
        const tabAgence: any[] = await getAgence();
        const tabDepense: any[] = await data;
        const tab: any[] = [];
        tabDepense.map((i) => {
            tabAgence.map((j) => {
                if (j.id == i.agenceId) {
                    tab.push({ agence: j, depense: i })
                }
            })
        })
        setDepenses(tab.reverse())
    };
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

        const getDepense = async () => {
            const res = await fetch("/api/depenses", { cache: "no-store" })
            if (!res.ok) {
                console.log("error")
            }
            const data = await res.json();
            const tabAgence: any[] = await getAgence();
            const tabDepense: any[] = await data;
            const tab: any[] = [];
            tabDepense.map((i) => {
                tabAgence.map((j) => {
                    if (j.id == i.agenceId) {
                        tab.push({ agence: j, depense: i })
                    }
                })
            })

            setDepenses(tab.reverse())
        };
        getAgence();
        getDepense()
    }, [depenses])
    return (
        <div className="p-10 bg-stone-100">
            <div className="block gap-4  items-start">
                <h2 className="py-4 text-xl  text-slate-900 ">
                    Dépenses
                </h2>
                <div className=" my-4 gap-4 flex">
                    <Link href="/dashboard/admin/depenses/hebdomadaires" className="text-stone-800 border-2 border-stone-700 bg-white hover:text-blue-500 hover:bg-gray-300 text-sm p-2 rounded-sm">Télécharger Fiches de dépenses hebdomadaires</Link>
                    <Link href="/dashboard/admin/depenses/Journalieres" className="text-stone-800 border-2 border-stone-700 bg-white hover:text-blue-500 hover:bg-gray-300 text-sm p-2 rounded-sm">Télécharger Fiches de dépenses Journalières</Link>
                    <Link href={"/dashboard/admin/production"} className={`text-stone-800 border-2 border-stone-700 bg-white hover:text-blue-500 hover:bg-gray-300 text-sm p-2 rounded-sm`}>Télécharger Fiche de Production</Link>
                    <Link href={"/dashboard/admin/journal"} className={`text-stone-800 border-2 border-stone-700 bg-white hover:text-blue-500 hover:bg-gray-300 text-sm p-2 rounded-sm`}>Télécharger Journal</Link>
                </div>
                <div className="w-full  my-4 bg-white  row-span-2 overflow-hidden rounded-md border">
                    <h2 className="uppercase font-bold  text-gray-800 p-4 border-b">
                        Enregistrer une dépense
                    </h2>
                    <form onSubmit={HandlerSubmit} className=" mx-auto grid grid-cols-2 p-4">
                        <div className="px-5">
                            <div className="mt-2">
                                <label className="  text-sm font-bold">Agence</label>
                                <select id="agenceId" name="agenceId" onChange={handleInputChange} className="block text-sm w-full p-2 uppercase text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                    <option></option>
                                    {agences.map((item: any, i: number) => (
                                        <option key={i + 1} value={item.id}>{item.nom}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold">Motif</label>
                                <input type="text" min={0} name="motif" onChange={handleInputChange} id="large-input" className="block w-full p-1.5 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                            </div>


                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold">Montant</label>
                                <input type="number" min={0} name="montant" onChange={handleInputChange} id="large-input" className="block w-full p-1.5 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                            </div>

                            <div className="mt-2">
                                <label className="  text-sm font-bold">Type de dépenses</label>
                                <select id="countries" ref={typeDepense} name="typeDepense" onChange={handleInputChange} className="block text-sm w-full p-2  text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
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
                                <textarea id="large-input" name="description" onChange={handleInputChange} className="block h-24 resize-none w-full p-1.5 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 "></textarea>
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold">Piece justificative</label>
                                <input type="file" min={0} name="piece" onChange={handleInputChange} id="large-input" className="block w-full p-1.5 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                            </div>
                            {
                                value?.typeDepense == "autre" ? (
                                    <div className="mt-2">
                                        <label className="block mb-1 text-sm font-bold">Dépense liée à </label>
                                        <input type="text" required name="autre" onChange={handleInputChange} id="large-input" className="block w-full p-1.5 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                    </div>
                                ) : null
                            }
                            {
                                value?.typeDepense == "bus" ? (
                                    <div className="mt-2">
                                        <label className="  text-sm font-bold">Bus</label>
                                        <select id="idTypeDepense" name="idTypeDepense" onChange={handleInputChange} className="block text-sm w-full p-2 uppercase text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
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
                                        <select id="idTypeDepense" name="idTypeDepense" onChange={handleInputChange} className="block text-sm w-full p-2 uppercase text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
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
                                        <select id="idTypeDepense" name="idTypeDepense" onChange={handleInputChange} className="block text-sm w-full p-2 uppercase text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
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

                <div className="w-full  bg-white rounded-md overflow-hidden shadow-2xl border  row-span-2">
                    <div className=" p-4  border-b">
                        <h2 className="uppercase font-bold">
                            Dépenses
                        </h2>

                    </div>

                    <div className="p-4 overflow-y-auto" style={{ maxHeight: 500 }}>
                        <table className="w-full uppercase text-sm text-left rtl:text-right text-black">
                            <thead className="text-sm uppercase">
                                <tr>

                                    <th scope="col" className="px-3 py-2 border  border-stone-500">
                                        Agence
                                    </th>
                                    <th scope="col" className="px-3 py-2 border  border-stone-500">
                                        Montant
                                    </th>
                                    <th scope="col" className="px-3 py-2 border  border-stone-500">
                                        Motif
                                    </th>

                                    <th scope="col" className="px-3 py-2 border  border-stone-500">
                                        Type de dépense
                                    </th>
                                    <th scope="col" className="px-3 py-2 border  border-stone-500">
                                        Description
                                    </th>
                                    <th scope="col" className="px-3 py-2 border  border-stone-500">
                                        Enregistré le
                                    </th>
                                    <th scope="col" className="px-3 py-2 border  border-stone-500">
                                        Piéce
                                    </th>
                                    <th scope="col" className="px-3 py-2 border  border-stone-500">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-stone-100 ">
                                {depenses.map((item: any, i: number) => (
                                    <tr key={i + 1}>

                                        <td className="px-3 py-2 border border-stone-400">
                                            {item.agence.nom}
                                        </td>

                                        <td className="px-3 py-2 border border-stone-400">
                                            {item.depense.montant} FCFA
                                        </td>
                                        <td className="px-3 py-2 border border-stone-400">
                                            {item.depense.motif}
                                        </td>
                                        <td className="px-3 py-2 border border-stone-400">
                                            {item.depense.typeDepense}
                                        </td>
                                        <td className="px-3 py-2 border border-stone-400">
                                            {item.depense.description}
                                        </td>
                                        <td className="px-3 py-2 border border-stone-400">
                                            {getDateFormat(item.depense.date)}
                                        </td>
                                        <td className="px-3 py-2 border border-stone-400">
                                            {item.depense.piece != "" ? (
                                                <a href={`${item.depense.piece}`} download={`${item.depense.piece}`} className="text-white text-sm mt-4 hover:bg-red-700 rounded-sm bg-red-500  p-2">
                                                    Telecharger
                                                </a>
                                            ) : null}
                                        </td>
                                        <td className="px-3 py-2 flex gap-2 border border-stone-400">
                                            <button onClick={() => deleteItem(item.depense.id)} className="bg-red-500 hover:bg-red-700 text-white text-sm p-2">Retirer</button>
                                            <Link href={`/dashboard/admin/depenses/${item.depense.id}`} className="bg-yellow-500 lowercase hover:bg-yellow-700 text-white text-sm p-2">Modifier</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}