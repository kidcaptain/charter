"use client"

import { FormEvent, useState, useEffect } from "react"
import Popup from "@/components/ui/popup"
import { droitAccesData } from "@/datas/droitAccesData"
import Link from "next/link"

export default function Page() {

    const [data, setData] = useState<any>()

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




    return (
        <div className="p-10">
            <div className=" py-2 flex justify-between items-start">
                <h1 className="lowercase text-sm  text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/admin/employees"}>Employés</Link> / <Link className="hover:text-blue-600" href={"/dashboard/admin/employees/utilisateurs"}>Utilisateurs</Link> / <Link className="hover:text-blue-600" href="#">Droit d&apos;acces</Link></h1>
            </div>
            <form onSubmit={HandlerSubmit} className="col-span-1 bg-white max-w-md m-auto mt-40 shadow-xl rounded-sm  ">
                <h2 className=" text-gray-100 p-4 bg-green-500  uppercase">
                    Ajouter un droit d&apos;acces
                </h2>
                <div className=" m-auto  p-4">

                    <div className="mt-4  gap-4">
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Nom d&apos;utilisateur</label>
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
                        <button type="reset" id="resetbtn" className="text-white text-sm flex px-4  hover:shadow-md  hover:from-stone-700 rounded-sm bg-stone-500  from-stone-600 bg-gradient-to-t p-2">
                            Effacer
                        </button>
                    </div>
                </div>
            </form>
            {isOpenPopup ? (<Popup color={popupData?.color} title={popupData.title} message={popupData?.message} onShow={() => setIsOpenPopup(false)} />) : null}
        </div>

    )
}

