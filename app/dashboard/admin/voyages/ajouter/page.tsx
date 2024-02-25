"use client"

import Popup from "@/components/ui/popup";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {

    const [data, setData] = useState<any>()
    const [bus, setBus] = useState<any[]>([])
    const [agences, setAgences] = useState<any[]>([])
    const [trajet, setTrajet] = useState<any[]>([])
    const messagesError: string[] = ["La date de départ doit être supérieure ou égale à date d'aujourd'hui!", "La date d'arrivée doit être supérieure ou date égale a la date de départ", "Date incorrect", "Formulaire incomplet!"]
    const [messageError, setMessageError] = useState<string>("");
    const day: number = new Date().getDate();
    const month: number = new Date().getMonth() + 1;
    const year: number = new Date().getFullYear();

    const [popupData, setPopupData] = useState<{ message: string, title?: string, color: string }>({ message: "", title: "", color: "" })
    const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);

    const configPopup = (message: string, color: string, title: string) => {
        setPopupData({ message: message, color: color, title: title })
        setIsOpenPopup(true)
        setTimeout(() => {
            setIsOpenPopup(false)
        }, 5000);
    }


    const handleInputChange = (event: any) => {
        const target = event.target
        const data = target.type === 'checkbox' ? target.checked : target.value
        setData((oldValue: any) => {
            return { ...oldValue, [target.name]: data }
        })
    }

    const checkDates = (val: any) => {
        switch (val.name) {
            case "dateDepart":
                const d = new Date(val.value);
                if (day > d.getDate()) {
                    setMessageError(messagesError[0] + "(Jour incorrect)");
                } else if (month > d.getMonth() + 1) {
                    setMessageError(messagesError[0] + "(Mois incorrect)");
                } else if (year > d.getFullYear()) {
                    setMessageError(messagesError[0] + "Année incorrect")
                } else {
                    setMessageError("");
                }
                break;
            case "dateArrivee":
                const depart: any = document.getElementById("dateDepart");
                if (depart.value) {
                    const d = new Date(depart.value);
                    const d2 = new Date(val.value);
                    if (d2.getDate() < d.getDate()) {
                        setMessageError(messagesError[1] + "(Jour incorrect)");
                    } else if (d2.getMonth() + 1 < d.getMonth() + 1) {
                        setMessageError(messagesError[1] + "(Mois incorrect)");
                    } else if (d2.getFullYear() < d.getFullYear()) {
                        setMessageError(messagesError[1] + "Année incorrect")
                    } else {
                        setMessageError("");
                    }
                }
                break;
            default:
                setMessageError("");
                break;
        }
    }

    const HandlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const str = data.busId;
        const array = str.split(',').map(Number);
        if (messageError == "") {
            const voyage = {
                agenceId: data.agenceId,
                dateDepart: data.dateDepart,
                dateArrivee: data.dateArrivee,
                busId: `${array[0]}`,
                trajetId: data.trajetId,
                typeVoyage: data.typeVoyage,
                prixVoyage: data.prixVoyage,
                placeDisponible: array[1]
            }
            try {
                const response = await fetch('/api/voyages', {
                    method: 'POST',
                    cache: "no-store",
                    body: JSON.stringify(voyage),
                })
                if (response.ok) {
                    configPopup("Voyage programmé", "blue", "")
                    document.getElementById("resetbtn")?.click()
                    setData(null)
                }
            } catch (err) {
                console.log(err)
                configPopup("Une erreur c'est produite veuillez actualiser la page et reessayer!", "yellow", "")
            }
        } else {
            configPopup("Veuillez remplir correctement les informations!", "red", "")
        }
    }




    useEffect(() => {
        const getTrajet = async () => {
            const res = await fetch("/api/trajets", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setTrajet(data)
        };

        const getAgence = async () => {
            const res = await fetch("/api/agences", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setAgences(data)
        };

        const getBus = async () => {
            const res = await fetch("/api/bus", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setBus(data)
        };
        getBus();
        getTrajet();
        getAgence();
    }, [])



    return (
        <div className=" w-full p-10">
            <div className=" py-2 flex justify-between items-start">
                <h1 className="lowercase text-sm  text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/caisse/voyages"}>Voyages</Link> / <Link className="hover:text-blue-600" href="#">Ajouter</Link></h1>
            </div>
            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="text-xl text-gray-900">Programmer un voyage </h1>
            </div>
            <div className="max-w-2xl m-auto">
                <div className="">

                    <form onSubmit={HandlerSubmit} className="col-span-1 bg-white shadow-xl rounded-sm  ">
                        <h2 className=" text-gray-100 p-4 bg-green-500  uppercase">
                            Formulaire
                        </h2>
                        <div className=" m-auto p-4">
                            <div className="mt-4 text-center text-sm text-red-500 font-medium">
                                <span>
                                    {messageError != "" ? messageError : null}
                                </span>
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Date de Départ</label>
                                <input onChange={e => { checkDates(e.target); handleInputChange(e) }} required type="date" id="dateDepart" placeholder="Départ" name="dateDepart" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Date d&apos;arrivée</label>
                                <input onChange={e => { checkDates(e.target); handleInputChange(e) }} required type="date" id="dateArrivee" placeholder="Arrivée" name="dateArrivee" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Bus</label>
                                <select id="busId" name="busId" required onChange={handleInputChange} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                    <option></option>
                                    {bus.map((item: any, i: number) => (
                                        <option key={i} value={[item.id, item.placesDisponible]}>{item.marque} {item.modele} ({item.typeBus})</option>
                                    ))}
                                </select>

                            </div>
                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Trajet</label>
                                <select id="trajetId" name="trajetId" required onChange={handleInputChange} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                    <option></option>
                                    {trajet.map((item: any, i: number) => (
                                        <option key={i} value={[item.id]}>{item.lieuDepart} - {item.lieuArrivee} ({item.heureArrivee} - {item.heureDepart})</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Agence</label>
                                <select id="agenceId" name="agenceId" required onChange={handleInputChange} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                    <option></option>
                                    {agences.map((item: any, i: number) => (
                                        <option key={i} value={[item.id]}>{item.nom} ({item.adresse})</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Type de voyages:</label>
                                <select id="typeVoyage" name="typeVoyage" required onChange={handleInputChange} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                    <option></option>
                                    <option value="aller-retour">Aller-Retour</option>
                                    <option value="aller simple">Aller Simple</option>
                                </select>
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Prix du voyage</label>
                                <input onChange={handleInputChange} required type="number" id="prixVoyage" name="prixVoyage" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                            </div>
                            <div className="mt-4 flex">
                                <button type="submit" className="text-white text-sm flex px-4  hover:shadow-md  hover:from-blue-700 rounded-sm bg-blue-500  from-blue-600 bg-gradient-to-t p-2">
                                    Enregistrer
                                </button>
                                <button type="reset" id="resetbtn" className="text-white text-sm flex px-4  hover:shadow-md  hover:from-stone-700 rounded-sm bg-stone-500  from-stone-600 bg-gradient-to-t p-2">
                                    Effacer
                                </button>
                            </div>
                        </div>
                    </form>
                    {isOpenPopup ? (<Popup color={popupData?.color} title={popupData.title} message={popupData?.message} onShow={() => setIsOpenPopup(false)} />) : null}
                </div>
            </div>

        </div>

    )
}