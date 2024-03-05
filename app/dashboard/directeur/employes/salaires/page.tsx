"use client"
import SalaireEmploye from "@/components/ui/salaireEmploye";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
    const [employees, setEmployees] = useState<any[]>([])
    const [agences, setAgences] = useState<any[]>([])
    const [agenceId, setAgenceId] = useState<string>("")
    const [agence, setAgence] = useState<string>("Mimboman")
    const years: number[] = [2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043]

    const getPoste = async () => {
        const res = await fetch("/api/postes", { cache: "no-store" })
        if (!res.ok) {
            throw new Error("Failed")
        }
        const data = await res.json();
        return data
    };

    const getData = async (id: number) => {
        const res = await fetch("/api/employes?agenceId=" + id, { cache: "no-store" })
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


        const getPoste = async () => {
            const res = await fetch("/api/postes", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
        };

        const getData = async (id: number) => {
            const res = await fetch("/api/employes?agenceId=" + id, { cache: "no-store" })
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
        const agence = localStorage.getItem("agence");

        const selectEmploye = async () => {
            if (agence) {
                const a = JSON.parse(agence);
                const tabEmploye: any[] = await getData(a.agenceId);

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

        }
        selectEmploye()
    }, [])
    return (
        <div className="p-10 ">
            <div className=" py-2 flex justify-between items-start">
                <h1 className="lowercase text-sm  text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/directeur/employes"}>Employés</Link> / <Link className="hover:text-blue-600" href="#">Salaire des employés</Link></h1>
            </div>
            <div className="">
                <div className=" bg-white ">
                    <h2 className="p-4 uppercase border-b ">Salaires des employées</h2>
                </div>
                <div className="mt-4 bg-white p-4">
                    {/* <SalaireEmploye item={{ employes: employees}} /> */}
                </div>

            </div>
        </div>
    )
}