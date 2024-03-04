"use client"

import { useState, useEffect } from "react";
import EditFormPassager from '@/components/passager/editFormPassager';
import PassagerTable from '@/components/passager/passagerTable';
import AddFormPassager from '@/components/passager/AddFormPassager';
import Popup from "@/components/ui/popup";
import svg from "@/public/images/valide.svg"
import Image from "next/image";
export default function Page() {
    const [isOpenEditForm, setIsOpenEditForm] = useState<boolean>(false);
    const [data, setData] = useState<any>();
    const handleButtonClickEditForm = (val: boolean) => {
        setIsOpenEditForm(val);
        console.log(val)
    }

    const getItem = (val: any) => {
        setData(val)
    }
    const [employees, setemployees] = useState<any[]>([])
    const [agence, setAgence] = useState<any[]>([])

    useEffect(() => {
        const getData = async () => {
            const res = await fetch("/api/employes", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setemployees(data)
        };
        const getAgence = async () => {
            const res = await fetch("/api/agences", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setAgence(data)
        };
        getData();
        getAgence();
    }, [data])
    const [isOpenAddForm, setIsOpenAddForm] = useState<boolean>(false);

    const handleButtonClickAddForm = (val: boolean) => {
        setIsOpenAddForm(val);
    }

    const [value, setValue] = useState<any>()
    const [popupData, setPopupData] = useState<{ message: string, title?: string, color: string }>({ message: "", title: "", color: "" })
    const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);

    const HandlerSubmit = async (e: any) => {
        e.preventDefault()
        if (value?.nom != "" && value?.prenom != "" && value?.telephone > 0 && value?.dateNaissance != "" && value?.adresse != "" && value?.genre != "" && value?.numCNI && value?.agenceId != "") {
            try {
                const res = await fetch('/api/passagers', {
                    method: 'POST',
                    body: JSON.stringify(value),
                })
                const datas = await res.json()

                if (res.ok) {
                    configPopup("Passager enregistré", "blue", "Enregistrement")
                    setValue(null);
                    document.getElementById("resetBtn")?.click()
                }
            } catch (err) {
                console.log(err)
            }

        } else {
            alert("Formulaire incomplete!")
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

    const className = "block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 "

    return (
        <div className="w-full p-10">

            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="text-xl text-gray-900">Les Passagers</h1>
            </div>
            <div className="mt-4 gap-4 grid items-start grid-cols-4 mx-auto ">
                {/* {isOpenAddForm ? (
                    <section className='bg-white border rounded-md overflow-hidden shadow-2xl col-span-1'>
                        <form onSubmit={HandlerSubmit} className=" bg-white  ">
                            <h2 className=" p-4 bg-blue-500 from-blue-700 bg-gradient-to-bl font-bold text-white border-b uppercase gap-4">
                                Nouveau passager
                            </h2>
                            <div className=" mx-auto p-4">
                                <div className="mt-4 flex gap-4">
                                    <div>
                                        <div className="flex gap-4 mb-1 items-start">
                                            <label className="block text-sm font-bold text-gray-900 ">Nom</label>
                                            {(value?.nom && value?.nom != "") ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                                        </div>
                                        <input type="text" required onChange={handleInputChange} placeholder="Nom" name="nom" id="nom" className={`${className} ${(value?.nom && value?.nom != "") ? "bg-green-50 ring-green-400/30 ring-4" : null}`} />
                                    </div>
                                    <div>
                                        <div className="flex gap-4 mb-1 items-start">
                                            <label className="block text-sm font-bold text-gray-900 ">Prénom</label>
                                            {(value?.prenom && value?.prenom != "") ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                                        </div>
                                        <input type="text" required id="prenom" name="prenom" placeholder="Prénom" onChange={handleInputChange} className={`${className} ${(value?.prenom && value?.prenom != "") ? "bg-green-50 ring-green-400/30 ring-4" : null}`} />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="flex gap-4 mb-1 items-start">
                                        <label className="block mb-1 text-sm font-bold text-gray-900">Adresse</label>
                                        {(value?.adresse && value?.adresse != "") ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                                    </div>
                                    <input type="text" required id="adresse" name="adresse" placeholder="Adresse" onChange={handleInputChange} className={`${className} ${(value?.adresse && value?.adresse != "") ? "bg-green-50 ring-green-400/30 ring-4" : null}`} />
                                </div>
                                <div className="mt-4">
                                    <div className="flex gap-4 mb-1 items-start">
                                        <label className="block mb-1 text-sm font-bold text-gray-900">Date de naissance</label>
                                        {(value?.dateNaissance && value?.dateNaissance != "") ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                                    </div>

                                    <input type="date" required id="datenaissance" name="dateNaissance" placeholder="Date de Naissance" onChange={handleInputChange} className={`${className} ${(value?.dateNaissance && value?.dateNaissance != "") ? "bg-green-50 ring-green-400/30 ring-4" : null}`} />
                                </div>
                                <div className="mt-4">
                                    <label className="block mb-1 text-sm font-bold text-gray-900">Genre</label>
                                    <div className="flex gap-4">
                                        <input type="radio" required onChange={handleInputChange} id="genrem" name="genre" value="m" className="block p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                        <label htmlFor="genrem" className="text-xs font-bold text-gray-900">Homme</label>
                                        <input type="radio" required onChange={handleInputChange} id="genref" value="f" name="genre" className="block p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                        <label htmlFor="genref" className="text-xs font-bold text-gray-900">Femme</label>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="flex gap-4 mb-1 items-start">
                                        <label className="block mb-1 text-sm font-bold text-gray-900">Numèro de téléphone:</label>
                                        {(value?.telephone && value?.telephone > 0) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                                    </div>
                                    <input type="number" id="telephone" name="telephone" onChange={handleInputChange} aria-describedby="helper-text-explanation" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2 focus:ring-2  focus:outline-none sm:text-md focus-visible:ring-blue-400 ${(value?.telephone && value?.telephone > 0) ? "bg-green-50 ring-green-400/30 ring-4" : null}`} placeholder="620456789" required />
                                </div>
                                <div className="mt-4">
                                    <div className="flex gap-4 mb-1 items-start">
                                        <label className="block mb-1 text-sm font-bold text-gray-900">Numèro de CNI:</label>
                                        {(value?.numCNI && value?.numCNI != "") ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                                    </div>

                                    <input type="text" id="numCNI" name="numCNI" onChange={handleInputChange} aria-describedby="helper-text-explanation" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2 focus:ring-2  focus:outline-none sm:text-md focus-visible:ring-blue-400 ${(value?.numCNI && value?.numCNI != "") ? "bg-green-50 ring-green-400/30 ring-4" : null}`} required />
                                </div>
                                <div className="mt-4">
                                    <div className="flex gap-4 mb-1 items-start">
                                        <label htmlFor="" className="block mb-1 text-sm font-bold text-gray-900 ">Agence</label>
                                        {((value?.agenceId && value?.agenceId != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                                    </div>
                                    <select name="agenceId" required autoComplete="off" onChange={handleInputChange} className={`block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400  ${className} ${((value?.agenceId && value?.agenceId != "")) ? "bg-green-50 ring-green-400/30 ring-4" : ""} `} id="agenceId">
                                        <option value="" ></option>
                                        {agence.map((item: any, index: number) => (
                                            <option value={item.id} key={index}>{item.nom}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mt-4">
                                    <button type="submit" className="text-white  gap-2 justify-center hover:shadow-md  hover:bg-blue-700 rounded-sm bg-blue-500 text-sm  p-2">
                                        Valider
                                    </button>
                                    <button type="reset" id="resetBtn" className="text-white  gap-2 justify-center hover:shadow-md   hover:bg-stone-700 rounded-sm bg-stone-500 text-sm  p-2">
                                        Recommencer
                                    </button>
                                    <button onClick={() => { setIsOpenEditForm(false); setIsOpenAddForm(false) }} className="text-stone-500 p-2 border rounded-sm font-bold text-xs text-center ">Fermer</button>

                                </div>
                            </div>
                        </form>
                    </section>
                ) : ""} */}
                <section className={`  shadow-2xl border rounded-md ${(isOpenEditForm || isOpenAddForm) ? " col-span-3 " : "col-span-full"} `}>
                    {/* <div className='flex mb-4 justify-between p-4 bg-white'>
                        <div className='flex'>
                            <button onClick={() => handleButtonClickAddForm(true)} className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-sm text-xs px-5 py-2.5 text-center">
                                Enregistrer un passager
                            </button>

                        </div>
                        <div>
                            <button className="text-white bg-stone-600 hover:bg-stone-700 focus:ring-4 focus:outline-none focus:ring-stone-300 dark:focus:ring-stone-800 font-medium rounded-sm text-xs px-5 py-2.5 text-center">
                                Imprimer
                            </button>
                        </div>
                    </div> */}
                    <PassagerTable agenceId={0} childToParent={handleButtonClickEditForm} setData={getItem} />
                </section>
                {isOpenEditForm ? (
                    <section className='bg-white shadow-2xl col-span-1'>
                        <EditFormPassager item={data} />
                        <div className='px-4'>
                            <button onClick={() => { setIsOpenEditForm(false); setIsOpenAddForm(false) }} className="text-stone-500 p-2 border rounded-sm font-bold text-xs text-center ">Fermer</button>
                        </div>
                    </section>
                ) : ""}

            </div>
            {/* {isOpenPopup ? (<Popup color={popupData?.color} title={popupData.title} message={popupData?.message} onShow={showModal} />) : null}
             */}
        </div>
    )
}