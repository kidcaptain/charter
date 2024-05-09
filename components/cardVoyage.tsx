"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import trajetSvg from '@/public/images/trajet.svg'

export default function CardVoyage(props: {
    id: number,
    lieuDepart: string,
    heureDepart: string,
    lieuArrive: string,
    heureArrive: string,
    placeDisponible: number,
    date: string,
    agence: string,
    prix: number,
    isVip: boolean,
    bus: string,
    isHidden: boolean,
}) {

    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [agence, setAgence] = useState<string>("")

    useEffect(() => {
        const getAgences = async () => {
            const res = await fetch("/api/agences/" + props.agence, { cache: "no-store" })
            if (!res.ok) {
                return null
            }
            const data = await res.json();
            setAgence(data?.nom)
        }
        getAgences();
    }, [])

    const HandlerChange = () => {
        setIsOpen(!isOpen);
    }

    const showModal = (val: boolean) => {
        setIsOpenModal(val);
    }
    return (
        <div title={`${props.isVip ? 'Bus vip' : 'Bus standard'}`} className={`bg-white  max-w-96  rounded-md overflow-hidden  border-t-8 ${props.isVip ? 'border-t-yellow-400' : 'border-t-slate-700'} transition-all ease-linear`}>
            <h6 className=" mt-2  uppercase text-center font-semibold ">Départ le {props.date}</h6>
            <div className="pb-3  flex items-center justify-between space-x-4  p-4 rtl:space-x-reverse">
                <div className="flex gap-2 items-center">
                    <div className=" flex border-blue-500 border-2 rounded-full p-2 font-medium items-center gap-4 truncate dark:text-white stroke-white">
                        <Image src={trajetSvg} height={24} width={24} alt="trajet svg" />
                    </div>
                    <div>
                        <span className="font-bold text-sm uppercase ">Agence de voyages</span> <br />
                        <span className="font-semibold text-sm">{agence}</span> <br />
                    </div>
                </div>
                <div className="text-right">
                    <span className="font-medium uppercase">{props.prix} Fcfa</span> <br />
                    <span className="font-semibold text-gray-500 text-sm" >Places restantes {props.placeDisponible}</span>
                </div>
            </div>
            <hr className={`border-dashed border-2 border-spacing-4 ${props.isVip ? 'border-yellow-400' : 'border-slate-700'}`} />
            <div className="">
                <div>
                    <div className="flex justify-between p-2 border-b  ">
                        <span className="text-sm font-semibold text-gray-600 uppercase">Heure de départ</span>
                        <span className="text-sm ">{props.heureDepart}</span> 
                    </div>
                    <div className="flex justify-between p-2 border-b ">
                        <span className="text-sm font-semibold text-gray-600 uppercase">Lieu de départ</span>
                        <span className="text-sm uppercase">{props.lieuDepart}</span> 
                    </div>
                    <div className="flex justify-between p-2 border-b ">
                        <span className="text-sm font-semibold text-gray-600 uppercase">Lieu de d&apos;arrivée</span>
                        <span className="text-sm uppercase">{props.lieuArrive}</span> 
                    </div>
                    <div className="flex justify-between p-2 border-b ">
                        <span className="text-sm font-semibold text-gray-600 uppercase">Bus</span>
                        <span className="text-sm uppercase">BUS-0{props.bus}</span> 
                    </div>
                </div>
            </div>
        </div>
    )
}