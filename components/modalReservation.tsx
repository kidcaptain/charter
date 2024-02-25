"use client"
import Image from "next/image";
import CardVoyage from "./cardVoyage";
import InputForm from "./ui/inputForm";
import busSvg from "@/public/images/bus-logo.svg"
import { useState, useEffect } from "react";
import AddFormPassager from "./passager/AddFormPassager";

export default function ModalReservation(props: { childToParent: Function, voyageId: number }) {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [passager, setPassager] = useState<any>();
    const [searchValue, setSearchValue] = useState("")
    
    const HandlerSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const res = await fetch(`/api/passagers?tel=${searchValue}`, {
                method: 'GET', cache: 'no-store'
            })
            const data = await res.json()       
            setPassager(data)
        } catch (err) {
            console.log(err)
        }
    }

    const postReservation = async (id: number) => {
        const date = new Date()
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        const data = {
            passagerId: id,
            voyageId: props.voyageId,
            agenceId: 1,
            dateReservation: `${year}-${month}-${day}`,
            statutReservation: "en attente",
        }
        try {
            const res = await fetch(`/api/reservations`, {
                method: 'POST', cache: 'no-store', body: JSON.stringify(data)
            })

            if (res.ok) {
                props.childToParent(false)
            }
            
        } catch (err) {
            console.log(err)
        }
    }

    const handleOnEmit = (val: any) => {
        if (val) {
            postReservation(val);
        }
    }
    return (
        <section className="bg-black/50 w-full h-full grid items-center top-0 left-0 fixed z-20">
            <div className="bg-white max-w-xl w-full m-auto rounded-md shadow-md  ">
                <h2 className=" text-gray-900 text-sm p-4 border-b uppercase">
                    Information du client
                </h2>
                {isOpen ? (
                    <div className="p-10 flex flex-col gap-5 items-center">
                        <div className="w-full max-w-96">
                            <input type="search" name="" id="" onChange={e => { setSearchValue(e.target.value) }} placeholder="Numèro de téléphone du passager" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2 focus:ring-2  focus:outline-none sm:text-md focus-visible:ring-blue-400" />
                            <button onClick={HandlerSubmit} className="text-white flex px-8 items-center gap-2 w-full justify-center hover:shadow-md transition ease-linear hover:bg-green-700 rounded-sm bg-green-600 text-xs mt-4 p-2">Rechercher</button>
                        </div>
                        {passager ? (
                            <ul className="w-full max-w-96">
                                <li className="mb-2 bg-yellow-100 p-2 text-xs text-center"><span className=" ">Passager déja enregistré</span></li>
                                <li className="border-b mb-2" >
                                    <h6 className="text-left font-bold" >Nom et prénom</h6>
                                    <p className="text-gray-700">{passager?.nom} {passager?.prenom}</p>
                                </li>
                                <li className="border-b mb-2" >
                                    <h6 className="text-left font-bold" >Adresse</h6>
                                    <p className="text-gray-700">{passager?.adresse}</p>
                                </li>
                                <li className="border-b mb-2" >
                                    <h6 className="text-left font-bold" >Téléphone</h6>
                                    <p className="text-gray-700">{passager?.telephone}</p>
                                </li>
                                <li>
                                    <button onClick={() => postReservation(passager?.id)} className="text-white flex px-4 items-center gap-8 justify-center hover:shadow-md transition ease-linear hover:bg-cyan-700 rounded-sm bg-cyan-500 text-xs  p-2">Faire une reservation</button>
                                </li>
                            </ul>) : (
                                <div className="mb-2 bg-blue-100 p-2 text-xs text-center"><span className=" ">Numèro inconnue ou incorrect. Veuillez recommencer ou enregistrer le passager!</span></div>
                            )
                        }
                    </div>
                ) : (
                    <div className="p-10">
                        <div className=" max-w-96 m-auto border">
                            <AddFormPassager childToParent={handleOnEmit} />
                        </div>
                    </div>
                )}

                <div className="p-4 px-8 flex gap-4">
                    <button onClick={() => props.childToParent(false)} className="  text-white  text-xs p-2  bg-stone-800 rounded-sm">Fermer</button>
                    {isOpen ? (
                        <button onClick={() => setIsOpen(false)} className="text-white flex px-4 items-center gap-8 justify-center hover:shadow-md transition ease-linear hover:bg-blue-700 rounded-sm bg-blue-500 text-xs  p-2">Nouveau passager</button>
                    ) : (
                        <button onClick={() => setIsOpen(true)} className="text-white flex px-4 items-center gap-8 justify-center hover:shadow-md transition ease-linear hover:bg-green-700 rounded-sm bg-green-500 text-xs  p-2">Recherche</button>
                    )}
                </div>
            </div>
        </section>
    )
}