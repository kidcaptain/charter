"use client"

import Popup from "@/components/ui/popup";
import { getDateFormat } from "@/functions/actionsClient";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

interface IPrams {
    vehiculeId?: string
}


export default function Page({ params }: { params: IPrams }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenFormEdit, setIsOpenFormEdit] = useState<boolean>(false);
    const [piece, setPiece] = useState([]);
    const [popupData, setPopupData] = useState<{ message: string, title?: string, color: string }>({ message: "", title: "", color: "" })
    const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    }

    const [value, setValue] = useState<any>()
    const [itemEdit, setItemEdit] = useState<any>(null)


    const handleInputChangeInput = (e: any) => {
        setItemEdit({ ...itemEdit, [e.target.name]: e.target.value });
    };

    const HandlerSubmitEdit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const date = new Date()
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate()
        if (params.vehiculeId) {
            const datas = {
                nom: itemEdit.nom,
                datePeremption: `${itemEdit.datePeremption}T00:00:00.000Z`,
                dateUpdate: `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? "0" + day : day}T00:00:00.000Z`,
                busId: parseInt(params.vehiculeId)
            }
            try {
                const response = await fetch(`/api/piece/${itemEdit.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(datas),
                })
                const a = await response.json()

                if (response.ok) {
                    setIsOpenFormEdit(false);
                    configPopup("Piece edité!", "green", "Reservation");
                    setItemEdit(null);
                } else {
                    configPopup("Erreur", "red", "Reservation");
                }
            } catch (err) {
                console.log(err)
                configPopup("Erreur", "red", "Reservation");
            }
        }
    }

    const HandlerSubmit = async (e: any) => {
        e.preventDefault()
        if (value != null && params.vehiculeId) {
            try {
                const date = new Date()
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate()

                const datas = {
                    nom: value.nom,
                    datePeremption: `${value.datep}T00:00:00.000Z`,
                    dateUpdate: `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? "0" + day : day}T00:00:00.000Z`,
                    busId: parseInt(params.vehiculeId)
                }
                const res = await fetch('/api/piece', {
                    method: 'POST',
                    cache: 'no-store',
                    body: JSON.stringify(datas),
                })
                const data = await res.json();
                if (res.ok) {
                    setIsOpen(false);
                    configPopup("Nouvelle piece ajoutée!", "green", "Reservation");
                    setValue(null);
                    document.getElementById('buttonReset')?.click();
                }
            } catch (err: any) {
                console.log(err)
                configPopup("Erreur!", "red", "Reservation");
            }
        }
    }
    const handleInputChange = (event: any) => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setValue((oldValue: any) => {
            return { ...oldValue, [target.name]: value }
        })
    }
    const configPopup = (message: string, color: string, title: string) => {
        setPopupData({ message: message, color: color, title: title })
        setIsOpenPopup(true)
        setTimeout(() => {
            setIsOpenPopup(false)
        }, 5000);
    }

    const deletePiece = async (id: number) => {
        if (confirm("Confimer la suppression")) {
            const res = await fetch(`/api/piece/${id}`, { method: "DELETE", cache: "no-store" })
            if (!res.ok) {
                configPopup("Impossible d'afficher les données. Veuillez actualiser la page!", "red", "Reservation");
            } else {
                configPopup("Piece supprimé", "green", "Reservation");
            }
        }
    }

    useEffect(() => {
        const getData = async () => {
            const res = await fetch("/api/piece?busId=" + params.vehiculeId, { cache: "no-store" })
            if (!res.ok) {
                configPopup("Impossible d'afficher les données. Veuillez actualiser la page!", "red", "Reservation");
            }
            const data = await res.json();
            setPiece(data)
        };
        getData();
    }, [piece])

    const modalForm = () => {
        if (isOpen) {
            return (
                <div className="fixed bg-black/60 z-10 top-0 left-0 flex justify-center items-center w-full h-full">
                    <form onSubmit={HandlerSubmit} className="w-96  bg-white rounded-sm shadow-xl">
                        <h2 className="p-4 text-left uppercase bg-blue-500 text-white">
                            Nouveau Piece
                        </h2>
                        <div className="p-4" >
                            <div className="mt-4">
                                <label className=" text-sm font-bold text-gray-900 dark:text-white">Nom</label>
                                <input type="text" onChange={handleInputChange} placeholder="Nommer le titre" required name="nom" id="nom" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                            </div>
                            <div className="mt-4">
                                <label className="  text-sm font-bold text-gray-900 dark:text-white">Date de péremption</label>
                                <input type="date" onChange={handleInputChange} required id="datep" name="datep" placeholder="Salaire concernant le Piece" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                            </div>
                            <div className="mt-4">
                                <button type="submit" className="text-white text-xs hover:bg-blue-600 rounded-sm bg-blue-500 p-2">
                                    Enregistrer
                                </button>
                                <button type="reset" id="buttonReset" className="text-white hover:shadow-md hover:bg-stone-700 rounded-sm bg-stone-500 text-xs mt-4 p-2">
                                    Recommencer
                                </button>
                                <button onClick={handleButtonClick} className=" text-stone-800 rounded-sm text-xs  p-2">Fermer</button>
                            </div>
                        </div>

                    </form>
                </div>
            )
        } else {
            return null
        }
    }
    const editForm = () => {
        return (
            <div className="fixed bg-black/60 z-10 top-0 left-0 flex justify-center items-center w-full h-full">
                <form onSubmit={HandlerSubmitEdit} className="w-96  bg-white rounded-sm shadow-xl">
                    <h2 className="p-4 text-left uppercase bg-yellow-500 text-white">
                        Editer la pièce {itemEdit?.nom}
                    </h2>
                    <div className="p-4" >
                        <div className="mt-4">
                            <label className=" text-sm font-bold text-gray-900 dark:text-white">Nom</label>
                            <input type="text" onChange={handleInputChangeInput} value={itemEdit?.nom} placeholder="Nommer le titre" required name="nom" id="nom" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                        </div>
                        <div className="mt-4">
                            <label className="  text-sm font-bold text-gray-900 dark:text-white">Date de péremption</label>
                            <input type="date" onChange={handleInputChangeInput} value={getDateFormat(itemEdit?.datePeremption)} required id="datePeremption" name="datePeremption" placeholder="Salaire concernant le Piece" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                        </div>

                        <div className="mt-4">
                            <button type="submit" className="text-white text-xs hover:bg-yellow-600 rounded-sm bg-yellow-500 p-2">
                                Modifier
                            </button>
                            <button type="reset" id="buttonReset" className="text-white hover:shadow-md hover:bg-stone-700 rounded-sm bg-stone-500 text-xs mt-4 p-2">
                                Recommencer
                            </button>
                            <button onClick={() => setIsOpenFormEdit(false)} className=" text-stone-800 border-black border rounded-sm text-xs  p-2">Fermer</button>
                        </div>
                    </div>

                </form>
            </div>
        )
    }
    return (
        <div className="w-full p-10">
             <div className=" py-4 flex lowercase text-sm justify-between items-start mb-2">
                <h1 className=" text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/admin/vehicles"}>Vehicules</Link> / <Link className="hover:text-blue-600" href="">Pièces du véhicules</Link></h1>
            </div>

            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="text-xl text-gray-900">Pièces du véhicule</h1>

            </div>
            {modalForm()}
            <div className=" col-span-3 w-full bg-white shadow-2xl rounded-sm">
                <h1 className="uppercase p-4 border-b text-gray-900">Liste de Pièces</h1>
                <div className="p-4 bg-white">
                    <button onClick={handleButtonClick} className="text-white bg-blue-500 hover:bg-blue-600 text-xs p-2 rounded-sm">Ajouter une Pièce</button>
                </div>
                <div className="grid grid-cols-5  gap-4 p-4 overflow-x-auto ">
                    {
                        piece.map((item: any, index: number) => (
                            <div key={index} className="text-xs border overflow-hidden uppercase rounded-md bg-white shadow-md">
                                <div className="px-4 py-2 border-b">
                                    <h4 className="text-sm  font-bold uppercase ">Pièce n° {index + 1}</h4>
                                    <p className="text-sm  text-gray-600">{item.nom}</p>
                                </div>
                                <div className="px-4 py-2 border-b">
                                    <h4 className="text-sm  font-bold uppercase ">Date Péremption</h4>
                                    <p className="text-sm  text-gray-600">{getDateFormat(item.datePeremption)}</p>
                                </div>


                                <div className="grid grid-cols-2">
                                    <button onClick={() => deletePiece(item.id)} className="bg-red-500 col-span-1 hover:bg-red-600 rounded-sm text-white text-xs p-2">Supprimer</button>
                                    <button onClick={() => { setItemEdit({ id: item.id, nom: item.nom, datePeremption: item.datePeremption }); setIsOpenFormEdit(true) }} className="bg-yellow-500 col-span-1 hover:bg-yellow-600 rounded-sm text-white text-xs p-2">Modifier</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            {isOpenPopup ? (<Popup color={popupData?.color} title={popupData.title} message={popupData?.message} onShow={() => setIsOpenPopup(false)} />) : null}
            {isOpenFormEdit ? (editForm()) : null}
        </div>
    )
}