"use client"
import BulletinPaie from "@/components/ui/bulletinPaie"
import Image from "next/image";
import Link from "next/link";
import svg from '@/public/images/loader.svg'
import { useState, useEffect } from "react"

interface IPrams {
    employeId?: string
}


export default function Page({ params }: { params: IPrams }) {

    const [tab, setTab] = useState<{ label: string, base: number, taux: number, gains: number, retenue: number }>(
        {
            label: "Salaire de base",
            base: 0,
            taux: 0,
            gains: 0,
            retenue: 0
        }
    )
    const [employe, setEmploye] = useState<any>(new Date())
    const [poste, setPoste] = useState<any[]>([])
    const [agence, setAgence] = useState<any[]>([])
    const [dateUpdate, setDateUpdate] = useState<any>()
    useEffect(() => {
        const getPoste = async () => {
            const res = await fetch("/api/postes", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setPoste(data)
            return data
        };

        const getAgence = async () => {
            const res = await fetch("/api/agences", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setAgence(data)
            return data
        };

        const getData = async () => {
            const res = await fetch(`/api/employes/${params.employeId}`, { cache: "no-store" })
            if (!res.ok) {

            }
            const data = await res.json();
            return data
        };

        const selectEmploye = async () => {
            const employee = await getData();
            const tabPoste: any[] = await getPoste();
            const tabAgence: any[] = await getAgence();
            tabPoste.map((i) => {
                tabAgence.map((j) => {
                    if ((employee.posteId == i.id) && (employee.agenceId == j.id)) {
                        setEmploye({ poste: i, employe: employee, agence: j })
                    }
                })
            })
        }
        selectEmploye()

    }, [])

    return (
        <div className="p-10 ">
            <div className=" py-4 flex lowercase text-sm justify-between items-start mb-2">
                <h1 className=" text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/comptable/employees"}>Employés</Link> / <Link className="hover:text-blue-600" href="#"> Bulletin de paie</Link></h1>
            </div>
            <div className="bg-white border shadow-2xl">
                <h2 className="p-4  uppercase border-b">
                    Fiche de paie
                </h2>
                <div className="p-4 border">
                    <div>
                        <label htmlFor="" className="text-gray-800 font-bold block ">Date</label>
                        <input type="date" onChange={e => setDateUpdate(e.target.value)} name="" className="inline-block p-2 text-xs text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " id="" />
                        {/* <button onClick={onSubmit} className=" hover:bg-green-600 inline-block text-xs border p-2 rounded-sm text-white bg-green-500">Génerer</button> */}
                    </div>
                </div>
               
            </div>
            {!employe.employe ?
                (<Image src={svg} className='animate-spin mx-auto' width={25} height={25} alt='Loader image' />) :
                (
                    <BulletinPaie item={{ date: dateUpdate, salaire: employe?.poste?.salaire, employe: employe?.employe, agence: employe?.agence?.nom, poste: employe?.poste?.titre }} />
                )}
        </div>
    )
}