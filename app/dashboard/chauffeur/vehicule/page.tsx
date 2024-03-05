"use client"

import HelpPopup from "@/components/ui/helpPopup";
import Popup from "@/components/ui/popup";
import AddFormVehicule from "@/components/vehicules/addFormVehicule";
import VehiculeTable from "@/components/vehicules/vehiculesTable";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function Vehicules() {
    // const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isHorsServiceForm, setIsHorsServiceForm] = useState<boolean>(false);
    const [popupData, setPopupData] = useState<{ message: string, title?: string, color: string }>({ message: "", title: "", color: "" })
    const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
    const [editItem, setEditItem] = useState<any>(null)
    const [panne, setPanne] = useState<string>("")
    // const handleButtonClick = () => {
    //     setIsOpen(!isOpen);
    // }
    const router = useRouter();
    const configPopup = (message: string, color: string, title: string) => {
        setPopupData({ message: message, color: color, title: title })
        setIsOpenPopup(true)
        setTimeout(() => {
            setIsOpenPopup(false)
        }, 5000);
    }

    // const deleteData = (val: boolean) => {
    //     if (val) {
    //         configPopup("Bus supprimé", "green", "")
    //     } else {
    //         configPopup("Erreur", "red", "")
    //     }
    // }

    // const postData = (val: any) => {
    //     if (val.isClose) {
    //         setIsOpen(false)
    //     } else {
    //         if (val.isCompleted) {
    //             configPopup("Bus Ajouté", "green", "")
    //         } else {
    //             configPopup("Veuillez remplir completement le formulaire!", "red", "")
    //         }
    //     }
    // }

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

    const [bus, setBus] = useState<any[]>([])
    const [busResult, setBusResult] = useState<any[]>([])

    useEffect(() => {
        const getData = async () => {
            const res = await fetch("/api/bus", { method: "GET", cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setBusResult(data)
            setBus(data)
        };
        getData();
    }, [])

    const handleSearch = (e: string) => {
        const tab: any[] = [];
        bus.map((i) => {
            const str : string = i.marque;
            if (
                str.toLocaleLowerCase().search(e.trim()) != -1
                ||
                str.search(e.trim()) != -1
                ) {
                tab.push(i)
            }   
        })
        if(e == "") {
            setBusResult(bus)
        }
        setBusResult(tab)
    }

    const reloadData =  async () => {
            const res = await fetch("/api/bus", { method: "GET", cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setBusResult(data)
            setBus(data)
    }

    const handleAction = (val: any) => {
        switch (val.action) {
            case "signal":
                setIsHorsServiceForm(true)
                setEditItem(val.item)
                break;
            case "fiche":
                router.push(`/dashboard/chauffeur/vehicle/${val.item.id}`)
                break;
            case "edit":
                router.push(`/dashboard/chauffeur/vehicle/${val.item.id}/editer`)
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
                {/* <button onClick={handleButtonClick} className="text-white bg-blue-600 text-sm p-2 rounded-sm">Ajouter un véhicule</button> */}
            </div>
            {/* {isOpen ? (<AddFormVehicule childToParent={postData} />) : null}     */}
            <div className=" bg-white my-2">
                <h3 className="uppercase bg-green-500 text-white p-4 ">Rechercher un vehicule</h3>
                <form className="flex items-center  p-4 flex-row justify-start gap-2">
                    <input onChange={e => {handleSearch(e.target.value)}} type="search" name="" className="p-2 rounded-sm text-stone-500 border focus:outline-none text-xs focus:ring-green-400 focus:ring-4" id="" />
                    <button className="text-white bg-green-600 hover:bg-green-700 text-xs flex items-center p-2 rounded-sm">Rechercher</button>
                </form>
            </div>
            <div className=" col-span-3 w-full bg-white shadow-xl rounded-sm">
                <div className="bg-white shadow-xl rounded-sm">
                    <h1 className=" p-4 text-gray-900 uppercase border-b">Nos véhicules</h1>
                    <button onClick={reloadData} className="text-white bg-blue-600 hover:bg-blue-700 text-xs flex gap-2 items-center p-3 rounded-sm">Actualiser   <HelpPopup message="Actualiser les données en cliquant ici" /></button>
                  
                    <div className="p-4 relative overflow-x-auto">
                        <table className="w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="p-2 border-2 border-stone-800 ">
                                        Id#
                                    </th>
                                    <th scope="col" className="p-2 border-2 border-stone-800">
                                        Marque
                                    </th>
                                    <th scope="col" className="p-2 border-2 border-stone-800 ">
                                        Modèle
                                    </th>
                                    <th scope="col" className="p-2 border-2 border-stone-800">
                                        Type de Bus
                                    </th>
                                    <th scope="col" className="p-2 border-2 border-stone-800">
                                        Année de Fabrication
                                    </th>
                                    <th scope="col" className="p-2 border-2 border-stone-800">
                                        Capacité
                                    </th>
                                    <th scope="col" className="p-2 border-2 border-stone-800">
                                        Places Disponible
                                    </th>
                                    <th scope="col" className="p-2 border-2 border-stone-800">
                                        Places Total
                                    </th>
                                    <th scope="col" className="p-2 border-2 border-stone-800">
                                        Pannes
                                    </th>
                                    <th scope="col" className="p-2 border-2 border-stone-800">
                                        En hors service
                                    </th>
                                    <th scope="col" className="p-2 border-2 border-stone-800">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {busResult.map((item: any, index: number) => (
                                    <tr key={index} title={`${item.horsService == "oui" ? "Véhicule mise en hors service" : ""}`} className={`border-b border-gray-200 dark:border-gray-700 ${item.horsService == "oui" ? "bg-red-50" : "bg-white"}`}>
                                        <th scope="row" className="p-2 border-2 border-stone-700">
                                            {index + 1}
                                        </th>
                                        <td className="p-2 border-2 border-stone-700">
                                            {item.marque}
                                        </td>
                                        <td className="p-2 border-2 border-stone-700 ">
                                            {item.modele}
                                        </td>
                                        <td className="p-2 border-2 border-stone-700">
                                            {item.typeBus}
                                        </td>
                                        <td className="p-2 border-2 border-stone-700">
                                            {item.anneeFabrication}
                                        </td>
                                        <td className="p-2 border-2 border-stone-700">
                                            {item.capacite}
                                        </td>
                                        <td className="p-2 border-2 border-stone-700">
                                            {item.placesDisponible}
                                        </td>
                                        <td className="p-2 border-2 border-stone-700">
                                            {item.placesTotal}
                                        </td>
                                        <td className="p-2 border-2 border-stone-700">
                                            {item.panneVehicule}
                                        </td>
                                        <td className={`p-2 border-2 border-stone-700 ${item.horsService == "oui" ? "text-red-500" : "text-stone-500"}`}>
                                            {item.horsService}
                                        </td>
                                        <td className="p-2 border-2 border-stone-700">
                                            <button type="button" onClick={() => handleAction({ action: "horsService", item: item })} className="bg-green-500 text-white text-sm p-2">Mettre Hors Service</button>
                                            <button type="button" onClick={() => handleAction({ action: "signal", item: item })} className="bg-cyan-500 text-white text-sm p-2">Signaler une panne</button>
                                            {/* <button type="button" onClick={() => handleAction({ action: "fiche", item: item })} className="bg-blue-500 text-white text-sm p-2 ">Fiche technique </button> */}
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div >
                {/* <VehiculeTable childToParent={deleteData} setData={handleAction} /> */}
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