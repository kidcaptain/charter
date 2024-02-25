"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import svg from '@/public/images/user.svg';
import svg2 from '@/public/images/road.svg'
import svg4 from '@/public/images/passager.svg'
import user from '@/public/images/user.svg'
import bussvg from '@/public/images/bus-logo.svg'
import agencesvg from '@/public/images/agence.svg'

import ticketsvg from '@/public/images/ticket.svg'
import reservationsvg from '@/public/images/reservation.svg'

const GridDataComponent = () => {

    const [employeesTotal, setEmployeesTotal] = useState<number>(0);
    const [users, setUser] = useState<number>(0);
    const [bus, setBus] = useState<number>(0);
    const [trajet, setTrajet] = useState<number>(0);
    const [agence, setAgence] = useState<number>(0);
    const [passager, setPassager] = useState<number>(0);
    const [ticket, setTicket] = useState<number>(0);
    const [reservation, setReservation] = useState<number>(0);

    useEffect(() => {
        const getUser = async () => {
            const res = await fetch("/api/utilisateurs", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data: any[] = await res.json();
            setUser(data.length)
        };
        getUser()
        const getEmploye = async () => {
            const res = await fetch("/api/employes", { cache: "no-store" })
            if (!res.ok) {
                return []
            }
            const data:any[] = await res.json();
            setEmployeesTotal(data.length)
        };
        getEmploye()
        const getVehicule = async () => {
            const res = await fetch("/api/bus", { cache: "no-store" })
            if (!res.ok) {
                return []
            }
            const data:any[] = await res.json();
            setBus(data.length)
        };
        getVehicule()
        const getTrajet = async () => {
            const res = await fetch("/api/trajets", { cache: "no-store" })
            if (!res.ok) {
                return []
            }
            const data:any[] = await res.json();
            setTrajet(data.length)
        };
        getTrajet()
        const getPassager = async () => {
            const res = await fetch("/api/passagers", { cache: "no-store" })
            if (!res.ok) {
                return []
            }
            const data:any[] = await res.json();
            setPassager(data.length)
        };
        getPassager()
        const getTicket = async () => {
            const res = await fetch("/api/ticket", { cache: "no-store" })
            if (!res.ok) {
                return []
            }
            const data:any[] = await res.json();
            setTicket(data.length)
        };
        getTicket()
        const getReservation = async () => {
            const res = await fetch("/api/reservations", { cache: "no-store" })
            if (!res.ok) {
                return []
            }
            const data:any[] = await res.json();
            setReservation(data.length)
        };
        getReservation()

    }, [])
    return (
        <div className='grid grid-cols-4 gap-4'>
            <div className="bg-blue-400 border-2 border-blue-300 ring-2 ring-blue-400 bg-gradient-to-bl from-blue-600 p-4 rounded-md overflow-hidden">
                <div className='bg-white w-14 h-14 items-center justify-center flex rounded-2xl shadow-2xl'>
                    <Image src={svg} width={45} height={45} alt='User Image' />
                </div>
                <h1 className=" pt-4 text-sm text-white font-bold uppercase">Employées ({employeesTotal})</h1>
            </div >
            <div className="bg-blue-600 border-2 border-blue-300 ring-2 ring-blue-400 bg-gradient-to-bl from-purple-500 p-4 rounded-md overflow-hidden">
                <div className='bg-white w-14 h-14 items-center justify-center flex rounded-2xl shadow-2xl'>
                    <Image src={user} width={45} height={45} alt='User Image' />
                </div>
                <h1 className=" pt-4 text-sm text-white font-bold uppercase">Utilisateurs ({users})</h1>
            </div >
            <div className="bg-purple-500 border-2 border-blue-300 ring-2 ring-blue-400 bg-gradient-to-bl from-violet-500 p-4 rounded-md overflow-hidden">
                <div className='bg-white w-14 h-14 items-center justify-center flex rounded-2xl shadow-2xl'>
                    <Image src={bussvg} width={45} height={45} alt='User Image' />
                </div>
                <h1 className=" pt-4 text-sm text-white font-bold uppercase">Véhicules ({bus})</h1>
            </div >
            <div className="bg-purple-500 border-2 border-blue-300 ring-2 ring-blue-400 bg-gradient-to-bl from-red-400 p-4 rounded-md overflow-hidden">
                <div className='bg-white w-14 h-14 items-center justify-center flex rounded-2xl shadow-2xl'>
                    <Image src={agencesvg} width={45} height={45} alt='User Image' />
                </div>
                <h1 className=" pt-4 text-sm text-white font-bold uppercase">Agences ({trajet})</h1>
            </div >
            <div className="bg-emerald-500 border-2 border-blue-300 ring-2 ring-blue-400 bg-gradient-to-bl from-green-700 p-4 rounded-md overflow-hidden">
                <div className='bg-white w-14 h-14 items-center justify-center flex rounded-2xl shadow-2xl'>
                    <Image src={svg2} width={45} height={45} alt='User Image' />
                </div>
                <h1 className=" pt-4 text-sm text-white font-bold uppercase">Agences ({agence})</h1>
            </div >

            <div className="bg-blue-600 border-2 border-blue-300 ring-2 ring-blue-400 bg-gradient-to-br from-purple-500 p-4 rounded-md overflow-hidden">
                <div className='bg-white w-14 h-14 items-center justify-center flex rounded-2xl shadow-2xl'>
                    <Image src={svg4} width={45} height={45} alt='User Image' />
                </div>
                <h1 className=" pt-4 text-sm text-white font-bold uppercase">Passager ({passager})</h1>
            </div >
            <div className="bg-orange-500 border-2 border-blue-300 ring-2 ring-blue-400 bg-gradient-to-tr from-lime-400 p-4 rounded-md overflow-hidden">
                <div className='bg-white w-14 h-14 items-center justify-center flex rounded-2xl shadow-2xl'>
                    <Image src={ticketsvg} width={45} height={45} alt='User Image' />
                </div>
                <h1 className=" pt-4 text-sm text-white font-bold uppercase">Tickets ({ticket})</h1>
            </div >
            <div className="bg-lime-500 border-2 border-blue-300 ring-2 ring-blue-400 bg-gradient-to-bl from-green-400 p-4 rounded-md overflow-hidden">
                <div className='bg-white w-14 h-14 items-center justify-center flex rounded-2xl shadow-2xl'>
                    <Image src={reservationsvg} width={45} height={45} alt='User Image' />
                </div>
                <h1 className=" pt-4 text-sm text-white font-bold uppercase">Reservations ({reservation})</h1>
            </div >
        </div>
    )
}

export default GridDataComponent