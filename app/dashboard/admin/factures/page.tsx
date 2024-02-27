"use client"

import Popup from "@/components/ui/popup";
import { useEffect, useState } from "react"
import svg from "@/public/images/valide.svg"
import Image from "next/image";

export default function Page() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [popupData, setPopupData] = useState<{ message: string, title?: string, color: string }>({ message: "", title: "", color: "" })
    const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
    const [value, setValue] = useState<any>()
    const [factures, setFactures] = useState<any[]>([])
    const [agence, setAgence] = useState([])
    const [file, setFile] = useState<File>();
    const [itemEdit, setItemEdit] = useState<any>(null)
    const [agenceId, setAgenceId] = useState<any>()
    const [nom, setNom] = useState<any>()
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

    const onSubmitVerso = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file) return;
        try {
            const dataImg = new FormData();
            dataImg.append("files", file);
            const res = await fetch('/api/other', {
                method: 'POST',
                body: dataImg
            })
            const p = await res.json()
            console.log(p)
            if (!res.ok) {
                alert("Impossible de télécharger le fichier!")
                return;
            }

            const datas = {
                src: p.fileUrl,
                agenceId: agenceId,
                nom: nom,
                ext: file.name.slice((file.name.lastIndexOf(".") - 1 >>> 0) + 2),
                montant: 0
            }


            const reps = await fetch("/api/factures", { method: 'POST', cache: "no-store", body: JSON.stringify(datas) })
            if (!reps.ok) {
                configPopup("Impossible de modifier ces données veuillez. Veuillez actualiser la page!", "red", "Reservation");
                return;
            }
            configPopup("Facture enregistrée!", "green", "");

        } catch (error) {
            console.error(error)
        }
    }

    const deleteFacture = async (id: number) => {
        if (confirm("Confimer la suppression")) {
            const res = await fetch(`/api/factures/${id}`, { method: "DELETE", cache: "no-store" })
            if (!res.ok) {
                configPopup("Impossible d'afficher les données. Veuillez actualiser la page!", "red", "Reservation");
            } else {
                configPopup("Facture supprimé", "green", "Reservation");
            }
        }
    }

    const HandlerSubmit = async (e: any) => {
        e.preventDefault()
        console.log(value)
        if (value != null) {
            try {
                const res = await fetch('/api/factures', {
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
        const getAgence = async () => {
            const res = await fetch("/api/agences", { cache: "no-store" })
            if (!res.ok) {
                configPopup("Impossible d'afficher les données. Veuillez actualiser la page!", "red", "Reservation");
            }
            const data = await res.json();
            setAgence(data)
        };
        getAgence();
        const getData = async () => {
            const res = await fetch("/api/factures", { cache: "no-store" })
            if (!res.ok) {
                configPopup("Impossible d'afficher les données. Veuillez actualiser la page!", "red", "Reservation");
            }
            const data = await res.json();
            setFactures(data)
        };
        getData();
    }, [factures])

    const modalForm = () => {
        if (isOpen) {
            return (
                <div className="fixed bg-black/60 z-10 top-0 left-0 flex justify-center items-center w-full h-full">
                    <form onSubmit={onSubmitVerso} className="w-96 bg-white rounded-md overflow-hidden flex flex-col justify-between shadow-xl">
                        <h2 className=" from-blue-800 bg-gradient-to-br p-4 bg-blue-500 text-left text-white uppercase">
                            Ajouter une Facture
                        </h2>
                        <div className="p-4">
                            <label htmlFor="" className="block mb-1 text-sm  text-gray-900 font-bold">Fichier</label>
                            <input type="file" required onChange={(e) => setFile(e.target.files?.[0])} name="file" id="file"/>
                            <label htmlFor="" className="block mb-1 text-sm  text-gray-900 font-bold">Nom</label>
                            <input type="text" required onChange={(e) => setNom(e.target.value)}  name="file" id="file"/>
                            <div className="mt-2">
                                <label className="  text-sm font-bold">Agence</label>
                                <select id="agenceId" name="agenceId" onChange={(e) => setAgenceId(e.target.value)} className="block text-xs w-full p-2 uppercase text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                    <option></option>
                                    {agence.map((item: any, i: number) => (
                                        <option key={i + 1} value={item.id}>{item.nom}</option>
                                    ))}
                                </select>
                            </div>

                            {/* <button className="bg-orange-400 text-xs uppercase text-white p-2 font-bold">Uploader</button> */}
                            <button type="submit" className="text-white text-xs mt-4 uppercase font-bold hover:bg-blue-700 rounded-sm bg-blue-500  p-2">
                                Enregistrer
                            </button>
                            <button onClick={handleButtonClick} className="hover:bg-stone-800 uppercase font-bold bg-stone-700 text-white text-xs p-2">Fermer</button>
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
            const response = await fetch(`/api/Factures/${itemEdit.id}`, {
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

    return (
        <div className="w-full p-10">
            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="text-xl text-gray-900">Factures</h1>
            </div>
            {modalForm()}
            <div className="flex gap-2 items-end my-2">
                <button onClick={handleButtonClick} className="text-white bg-blue-600 hover:bg-blue-700 text-xs flex p-2 rounded-sm">Ajouter une Factures</button>
            </div>
            <div className=" w-full bg-white rounded-sm shadow-2xl border">
                <h2 className="p-4 border-b bg-white uppercase">Liste de Facture</h2>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase ">
                        <tr>
                            <th scope="col" className="px-3 border py-2">
                                Id#
                            </th>
                            <th scope="col" className="px-3 border py-2">
                                fichier
                            </th>
                          
                            <th scope="col" className="px-3 border py-2">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            factures.map((item: any, index: number) => (
                                <tr key={index}>
                                    <th scope="row" className="px-3 py-2 border ">
                                        {index + 1}
                                    </th>
                                    <td className="px-3 py-2 border">
                                        {item.nom}
                                    </td>
                       
                                    <td className="px-3 py-2 border">
                                        <a  href={`${item.src}${item.ext}`} download={`${item.nom}${item.ext}`} className="text-white text-xs mt-4 hover:bg-red-700 rounded-sm bg-red-500  p-2">
                                            Telecharger
                                        </a>


                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
            {isOpenPopup ? (<Popup color={popupData?.color} title={popupData.title} message={popupData?.message} onShow={() => setIsOpenPopup(false)} />) : null}
        </div>
    )
}