"use client"

import { FormEvent, useState, useEffect } from "react"
import Popup from "@/components/ui/popup"
import { droitAccesData } from "@/datas/droitAccesData"
import Link from "next/link"

export default function Page() {

    const [data, setData] = useState<any>()
    const [access, setAccess] = useState<any[]>([])

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

    const HandlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const voyage = {
            TypeDroits: data.TypeDroits
        }
        try {
            const response = await fetch('/api/acces', {
                method: 'POST',
                cache: "no-store",
                body: JSON.stringify(voyage),
            })
            if (response.ok) {
                configPopup("Acces enregistré", "blue", "")
                document.getElementById("resetbtn")?.click()
                setData(null)
            }
        } catch (err) {
            console.log(err)
            configPopup("Une erreur c'est produite veuillez actualiser la page et reessayer!", "yellow", "")
        }
    }

    useEffect(() => {
        const getAccess = async () => {
            const res = await fetch("/api/acces", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setAccess(data)
        };
        getAccess()

    }, [access])

    return (
        <div className="p-10">
            <h1 className="text-xl">Droits d&apos;acces</h1>
            <form onSubmit={HandlerSubmit} className="col-span-1 bg-white max-w-md mt-10 shadow-xl border-2 rounded-sm  ">
                <h2 className=" text-gray-100 p-4 bg-green-500  uppercase">
                    Ajouter un droit d&apos;acces
                </h2>
                <div className=" m-auto  p-4">

                    <div className="mt-4  gap-4">
                        <label className="block mb-1 text-sm font-medium text-gray-700  ">Nom d&apos;utilisateur</label>
                        <select name="TypeDroits" required autoComplete="off" onChange={handleInputChange} className="block w-full p-2 uppercase text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " id="droitsAccesId">
                            <option value="" ></option>
                            {droitAccesData.map((item: any, index: number) => (
                                <option value={item.type} key={index + 1}>{item.label}</option>
                            ))}
                        </select>
                        {/* <input type="text" placeholder="Nom d'utilisateur" required autoComplete="off" onChange={handleInputChange} id="nomUtilisateur" name="nomUtilisateur" className="block w-full p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " /> */}
                    </div>
                    <div className="mt-4 flex">
                        <button type="submit" className="text-white text-sm flex px-4  hover:shadow-md  hover:from-blue-700 rounded-sm bg-blue-500  from-blue-600 bg-gradient-to-t p-2">
                            Enregistrer
                        </button>
                       
                    </div>
                </div>
            </form>
            <div className="py-10">
                <h2 className="text-xl my-4 uppercase">Les droits d&apos;acces disponible</h2>
                <ul className="flex flex-wrap gap-4">
                    {access.map((item: any, i: number) => (
                        <li key={i+1} className="border border-stone-600 hover:shadow-xl shadow-md cursor-pointer p-4">
                            {item.TypeDroits == "chefagence" ? "chef d'agence" : item.TypeDroits}
                        </li>
                    ))}

                </ul>
            </div>
            {isOpenPopup ? (<Popup color={popupData?.color} title={popupData.title} message={popupData?.message} onShow={() => setIsOpenPopup(false)} />) : null}
        </div>

    )
}

