"use client"

import { FormEvent, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import svg from '@/public/images/loader.svg'
import Popup from "@/components/ui/popup";


interface IPrams {
    trajetId?: string
}

export default function Page({ params }: { params: IPrams }) {

    const [data, setData] = useState<any>()
    const [trajet, setTrajet] = useState<any>()
    const router = useRouter();
    const [popupData, setPopupData] = useState<{ message: string, title?: string, color: string }>({ message: "", title: "", color: "" })
    const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);


    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`/api/trajets?id=${params.trajetId}`, { method: "GET", cache: "no-store" })

            if (!res.ok) {
                throw new Error("Failed")
            }
            const val = await res.json();
            setTrajet({ ...val });
            setData({ ...val });
        };
        getData();
    }, [params.trajetId])

    const getTrajet = async () => {
        const res = await fetch(`/api/trajets?id=${params.trajetId}`, { method: "GET", cache: "no-store" })

        if (!res.ok) {
            throw new Error("Failed")
        }
        const val = await res.json();
        setTrajet({ ...val });
        setData({ ...val });
    }

    const handleInputChange = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleResetForm = () => {
        setData(trajet);
    }

    const HandlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
        if (data.heureArrivee > data.heureDepart) {
            console.log(2)
        } else {
            console.log(1)

        }
        e.preventDefault()
        try {
            const response = await fetch(`/api/trajets?id=${params.trajetId}`, {
                method: 'PUT',
                body: JSON.stringify(data),
            })
            if (response.ok) {
                configPopup("Trajet modifié", "green", "")
            } else {
                configPopup("Veuillez reessayer", "yellow", "")
            }
        } catch (err) {
            console.log(err)
            configPopup("Veuillez reessayer", "yellow", "")
        }
    }
    const configPopup = (message: string, color: string, title: string) => {
        setPopupData({ message: message, color: color, title: title })
        setIsOpenPopup(true)
        setTimeout(() => {
            setIsOpenPopup(false)
        }, 5000);
    }

    const deleteTrajet = async () => {
        if (confirm("Voulez vous supprimé cette element ?")) {
            const res = await fetch("/api/trajets/" + params.trajetId, { method: "DELETE", cache: "no-store" })
            if (res.ok) {
                alert("Element supprimé!")
                router.refresh();
                router.push("/dashboard/admin/trajets")
            }
        }
    }

    const className: string = "block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 "

    return (
        <div className=" w-full p-10">
            <div className=" py-2 flex justify-between items-start">
                <h1 className="lowercase text-sm  text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/admin/trajets"}>Trajets</Link> / <Link className="hover:text-blue-600" href="#">Edition</Link></h1>
            </div>
            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="text-xl text-gray-900">Trajets</h1>
            </div>
            <div>
                {!trajet ?
                    (<Image src={svg} className='animate-spin mx-auto' width={25} height={25} alt='Loader image' />) :
                    (
                        <section className="flex justify-start w-full gap-4">

                            <form onSubmit={HandlerSubmit} className="min-w-96 bg-white shadow-2xl rounded-md overflow-hidden ">
                                <h2 className=" text-white font-bold p-4 bg-cyan-500 bg-gradient-to-tr from-cyan-600 uppercase">
                                    Editer un trajet de voyage
                                </h2>
                                <div className=" p-4">
                                    {((data.lieudepart && data.lieudepart != "") && (data.lieuarrivee == data.lieudepart)) ? (<div className="text-xs bg-yellow-100 my-2 p-4">Le lieu de départ et le lieu d'arrivée sont pariels</div>) : null}
                                    <div className="mt-4">
                                        <div className="flex gap-4 mb-1 items-start">
                                            <label className="block text-sm font-bold text-gray-900 dark:text-white">Lieu de Départ</label>
                                            {((data.lieudepart && data.lieudepart != "") && (data.lieuarrivee != data.lieudepart)) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                                        </div>
                                        <input onChange={handleInputChange} value={data.lieuDepart} type="text" id="large-input" placeholder="Départ" name="lieuDepart" className={className} />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Lieu d&apos;arrivée</label>
                                        <input onChange={handleInputChange} value={data.lieuArrivee} type="text" id="large-input" placeholder="Arrivée" name="lieuArrivee" className={className} />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Heure de Départ</label>
                                        <input onChange={handleInputChange} value={data.heureDepart} type="time" id="large-input" name="heureDepart" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Heure d&apos;arrivée</label>
                                        <input onChange={handleInputChange} value={data.heureArrivee} type="time" id="large-input" name="heureArrivee" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Distance (en kilomètres)</label>
                                        <input onChange={handleInputChange} value={data.distance} type="number" id="large-input" name="distance" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                    </div>
                                    <div className="mt-4 flex gap-4">
                                        <button type="submit" className="text-white text-sm flex px-4  hover:shadow-md  hover:bg-cyan-700 rounded-sm bg-cyan-500 p-2">
                                            Modifier
                                        </button>
                                        <button type="reset" onClick={handleResetForm} id="resetbtn" className="text-white text-sm flex px-4  hover:shadow-md  hover:bg-stone-700 rounded-sm bg-stone-500  p-2">
                                            Réinitialiser
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div className="basis-full border bg-white shadow-2xl rounded-md overflow-hidden">
                                <h2 className=" text-white font-bold p-4 bg-green-500  uppercase">
                                    Information - Trajet N°{params.trajetId}
                                </h2>
                                <ul className="flex flex-col gap-4  ">
                                    <li className="border-b p-4 uppercase"><h5 className="font-bold text-xl">Trajet</h5><span className="text-lg font-semibold text-gray-700">{trajet.lieuDepart}-{trajet.lieuArrivee}</span></li>
                                    <li className="border-b p-4 uppercase"><h5 className="font-bold text-xl">Heure de Départ</h5> <span className="text-lg font-semibold text-gray-700">{trajet.heureDepart}</span></li>
                                    <li className="border-b p-4 uppercase"><h5 className="font-bold text-xl">Heure d&apos;arrivé</h5>  <span className="text-lg font-semibold text-gray-700">{trajet.heureArrivee}</span></li>
                                    <li className="border-b p-4 uppercase"><h5 className="font-bold text-xl">Distance</h5>  <span className="text-lg font-semibold text-gray-700">{trajet.distance} Km</span></li>
                                </ul>
                                <div className=" p-4 flex gap-4">
                                    <button type="button" onClick={getTrajet} className="text-white text-sm flex px-4  hover:shadow-md  hover:bg-cyan-700 rounded-sm bg-cyan-500 p-2">
                                        Actualiser
                                    </button>
                                    <button type="button" onClick={deleteTrajet} className="text-white text-sm flex px-4  hover:shadow-md  hover:bg-red-700 rounded-sm bg-red-500 p-2">
                                        Supprimer
                                    </button>

                                </div>
                            </div>
                        </section>
                    )}
            </div>
            {isOpenPopup ? (<Popup color={popupData?.color} title={popupData.title} message={popupData?.message} onShow={() => setIsOpenPopup(false)} />) : null}

        </div>

    )
}
