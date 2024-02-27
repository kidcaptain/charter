"use client"

import { useState } from "react";

const AddFormPassager = (props: { childToParent: Function, agenceId: number | null }) => {

    const [value, setValue] = useState<any>()

    const HandlerSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const res = await fetch('/api/passagers', {
                method: 'POST',
                body: JSON.stringify(value),
            })
            const data = await res.json()
            if (res.ok) {
                props.childToParent(data.id);
            }
        } catch (err) {
            console.log(err)

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
        <form onSubmit={HandlerSubmit} className=" bg-white   ">
            <h2 className=" p-4 bg-blue-700 text-white border-b uppercase gap-4">
                Nouveau passager
            </h2>
            <div className=" mx-auto p-4">
                <div className="mt-4 flex gap-4">
                    <div>
                        <label className="block mb-1 text-sm  font-bold text-gray-900  ">Nom</label>
                        <input type="text" required onChange={handleInputChange} placeholder="Nom" name="nom" id="nom" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                    </div>
                    <div>
                        <div>
                            <label className="block mb-1 text-sm font-bold text-gray-900  ">Prénom</label>
                            <input type="text" required id="prenom" name="prenom" placeholder="Prénom" onChange={handleInputChange} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <label className="block mb-1 text-sm font-bold text-gray-900  ">Adresse</label>
                    <input type="text" required id="adresse" name="adresse" placeholder="Adresse" onChange={handleInputChange} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                </div>
                <div className="mt-4">
                    <label className="block mb-1 text-sm font-bold text-gray-900  ">Date de naissance</label>
                    <input type="date" required id="datenaissance" name="dateNaissance" placeholder="Date de Naissance" onChange={handleInputChange} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                </div>
                <div className="mt-4">
                    <label className="block mb-1 text-sm font-bold text-gray-900  ">Genre</label>
                    <div className="flex gap-4">
                        <input type="radio" required onChange={handleInputChange} id="genrem" name="genre" value="m" className="block p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                        <label htmlFor="genrem" className="text-xs font-bold text-gray-900">Homme</label>
                        <input type="radio" required onChange={handleInputChange} id="genref" value="f" name="genre" className="block p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                        <label htmlFor="genref" className="text-xs font-bold text-gray-900">Femme</label>
                    </div>
                </div>
                <div className="mt-4">
                    <label className="block mb-1 text-sm font-bold text-gray-900  ">Numèro de téléphone:</label>
                    <input type="tel" id="tel" name="tel" onChange={handleInputChange} aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2 focus:ring-2  focus:outline-none sm:text-md focus-visible:ring-blue-400" placeholder="620456789" required />
                </div>
                <div className="mt-4">
                    <label className="block mb-1 text-sm font-bold text-gray-900  ">Numèro de CNI:</label>
                    <input type="text" id="numCNI" name="numCNI" onChange={handleInputChange} aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2 focus:ring-2  focus:outline-none sm:text-md focus-visible:ring-blue-400" required />
                </div>
                {
                    props.agenceId ?
                        (
                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900  ">Numèro de CNI:</label>
                                <input type="text" id="agenceId" name="agenceId" value={props.agenceId} hidden={true} aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2 focus:ring-2  focus:outline-none sm:text-md focus-visible:ring-blue-400" required />
                            </div>
                        ) : null
                }
                <button type="submit" className="text-white mt-4 flex py-2 items-center gap-2 justify-center hover:shadow-md transition ease-linear hover:from-blue-700 rounded-sm bg-blue-500 text-sm from-blue-600 bg-gradient-to-t p-2">
                    Valider
                </button>
            </div>
        </form>
    )
}

export default AddFormPassager