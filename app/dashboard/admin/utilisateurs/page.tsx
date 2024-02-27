"use client"

import { useState, useEffect } from "react";
import EditFormPassager from '@/components/passager/editFormPassager';
import PassagerTable from '@/components/passager/passagerTable';
import AddFormPassager from '@/components/passager/AddFormPassager';
import Popup from "@/components/ui/popup";

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
    const [employees, setemployees] = useState([])

    useEffect(() => {
        const getData = async () => {
            const res = await fetch("/api/employes", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setemployees(data)
        };
        getData();
    }, [])
    const [isOpenAddForm, setIsOpenAddForm] = useState<boolean>(false);

    const handleButtonClickAddForm = (val: boolean) => {
        setIsOpenAddForm(val);
    }
 
    const [value, setValue] = useState<any>()
    const [popupData, setPopupData] = useState<{ message: string, title?: string, color: string }>({ message: "", title: "", color: "" })
    const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);

    const HandlerSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const res = await fetch('/api/utilisateurs', {
                method: 'POST',
                body: JSON.stringify(value),
            })
            const data = await res.json()
            if (res.ok) {
                configPopup("Utilisateur enregistré", "blue", "Enregistrement")
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
    const configPopup = (message: string, color: string, title: string) => {
        setPopupData({message: message, color: color, title: title})
        setIsOpenPopup(true)
        setTimeout(() => {
            setIsOpenPopup(false)
        }, 5000);
    }

    return (
        <div className="w-full p-10">
            
            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="text-xl text-gray-900">Les Passagers et utilisateurs</h1>
            </div>
            <div className="mt-4 gap-4 grid items-start grid-cols-4 mx-auto ">
                {isOpenAddForm ? (
                    <section className='bg-white col-span-1'>
                        <form className=" w-full h-full ">
                            <h2 className=" p-4 uppercase text-white bg-blue-500">
                                Enregistrement
                            </h2>
                            <form onSubmit={HandlerSubmit} className="p-4">
                            <div className="mt-4">
                                    <label htmlFor="" className="block mb-1 text-sm  text-gray-700 ">Employé</label>
                                    <select className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " id="">
                                        {employees.map((item: any, i : number) => (
                                            <option key={i+1} value="1">{item.nom}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mt-4">
                                    <label className="block mb-1 text-sm font-medium text-gray-700  ">Email</label>
                                    <input type="text" required id="prenom" className="block w-full p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="" className="block mb-1 text-sm  text-gray-700 ">Poste</label>
                                    <select className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " id="">
                                        <option value="1">Administrateur</option>
                                        <option value="0">Caissier</option>
                                        <option value="0">Chauffeur</option>
                                        <option value="0">Caissier</option>
                                    </select>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="" className="block mb-1 text-sm  text-gray-700 ">Agence</label>
                                    <select className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " id="">
                                        <option value="1">Mimboman</option>
                                        <option value="0">A</option>
                                        <option value="0">B</option>
                                        <option value="0">C</option>
                                    </select>
                                </div>
                                <div className="mt-4">
                                    <label className="block mb-1 text-sm font-medium text-gray-700  ">Genres</label>
                                    <div className="flex gap-4">
                                        <input type="checkbox" required id="genrem" value="m" className="block p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                        <label htmlFor="genrem" className="text-xs font-bold text-gray-700">Homme</label>
                                        <input type="checkbox" required id="genref" value="f" className="block p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                        <label htmlFor="genref" className="text-xs font-bold text-gray-700">Femme</label>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label className="block mb-1 text-sm font-medium text-gray-700  ">Numèro de téléphone:</label>
                                    <input type="tel" id="tel" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2 focus:ring-2  focus:outline-none sm:text-md focus-visible:ring-blue-400" pattern="[0-9]{9}" placeholder="620456789" required />
                                </div>
                            </form>
                            <button type="button" className="text-white hover:shadow-md float-start hover:bg-blue-700 rounded-sm bg-blue-500 text-xs mt-4 p-2">
                                Enregistrer
                            </button>
                        </form>
                        <div className='p-4'>
                            <button onClick={() => { setIsOpenEditForm(false); setIsOpenAddForm(false) }} className="text-stone-500 font-bold text-xs text-center ">Fermer</button>
                        </div>
                    </section>
                ) : ""}
                <section className={`  shadow-xl rounded-sm ${(isOpenEditForm || isOpenAddForm) ? " col-span-3 " : "col-span-full"} `}>
                    <div className='flex mb-4 justify-between p-4 bg-white'>
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
                    </div>
                    <PassagerTable agenceId={0} childToParent={handleButtonClickEditForm} setData={getItem} />
                </section>
                {isOpenEditForm ? (
                    <section className='bg-white col-span-1'>
                        <EditFormPassager item={data} />
                        <div className='p-4'>
                            <button onClick={() => { setIsOpenEditForm(false); setIsOpenAddForm(false) }} className="text-stone-500 font-bold text-xs text-center ">Fermer</button>
                        </div>
                    </section>
                ) : ""}

            </div>
            {/* {isOpenPopup ? (<Popup color={popupData?.color} title={popupData.title} message={popupData?.message} onShow={showModal} />) : null} */}
            
        </div>
    )
}