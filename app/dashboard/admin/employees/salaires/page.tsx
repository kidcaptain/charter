"use client"
import HelpPopup from "@/components/ui/helpPopup";
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
    const save = async () => {
        let date = new Date(dates)
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        let mois = "";
        switch (month) {
            case "01":
                mois = "Janvier"
                break;
            case "02":
                mois = "Fevrier"
                break;
            case "03":
                mois = "Mars"
                break;
            case "04":
                mois = "Avril"
                break;
            case "05":
                mois = "Mai"
                break;
            case "06":
                mois = "Juin"
                break;
            case "07":
                mois = "Juillet"
                break;
            case "08":
                mois = "Aout"
                break;
            case "09":
                mois = "Septembre"
                break;
            case "10":
                mois = "Octobre"
                break;
            case "11":
                mois = "Novembre"
                break;
            case "12":
                mois = "Decembre"
                break;
            default:
                mois = `#️⃣🐒`;
                break;
        }
        let total: number = 0;
        let totalBrut: number = 0;
        let totalPrime: number = 0;
        let totalRetenue: number = 0;
        let totalChargeNet: number = 0;
        let bol: boolean = false;
        try {
            employees.map((i) => {
                totalBrut = totalBrut + parseInt(i.poste.salaire);
                if (i.prime) {
                    totalPrime += parseInt(i.prime.montant)
                    total = totalBrut + total + parseInt(i.prime.montant)
                } else {
                    total = totalBrut + total
                }
                if (i.retenue) {
                    totalRetenue += parseInt(i.retenue.montant)
                }
            })
            totalChargeNet = totalBrut + totalPrime - totalRetenue;
            const ress = await fetch("/api/depenses?typeDepense=salaire", { cache: "no-store" })

            const data : any[]= await ress.json();
            if (data.length > 0) {
                data.map((i) => {
                    if (i.date == `${year}-${month}-${day}T00:00:00.000Z` && i.description == "Salaire du mois de " + mois && i.agenceId == agenceId) {
                        bol = true;
                    }
                })
            }
            if (!bol) {
                const datas = {
                    agenceId: agenceId,
                    description: "Salaire du mois de " + mois,
                    montant: totalChargeNet,
                    date: `${year}-${month}-${day}T00:00:00.000Z`,
                    typeDepense: "salaire",
                    idTypeDepense: "0",
                    motif: "",
                    piece: ""
                }
                // console.log(dates)
                const res = await fetch('/api/depenses', {
                    method: 'POST',
                    cache: 'no-store',
                    body: JSON.stringify(datas),
                })
    
                if (res.ok) {
                    alert("Dépense enregistrée")
                }
            }else{
                alert("Salaire déjà enregistré!")
            }
        } catch (err: any) {
            console.log(err)
        }
    }
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

        tabDepense.map((i: any) => {
            if (parseInt(`${i.date[0]}${i.date[1]}${i.date[2]}${i.date[3]}`) == parseInt(`${dates[0]}${dates[1]}${dates[2]}${dates[3]}`)) {
                if (parseInt(`${i.date[5]}${i.date[6]}`) == parseInt(`${dates[5]}${dates[6]}`)) {
                    tabEmploye.map((e: any) => {
                        let retenue: any = null;
                        let poste: any = null;
                        let prime: any = null;
                        
                        if (i.idTypeDepense == e.id && e.agenceId == parseInt(agenceId)) {
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

                            tab.push({ employe: e, poste: poste, depenses: i, prime: prime, retenue: retenue })
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

            tabEmploye.map((e: any) => {
                let retenue: any = null;
                let poste: any = null;
                let prime: any = null;
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
                tab.push({ employe: e, poste: poste, prime: prime, retenue: retenue })
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
                                <label htmlFor="" className=" mb-1 text-sm  text-gray-900 font-bold">Mois</label>
                                <input onChange={(e) => setDates(e.target.value)} required autoComplete="off" type="month" id="dateDepart" name="dateDepart" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-sm focus-visible:ring-blue-400 " />
                            </div>
                            <div>
                                <label className="  text-sm font-bold">Agence</label>
                                <select id="agenceId" name="agenceId" onChange={(e) => setAgenceId(e.target.value)} className="block text-xs w-full p-2 uppercase text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                    <option></option>
                                    {agences.map((item: any, i: number) => (
                                        <option key={i + 1} value={item.id}>{item.nom}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="text-white  hover:bg-blue-700 rounded-sm bg-blue-500 text-sm   p-2">Generer</button>
                        </form>
                        {employees.length > 0 && dates != "" && agenceId != "" ? (<button type="button" onClick={save} className="text-white mt-2 hover:bg-blue-700 rounded-sm bg-blue-500 text-sm flex gap-2  p-2">Valider et Enregistrer les salaires <HelpPopup message="Ce bouton permet d'enregistrer la somme totale des salaires en fonction du mois et de l'agence dans les dépenses" /> </button>) : null}


                    </div>
                </div>
                <div className="mt-4 bg-white p-4  shadow-2xl border">
                    <SalaireEmploye item={{ employes: employees, date: dates }} />
                </div>

            </div>
        </div>
    )
}