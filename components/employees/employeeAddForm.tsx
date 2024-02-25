"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import svg from "@/public/images/valide.svg"
const EmployeeAddForm = (props: { childToParent: Function }) => {
    const [value, setValue] = useState<any>()
    const [poste, setPoste] = useState<any[]>([])
    const [agence, setAgence] = useState<any[]>([]);
    const [agenceId, setAgenceId] = useState<number | undefined>()
    const classNameLabel: string = "block mb-1 text-sm font-bold text-gray-900 dark:text-white";
    const classNameInput: string = "block w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ";
    const HandlerSubmit = async (e: any) => {

        setValue({...value, agenceId: agenceId})
        console.log(value)

        e.preventDefault()
        if (value != null) {
            try {
                const res = await fetch('/api/employes', {
                    method: 'POST',
                    cache: 'no-store',
                    body: JSON.stringify(value),
                })
                const data = await res.json();
                if (res.ok) {
                    props.childToParent(true);
                    setValue(null);
                    document.getElementById('buttonReset')?.click();
                }
            } catch (err: any) {
                console.log(err)
                props.childToParent(false);
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
        const getPoste = async () => {
            const res = await fetch("/api/postes", { cache: "no-store" })
            if (!res.ok) {
                console.log("error")
            }
            const data = await res.json();
            setPoste(data)
        };
        const agence = localStorage.getItem("agence");
        if (agence) {
            setAgenceId(JSON.parse(agence).agenceId);
        }
        const getAgence = async () => {
            const res = await fetch("/api/agences", { cache: "no-store" })
            if (!res.ok) {
                console.log("error")
            }
            const data = await res.json();
            setAgence(data)
        };
        getPoste();
        getAgence();
    }, [])

    return (
        <form onSubmit={HandlerSubmit} className=" w-full h-full ">
            <h2 className=" p-4 uppercase font-bold text-white bg-blue-500 bg-gradient-to-br from-blue-600">
                Enregistrement
            </h2>
            <div className="p-4">
                <div className=" gap-4">
                    <div className="flex gap-4 mb-1 items-start">
                        <label className={`${classNameLabel}`}>Nom (<span className="text-red-500">*</span>)</label>
                        {((value?.nom && value?.nom != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                    </div>
                    <input type="text" placeholder="Nom" required autoComplete="off" onChange={handleInputChange} id="nom" name="nom" className={`${classNameInput} ${((value?.nom && value?.nom != "")) ? "bg-green-50 ring-green-400/30 ring-4" : null}`} />
                </div>
                <div className="mt-4">
                    <div className="flex gap-4 mb-1 items-start">
                        <label className={`${classNameLabel}`}>Prénom (<span className="text-red-500">*</span>)</label>
                        {((value?.prenom && value?.prenom != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                    </div>
                    <input type="text" placeholder="Prenom" name="prenom" required autoComplete="off" onChange={handleInputChange} id="prenom" className={`${classNameInput} ${((value?.prenom && value?.prenom != "")) ? "bg-green-50 ring-green-400/30 ring-4" : ""}`} />
                </div>
                <div className="mt-4">
                    <div className="flex gap-4 mb-1 items-start">
                        <label className={`${classNameLabel}`}>Adresse (<span className="text-red-500">*</span>)</label>
                        {((value?.adresse && value?.adresse != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                    </div>
                    <input type="text" placeholder="Adresse" required autoComplete="off" onChange={handleInputChange} id="adresse" name="adresse" className={`${classNameInput} ${((value?.adresse && value?.adresse != "")) ? "bg-green-50 ring-green-400/30 ring-4" : ""}`} />
                </div>

                <div className="mt-4">
                    <div className="flex gap-4 mb-1 items-start">
                        <label className={`${classNameLabel}`}>Date de naissance (<span className="text-red-500">*</span>)</label>
                        {((value?.dateNaissance && value?.dateNaissance != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                    </div>
                    <input type="date" required autoComplete="off" onChange={handleInputChange} id="dateNaissance" name="dateNaissance" className={`${classNameInput} ${((value?.dateNaissance && value?.dateNaissance != "")) ? "bg-green-50 ring-green-400/30 ring-4" : ""}`} />
                </div>
                <div className="mt-4">
                    <div className="flex gap-4 mb-1 items-start">
                        <label className={`${classNameLabel}`}>Genres (<span className="text-red-500">*</span>)</label>
                        {((value?.genre && value?.genre != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                    </div>

                    <div className="flex gap-4">
                        <input type="radio" required autoComplete="off" onChange={handleInputChange} id="genre" value="m" name="genre" className="block p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                        <label htmlFor="genrem" className="text-xs font-bold text-gray-700">Homme</label>
                        <input type="radio" required autoComplete="off" onChange={handleInputChange} id="genre" value="f" name="genre" className="block p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                        <label htmlFor="genref" className="text-xs font-bold text-gray-700">Femme</label>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex gap-4 mb-1 items-start">
                        <label className={`${classNameLabel}`}>Numèro de téléphone (<span className="text-red-500">*</span>)</label>
                        {((value?.telephone && value?.telephone != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                    </div>
                    <input type="tel" id="telephone" name="telephone" aria-describedby="helper-text-explanation" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2 focus:ring-2  focus:outline-none sm:text-md focus-visible:ring-blue-400 ${classNameInput} ${((value?.telephone && value?.telephone != 0)) ? "bg-green-50 ring-green-400/30 ring-4" : ""}`} placeholder="620456789" required autoComplete="off" onChange={handleInputChange} />
                </div>
                <div className="mt-4">
                    <div className="flex gap-4 mb-1 items-start">
                        <label className={`${classNameLabel}`}>Numéro de Carte d&apos;identité (<span className="text-red-500">*</span>)</label>
                        {((value?.numCNI && value?.numCNI != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                    </div>

                    <input type="text" required autoComplete="off" onChange={handleInputChange} name="numCNI" id="numCNI" className={`${classNameInput} ${((value?.numCNI && value?.numCNI != "")) ? "bg-green-50 ring-green-400/30 ring-4" : ""}`} />
                </div>
                <div className="mt-4">
                    <div className="flex gap-4 mb-1 items-start">
                        <label className={`${classNameLabel}`}>Email </label>
                        {((value?.email && value?.email != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                    </div>
                    <input type="text" required autoComplete="off" onChange={handleInputChange} id="email" name="email" className={`${classNameInput} ${((value?.email && value?.email != "")) ? "bg-green-50 ring-green-400/30 ring-4" : ""}`} />
                </div>
                <div className="mt-4">
                    <div className="flex gap-4 mb-1 items-start">
                        <label htmlFor="posteId" className="block mb-1 text-sm font-bold text-gray-900 ">Poste</label>
                        {((value?.posteId && value?.posteId != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                    </div>
                    <select name="posteId" required autoComplete="off" onChange={handleInputChange} className={`block w-full p-2 uppercase text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ${classNameInput} ${((value?.posteId && value?.posteId != "")) ? "bg-green-50 ring-green-400/30 ring-4" : ""} `} id="">
                        <option value="" ></option>
                        {poste.map((item: any, index: number) => (
                            <option value={item.id} key={index}>{item.titre} ({item.salaire})</option>
                        ))}
                    </select>
                </div>
                <div className="mt-4">
                    <div className="flex gap-4 mb-1 items-start">
                        <label className={`${classNameLabel}`}>Date d&apos;embauche</label>
                        {((value?.dateEmbauche && value?.dateEmbauche != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                    </div>

                    <input type="date" name="dateEmbauche" required autoComplete="off" onChange={handleInputChange} id="v" className={`${classNameInput} ${((value?.dateEmbauche && value?.dateEmbauche != "")) ? "bg-green-50 ring-green-400/30 ring-4" : ""}`} />
                </div>
                {
                    !agenceId ? (
                        <div className="mt-4">
                            <div className="flex gap-4 mb-1 items-start">
                                <label htmlFor="" className="block mb-1 text-sm font-bold text-gray-900 ">Agence</label>
                                {((value?.agenceId && value?.agenceId != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                            </div>
                            <select name="agenceId" required autoComplete="off" onChange={handleInputChange} className={`block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400  ${classNameInput} ${((value?.agenceId && value?.agenceId != "")) ? "bg-green-50 ring-green-400/30 ring-4" : ""} `} id="agenceId">
                                <option value="" ></option>
                                {agence.map((item: any, index: number) => (
                                    <option value={item.id} key={index}>{item.nom}</option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <input type="text" name="agenceId" value={agenceId} className="opacity-0" autoComplete="off" onChange={handleInputChange} id="v" />
                    )
                }
                


            </div>
            <button type="submit" className="text-white hover:shadow-md float-start hover:bg-blue-700 rounded-sm bg-blue-500 text-xs mt-4 p-2">
                Enregistrer
            </button>
            <button type="reset" id="buttonReset" className="text-white hover:shadow-md float-start hover:bg-stone-700 rounded-sm bg-stone-500 text-xs mt-4 p-2">
                Recommencer
            </button>
        </form>
    )
}

export default EmployeeAddForm
