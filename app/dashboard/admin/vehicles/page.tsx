"use client"

import Popup from "@/components/ui/popup";
import AddFormVehicule from "@/components/vehicules/addFormVehicule";
import VehiculeTable from "@/components/vehicules/vehiculesTable";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function Vehicules() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
    const [isHorsServiceForm, setIsHorsServiceForm] = useState<boolean>(false);
    const [popupData, setPopupData] = useState<{ message: string, title?: string, color: string }>({ message: "", title: "", color: "" })
    const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
    const [editItem, setEditItem] = useState<any>(null)
    const [panne, setPanne] = useState<string>("")
    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    }
    const router = useRouter();
    const configPopup = (message: string, color: string, title: string) => {
        setPopupData({ message: message, color: color, title: title })
        setIsOpenPopup(true)
        setTimeout(() => {
            setIsOpenPopup(false)
        }, 5000);
    }

    const deleteData = (val: boolean) => {
        if (val) {
            configPopup("Bus supprimé", "green", "")
        } else {
            configPopup("Erreur", "red", "")
        }
    }

    const postData = (val: any) => {
        if (val.isClose) {
            setIsOpen(false)
        } else {
            if (val.isCompleted) {
                configPopup("Bus Ajouté", "green", "")
            } else {
                configPopup("Veuillez remplir completement le formulaire!", "red", "")
            }
        }
    }

    const setPanneVehicule = async (e: any) => {
        e.preventDefault()
        if (panne != "") {
            try {
                const datas = {
                    marque: editItem.marque,
                    modele: editItem.modele,
                    typeBus: editItem.typeBus,
                    anneeFabrication: editItem.anneeFabrication,
                    capacite: editItem.capacite,
                    placesDisponible: editItem.placesDisponible,
                    placesTotal: editItem.placesTotal,
                    panneVehicule: panne,
                    employeId: editItem.employeId,
                    horsService: editItem.horsService
                }
                const response = await fetch(`/api/bus/${editItem.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(datas),
                })
                const a = await response.json()

                if (response.ok) {
                    configPopup("Panne déclarée", "green", "")
                }
            } catch (err) {
                console.log(err)
                configPopup("Erreur", "red", "")
            }
        }
    }
    const setHorsService = async (item: any) => {
        try {
            let horsService = "non"
            if (item.horsService == "non") {
                horsService = "oui"
            }
            const datas = {
                marque: item.marque,
                modele: item.modele,
                typeBus: item.typeBus,
                anneeFabrication: item.anneeFabrication,
                capacite: item.capacite,
                placesDisponible: item.placesDisponible,
                placesTotal: item.placesTotal,
                panneVehicule: panne,
                employeId: item.employeId,
                horsService: horsService
            }
            const response = await fetch(`/api/bus/${item.id}`, {
                method: 'PUT',
                body: JSON.stringify(datas),
            })
            const a = await response.json()

            if (response.ok) {
                if (a.horsService == "oui") {
                    configPopup("Véhicule mise hors service", "yellow", "")
                } else {
                    configPopup("Le véhicule n'est plus en mise hors service", "green", "")
                }
            }
        } catch (err) {
            console.log(err)
            configPopup("Erreur", "red", "")
        }
    }

    const handleAction = (val: any) => {
        switch (val.action) {
            case "signal":
                setIsHorsServiceForm(true)
                setEditItem(val.item)
                break;
            case "fiche":
                router.push(`/dashboard/admin/vehicles/${val.item.id}`)
                break;
            case "edit":
                router.push(`/dashboard/admin/vehicles/${val.item.id}/editer`)
                break;
            case "horsService":
                setHorsService(val.item)
                break;
            default:
                break;
        }
    }

    return (
        <div className="w-full mx-auto p-10">
            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="text-xl text-gray-900">Les Véhicules</h1>
                <button onClick={handleButtonClick} className="text-white bg-blue-600 text-sm p-2 rounded-sm">Ajouter un véhicule</button>
            </div>
            {isOpen ? (<AddFormVehicule childToParent={postData} />) : null}
            {/* <div className=" bg-white my-2">
                <h3 className="uppercase bg-green-500 text-white p-4 ">Rechercher un vehicule</h3>
                <form className="flex items-center  p-4 flex-row justify-start gap-2">
                    <input type="search" name="" className="p-2 rounded-sm text-stone-500 border focus:outline-none text-xs focus:ring-green-400 focus:ring-4" id="" />
                    <button className="text-white bg-green-600 text-xs flex items-center p-2 rounded-sm">Rechercher</button>
                </form>
            </div> */}
            <div className=" col-span-3 w-full bg-white shadow-xl rounded-sm">
                <VehiculeTable isAdmin="admin" childToParent={deleteData} setData={handleAction} />
            </div>
            {isHorsServiceForm ? (
                <div className="fixed bg-black/60 z-10 top-0 left-0 flex justify-center items-center w-full h-full">
                    <form onSubmit={setPanneVehicule} className="w-96 bg-white rounded-sm shadow-xl">
                        <h2 className="p-4 bg-blue-500 text-left text-white uppercase">
                            Signaler une panne
                        </h2>
                        <div className="p-4">
                            <div className="mt-2">
                                <label className="  text-sm font-bold text-gray-800 dark:text-white">Origine et description de la panne</label>
                                <textarea required id="panneVehicule" onChange={e => setPanne(e.target.value)} name="panneVehicule" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 "></textarea>
                            </div>
                        </div>
                        <div className="p-4">
                            <button type="submit" className="text-white text-sm hover:bg-blue-700 rounded-sm bg-blue-500 p-2">
                                Enregistrer
                            </button>
                            <button onClick={() => setIsHorsServiceForm(false)} type="button" className="text-white text-sm bg-stone-700 p-2">Fermer</button>
                        </div>
                    </form>
                </div>)
                : null
            }
            {isOpenPopup ? (<Popup color={popupData?.color} title={popupData.title} message={popupData?.message} onShow={() => setIsOpenPopup(false)} />) : null}
        </div>
    )
}