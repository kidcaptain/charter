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

const GridDataComptable = () => {

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
            const data: any[] = await res.json();
            setEmployeesTotal(data.length)
        };
        getEmploye()
        const getVehicule = async () => {
            const res = await fetch("/api/bus", { cache: "no-store" })
            if (!res.ok) {
                return []
            }
            const data: any[] = await res.json();
            setBus(data.length)
        };
        getVehicule()
        const getTrajet = async () => {
            const res = await fetch("/api/trajets", { cache: "no-store" })
            if (!res.ok) {
                return []
            }
            const data: any[] = await res.json();
            setTrajet(data.length)
        };
        getTrajet()
        const getPassager = async () => {
            const res = await fetch("/api/passagers", { cache: "no-store" })
            if (!res.ok) {
                return []
            }
            const data: any[] = await res.json();
            setPassager(data.length)
        };
        getPassager()
        const getTicket = async () => {
            const res = await fetch("/api/ticket", { cache: "no-store" })
            if (!res.ok) {
                return []
            }
            const data: any[] = await res.json();
            setTicket(data.length)
        };
        getTicket()
        const getReservation = async () => {
            const res = await fetch("/api/reservations", { cache: "no-store" })
            if (!res.ok) {
                return []
            }
            const data: any[] = await res.json();
            setReservation(data.length)
        };
        getReservation()

    }, [])
    return (
        <div className='grid grid-cols-4 gap-4'>
            <div className={"bg-white text-gray-800 rounded-sm  border border-black p-8 shadow-lg overflow-hidden"}>
                <div className="items-center flex gap-4 justify-start flex-row">
                    <Image src={svg} alt="svg" width={48} height={48} />
                    <div>
                        <h1 className="  text-sm  font-bold uppercase">Employées ({employeesTotal})</h1>
                    </div>
                </div>
            </div>
            <div className={"bg-white text-gray-800 rounded-sm  border border-black p-8 shadow-lg overflow-hidden"}>
                <div className="items-center flex gap-4 justify-start flex-row">
                    <Image src={svg} alt="svg" width={48} height={48} />
                    <div>
                        <h1 className="  text-sm  font-bold uppercase">Utilisateurs ({users})</h1>
                    </div>
                </div>
            </div>
            <div className={"bg-white text-gray-800 rounded-sm  border border-black p-8 shadow-lg overflow-hidden"}>
                <div className="items-center flex gap-4 justify-start flex-row">
                    <Image src={bussvg} alt="svg" width={48} height={48} />
                    <div>
                        <h1 className="  text-sm  font-bold uppercase">Véhicules ({bus})</h1>
                    </div>
                </div>
            </div>
            <div className={"bg-white text-gray-800 rounded-sm  border border-black p-8 shadow-lg overflow-hidden"}>
                <div className="items-center flex gap-4 justify-start flex-row">
                    <Image src={agencesvg} alt="svg" width={48} height={48} />
                    <div>
                        <h1 className="  text-sm  font-bold uppercase">Trajets ({trajet})</h1>
                    </div>
                </div>
            </div>
            <div className={"bg-white text-gray-800 rounded-sm  border border-black p-8 shadow-lg overflow-hidden"}>
                <div className="items-center flex gap-4 justify-start flex-row">
                    <Image src={svg2} alt="svg" width={48} height={48} />
                    <div>
                        <h1 className="  text-sm  font-bold uppercase">Agences ({agence})</h1>
                    </div>
                </div>
            </div>
            <div className={"bg-white text-gray-800 rounded-sm  border border-black p-8 shadow-lg overflow-hidden"}>
                <div className="items-center flex gap-4 justify-start flex-row">
                    <Image src={svg4} alt="svg" width={48} height={48} />
                    <div>
                        <h1 className="  text-sm  font-bold uppercase">Passager ({passager})</h1>
                    </div>
                </div>
            </div>
            <div className={"bg-white text-gray-800 rounded-sm  border border-black p-8 shadow-lg overflow-hidden"}>
                <div className="items-center flex gap-4 justify-start flex-row">
                    <Image src={ticketsvg} alt="svg" width={48} height={48} />
                    <div>
                        <h1 className="  text-sm  font-bold uppercase">Tickets ({ticket})</h1>
                    </div>
                </div>
            </div>
            <div className={"bg-white text-gray-800 rounded-sm  border border-black p-8 shadow-lg overflow-hidden"}>
                <div className="items-center flex gap-4 justify-start flex-row">
                    <Image src={reservationsvg} alt="svg" width={48} height={48} />
                    <div>
                        <h1 className="  text-sm  font-bold uppercase">Reservations ({reservation})</h1>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default GridDataComptable