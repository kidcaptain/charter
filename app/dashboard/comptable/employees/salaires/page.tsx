"use client"
import SalaireEmploye from "@/components/ui/salaireEmploye";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
    const [employees, setEmployees] = useState<any[]>([])
    const [agences, setAgences] = useState<any[]>([])
    const [agenceId, setAgenceId] = useState<string>("")
    const [agence, setAgence] = useState<string>("Mimboman")
    const years :number[] = [2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035,2036,2037,2038,2039,2040,2041,2042,2043]
    
    const getPoste = async () => {
        const res = await fetch("/api/postes", { cache: "no-store" })
        if (!res.ok) {
            throw new Error("Failed")
        }
        const data = await res.json();
        return data
    };

    const getData = async (id:number) => {
        const res = await fetch("/api/employes?agenceId="+ id, { cache: "no-store" })
        if (!res.ok) {
            throw new Error("Failed")
        }
        const data = await res.json();
        return data
    };

    const getPrime = async () => {
        const res = await fetch(`/api/primes`, { cache: "no-store" })
        if (!res.ok) {
            throw new Error("Failed")
        }
        const data = await res.json();
        return data
    };

    const selectEmployeByDate = async () => {
        const a = JSON.parse(agenceId);
        setAgence(a.nom)
        const tabEmploye: any[] = await getData(a.id);
        const tab: any[] = [];
        const tabPoste: any[] = await getPoste();
        const tabPrime: any[] = await getPrime();
        if (tabPrime.length > 0) {
            tabEmploye.map((r) => {
                tabPoste.map((i) => {
                    tabPrime.map((j) => {
                        if ((r.posteId === i.id) && (j.employeId === r.id)) {
                            tab.push({ poste: i, employe: r, prime: j })
                        } else if ((r.posteId === i.id)) {
                            tab.push({ poste: i, employe: r })
                        }
                        console.log({ poste: i, employe: r })
                    })
                })
            })
        } else {
            tabEmploye.map((r) => {
                tabPoste.map((i) => {
                    if ((r.posteId === i.id)) {
                        // console.log({ poste: i, employe: r })
                        tab.push({ poste: i, employe: r })
                    }
                })
            })
        }
        setEmployees(tab)
    }
    useEffect(() => {
        const getAgence = async () => {
            const res = await fetch("/api/agences", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setAgences(data)
        };

        const getPoste = async () => {
            const res = await fetch("/api/postes", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
        };

        const getData = async () => {
            const res = await fetch("/api/employes", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
        };

        const getPrime = async () => {
            const res = await fetch(`/api/primes`, { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
        };

        const selectEmploye = async () => {
            const tabEmploye: any[] = await getData();
            const tab: any[] = [];
            const tabPoste: any[] = await getPoste();
            const tabPrime: any[] = await getPrime();
            if (tabPrime.length > 0) {
                tabEmploye.map((r) => {
                    tabPoste.map((i) => {
                        tabPrime.map((j) => {
                            if ((r.posteId === i.id) && (j.employeId === r.id)) {
                                tab.push({ poste: i, employe: r, prime: j })
                            } else if ((r.posteId === i.id)) {
                                tab.push({ poste: i, employe: r })
                            }
                            console.log({ poste: i, employe: r })
                        })
                    })
                })
            } else {
                tabEmploye.map((r) => {
                    tabPoste.map((i) => {
                        if ((r.posteId === i.id)) {
                            // console.log({ poste: i, employe: r })
                            tab.push({ poste: i, employe: r })
                        }
                    })
                })
            }
            setEmployees(tab)
        }
        getAgence();
        selectEmploye()

    }, [])
    return (
        <div className="p-10 ">
            <div className=" py-2 flex justify-between items-start">
                <h1 className="lowercase text-sm  text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/comptable/employees"}>Employés</Link> / <Link className="hover:text-blue-600" href="#">Salaire des employés</Link></h1>
            </div>
            <div className="">
                <div className=" bg-white ">
                    <h2 className="p-4 uppercase border-b ">Salaires des employées</h2>
                    <div className="p-4">
                        <div className="flex gap-1">
                            <div>
                                <label htmlFor="" className="block mb-1 text-xs  text-gray-900 font-bold">Agences</label>
                                <select onChange={e => setAgenceId(e.target.value)} className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " id="">
                                    <option></option>
                                    {agences.map((i: any, index: number) => (
                                        <option key={index+1} value={ JSON.stringify({id:i.id, nom:i.nom})}>{i.nom}</option>
                                    ))}
                                </select>
                            </div>
                            {/* <div>
                                <label htmlFor="" className="block mb-1 text-xs  text-gray-900 font-bold">Mois</label>
                                <select className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " id="">
                                    <option value="01">Janvier</option>
                                    <option value="02">Fevrier</option>
                                    <option value="03">Mars</option>
                                    <option value="04">Avril</option>
                                    <option value="05">Mai</option>
                                    <option value="06">Juin</option>
                                    <option value="07">Juillet</option>
                                    <option value="08">Aout</option>
                                    <option value="09">Septembre</option>
                                    <option value="10">Octobre</option>
                                    <option value="11">Novembre</option>
                                    <option value="12">Decembre</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="" className="block mb-1 text-xs  text-gray-900 font-bold">Année</label>
                                <select className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " id="">
                                    {
                                        years.map((i) => (
                                            <option value={i}>{i}</option>
                                        ))
                                    }
                                </select>
                            </div> */}
 <button onClick={selectEmployeByDate} type="button" className="text-white py-2 hover:bg-blue-700 rounded-sm bg-blue-500 text-sm mt-4  p-2">Generer</button>
                        </div>
                       
                    </div>

                </div>
                <div className="mt-4 bg-white p-4">
                    <SalaireEmploye  item={{ employes: employees, agence:agence }} />
                </div>

            </div>
        </div>
    )
}