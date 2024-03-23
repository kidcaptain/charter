
"use client"

import { useState, useEffect } from "react";
import Popup from "../ui/popup";
import Image from "next/image";
import svg from '@/public/images/valide.svg'

const AddFormVehicule = (props: { childToParent: Function }) => {
    const [value, setValue] = useState<any>()
    const className: string = "text-sm font-bold text-gray-800 dark:text-white";
    const className2: string = "block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400";
    const HandlerSubmit = async (e: any) => {
        e.preventDefault()
        const datas = {
            marque: value.marque,
            modele: value.modele,
            typeBus: value.typeBus,
            capacite: value.capacite,
            panneVehicule: "",
        }
        try {
            const res = await fetch('/api/bus', {
                method: 'POST',
                body: JSON.stringify(datas),
            })
            if (res.ok) {
                document.getElementById("resetbtn")?.click();
                props.childToParent({ isClose: false, isCompleted: true });
            } else {
                props.childToParent({ isClose: false, isCompleted: false });
            }
        } catch (err) {
            console.log(err)
            props.childToParent({ isClose: false, isCompleted: false });
        }
        setValue(null);
    }
    const handleInputChange = (event: any) => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setValue((oldValue: any) => {
            return { ...oldValue, [target.name]: value }
        })
    }

    return (
        <div className="fixed bg-black/60 z-10 top-0 left-0 flex justify-center items-center w-full h-full">
            <form onSubmit={HandlerSubmit} className="w-96 bg-white rounded-sm shadow-xl">
                <h2 className="p-4 bg-blue-500 text-left text-white uppercase">
                    Ajouter un véhicule
                </h2>
                <div className="p-4">
                    <div className="mt-4">
                        <div className="flex gap-4 mb-1 items-start">
                            <label className={className}>Marque (<span className="text-red-500">*</span>)</label>
                            {((value?.marque && value?.marque != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                        </div>
                        <input type="text" name="marque" onChange={handleInputChange} required id="marque" className={`${className2} ${((value?.marque && value?.marque != "")) ? "bg-green-50 ring-green-400/50 ring-4" : ""}`} />
                    </div>
                    <div className="mt-4">
                        <div className="flex gap-4 mb-1 items-start">
                            <label className={className}>Modèle (<span className="text-red-500">*</span>)</label>
                            {((value?.modele && value?.modele != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                        </div>
                        <input type="text" name="modele" required onChange={handleInputChange} id="modele" className={`${className2} ${((value?.modele && value?.modele != "")) ? "bg-green-50 ring-green-400/50 ring-4" : ""}`} />
                    </div>
                    <div className="mt-4">
                        <div className="flex gap-4 mb-1 items-start">
                            <label className={className}>Type de bus (<span className="text-red-500">*</span>)</label>
                            {((value?.typeBus && value?.typeBus != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                        </div>
                        <select id="typeBus" name="typeBus" required onChange={handleInputChange} className={`block text-sm w-full p-2 uppercase text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ${((value?.typeBus && value?.typeBus != "")) ? "bg-green-50 ring-green-400/50 ring-4" : ""}`}>
                            <option></option> 
                            <option value="vip">Vip</option>
                            <option value="simple">Simple</option>
                        </select>
                    </div>
                    <div className="mt-4">
                        <div className="flex gap-4 mb-1 items-start">
                            <label className={className}>Capacité(<span className="text-red-500">*</span>)</label>
                            {((value?.capacite && value?.capacite != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                        </div>
                        <input type="number" min={1} required onChange={handleInputChange} id="capacite" name="capacite" className={`block text-sm w-full p-2  ${((value?.capacite && value?.capacite > 0)) ? "bg-green-50 ring-green-400/50 ring-4" : null} text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 `} />
                    </div>
                </div>
                <div className="p-4">
                    <button type="submit" className="text-white text-sm hover:bg-blue-700 rounded-sm bg-blue-500 p-2">
                        Enregistrer
                    </button>
                    <button type="reset" id="resetbtn" className="text-white text-sm hover:bg-stone-900 rounded-sm bg-stone-800 p-2">
                        Recommencer
                    </button>
                    <button onClick={() => props.childToParent({ isClose: true, isCompleted: false })} className="text-white text-sm bg-stone-700 hover:bg-stone-600 p-2">Fermer</button>
                </div>
            </form>
        </div>
    )
}

export default AddFormVehicule