"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import svg from '@/public/images/user.svg';
import svg2 from '@/public/images/road.svg'
import svg4 from '@/public/images/passager.svg'
import svg5 from '@/public/images/passagers.svg'
import bussvg from '@/public/images/bus-logo.svg'
import agencesvg from '@/public/images/agence.svg'
import ticketsvg from '@/public/images/ticket.svg'
import reservationsvg from '@/public/images/reservation.svg'
import Link from 'next/link';

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
        const getAgence = async () => {
            const res = await fetch("/api/agences", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data: any[] = await res.json();
            setAgence(data.length)
        };
        getAgence()
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
        <div className='grid grid-cols-6 gap-4'>
            <div className=" shadow-xl border  text-blue-500 p-4 rounded-md overflow-hidden hover:translate-y-1 ease-linear transition-all">
                <div className='bg-white ring-2 ring-blue-400/40 w-14 h-14 items-center justify-center flex rounded-2xl shadow-2xl'>
                    <Image src={svg} width={40} height={40} alt='User Image' />
                </div>
                <h1 className=" pt-4 text-sm font-semibold uppercase">Employées ({employeesTotal})</h1>
                <Link href={'/dashboard/admin/employees'} className='text-green-400 font-semibold  text-xs'>Voir le rapport</Link>

            </div >
            <div className="shadow-xl border text-blue-500 p-4 rounded-md overflow-hidden hover:translate-y-1 ease-linear transition-all">
                <div className='bg-white ring-2 ring-blue-400/40 w-14 h-14 items-center justify-center flex rounded-2xl shadow-2xl'>
                    <Image src={svg5} width={40} height={40} alt='User Image' />
                </div>
                <h1 className=" pt-4 text-sm  font-semibold uppercase">Utilisateurs ({users})</h1>
                <Link href={'/dashboard/admin/employees/utilisateurs'} className='text-green-400 font-semibold  text-xs'>Voir le rapport</Link>
            </div >
            <div className="shadow-xl border text-blue-500 p-4 rounded-md overflow-hidden hover:translate-y-1 ease-linear transition-all">
                <div className='bg-white w-14 h-14 items-center justify-center flex rounded-2xl shadow-2xl'>
                    <Image src={bussvg} width={40} height={40} alt='User Image' />
                </div>
                <h1 className=" pt-4 text-sm  font-bold uppercase">Véhicules ({bus})</h1>
                <Link href={'/dashboard/admin/vehicles'} className='text-green-400 font-semibold  text-xs'>Voir le rapport</Link>

            </div >
            <div className="shadow-xl border text-blue-500 p-4 rounded-md overflow-hidden hover:translate-y-1 ease-linear transition-all">
                <div className='bg-white w-14 h-14 items-center justify-center flex rounded-2xl shadow-2xl'>
                    <Image src={svg2} width={40} height={40} alt='User Image' />
                </div>
                <h1 className=" pt-4 text-sm  font-bold uppercase">Trajet ({trajet})</h1>
                <Link href={'/dashboard/admin/trajets'} className='text-green-400 font-semibold  text-xs'>Voir le rapport</Link>

            </div >
            <div className="shadow-xl border text-blue-500 p-4 rounded-md overflow-hidden hover:translate-y-1 ease-linear transition-all">
                <div className='bg-white w-14 h-14 items-center justify-center flex rounded-2xl shadow-2xl'>
                    <Image src={agencesvg} width={40} height={40} alt='User Image' />
                </div>
                <h1 className=" pt-4 text-sm font-bold uppercase">Agences ({agence})</h1>
                <Link href={'/dashboard/admin/agences'} className='text-green-400 font-semibold  text-xs'>Voir le rapport</Link>

            </div >

            <div className="shadow-xl border text-blue-500 p-4 rounded-md overflow-hidden hover:translate-y-1 ease-linear transition-all">
                <div className='bg-white w-14 h-14 items-center justify-center flex rounded-2xl shadow-2xl'>
                    <Image src={svg4} width={40} height={40} alt='User Image' />
                </div>
                <h1 className=" pt-4 text-sm font-bold uppercase">Passager ({passager})</h1>
                <Link href={'/dashboard/admin/passagers'} className='text-green-400 font-semibold  text-xs'>Voir le rapport</Link>

            </div >
            <div className="shadow-xl border text-blue-500 p-4 rounded-md overflow-hidden hover:translate-y-1 ease-linear transition-all">
                <div className='bg-white w-14 h-14 items-center justify-center flex rounded-2xl shadow-2xl'>
                    <Image src={ticketsvg} width={40} height={40} alt='User Image' />
                </div>
                <h1 className=" pt-4 text-sm font-bold uppercase">Tickets ({ticket})</h1>
                <Link href={'/dashboard/admin/ticket'} className='text-green-400 font-semibold  text-xs'>Voir le rapport</Link>

            </div >
            {/* <div className="shadow-xl border text-blue-500 p-4 rounded-md overflow-hidden hover:translate-y-1 ease-linear transition-all">
                <div className='bg-white w-14 h-14 items-center justify-center flex rounded-2xl shadow-2xl'>
                    <Image src={reservationsvg} width={40} height={40} alt='User Image' />
                </div>
                <h1 className=" pt-4 text-sm font-bold uppercase">Reservations ({reservation})</h1>
                <Link href={'/dashboard/admin/reservations'} className='text-green-400 font-semibold  text-xs'>Voir le rapport</Link>

            </div > */}
        </div>
    )
}

export default GridDataComponent