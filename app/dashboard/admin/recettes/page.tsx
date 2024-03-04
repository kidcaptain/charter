"use client"
import TrajetAddForm from "@/components/trajet/trajetAddForm";
import TrajetTable from "@/components/trajet/trajetTable";
import Popup from "@/components/ui/popup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import svg from "@/public/images/valide.svg";
import { getDateFormat } from "@/functions/actionsClient";

export default function Page() {
    const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
    const [popupData, setPopupData] = useState<{ message: string, title?: string, color: string }>({ message: "", title: "", color: "" })
    const router = useRouter()
    const [data, setData] = useState<any>()
    const [agence, setAgence] = useState<any[]>([])

    const handleInputChange = (event: any) => {
        const target = event.target
        const data = target.type === 'checkbox' ? target.checked : target.value
        setData((oldValue: any) => {
            return { ...oldValue, [target.name]: data }
        })
    }

    const HandlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        try {

            const datas = {
                dateTransaction: `${year}-${month}-${day}`,
                ...data
            }
            const response = await fetch('/api/recette', {
                method: 'POST',
                body: JSON.stringify(datas),
            })
            if (response.ok) {
                handleOnEmit(true)
                const btn: HTMLElement | null = document.getElementById("resetbtn");
                btn?.click();
                setData(null);
            } else {
                handleOnEmit(false)
            }
        } catch (err) {
            console.log(err)
        }


    }
    const handleOnEmit = (val: any) => {
        if (val) {
            configPopup("Trajet enregistré", "blue", "Enregistrement");
        } else {
            configPopup("Une erreur c'est produite", "red", "Reservation");
        }
    }
    const handleOnEmitTable = (val: any) => {
        router.push("/dashboard/admin/recettes/" + val)
    }
    const configPopup = (message: string, color: string, title: string) => {
        setPopupData({ message: message, color: color, title: title })
        setIsOpenPopup(true)
        setTimeout(() => {
            setIsOpenPopup(false)
        }, 5000);
    }
    const [recette, setRecette] = useState([])

    useEffect(() => {
        const getData = async () => {
            const res = await fetch("/api/recette", { method: "GET", cache: "no-store" })

            const data = await res.json();
            setRecette(data)
        };
        const getAgence = async () => {
            const res = await fetch("/api/agences", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setAgence(data)
        };
        getAgence();
        getData();
    }, [recette])

    const deleteRecette = async (id: number) => {
        if (confirm("Voulez vous supprimé cette element ?")) {
            const res = await fetch("/api/recette/" + id, { method: "DELETE", cache: "no-store" })
            if (res.ok) {
                alert("Element supprimé!")
            }
        }
    }

    return (
        <div className=" w-full p-10">
            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="text-xl text-gray-900">Fiche de recettes</h1>
            </div>
            <div>
                <section className="grid grid-cols-5 w-full gap-4">
                    <form onSubmit={HandlerSubmit} className="col-span-1 bg-white shadow-2xl overflow-hidden rounded-md  ">
                        <h2 className=" text-gray-100 p-4 bg-blue-500 font-bold from-blue-700 bg-gradient-to-tr uppercase">
                            Enregistrer une fiche de recette
                        </h2>
                        <div className=" mx-auto p-4">
                            <div className="mt-4">
                                <div className="flex gap-4 mb-1 items-start">
                                    <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Libellé</label>
                                    {((data?.nom && data?.nom != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                                </div>
                                <input onChange={handleInputChange} required type="text" id="nom" placeholder="Nom" name="nom" className={`block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ${((data?.nom && data?.nom != "")) ? "bg-green-50 ring-green-400/30 ring-4" : ""} `} />
                            </div>
                            <div className="mt-4">
                                <div className="flex gap-4 mb-1 items-start">
                                    <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Type de services</label>
                                    {((data?.typeService && data?.typeService != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                                </div>
                                <input onChange={handleInputChange} required type="text" id="typeService" placeholder="" name="typeService" className={`block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ${((data?.typeService && data?.typeService != "")) ? "bg-green-50 ring-green-400/30 ring-4" : ""} `} />
                            </div>
                            <div className="mt-4">
                                <div className="flex gap-4 mb-1 items-start">
                                    <label htmlFor="typePaiement" className="block mb-1 text-sm font-medium text-gray-700 ">Type De Paiement</label>
                                    {((data?.typePaiement && data?.typePaiement != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                                </div>
                                <select name="typePaiement" required autoComplete="off" onChange={handleInputChange} className={`block w-full p-2 uppercase text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ${((data?.typePaiement && data?.typePaiement != "")) ? "bg-green-50 ring-green-400/30 ring-4" : ""} `} id="typePaiement">
                                    <option value="" ></option>
                                    <option value="cash" >Cash</option>
                                    <option value="mobile money" >Mobile money</option>
                                </select>
                            </div>

                            <div className="mt-4">
                                <div className="flex gap-4 mb-1 items-start">
                                    <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Montant</label>
                                    {((data?.montant && data?.montant != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                                </div>
                                <input onChange={handleInputChange} required type="number" id="montant" name="montant" className={`"block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " ue-400   ${((data?.montant && data?.montant != "")) ? "bg-green-50 ring-green-400/30 ring-4" : ""} `} />
                            </div>

                            <div className="mt-4">
                                <div className="flex gap-4 mb-1 items-start">
                                    <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Note</label>
                                    {((data?.note && data?.note != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                                </div>
                                <textarea onChange={handleInputChange} required id="note" name="note" className={`"block h-44 resize-none w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " ue-400   ${((data?.note && data?.note != "")) ? "bg-green-50 ring-green-400/30 ring-4" : ""} `} ></textarea>
                            </div>
                            <div className="mt-4">
                                <div className="flex gap-4 mb-1 items-start">
                                    <label htmlFor="" className="block mb-1 text-sm font-bold text-gray-900 ">Agence</label>
                                    {((data?.agenceId && data?.agenceId != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                                </div>
                                <select name="agenceId" required autoComplete="off" onChange={handleInputChange} className={`block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400   ${((data?.agenceId && data?.agenceId != "")) ? "bg-green-50 ring-green-400/30 ring-4" : ""} `} id="agenceId">
                                    <option value="" ></option>
                                    {agence.map((item: any, index: number) => (
                                        <option value={item.id} key={index}>{item.nom}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-4 flex">
                                <button type="submit" className="text-white text-sm flex px-4  hover:shadow-md  hover:from-blue-700 rounded-sm bg-blue-500  from-blue-600 bg-gradient-to-t p-2">
                                    Enregistrer
                                </button>
                                <button type="reset" id="resetbtn" className="text-white text-sm flex px-4  hover:shadow-md  hover:from-stone-700 rounded-sm bg-stone-500  from-stone-600 bg-gradient-to-t p-2">
                                    Recommencer
                                </button>
                            </div>
                        </div>
                    </form>
                    <section className="col-span-4  bg-white shadow-2xl rounded-md border overflow-hidden   ">
                        <h2 className=" text-gray-900 p-4 border-b uppercase">
                            Fiches de recettes
                        </h2>
                        <div className="p-4">
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400">
                                    <thead className="text-sm text-gray-900 border font-bold  dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className=" py-3 px-1 border ">
                                                Id#
                                            </th>
                                            <th scope="col" className=" py-3 px-1 border">
                                                Lib
                                            </th>
                                            <th scope="col" className=" py-3 px-1 border ">
                                                Type de services
                                            </th>
                                            <th scope="col" className=" py-3 px-1 border">
                                                Type de paiement
                                            </th>
                                            <th scope="col" className=" py-3 px-1 border ">
                                                montant
                                            </th>
                                            <th scope="col" className=" py-3 px-1 border ">
                                                date transaction
                                            </th>
                                            <th scope="col" className=" py-3 px-1 border ">
                                                note
                                            </th>
                                            <th scope="col" className=" py-3 px-1 border">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recette.map((item: any) => (
                                            <tr key={item.id} className="border-b border-gray-200 border dark:border-gray-900">
                                                <th scope="row" className=" py-1 px-1 border    ">
                                                    {item.id}
                                                </th>
                                                <td className=" py-1 px-1 border">
                                                    {item.nom}
                                                </td>
                                                <td className=" py-1 px-1 border ">
                                                    {item.typeService}
                                                </td>
                                                <td className=" py-1 px-1 border ">
                                                    {item.typePaiement}
                                                </td>
                                                <td className=" py-1 px-1 border">
                                                    {item.montant}
                                                </td>
                                                <td className=" py-1 px-1 border">
                                                    {getDateFormat(item.dateTransaction)}
                                                </td>
                                                <td className=" py-1 px-1 border">
                                                    {item.note}
                                                </td>

                                                <td className=" py-1 px-1 border flex flex-row items-start">
                                                    <button type='button' onClick={() => deleteRecette(item.id)} className="text-white rounded-sm hover:bg-red-500 bg-red-400 text-xs flex items-center gap-2 justify-center p-2">Retirer</button>
                                                    <button onClick={() => handleOnEmitTable(item.id)} className="bg-yellow-500  text-xs flex hover:bg-yellow-600 hover:text-white items-center gap-2 justify-center p-2">Editer</button>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </section>
                </section>
            </div>
            {isOpenPopup ? (<Popup color={popupData?.color} title={popupData.title} message={popupData?.message} onShow={() => setIsOpenPopup(false)} />) : null}

        </div>
    )
}