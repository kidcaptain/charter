"use client"

import Popup from "@/components/ui/popup";
import { getDateFormat } from "@/functions/actionsClient";
import { FormEvent, useEffect, useState } from "react"

export default function Page() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenFormEdit, setIsOpenFormEdit] = useState<boolean>(false);
    const [postes, setPostes] = useState([]);
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
        try {
            const response = await fetch(`/api/postes/${itemEdit.id}`, {
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

    const HandlerSubmit = async (e: any) => {
        e.preventDefault()
        if (value != null) {
            try {
                const res = await fetch('/api/postes', {
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

    const deletePoste = async (id: number) => {
        if (confirm("Confimer la suppression")) {
            const res = await fetch(`/api/postes/${id}`, { method: "DELETE", cache: "no-store" })
            if (!res.ok) {
                configPopup("Impossible d'afficher les données. Veuillez actualiser la page!", "red", "Reservation");
            } else {
                configPopup("Poste supprimé", "green", "Reservation");
            }
        }
    }

    useEffect(() => {
        const getData = async () => {
            const res = await fetch("/api/postes", { cache: "no-store" })
            if (!res.ok) {
                configPopup("Impossible d'afficher les données. Veuillez actualiser la page!", "red", "Reservation");
            }
            const data = await res.json();
            setPostes(data)
        };
        getData();
    }, [postes])

    const modalForm = () => {
        if (isOpen) {
            return (
                <div className="fixed bg-black/60 z-10 top-0 left-0 flex justify-center items-center w-full h-full">
                    <form onSubmit={HandlerSubmit} className="w-96  bg-white rounded-sm shadow-xl">
                        <h2 className="p-4 text-left uppercase bg-blue-500 text-white">
                            Nouveau poste
                        </h2>
                        <div className="p-4" >
                            <div className="mt-4">
                                <label className=" text-sm font-bold text-gray-900  ">Titre</label>
                                <input type="text" onChange={handleInputChange} placeholder="Nommer le titre" required name="titre" id="titre" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                            </div>
                            <div className="mt-4">
                                <label className="  text-sm font-bold text-gray-900  ">Salaire</label>
                                <input type="number" onChange={handleInputChange} required id="salaire" name="salaire" placeholder="Salaire concernant le poste" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                            </div>
                            <div className="mt-4">
                                <label className="  text-sm font-bold text-gray-900  ">Date de paiement</label>
                                <input type="date" onChange={handleInputChange} required id="datePaiement" name="datePaiement" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
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
                        Editer le poste {itemEdit?.titre}
                    </h2>
                    <div className="p-4" >
                        <div className="mt-4">
                            <label className=" text-sm font-bold text-gray-900  ">Titre</label>
                            <input type="text" onChange={handleInputChangeInput} value={itemEdit?.titre} placeholder="Nommer le titre" required name="titre" id="titre" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                        </div>
                        <div className="mt-4">
                            <label className="  text-sm font-bold text-gray-900  ">Salaire</label>
                            <input type="number" onChange={handleInputChangeInput} value={itemEdit?.salaire} required id="salaire" name="salaire" placeholder="Salaire concernant le poste" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                        </div>
                        <div className="mt-4">
                            <label className="  text-sm font-bold text-gray-900  ">Date de paiement</label>
                            <input type="date" onChange={handleInputChangeInput} value={getDateFormat(itemEdit?.datePaiement)} required id="datePaiement" name="datePaiement" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                        </div>
                        <div className="mt-4">
                            <button type="submit" className="text-white text-xs hover:bg-yellow-600 rounded-sm bg-yellow-500 p-2">
                                Modifier
                            </button>
                            <button type="reset" id="buttonReset" className="text-white hover:shadow-md hover:bg-stone-700 rounded-sm bg-stone-500 text-xs mt-4 p-2">
                                Recommencer
                            </button>
                            <button onClick={() => setIsOpenFormEdit(false)} className=" text-stone-800 rounded-sm text-xs  p-2">Fermer</button>
                        </div>
                    </div>

                </form>
            </div>
        )
    }
    return (
        <div className="w-full p-10">
            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="text-xl text-gray-900">Postes</h1>

            </div>
            {modalForm()}
            <div className=" col-span-3 w-full bg-white shadow-2xl rounded-sm">
                <h1 className="uppercase p-4 border-b text-gray-900">Liste de postes</h1>
                <div className="p-4 bg-white">
                    <button onClick={handleButtonClick} className="text-white bg-blue-500 hover:bg-blue-600 text-xs p-2 rounded-sm">Ajouter un poste</button>
                </div>
                <div className="grid grid-cols-5 bg-stone-200 gap-4 p-4 overflow-x-auto">
                    {
                        postes.map((item: any, index: number) => (
                            <div key={index+1} className="text-xs border uppercase rounded-md bg-white shadow-md">
                                <div className="px-2 py-4 bg-orange-500  text-white border-b">
                                    <h4 className=" text-sm uppercase ">Poste Id {index + 1}</h4>
                                </div>
                                <div className="px-4 py-2 border-b">
                                    <h4 className="text-sm  font-bold uppercase ">Titre</h4>
                                    <p className="text-sm  text-gray-600">{item.titre}</p>
                                </div>
                                <div className="px-4 py-2 border-b">
                                    <h4 className="text-sm  font-bold uppercase ">Salaire</h4>
                                    <p className="text-sm  text-gray-600">{item.salaire} (Fcfa)</p>
                                </div>
                                <div className="px-4 py-2 border-b">
                                    <h4 className=" text-sm font-bold uppercase ">Date de paiement</h4>
                                    <p className="text-sm  text-gray-600">{getDateFormat(item.datePaiement)}</p>
                                </div>

                                <div className="px-4 py-2">
                                    <button onClick={() => deletePoste(item.id)} className="bg-red-500 hover:bg-red-600 rounded-sm text-white text-xs p-2">Supprimer</button>
                                    <button onClick={() => { setItemEdit({ id: item.id, titre: item.titre, salaire: item.salaire, datePaiement: getDateFormat(item.datePaiement) }); setIsOpenFormEdit(true) }} className="bg-yellow-500 hover:bg-yellow-600 rounded-sm text-white text-xs p-2">Modifier</button>
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