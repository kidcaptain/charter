"use client"
import SalaireEmploye from "@/components/ui/salaireEmploye";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
    const [employees, setEmployees] = useState<any[]>([])
    const [agences, setAgences] = useState<any[]>([])
    const [dates, setDates] = useState<string>("")
    
    const [depenses, setDepenses] = useState<any[]>([])
    const [agenceId, setAgenceId] = useState<string>("")
    const [agence, setAgence] = useState<string>("Mimboman")
    const years: number[] = [2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043]
    const getDepense = async () => {
        const res = await fetch("/api/depenses?typeDepense=salaire", { cache: "no-store" })
        if (!res.ok) {
            throw new Error("Failed")
        }
        const data = await res.json();
        return data
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

    const getRetenue = async () => {
        const res = await fetch(`/api/sanctions`, { cache: "no-store" })
        if (!res.ok) {
            throw new Error("Failed")
        }
        const data = await res.json();
        return data
    };


    const selectEmployeByDate = async (e: any) => {
        e.preventDefault()
        const tabEmploye: any[] = await getData();
        const tabDepense: any[] = await getDepense();
        const tab: any[] = [];
        const tabPoste: any[] = await getPoste();
        const tabRetenue: any[] = await getRetenue();
        const tabPrime: any[] = await getPrime();
        
        tabDepense.map((i:any) => {
            if (parseInt(`${i.date[0]}${i.date[1]}${i.date[2]}${i.date[3]}`) == parseInt(`${dates[0]}${dates[1]}${dates[2]}${dates[3]}`)) {
                if (parseInt(`${i.date[5]}${i.date[6]}`) == parseInt(`${dates[5]}${dates[6]}`)) {
                    tabEmploye.map((e: any) => {
                        let retenue: any = null;
                        let poste: any = null;
                        let prime: any = null;

                        if (i.idTypeDepense == e.id) {
                            tabPoste.map((p: any) => {
                                if (p.id == e.posteId) {
                                   poste = p;
                                }
                            })
                            tabRetenue.map((r) => {
                                if (parseInt(`${r.dateUpdate[0]}${r.dateUpdate[1]}${r.dateUpdate[2]}${r.dateUpdate[3]}`) == parseInt(`${dates[0]}${dates[1]}${dates[2]}${dates[3]}`)) {
                                    if (parseInt(`${r.dateUpdate[5]}${r.dateUpdate[6]}`) == parseInt(`${dates[5]}${dates[6]}`)) {
                                        if (r.employeId == e.id) {
                                          retenue = r  
                                        }
                                    }
                                }
                            })
                            tabPrime.map((r) => {
                                if (parseInt(`${r.dateUpdate[0]}${r.dateUpdate[1]}${r.dateUpdate[2]}${r.dateUpdate[3]}`) == parseInt(`${dates[0]}${dates[1]}${dates[2]}${dates[3]}`)) {
                                    if (parseInt(`${r.dateUpdate[5]}${r.dateUpdate[6]}`) == parseInt(`${dates[5]}${dates[6]}`)) {
                                        if (r.employeId == e.id) {
                                            prime = r
                                        }
                                    }
                                }
                            })
                         
                            tab.push({employe: e, poste: poste, depenses: i, prime: prime, retenue: retenue})
                        }
                    })
                }
            }
        })
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

        const getDepense = async () => {
            const res = await fetch("/api/depenses?typeDepense=salaire", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
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

        const getRetenue = async () => {
            const res = await fetch(`/api/sanctions`, { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
        };

        const selectEmploye = async () => {
            const date = new Date();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const tabEmploye: any[] = await getData();
            const tabDepense: any[] = await getDepense();
            const tab: any[] = [];
            const tabPoste: any[] = await getPoste();
            const tabRetenue: any[] = await getRetenue();
            const tabPrime: any[] = await getPrime();
            
            tabDepense.map((i:any) => {
                if (parseInt(`${i.date[0]}${i.date[1]}${i.date[2]}${i.date[3]}`) == year) {
                    if (parseInt(`${i.date[5]}${i.date[6]}`) == month) {
                        tabEmploye.map((e: any) => {
                            let retenue: any = null;
                            let poste: any = null;
                            let prime: any = null;
                            if (i.idTypeDepense == e.id) {
                                tabPoste.map((p: any) => {
                                    if (p.id == e.posteId) {
                                       poste = p;
                                    }
                                })
                                tabRetenue.map((r) => {
                                    if (parseInt(`${r.dateUpdate[0]}${r.dateUpdate[1]}${r.dateUpdate[2]}${r.dateUpdate[3]}`) == year) {
                                        if (parseInt(`${r.dateUpdate[5]}${r.dateUpdate[6]}`) == month) {
                                            if (r.employeId == e.id) {
                                              retenue = r  
                                            }
                                        }
                                    }
                                })
                                tabPrime.map((r) => {
                                    if (parseInt(`${r.dateUpdate[0]}${r.dateUpdate[1]}${r.dateUpdate[2]}${r.dateUpdate[3]}`) == year) {
                                        if (parseInt(`${r.dateUpdate[5]}${r.dateUpdate[6]}`) == month) {
                                            if (r.employeId == e.id) {
                                                prime = r
                                            }
                                        }
                                    }
                                })
                        
                                tab.push({employe: e, poste: poste, depenses: i, prime: prime, retenue: retenue})
                            }
                        })
                    }
                }
            })
            setEmployees(tab)
        }
        getAgence();
        selectEmploye()

    }, [])
    return (
        <div className="p-10 ">
            <div className=" py-2 flex justify-between items-start">
                <h1 className="lowercase text-sm  text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/admin/employees"}>Employés</Link> / <Link className="hover:text-blue-600" href="#">Salaire des employés</Link></h1>
            </div>
            <div className="">
                <div className=" bg-white shadow-2xl">
                    <h2 className="p-4 uppercase font-bold border mt-4">Salaires des employées</h2>
                    <div className="p-4">
                        <form onSubmit={selectEmployeByDate} className="flex items-end gap-2">
                            <div>
                                <label htmlFor="" className="block mb-1 text-xs  text-gray-900 font-bold">Agences</label>
                                <input onChange={(e) => setDates(e.target.value)} required autoComplete="off" type="month" id="dateDepart" name="dateDepart" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-sm focus-visible:ring-blue-400 " />
                            </div>
                            <button type="submit" className="text-white  hover:bg-blue-700 rounded-sm bg-blue-500 text-sm   p-2">Generer</button>
                        </form>
                    </div>
                </div>
                <div className="mt-4 bg-white p-4  shadow-2xl border">
                    <SalaireEmploye item={{ employes: employees, date: dates}} />
                </div>

            </div>
        </div>
    )
}