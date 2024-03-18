
"use client"

import { useEffect, useState } from "react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getDateFormat } from "@/functions/actionsClient";
import Image from 'next/image';
import flecheSvg from '@/public/images/fleche.svg'


export default function Page() {

    const [voyages, setVoyage] = useState<any[]>([])

    const [bol, setBol] = useState<boolean>(false)
    const [prixt, setprixt] = useState<number>(0)
    const [arrets, setArrets] = useState<{ nom: string, prix: number }[]>([])

    useEffect(() => {
        const getTrajet = async () => {
            const res = await fetch("/api/trajets/", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
        };

        const getData = async (id: number) => {
            const res = await fetch("/api/voyages?agenceId=" + id, { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
        };
        const getBus = async () => {
            const res = await fetch("/api/bus", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
        };
        const agence = localStorage.getItem("agence")
        const selectVoyage = async () => {
            if (agence) {
                const t = JSON.parse(agence)
                const tabVoyages: any[] = await getData(t.agenceId);
                const tab: any[] = [];
                const tabTrajets: any[] = await getTrajet();
                const tabBus: any[] = await getBus();
                tabVoyages.map((r) => {
                    tabTrajets.map((i) => {
                        tabBus.map((j) => {
                            if ((r.trajetId === i.id) && (parseInt(r.busId) === j.id)) {
                                tab.push({ trajet: i, voyages: r, bus: j, placeOccupees: (j.placesDisponible - r.placeDisponible) })
                            }
                        })

                    })
                })
                setVoyage(tab)
            }
        }
        selectVoyage()
    }, [voyages])

    const getDate = (str: string) => {
        const date = new Date(str);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        return `${year}-${month}-${day}`
    }
    const ready = async (item: any) => {
        const voyage = {
            dateDepart: getDateFormat(item.dateDepart),
            dateArrivee: getDateFormat(item.dateArrivee),
            busId: item.busId,
            trajetId: item.trajetId,
            typeVoyage: item.typeVoyage,
            prixVoyage: item.prixVoyage,
            placeDisponible: item.placeDisponible,
            ready: "oui"
        }
        try {
            const response = await fetch(`/api/voyages/${item.id}`, {
                method: 'PUT',
                cache: "no-store",
                body: JSON.stringify(voyage),
            })
            if (response.ok) {
                alert("Voyage confirmé")
            }
        } catch (err) {
            console.log(err)

        }
    }
    const noready = async (item: any) => {
        const voyage = {
            dateDepart: getDateFormat(item.dateDepart),
            dateArrivee: getDateFormat(item.dateArrivee),
            busId: item.busId,
            trajetId: item.trajetId,
            typeVoyage: item.typeVoyage,
            prixVoyage: item.prixVoyage,
            placeDisponible: item.placeDisponible,
            ready: "non"
        }
        try {
            const response = await fetch(`/api/voyages/${item.id}`, {
                method: 'PUT',
                cache: "no-store",
                body: JSON.stringify(voyage),
            })
            if (response.ok) {
                alert("Voyage reporté")
            }
        } catch (err) {
            console.log(err)

        }
    }
    const viewArret = (val: string, prix: number) => {
        if (val != "") {
            setArrets(JSON.parse(val));
        }
        setprixt(prix)
        setBol(true)
    }
    const compareDate = (value: string) => {
        const date = new Date(value);
        const date2 = new Date();
        if (date.getFullYear() >= date2.getFullYear()) {
            if (date.getMonth() >= date2.getMonth()) {
                if (date.getDate() >= date2.getDate()) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        } else {
            return false
        }
    }

    const classVoyage = (numb: number, str: string, date: string) => {
        const dates = new Date();
        const year = dates.getFullYear();
        const month = (dates.getMonth() + 1) < 10 ? `0${dates.getMonth() + 1}` : `${dates.getMonth() + 1}`;
        const day = (dates.getDate()) < 10 ? `0${dates.getDate()}` : `${dates.getDate()}`;
        const dates2 = new Date(date);
        const year2 = dates2.getFullYear();
        const month2 = (dates2.getMonth() + 1) < 10 ? `0${dates2.getMonth() + 1}` : `${dates2.getMonth() + 1}`;
        const day2 = (dates2.getDate()) < 10 ? `0${dates2.getDate()}` : `${dates2.getDate()}`;

        if (numb == 0 && (str == "non" || str == "")) {
            return `border-b  text-sm  bg-cyan-100 border-cyan-300 border-b-2 hover:bg-cyan-200  `
        } else if (numb == 0 && str == "oui") {
            return "cursor-not-allowed border-b text-sm  bg-lime-200 border-lime-300 border-b-2 hover:bg-lime-300"
        } else if ((year >= year2 && month >= month2 && day > day2)) {
            return `bg-gray-50 border-b border-gray-200 text-sm   cursor-pointer hover:bg-gray-200 `
        } else {
            return 'bg-gray-50 border-b border-gray-200 text-sm   cursor-pointer hover:bg-gray-200'
        }
    }
    return (
        <div className=" w-full p-10">
            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="text-xl text-gray-900">Voyages</h1>
                <Link href={"/dashboard/caisse/voyages/ajouter"} className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-sm text-xs px-5 py-2.5 text-center">
                    Programmer un voyage
                </Link>
            </div>
            <section className=" w-full gap-4">
                <section className="mt-4 shadow-2xl">
                    <h2 className="p-4 bg-white">Voyages programmés</h2>
                    <section className=" bg-white h-full w-full shadow-xl rounded-sm">
                        <div className="relative overflow-x-auto">
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-400">
                                    <thead className="text-sm border text-gray-700  dark:text-gray-400">
                                        <tr>
                                            <th rowSpan={1} scope="row" colSpan={1} className="border-b-2 p-2 border ">
                                                <div className="items-center flex justify-between ">
                                                    #Id
                                                    <Image src={flecheSvg} height={15} width={15} alt='image' />
                                                </div>
                                            </th>
                                            <th rowSpan={1} colSpan={1} scope="row" className="border-b-2 p-2  border ">
                                                <div className=" items-center flex justify-between">
                                                    #Trajet
                                                    <Image src={flecheSvg} height={15} width={15} alt='image' />
                                                </div>
                                            </th>
                                            <th rowSpan={1} colSpan={1} className="border-b-2 p-2 border ">
                                                <div className=" items-center flex justify-between ">
                                                    Nom du Véhicule
                                                    <Image src={flecheSvg} height={15} width={15} alt='image' />
                                                </div>
                                            </th>
                                            <th rowSpan={1} colSpan={1} className="border-b-2 p-2 border ">
                                                <div className=" items-center flex justify-between ">
                                                    Type de voyage
                                                    <Image src={flecheSvg} height={15} width={15} alt='image' />
                                                </div>
                                            </th>
                                            <th rowSpan={1} colSpan={1} className="border-b-2 p-2 border ">
                                                <div className="items-center flex justify-between ">
                                                    Places restantes
                                                    <Image src={flecheSvg} height={15} width={15} alt='image' />
                                                </div>
                                            </th>
                                            <th rowSpan={1} colSpan={1} className="border-b-2 p-2 border ">
                                                <div className="items-center flex justify-between ">
                                                    Places occupées
                                                    <Image src={flecheSvg} height={15} width={15} alt='image' />
                                                </div>
                                            </th>

                                            <th className="border-b-2 p-2  border ">
                                                <div className="items-center flex justify-between ">
                                                    Date de Départ
                                                    <Image src={flecheSvg} height={15} width={15} alt='image' />
                                                </div>
                                            </th>
                                            <th className="border-b-2 p-2  border ">
                                                <div className="items-center flex justify-between ">
                                                    Date d&apos;arrivée
                                                    <Image src={flecheSvg} height={15} width={15} alt='image' />
                                                </div>
                                            </th>
                                            <th className="border-b-2 p-2  border ">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {voyages.map((item: any, i: number) => (
                                            <tr key={i} title={`${item.voyages?.placeDisponible == 0 ? 'Plein' : ''}`} className={"relative" + classVoyage(item.voyages?.placeDisponible, item.voyages?.ready, getDateFormat(item.voyages?.dateDepart))}>
                                                <th className="p-1 px-2 border ">
                                                    {item.voyages?.id}
                                                </th>
                                                <th className="p-1 px-2 border ">
                                                    {item.trajet?.lieuDepart ?? "Aucun trajet n'est assigné à se voyage"} - {item.trajet?.lieuArrivee ?? ""}
                                                </th>
                                                <td className="p-1 px-2 border">
                                                    {item.bus?.marque ?? ""}  {item.bus?.modele ?? "Aucun bus n'est assigné à se voyage!"}
                                                </td>
                                                <td className="p-1 px-2 border">
                                                    {item.voyages?.typeVoyage}
                                                </td>
                                                <td className="p-1 px-2 border ">
                                                    {item.voyages?.placeDisponible}
                                                </td>
                                                <td className="p-1 px-2 border">
                                                    {item.placeOccupees}
                                                </td>

                                                <td className="p-1 px-2 border">
                                                    {getDate(item.voyages?.dateDepart)}
                                                </td>
                                                <td className="p-1 px-2 border">
                                                    {getDate(item.voyages?.dateArrivee)}
                                                </td>
                                                <td>
                                                <button type="button" onClick={() => viewArret(item.trajet?.arrets, item.trajet?.prix)} className='bg-cyan-600 text-xs hover:bg-cyan-700 p-1 px-2 text-white '>Afficher les traifs du voyage</button>
                                                    <Link href={`/dashboard/caisse/voyages/${item.voyages.id}`} className='bg-cyan-200 hover:bg-cyan-600 hover:text-white p-1 block text-sm text-cyan-800'>Bordereau</Link>
                                                
                                                    {
                                                        item.voyages?.ready == "non" && (item.trajet && item.bus) && compareDate(getDateFormat(item.voyages?.dateDepart)) ? (
                                                            <>
                                                                <Link href={`/dashboard/caisse/voyages/${item.voyages.id}/editer`} className='bg-yellow-200 hover:bg-yellow-600 text-yelow-600 hover:text-white text-sm p-1 '>Editer</Link>
                                                                <button type="button" onClick={() => ready(item.voyages)} className='bg-green-400 text-xs p-1 px-2 hover:bg-green-500'>Confirmer</button>
                                                            </>
                                                        ) : null
                                                    }
                                                    {
                                                        item.voyages?.ready == "oui" && compareDate(getDateFormat(item.voyages?.dateDepart)) && (item.trajet && item.bus) && item.voyages?.placeDisponible != 0 ? (
                                                            <button type="button" onClick={() => noready(item.voyages)} className='bg-red-400 text-xs p-1 px-2 hover:bg-red-500'>Annuler</button>
                                                        ) : null
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {
                                bol ? (
                                    <div className='absolute z-0 top-0 left-0 flex justify-center items-center bg-black/30 w-full h-full'>
                                        <div className="w-full max-w-96 overflow-hidden bg-white shadow-2xl rounded-md  ">
                                            <h2 className=" text-gray-100 text-sm p-4 bg-blue-500 bg-gradient-to-tr from-blue-700 uppercase">
                                                Arrêts et Tarifs
                                            </h2>
                                            <div className="p-4">
                                                <div className={`p-2 border-b-stone-500 border-b grid grid-cols-2 bg-white hover:bg-stone-100`}>
                                                    <span className='font-bold'>Arrêt Normal </span> <span className='text-right'>{prixt} fcfa</span>
                                                </div>
                                                {
                                                    arrets.map((i: any, index: number) => (
                                                        <div key={index} className={`p-2 border-b-stone-500 border-b grid grid-cols-2 ${index % 2 == 0 ? 'bg-stone-200 hover:bg-stone-300' : 'bg-white hover:bg-stone-100'}`}>
                                                            <span className='font-bold'>{i.nom}</span> <span className='text-right'>{i.prix} fcfa</span>
                                                        </div>
                                                    ))
                                                }
                                                <button onClick={close} className='border  p-1 rounded-md   mt-4 w-full bg-stone-700 text-white'>Fermer</button>
                                            </div>


                                        </div>
                                    </div>
                                ) : null
                            }
                        </div>
                    </section>
                </section>
            </section>
        </div>
    )
}
