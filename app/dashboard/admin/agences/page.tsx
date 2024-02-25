"use client"

import Popup from "@/components/ui/popup";
import { useEffect, useState } from "react"
import svg from "@/public/images/valide.svg"
import Image from "next/image";

export default function Agences() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [popupData, setPopupData] = useState<{ message: string, title?: string, color: string }>({ message: "", title: "", color: "" })
    const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
    const [value, setValue] = useState<any>()
    const [agences, setAgences] = useState([])
    const [itemEdit, setItemEdit] = useState<any>(null)
    const [isOpenFormEdit, setIsOpenFormEdit] = useState<boolean>(false);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
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

    const deleteAgence = async (id: number) => {
        if (confirm("Confimer la suppression")) {
            const res = await fetch(`/api/agences/${id}`, { method: "DELETE", cache: "no-store" })
            if (!res.ok) {
                configPopup("Impossible d'afficher les données. Veuillez actualiser la page!", "red", "Reservation");
            } else {
                configPopup("Agence supprimé", "green", "Reservation");
            }
        }
    }

    const HandlerSubmit = async (e: any) => {
        e.preventDefault()
        console.log(value)
        if (value != null) {
            try {
                const res = await fetch('/api/agences', {
                    method: 'POST',
                    cache: 'no-store',
                    body: JSON.stringify(value),
                })
                const data = await res.json();
                if (res.ok) {
                    setIsOpen(false);
                    configPopup("Poste enregistré!", "green", "Reservation");
                    setValue(null);
                    document.getElementById('buttonReset')?.click();
                }
            } catch (err: any) {
                console.log(err)
                configPopup("Erreur!", "red", "Reservation");
            }
        }
    }
    useEffect(() => {
        const getData = async () => {
            const res = await fetch("/api/agences", { cache: "no-store" })
            if (!res.ok) {
                configPopup("Impossible d'afficher les données. Veuillez actualiser la page!", "red", "Reservation");
            }
            const data = await res.json();
            setAgences(data)
        };
        getData();
    }, [agences])

    const modalForm = () => {
        if (isOpen) {
            return (
                <div className="fixed bg-black/60 z-10 top-0 left-0 flex justify-center items-center w-full h-full">
                    <form onSubmit={HandlerSubmit} className="w-96 bg-white rounded-md overflow-hidden flex flex-col justify-between shadow-xl">
                        <h2 className=" from-blue-800 bg-gradient-to-br p-4 bg-blue-500 text-left text-white uppercase">
                            Ajouter une agence
                        </h2>
                        <div className="p-4">
                            <div className="mt-4">
                                <label className="  text-sm text-gray-900 font-bold "></label>
                                <div className="flex gap-4 mb-1 items-start">
                                    <label className="block text-sm font-bold text-gray-900 ">Nom de l&apos;agence</label>
                                    {(value?.nom && value?.nom != "") ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                                </div>
                                <input type="text" name="nom" placeholder="Nom de l'agence" required onChange={handleInputChange} id="nom" className={`block text-xs w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ${(value?.nom && value?.nom != "") ? "bg-green-50 ring-green-400/30 ring-4" : null}`} />
                            </div>
                            <div className="mt-4">
                            <div className="flex gap-4 mb-1 items-start">
                                    <label className="block text-sm font-bold text-gray-900 ">Adresse de l&apos;agence</label>
                                    {(value?.nom && value?.nom != "") ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                                </div>
                                <label className="  text-sm text-gray-900 font-bold "></label>
                                <input type="text" name="adresse" placeholder="Adresse" required onChange={handleInputChange} id="adresse" className={`block text-xs w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ${(value?.adresse && value?.adresse != "") ? "bg-green-50 ring-green-400/30 ring-4" : null}`} />
                            </div>
                            <div className="mt-4">
                            <div className="flex gap-4 mb-1 items-start">
                                    <label className="block text-sm font-bold text-gray-900 ">Téléphone</label>
                                    {(value?.numeroTelephone && parseInt(value?.numeroTelephone) > 0) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                                </div>
                                <input type="number" name="numeroTelephone" placeholder="Numéro de téléphone" required onChange={handleInputChange} id="numeroTelephone" className={`block text-xs w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ${(value?.numeroTelephone && parseInt(value?.numeroTelephone) > 0) ? "bg-green-50 ring-green-400/30 ring-4" : null}`} />
                            </div>
                            <button type="submit" className="text-white text-xs mt-4 hover:bg-blue-700 rounded-sm bg-blue-500  p-2">
                                Enregistrer
                            </button>
                            <button onClick={handleButtonClick} className="hover:bg-stone-800 bg-stone-700 text-white text-xs p-2">Fermer</button>
                        </div>


                    </form>
                </div>
            )
        } else {
            return null
        }
    }

    const HandlerSubmitEdit = async (e: any) => {
        e.preventDefault()
        try {
            const response = await fetch(`/api/agences/${itemEdit.id}`, {
                method: 'PUT',
                body: JSON.stringify(itemEdit),
            })
            const a = await response.json()
            console.log(a)
            if (response.ok) {
                setIsOpenFormEdit(false);
                configPopup("Poste edité!", "green", "Reservation");
                setItemEdit(null);
            } else {
                configPopup("Erreur", "red", "Reservation");
            }
        } catch (err) {
            console.log(err)
            configPopup("Erreur", "red", "Reservation");
        }
    }

    const handleInputChangeInput = (e: any) => {
        setItemEdit({ ...itemEdit, [e.target.name]: e.target.value });
    };

    const editForm = () => {
        return (
            <div className="fixed bg-black/60 z-10 top-0 left-0 flex justify-center items-center w-full h-full">
                <form onSubmit={HandlerSubmitEdit} className="w-96 bg-white rounded-md overflow-hidden flex flex-col justify-between shadow-xl">
                    <h2 className=" from-cyan-800 bg-gradient-to-br  p-4 bg-cyan-500 text-left text-white uppercase">
                        Editer
                    </h2>
                    <div className="p-4">
                        <div className="mt-4">
                            <label className="  text-sm text-gray-900 font-bold ">Nom</label>
                            <input type="text" name="nom" placeholder="Nom de l'agence" value={itemEdit?.nom} onChange={handleInputChangeInput} id="nom" className={`block text-xs w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 `} />
                        </div>
                        <div className="mt-4">
                            <label className="  text-sm text-gray-900 font-bold ">Adresse</label>
                            <input type="text" name="adresse" placeholder="Adresse" value={itemEdit?.adresse} onChange={handleInputChangeInput} id="adresse" className={`block text-xs w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 `} />
                        </div>
                        <div className="mt-4">
                            <label className="  text-sm text-gray-900 font-bold ">Téléphone</label>
                            <input type="number" name="numeroTelephone" placeholder="Numéro de téléphone" value={itemEdit?.numeroTelephone} onChange={handleInputChangeInput} id="numeroTelephone" className={`block text-xs w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 `} />
                        </div>
                        <button type="submit" className="text-white text-xs mt-4 hover:bg-blue-700 rounded-sm bg-blue-500  p-2">
                            Modifier
                        </button>
                        <button onClick={() => setIsOpenFormEdit(false)} className="hover:bg-stone-800 bg-stone-700 text-white text-xs p-2">Fermer</button>
                    </div>


                </form>
            </div>
        )
    }
    return (
        <div className="w-full p-10">
            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="text-xl text-gray-900">Agences</h1>
            </div>
            {modalForm()}
            <div className="flex gap-2 items-end my-2">
                <button onClick={handleButtonClick} className="text-white bg-blue-600 hover:bg-blue-700 text-xs flex p-2 rounded-sm">Ajouter une agences</button>
            </div>
            <div className=" w-full bg-white rounded-sm shadow-2xl border">
                <h2 className="p-4 border-b bg-white uppercase">Liste de Agence</h2>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase ">
                        <tr>
                            <th scope="col" className="px-3 border py-2">
                                Id#
                            </th>
                            <th scope="col" className="px-3 border py-2">
                                Nom
                            </th>
                            <th scope="col" className="px-3 border py-2">
                                Adresse
                            </th>
                            <th scope="col" className="px-3 border py-2">
                                Numéros de Téléphone
                            </th>

                            <th scope="col" className="px-3 border py-2">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            agences.map((item: any, index: number) => (
                                <tr key={index}>
                                    <th scope="row" className="px-3 py-2 border ">
                                        {index + 1}
                                    </th>
                                    <td className="px-3 py-2 border">
                                        {item.nom}
                                    </td>
                                    <td className="px-3 py-2 border">
                                        {item.adresse}
                                    </td>
                                    <td className="px-3 py-2 border">
                                        {item.numeroTelephone}
                                    </td>
                                    <td className="px-3 py-2 border">
                                        <button onClick={() => deleteAgence(item.id)} type="button" className="text-white text-xs mt-4 hover:bg-red-700 rounded-sm bg-red-500  p-2">
                                            Supprimer
                                        </button>
                                        <button type="button" onClick={() => { setItemEdit(item); setIsOpenFormEdit(true) }} className="text-white text-xs mt-4 hover:bg-yellow-700 rounded-sm bg-yellow-500  p-2">
                                            Modifier
                                        </button>

                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
            {isOpenPopup ? (<Popup color={popupData?.color} title={popupData.title} message={popupData?.message} onShow={() => setIsOpenPopup(false)} />) : null}
            {isOpenFormEdit ? (editForm()) : null}
        </div>
    )
}