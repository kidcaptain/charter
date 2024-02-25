
"use client"

import { useEffect, useState } from "react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getDateFormat } from "@/functions/actionsClient";
import Image from 'next/image';
import flecheSvg from '@/public/images/fleche.svg'
export default function Page() {

    const [voyages, setVoyage] = useState<any[]>([])


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
            const res = await fetch("/api/voyages?agenceId="+id, { cache: "no-store" })
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
    }, [])

    const getDate = (str: string) => {
        const date = new Date(str);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        return `${year}-${month}-${day}`
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
                                        <th rowSpan={1} colSpan={1} className="border-b-2 p-2 border ">
                                            <div className=" items-center flex justify-between ">
                                                Prix du ticket
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
                                        <tr key={i} className="border-b hover:bg-gray-200  border-gray-200 text-sm bg-gray-50  dark:border-gray-700">
                                            <th className="p-2 border ">
                                                {item.voyages?.id}
                                            </th>
                                            <th className="p-2 border ">
                                                {item.trajet?.lieuDepart} - {item.trajet.lieuArrivee}
                                            </th>
                                            <td className="p-2 border">
                                                {item.bus?.marque}  {item.bus?.modele}
                                            </td>
                                            <td className="p-2 border">
                                                {item.voyages?.typeVoyage}
                                            </td>
                                            <td className="p-2 border ">
                                                {item.voyages?.placeDisponible}
                                            </td>
                                            <td className="p-2 border">
                                                {item.placeOccupees}
                                            </td>
                                            <td className="p-2 border">
                                                {item.voyages?.prixVoyage}
                                            </td>
                                            <td className="p-2 border">
                                                {getDateFormat(item.voyages?.dateDepart)}
                                            </td>
                                            <td className="p-2 border">
                                                {getDateFormat(item.voyages?.dateArrivee)}
                                            </td>
                                            <td className="flex">
                                                <Link href={`/dashboard/caisse/voyages/${item.voyages.id}`} className='bg-cyan-200 hover:bg-cyan-600 hover:text-white p-1 block text-sm text-cyan-800'>Bordereau</Link>
                                                <Link href={`/dashboard/caisse/voyages/${item.voyages.id}/editer`} className='bg-yellow-200 hover:bg-yellow-600 text-yelow-600 hover:text-white text-sm p-1 '>Editer</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </section>
            </section>
        </div>
    )
}