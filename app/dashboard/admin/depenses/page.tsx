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
                idTypeDepense: value.idTypeDepense ?? "0"
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
        const res = await fetch("/api/agences/" + id, { method: "DELETE", cache: "no-store" })
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
        const getDepense2 = async () => {
            const res = await fetch(`/api/depenses`, { cache: "no-store" })
            if (!res.ok) {
                console.log("error")
            }
            const data = await res.json();
            return data
        };

        const getLigeRecette = async () => {
            const res = await fetch(`/api/lignerecette`, { cache: "no-store" })
            if (!res.ok) {
                console.log("error")
            }
            const data = await res.json();
            return data
        };

        const tabLigne = async () => {
            let mois1: number = 0;
            let mois2: number = 0, mois3: number = 0, mois4: number = 0, mois5: number = 0, mois6: number = 0, mois7: number = 0, mois8: number = 0, mois9: number = 0, mois10: number = 0, mois11: number = 0, mois12: number = 0;
            const tab: any[] = await getLigeRecette();
            tab.map((i) => {
                switch (`${i.date[5]}${i.date[6]}`) {
                    case "01":
                        mois1 = mois1 + parseInt(i.montant);
                        break;
                    case "02":
                        mois2 = mois2 + parseInt(i.montant);
                        break;
                    case "03":
                        mois3 = mois3 + parseInt(i.montant);
                        break;
                    case "04":
                        mois4 = mois4 + parseInt(i.montant);
                        break;
                    case "05":
                        mois5 = mois5 + parseInt(i.montant);
                        break;
                    case "06":
                        mois6 = mois6 + parseInt(i.montant);
                        break;
                    case "07":
                        mois7 = mois7 + parseInt(i.montant);
                        break;
                    case "08":
                        mois8 = mois8 + parseInt(i.montant);
                        break;
                    case "09":
                        mois9 = mois9 + parseInt(i.montant);
                        break;
                    case "10":
                        mois10 = mois10 + parseInt(i.montant);
                        break;
                    case "11":
                        mois11 = mois11 + parseInt(i.montant);
                        break;
                    case "12":
                        mois12 = mois12 + parseInt(i.montant);
                        break;
                    default:
                        break;
                }
            })
            const t: any[] = [mois1, mois2, mois3, mois4, mois5, mois6, mois7, mois8, mois9, mois10, mois11, mois12];
            setMoisLigne(t)
        }
        const tabDepense = async () => {
            let mois1: number = 0;
            let mois2: number = 0, mois3: number = 0, mois4: number = 0, mois5: number = 0, mois6: number = 0, mois7: number = 0, mois8: number = 0, mois9: number = 0, mois10: number = 0, mois11: number = 0, mois12: number = 0;
            const tab: any[] = await getDepense2();
            tab.map((i) => {
                switch (`${i.date[5]}${i.date[6]}`) {
                    case "01":
                        mois1 = mois1 + parseInt(i.montant);
                        break;
                    case "02":
                        mois2 = mois2 + parseInt(i.montant);
                        break;
                    case "03":
                        mois3 = mois3 + parseInt(i.montant);
                        break;
                    case "04":
                        mois4 = mois4 + parseInt(i.montant);
                        break;
                    case "05":
                        mois5 = mois5 + parseInt(i.montant);
                        break;
                    case "06":
                        mois6 = mois6 + parseInt(i.montant);
                        break;
                    case "07":
                        mois7 = mois7 + parseInt(i.montant);
                        break;
                    case "08":
                        mois8 = mois8 + parseInt(i.montant);
                        break;
                    case "09":
                        mois9 = mois9 + parseInt(i.montant);
                        break;
                    case "10":
                        mois10 = mois10 + parseInt(i.montant);
                        break;
                    case "11":
                        mois11 = mois11 + parseInt(i.montant);
                        break;
                    case "12":
                        mois12 = mois12 + parseInt(i.montant);
                        break;
                    default:
                        break;
                }
            })
            const t: any[] = [mois1, mois2, mois3, mois4, mois5, mois6, mois7, mois8, mois9, mois10, mois11, mois12];
            setMoisDepense(t)
        }
        tabLigne()
        tabDepense()


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
    }, [])
    return (
        <div className="p-10">
            {/* <h1 className="text-4xl uppercase text-gray-600 my-5">Les Dépenses et Bilan</h1> */}
            <div className="text-sm font-bold my-2 flex gap-2">
                <button onClick={e => setTabulation(false)} className={`${!tabulation ? " bg-white shadow-xl  " : ""} border uppercase overflow-hidden   rounded-md  hover:bg-stone-100 p-2  px-4`}>Dépenses</button>
                {/* <button onClick={e => setTabulation(true)} className={`${tabulation ? " bg-white shadow-xl  " : ""} border uppercase overflow-hidden     rounded-md  hover:bg-stone-100 p-2  px-4`}>BILAN GÉNÉRAL ET STATISTIQUE DE PRODUCTION</button> */}
                <Link href={"/dashboard/admin/production"} className={`border uppercase overflow-hidden     rounded-md  hover:bg-stone-100 p-2  px-4`}>PRODUCTION</Link>
                {/* <Link href={"/dashboard/admin/journal"} className={`border uppercase overflow-hidden     rounded-md  hover:bg-stone-100 p-2  px-4`}>JOURNAL</Link> */}

            </div>
            {!tabulation ? (
                <div className="grid grid-cols-4 gap-4  items-start">
                    <h2 className="py-4 text-xl col-span-full uppercase text-slate-900 border-b">
                        Dépenses
                    </h2>
                    <div className="max-w-md bg-white col-span-1 row-span-2 overflow-hidden rounded-md shadow-2xl">
                        <h2 className="uppercase bg-blue-500 from-blue-600 bg-gradient-to-br font-bold  text-white p-4">
                            Enregistrer une dépense
                        </h2>
                        <form onSubmit={HandlerSubmit} className=" mx-auto p-4">
                            <div className="mt-2">
                                <label className="  text-sm font-bold">Agence</label>
                                <select id="agenceId" name="agenceId" onChange={handleInputChange} className="block text-xs w-full p-2 uppercase text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                    <option></option>
                                    {agences.map((item: any, i: number) => (
                                        <option key={i + 1} value={item.id}>{item.nom}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold">Description</label>
                                <textarea id="large-input" name="description" onChange={handleInputChange} className="block h-24 resize-none w-full p-1.5 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 "></textarea>
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
                                        <select id="idTypeDepense" name="idTypeDepense" onChange={handleInputChange} className="block text-xs w-full p-2 uppercase text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                            <option></option>
                                            {bus.map((item: any, i: number) => (
                                                <option key={i + 1} value={item.id}>{item.modele}</option>
                                            ))}
                                        </select>
                                    </div>
                                ) : null
                            } 
                            {
                                ( value?.typeDepense == "employe") || ( value?.typeDepense == "salaire")  ? (
                                    <div className="mt-2">
                                        <label className="  text-sm font-bold">Employé</label>
                                        <select id="idTypeDepense" name="idTypeDepense" onChange={handleInputChange} className="block text-xs w-full p-2 uppercase text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                            <option></option>
                                            
                                            {employes.map((item: any, i: number) => (
                                                   (parseInt(item.agenceId) == parseInt(value?.agenceId) && value?.agenceId) ? (<option key={i + 1} value={item.id}>{item.nom} {item.prenom}</option>) : null
                                               
                                            ))}
                                        </select>
                                    </div>
                                ) : null
                            }
                             {
                                ( value?.typeDepense == "ration") || ( value?.typeDepense == "carburant") || ( value?.typeDepense == "peage") || ( value?.typeDepense == "voyage")  ? (
                                    <div className="mt-2">
                                        <label className="  text-sm font-bold">Voyage</label>
                                        <select id="idTypeDepense" name="idTypeDepense" onChange={handleInputChange} className="block text-xs w-full p-2 uppercase text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                            <option></option>
                                            {voyage.map((item: any, i: number) => (
                                                (parseInt(item.agenceId) == parseInt(value?.agenceId) && value?.agenceId) ? (<option key={i + 1} value={item.id}>N° Voyage {item.id} Départ le {getDateFormat(item.dateDepart)}</option>) : null
                                                
                                            ))}
                                        </select>
                                    </div>
                                ) : null
                            }

                            <button type="submit" className="text-white mt-4 hover:bg-blue-700 rounded-sm bg-blue-500 text-sm p-2">
                                Enregistrer
                            </button>
                            <button id="buttonReset" type="reset"  className="text-white mt-4 hover:bg-stone-700 rounded-sm bg-stone-500 text-sm p-2">Recommencer</button>
                        </form>
                    </div>
                    <div className="w-full col-span-3 bg-white rounded-md overflow-hidden shadow-2xl border  row-span-2">
                        <div className=" p-4  border-b">
                            <h2 className="uppercase font-bold">
                                Dépenses
                            </h2>

                        </div>
                        <div className="p-4">
                            <Link href="/dashboard/admin/depenses/hebdomadaires" className="text-stone-800 border bg-gray-100 hover:bg-gray-300 text-xs p-2 rounded-sm">Fiches de dépenses hebdomadaires</Link>
                            <Link href="/dashboard/admin/depenses/Journalieres" className="text-stone-800 border bg-gray-100 hover:bg-gray-300 text-xs p-2 rounded-sm">Fiches de dépenses Journalières</Link>
                            {/* <Link href="/dashboard/admin/journal" className="text-stone-800 border bg-gray-100 hover:bg-gray-300 text-xs p-2 rounded-sm">Rapport des dépenses</Link> */}
                            <button type="button" onClick={getDepense} className="text-stone-800 border bg-blue-400 hover:bg-blue-500 text-xs p-2 rounded-sm">Actualiser</button>
                        </div>
                        <div className="p-4 overflow-y-auto" style={{maxHeight: 500 }}>
                            <table className="w-full text-sm text-left rtl:text-right text-black">
                                <thead className="text-sm uppercase">
                                    <tr>
                                        <th scope="col" className="px-3 py-2 border  border-stone-500">
                                            DATE
                                        </th>
                                        <th scope="col" className="px-3 py-2 border  border-stone-500">
                                            Agence
                                        </th>
                                        <th scope="col" className="px-3 py-2 border  border-stone-500">
                                            Montant
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
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-stone-100 ">
                                    {depenses.map((item: any, i: number) => (
                                        <tr key={i + 1}>
                                            <th scope="row" className="px-3 py-2 border border-stone-400">
                                                {getDateFormat(item.depense.date)}
                                            </th>
                                            <td className="px-3 py-2 border border-stone-400">
                                                {item.agence.nom}
                                            </td>
                                            <td className="px-3 py-2 border border-stone-400">
                                                {item.depense.montant}
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
                                                <button onClick={() => deleteItem(item.depense.id)} className="bg-red-500 hover:bg-red-700 text-white text-xs p-2">Retirer</button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-span-4 row-span-2">
                        {
                            (moisDepense.length > 0 && moisLigne.length > 0) ? (
                                <CardLineChart moisDepense={moisDepense} moisRecette={moisLigne} />
                            ) : null
                        }

                    </div>
                </div>
            ) : (
                <div>

                    <div className="mt-4 bg-white overflow-hidden h-full ">
                        <h2 className="p-4 text-xl uppercase text-slate-900 border-b">
                            bilan général et statistique de production
                        </h2>

                        <div className="relative overflow-x-auto p-4">
                            <h2 className="my-4 uppercase text-2xl text-black font-bold">
                                Bilan du {year}-{month}-{day}
                            </h2>

                            <table className="w-full font-mono text-xs text-left rtl:text-right text-gray-500">
                                <thead className="text-lg bg-lime-400 text-white uppercase">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 border border-stone-800">
                                            Actif(s)
                                        </th>
                                        <th scope="col" className="px-6 py-3 border border-stone-800">
                                            Montants
                                        </th>
                                        <th scope="col" className="px-6 py-3 border border-stone-800">
                                            Passif(s)
                                        </th>
                                        <th scope="col" className="px-6 py-3 border border-stone-800">
                                            Montants
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-sm">
                                        <th scope="row" className="border border-stone-800">
                                            <input type="text" className="bg-inherit px-6 py-3  w-full h-full block" />
                                        </th>
                                        <td className="border border-stone-800">
                                            <input type="text" className="bg-inherit px-6 py-3  w-full h-full block" />
                                        </td>
                                        <td className="border border-stone-800 ">
                                            <input type="text" className="bg-inherit px-6 py-3  w-full h-full block" />
                                        </td>
                                        <td className="border border-stone-800">
                                            <input type="text" className="bg-inherit px-6 py-3  w-full h-full block" />
                                        </td>
                                    </tr>
                                    <tr className="text-sm">
                                        <th scope="row" className=" border border-stone-800">
                                            <input type="text" className="bg-inherit px-6 py-3  w-full h-full block" />
                                        </th>
                                        <td className=" border border-stone-800">
                                            <input type="text" className="bg-inherit px-6 py-3  w-full h-full block" />
                                        </td>
                                        <td className=" border border-stone-800 ">
                                            <input type="text" className="bg-inherit px-6 py-3  w-full h-full block" />
                                        </td>
                                        <td className=" border border-stone-800">
                                            <input type="text" className="bg-inherit px-6 py-3  w-full h-full block" />
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot className="bg-stone-200 text-black">
                                    <tr className="text-sm">
                                        <th scope="row" className="px-6 py-3 border border-stone-800">
                                            Total
                                        </th>
                                        <td className=" border border-stone-800">
                                            <input type="text" className="bg-inherit px-6 py-3  w-full h-full block" />
                                        </td>
                                        <td className="px-6 py-3 border border-stone-800 ">
                                            Total
                                        </td>
                                        <td className=" border border-stone-800">
                                            <input type="text" className="bg-inherit px-6 py-3  w-full h-full block" />
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}