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
    const [prixD, setprixD] = useState<number>(0);
    const router = useRouter();
    const [popupData, setPopupData] = useState<{ message: string, title?: string, color: string }>({ message: "", title: "", color: "" })
    const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
    const [arrets, setArrets] = useState<{ nom: string, prix: number }[]>([])


    useEffect(() => {

        const getData = async () => {
            const res = await fetch(`/api/trajets?id=${params.trajetId}`, { method: "GET", cache: "no-store" })

            if (!res.ok) {
                throw new Error("Failed")
            }
            let tabArret: { nom: string, prix: number }[] = [];
            const val = await res.json();
            if (val.arrets != "") {
                tabArret = JSON.parse(val.arrets)
            }

            setArrets(val.arrets)
            setTrajet({ ...val, tabArret: tabArret });
            setData({ ...val, tabArret: tabArret });

        };
        getData();
    }, [params.trajetId]);

    const handleArretInputChange = (val: any, index: number) => {
        let tab: { nom: string, prix: number }[] = data.tabArret;
        if (val.type == "number") {
            tab[index].prix = parseInt(val.value.toString())
        } else {
            tab[index].nom = val.value.toString()
        }
        setArrets(tab)
        setData({ ...data, tabArret: tab })
    }

    const getTrajet = async () => {
        const res = await fetch(`/api/trajets?id=${params.trajetId}`, { method: "GET", cache: "no-store" })
        if (!res.ok) {
            throw new Error("Failed")
        }
        let tabArret: { nom: string, prix: number }[] = [];
        const val = await res.json();
        if (val.arrets != "") {
            tabArret = JSON.parse(val.arrets)
        }

        setArrets(val.arrets)
        setTrajet({ ...val, tabArret: tabArret });
        setData({ ...val, tabArret: tabArret });
    }

    const handleInputChange = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleResetForm = () => {
        setData(trajet);
    }

    const HandlerSubmit = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        let prix: number = 0;
        let t: any[] = data.tabArret;
        if (t.length > 0) {
            t.map((i) => {
                prix += i.prix;
            })
        } else {
            prix = data.prix;
        }

        const datas = { ...data, distance: 0, prix: parseInt(`${prix}`) + parseInt(`${prixD}`), arrets: JSON.stringify(data.tabArret) }
        try {
            const response = await fetch(`/api/trajets?id=${params.trajetId}`, {
                method: 'PUT',
                body: JSON.stringify(datas),
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
    const addArret = () => {
        const tab: { nom: string, prix: number }[] = data.tabArret;
        tab.push({ nom: "", prix: 0 });
        setData({ ...data, tabArret: tab })
        router.refresh()
    }
    const deleteArret = () => {
        const tab: { nom: string, prix: number }[] = data.tabArret;
        tab.pop();
        setData({ ...data, tabArret: tab })
        router.refresh()
    }
    const allDeleteArret = () => {
        const tab: { nom: string, prix: number }[] = data.tabArret;
        tab.length = 0;
        setData({ ...data, tabArret: tab })
        router.refresh()
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
                                    {((data.lieudepart && data.lieudepart != "") && (data.lieuarrivee == data.lieudepart)) ? (<div className="text-xs bg-yellow-100 my-2 p-4">Le lieu de départ et le lieu d&apos;arrivée sont pariels</div>) : null}
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
                                    <button type="button" onClick={addArret} className="border-blue-400 border mt-4 text-blue-400  text-sm p-1" >Ajouter un arrêt</button>
                                    {
                                        data.tabArret?.length > 0 ? (<fieldset className="py-4">
                                            <h3 className="mt-4  font-bold">Arrêts</h3>
                                            {
                                                data.tabArret.map((i: { nom: string, prix: number }, index: number) => (
                                                    <div key={index} className="my-2">
                                                        <label className="block text-sm  text-gray-900 dark:text-white">Arrêt N° {index + 1}</label>
                                                        <input onChange={(e) => handleArretInputChange(e.target, index)} type="text" value={i.nom} id={`arretNom${index + 1}`} placeholder="nom" name={`arretNom${index + 1}`} className={`block my-1 text-sm w-full p-1.5 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400`} />
                                                        <input onChange={(e) => handleArretInputChange(e.target, index)} type="number" value={i.prix} min={0} id={`arretPrix${index + 1}`} placeholder="prix" name={`arretPrix${index + 1}`} className={`block my-1 text-sm w-full p-1.5 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400`} />
                                                    </div>
                                                ))
                                            }
                                            <div className="my-2">
                                                <label className="block text-sm font-bold text-gray-900 dark:text-white">Prix du dernier arrêt au lieu d&apos;arrivée</label>
                                                <input onChange={(e) => setprixD(parseInt(e.target.value))} required type="number" min={0} placeholder="prix" name="prixD" className={`block my-1 text-sm w-full p-1.5 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400`} />
                                            </div>
                                        </fieldset>) :

                                            <div className="my-4">
                                                <label className="block text-sm  font-bold text-gray-900 dark:text-white">Prix du trajet</label>
                                                <input onChange={handleInputChange} value={data.prix} type="number" min={0} id="prix" placeholder="prix" name="prix" className={`block my-1 text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400`} />
                                            </div>
                                    }
                                    <div className="grid grid-cols-3 gap-1">

                                        {
                                            data.tabArret.length > 1 ?
                                                <button type="button" onClick={deleteArret} className="border-red-400 border mt-2 text-red-400  text-sm p-1" >Retirer</button> : null}
                                        {
                                            data.tabArret.length > 0 ?
                                                <button type="button" onClick={allDeleteArret} className="border-stone-400 border mt-2 text-stone-400  text-sm p-1" >Tout annuler</button> : null}
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
                                <div className=" p-4 flex gap-4">
                                    <button type="button" onClick={getTrajet} className="text-white text-xs flex hover:shadow-md  hover:bg-cyan-700 rounded-sm bg-cyan-500 p-2">
                                        Actualiser les informations
                                    </button>
                                    <button type="button" onClick={deleteTrajet} className="text-white text-xs flex hover:shadow-md  hover:bg-red-700 rounded-sm bg-red-500 p-2">
                                        Supprimer le trajet
                                    </button>
                                </div>
                                <ul className="flex flex-col">
                                    <li className="border-b p-4 uppercase"><h5 className="font-bold">Trajet</h5><span className=" font-semibold text-gray-700">{trajet.lieuDepart}-{trajet.lieuArrivee}</span></li>
                                    
                                    <li className="border-b p-4 uppercase">Les arrêts de voyages</li>
                                    {
                                        trajet.arrets != "" ?
                                            (JSON.parse(trajet.arrets).map((i: any, index: number) => (
                                                <li key={index} className={`p-2 px-4 uppercase grid grid-cols-3 text-sm justify-between ${index % 2 == 0 ? 'bg-stone-200 border-b-2 border-stone-400' : 'bg-white border-b '}`}><h5 className="font-bold">Arret n° {index + 1}</h5><span className=" font-semibold text-gray-700">Lieu: {i.nom} </span> <span className=" font-semibold text-gray-700">Prix: {i.prix} fcfa </span></li>
                                            ))) : <li className="border-b p-4 bg-slate-50 text-sm">Aucun arrêts pour ce trajet</li>
                                    }
                                    <li className="border-b p-4 uppercase"><h5 className="font-bold">Prix total</h5><span className=" font-semibold text-gray-700">{trajet.prix} fcfa</span></li>
                                </ul>
                            </div>
                        </section>
                    )}
            </div>
            {isOpenPopup ? (<Popup color={popupData?.color} title={popupData.title} message={popupData?.message} onShow={() => setIsOpenPopup(false)} />) : null}
        </div>

    )
}
