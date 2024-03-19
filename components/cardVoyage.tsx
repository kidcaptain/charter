"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import ModalReservation from "./modalReservation";
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
    isHidden: boolean,
}) {

    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [agence, setAgence]= useState<string>("")

    useEffect(() => {
        const getAgences = async () => {
            const res = await fetch("/api/agences/"+props.agence, { cache: "no-store" })
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
        <div title={`${props.isVip ? 'Bus vip' :'Bus standard' }`} className={`bg-white  max-w-96  rounded-md overflow-hidden  border-t-8 ${props.isVip ? 'border-t-yellow-400' :'border-t-slate-700' } transition-all ease-linear`}>
            <h6 className=" my-2 text-sm text-center font-semibold ">Départ le {props.date}</h6>
            <div className="pb-3 sm:pb-4 flex items-center justify-between space-x-4  p-4 rtl:space-x-reverse">
                <div className="flex gap-2 items-center">
                    <div className=" flex border-blue-500 border-2 rounded-full p-2 font-medium items-center gap-4 truncate dark:text-white stroke-white">
                        <Image src={trajetSvg} height={24} width={24} alt="trajet svg" />
                    </div>
                    <div>
                        <span className="font-bold text-sm uppercase ">Charter Express</span> <br />
                        <span className="font-semibold text-sm">{agence}</span> <br />
                    </div>
                </div>
                <div className="text-right">
                    <span className="font-medium uppercase">{props.prix} Fcfa</span> <br />
                    <span className="font-semibold text-gray-500 text-xs" >Places restantes {props.placeDisponible}</span>
                </div>
            </div>
            <hr className="border-dashed border-spacing-4" />
            <div className="p-4 flex justify-between">
                <div>
                    <div>
                        <span className="text-sm">{props.heureDepart}</span> <br />
                        <span className="text-xs font-semibold text-gray-600">Heure de départ</span>
                    </div>
                    <div>
                        <span className="text-sm uppercase">{props.lieuDepart}</span> <br />
                        <span className="text-xs font-semibold text-gray-600">Lieu de départ</span>
                    </div>
                </div>
            

                <div className="text-right">
                    {/* <div>
                        <span className="text-sm">{props.heureArrive}</span> <br />
                        <span className="text-xs font-semibold text-gray-600">Heure de d&apos;arrivée</span>
                    </div> */}
                    <div>
                        <span className="text-sm uppercase">{props.lieuArrive}</span> <br />
                        <span className="text-xs font-semibold text-gray-600">Lieu de d&apos;arrivée</span>
                    </div>
                </div>
            </div>
            {
                props.isHidden ? (
                    ''
                ) : (<div className="p-4 bg-slate-700">
                    <button onClick={HandlerChange} className="text-stone-100 font-medium text-xs">{isOpen ? 'Masquer' : 'Afficher'}</button>
                    {isOpen ? (
                        <div>
                            <div className="flex gap-2 mb-2 items-center">
                                {/* <button className="text-white flex px-4 items-center gap-2 justify-center hover:shadow-md transition ease-linear hover:from-green-700 rounded-sm bg-green-500 text-xs mt-4 from-green-600 bg-gradient-to-t p-2">Valider</button>
                                <button className="text-white flex px-4 items-center gap-2 justify-center hover:shadow-md transition ease-linear hover:from-yellow-700 rounded-sm bg-yellow-500 text-xs mt-4 from-yellow-600 bg-gradient-to-t p-2">Suspendre</button> */}
                                <button onClick={() => showModal(true)} className="text-white flex px-4 items-center gap-2 justify-center hover:shadow-md transition ease-linear hover:from-blue-700 rounded-sm bg-blue-500 text-xs mt-4 from-blue-600 bg-gradient-to-t p-2">Faire une reservation</button>
                            </div>
                            <Link className="text-xs text-white" href={`/dashboard/caisse/voyages/${props.id}`}>Voir les informations sur le voyage</Link>
                        </div>

                    ) : ''}
                </div>)
            }
            {isOpenModal ? (<ModalReservation childToParent={showModal} voyageId={props.id} />) : ''}


        </div>
    )
}