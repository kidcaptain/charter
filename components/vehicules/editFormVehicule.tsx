
"use client"


import { useState, useEffect } from "react";

const EditFormVehicule = (props: { childToParent: Function, id?: string }) => {

    const [value, setValue] = useState<any>(
        {
            marque: "",
            modele: "",
            typeBus: "",
            anneeFabrication: "",
            capacite: 0,
            placesDisponible: 0,
            placesTotal: 0,
            panneVehicule: "",
            employeId: 0
        }
    )
    const [bus, setBus] = useState<any>()
    const [chauffeurs, setChauffeurs] = useState<any[]>([])
    const HandlerSubmit = async (e: any) => {
        e.preventDefault()
        const datas = {
            marque: value.marque,
            modele: value.modele,
            typeBus: value.typeBus,
            anneeFabrication: value.anneeFabrication,
            capacite: value.capacite,
            placesDisponible: value.placesDisponible,
            placesTotal: value.placesTotal,
            panneVehicule: bus.panneVehicule,
            employeId: value.employeId
        }
        try {
            const res = await fetch(`/api/bus/${value.id}`, {
                method: 'PUT',
                body: JSON.stringify(datas),
            })
            const data = await res.json()
            if (res.ok) {
                props.childToParent({ isClose: false, isCompleted: true });
            } else {
                props.childToParent({ isClose: false, isCompleted: false });
            }
        } catch (err) {
            console.log(err)
            props.childToParent({ isClose: false, isCompleted: false });
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
            setValue({ ...val });
        };
        getData();
        const getPoste = async () => {
            const res = await fetch("/api/postes?titre=chauffeur", { cache: "no-store" })
            if (!res.ok) {
                console.log("error")
            }
            const data = await res.json();
            return data
        };
        const getChauffeur = async () => {
            const postes: any[] = await getPoste();
            if (postes.length > 0) {
                postes.map(async (item: any) => {
                    const res = await fetch(`/api/employes?posteId=${item.id}`, { cache: "no-store" })
                    if (!res.ok) {
                        console.log("error")
                    }
                    const data = await res.json();
                    setChauffeurs(data)
                })
            }

        };
        getChauffeur();
    }, [])

    return (
        <div className="">
            <form onSubmit={HandlerSubmit} className="w-96 m-auto bg-white rounded-sm shadow-xl">
                <h2 className="p-4 bg-cyan-500 text-left text-white uppercase">
                    Modification
                </h2>
                <div className="p-4">
                    <div className="mt-2">
                        <label className="  text-sm font-bold text-gray-800  ">Marque</label>
                        <input type="text" name="marque" onChange={handleInputChange} value={value.marque} required id="marque" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                    </div>
                    <div className="mt-2">  
                        <label className="  text-sm font-bold text-gray-800  ">Modèle</label>
                        <input type="text" name="modele" required onChange={handleInputChange} value={value.modele} id="modele" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                    </div>
                    <div className="mt-2">
                        <label className="  text-sm font-bold text-gray-800  ">Type de bus</label>
                        <select id="typeBus" name="typeBus" required onChange={handleInputChange} value={value.typeBus} className="block text-sm w-full p-2 uppercase text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                            <option value="vip">Vip</option>
                            <option value="simple">Simple</option>
                        </select>
                    </div>
                    <div className="mt-2">
                        <label className="  text-sm font-bold text-gray-800  ">Année de Fabrication</label>
                        <input type="date" required onChange={handleInputChange} id="anneeFabrication" value={value.anneeFabrication} name="anneeFabrication" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                    </div>
                    <div className="mt-2">
                        <label className="  text-sm font-bold text-gray-800  ">Capacité</label>
                        <input type="number" required onChange={handleInputChange} id="capacite" value={value.capacite} name="capacite" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                    </div>
                    <div className="mt-2">/
                        <label className="  text-sm font-bold text-gray-800  ">Place Disponible</label>
                        <input type="number" required onChange={handleInputChange} id="placesDisponible" value={value.placesDisponible} name="placesDisponible" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                    </div>
                    <div className="mt-2">
                        <label className="  text-sm font-bold text-gray-800  ">Place Total</label>
                        <input type="number" required onChange={handleInputChange} id="placesTotal" value={value.placesTotal} name="placesTotal" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="text-sm font-bold text-gray-800   ">Chauffeur</label>
                        <select name="employeId" required autoComplete="off" onChange={handleInputChange} value={value.employeId} className="block w-full p-2  text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " id="">
                            <option value="0" >Aucun</option>
                            {chauffeurs.map((item: any, index: number) => (
                                <option value={item.id} key={index + 1}>{item.nom} {item.prenom}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="p-4">
                    <button type="submit" className="text-white text-sm hover:bg-cyan-700 rounded-sm bg-cyan-500 p-2">
                        Editer
                    </button>
                    <button onClick={() => props.childToParent({ isClose: true, isCompleted: false })} className="text-white text-sm bg-stone-700 p-2">Fermer</button>
                </div>
            </form>
            
        </div>
    )
}

export default EditFormVehicule