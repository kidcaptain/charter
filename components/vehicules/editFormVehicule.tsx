
"use client"


import { getDateFormat } from "@/functions/actionsClient";
import { useState, useEffect } from "react";

const EditFormVehicule = (props: { childToParent: Function, id?: string }) => {

    const [value, setValue] = useState<any>(
        {
            marque: "",
            modele: "",
            typeBus: "",
            capacite: 0,
            panneVehicule: "",
            immatriculation: ""
        }
    )
    const [cap, setCap] = useState<number>(0);
    const [bus, setBus] = useState<any>();
    const compareDate = (value: string) => {
        const date = new Date(value);
        const date2 = new Date();
        if (date.getFullYear() >= date2.getFullYear()) {
            if (date.getMonth() >= date2.getMonth()) {
                if (date.getDate() >= date2.getDate()) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        } else {
            return false
        }
    }
    const updateVoyage = async (voy: any, capacite: number, capaciteOccupee: number) => {
        const voyage = {
            agenceId: voy.agenceId,
            dateDepart: getDateFormat(voy.dateDepart),
            busId: voy?.busId,
            trajetId: voy.trajetId,
            typeVoyage: voy.typeVoyage,
            prixVoyage: voy.prixVoyage,
            placeDisponible: Math.abs(capacite),
            ready: voy.ready,
            chauffeurId: voy.chauffeurId,
            heureDepart: voy.heureDepart,
            heureArrivee: voy.heureArrivee,
            numVoyage: voy.numVoyage,
            placesOccupees: capaciteOccupee
        }
        console.log(voyage)
        try {
            const response = await fetch(`/api/voyages/${voy.id}`, {
                method: 'PUT',
                cache: "no-store",
                body: JSON.stringify(voyage),
            })
            if (response.ok) {
                alert("Voyage programmé")
            }
        } catch (err) {
            console.log(err)
            alert("Une erreur s'est produite!")
        }
    }
    const HandlerSubmit = async (e: any) => {
        e.preventDefault()
        if (confirm("Les modifications s'appliqueront à tous les élements liés a ce véhicule!")) {
            const datas = {
                marque: value.marque,
                modele: value.modele,
                typeBus: value.typeBus,
                capacite: value.capacite,
                panneVehicule: bus.panneVehicule,
                immatriculation: value.immatriculation,
            }
            try {
                let responses;
                let bol: boolean = false;
                if (value.immatriculation == bus.immatriculation) {
                    const res = await fetch(`/api/bus/${value.id}`, {
                        method: 'PUT',
                        body: JSON.stringify(datas),
                    })
                    responses = await res.json();
                    if (res.ok) {
                        bol = true
                    }
                }else{
                    const res = await fetch(`/api/bus/${value.id}?immatriculation=${value.immatriculation}`, {
                        method: 'PUT',
                        body: JSON.stringify(datas),
                    })
                    responses = await res.json();
                    if (res.ok) {
                        bol = true
                    }
                }
                if (!responses.message.id) {
                    alert(responses.message)
                } else {
                    setBus(responses.message)
                    if (bol) {
                        try {
                            const response = await fetch(`/api/voyages/bus?busId=${value.id}`, {
                                method: 'GET',
                                cache: "no-store",
                            })
                            if (response.ok) {
                                const voyages: any[] = await response.json();
                                voyages.map((voy) => {
                                    if (voy.ready == "non" && compareDate(getDateFormat(voy.dateDepart))) {
                                        if (voy.placesOccupees > 1 && confirm("Voyage N°" + voy.numVoyage + " " + voy.placesOccupees + "tickets ont été vendu pour ce voyage voulez vous confirmer la modification?")) {
                                            let capacite: number = cap;
                                            if (value.capacite != voy.placesOccupees) {
                                                capacite = parseInt(value.capacite) - parseInt(voy.placesOccupees);
                                                if (capacite > 0) {
                                                    capacite = capacite - voy.placesOccupees
                                                } else {
                                                    capacite = capacite + voy.placesOccupees
                                                }
                                            }
                                            updateVoyage(voy, value.capacite, capacite);
                                        } else {
                                            updateVoyage(voy, value.capacite, 0);
                                        }
                                    }
                                })
                            }
                        } catch (err) {
                            console.log(err)
                            alert("Une erreur s'est produite!")
                        }
                        // props.childToParent({ isClose: false, isCompleted: true });
                        // setValue(null);
                    } else {
                        // props.childToParent({ isClose: false, isCompleted: false });
                    }
                }
            } catch (err) {
                console.log(err)
                props.childToParent({ isClose: false, isCompleted: false });
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

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`/api/bus/${props.id}`, { method: "GET", cache: "no-store" })

            if (!res.ok) {
                throw new Error("Failed")
            }
            const val = await res.json();
            setBus({ ...val });
            setCap(val.capacite)
            setValue({ ...val });
        };
        getData();

    }, [])

    return (
        <div>
            <h2 className="text-2xl my-4 uppercase">BUS N°{value?.id} CODE D'immatriculation {bus?.immatriculation}</h2>
            <div className="h-full flex justify-center gap-2">
                <form onSubmit={HandlerSubmit} className="min-w-96 h-full bg-white rounded-md shadow-2xl overflow-hidden">
                    <h2 className="p-4 bg-blue-500 font-bold text-left text-white uppercase">
                        Modification
                    </h2>
                    <div className="p-4">
                        <div className="mt-2">
                            <label className="  text-sm font-bold text-gray-800 dark:text-white">Code d'immatriculation</label>
                            <input type="text" name="immatriculation" onChange={handleInputChange} value={value?.immatriculation ?? ""} id="immatriculation" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                        </div>
                        <div className="mt-2">
                            <label className="  text-sm font-bold text-gray-800 dark:text-white">Marque</label>
                            <input type="text" name="marque" onChange={handleInputChange} value={value?.marque ?? ""} id="marque" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                        </div>
                        <div className="mt-2">
                            <label className="  text-sm font-bold text-gray-800 dark:text-white">Modèle</label>
                            <input type="text" name="modele" onChange={handleInputChange} value={value?.modele ?? ""} id="modele" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                        </div>
                        <div className="mt-2">
                            <label className="  text-sm font-bold text-gray-800 dark:text-white">Type de bus</label>
                            <select id="typeBus" name="typeBus" onChange={handleInputChange} value={value?.typeBus ?? "vip"} className="block text-sm w-full p-2 uppercase text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                <option value="vip">Vip</option>
                                <option value="simple">Simple</option>
                            </select>
                        </div>
                        <div className="mt-2">
                            <label className="  text-sm font-bold text-gray-800 dark:text-white">Capacité</label>
                            <input type="number" onChange={handleInputChange} id="capacite" value={value?.capacite ?? 0} name="capacite" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                        </div>
                    </div>
                    <div className="p-4 flex gap-2 ">
                        <button type="submit" className="text-white text-sm w-full hover:bg-blue-700 rounded-sm bg-blue-500 p-2">
                            Modifier
                        </button>
                        <button type="button" onClick={() => props.childToParent({ isClose: false, isCompleted: true })} className="text-white  text-sm bg-stone-700 p-2">Retour à la liste de véhicules</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditFormVehicule