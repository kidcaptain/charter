"use client"
import { useEffect, useState } from 'react';
import InputForm from '../ui/inputForm';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import positionSvg from "@/public/images/position.svg"
import busSvg from "@/public/images/bus-logo.svg"

import { getDateFormat } from '@/functions/actionsClient';
import HelpPopup from '../ui/helpPopup';
const VoyageTable = (props: { childToParent: Function }) => {
    const [voyages, setVoyage] = useState<any[]>([])
    const [bol, setBol] = useState<boolean>(false)
    const [prixt, setprixt] = useState<number>(0)
    const [arrets, setArrets] = useState<{ nom: string, prix: number }[]>([])
    const router = useRouter()
    const [trajItem, setTrajItem] = useState<any>()
    const [prixA, setprixA] = useState<number>(0)
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
    const viewArret = (val: string, prix: number) => {
        if (val != "") {
            setArrets(JSON.parse(val));
            let compt: number = 0;
            let po: { nom: string, prix: number }[] = JSON.parse(val);
            po.map((t) => {
                compt += t.prix;
            })
            setprixA(compt)
        } else {
            setprixA(prix)
        }

        setprixt(prix)
        setBol(true)

    }
    useEffect(() => {
        const getTrajet = async () => {
            const res = await fetch("/api/trajets", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
        };

        const agence = localStorage.getItem("agence");

        const getData = async () => {
            if (agence) {
                const s = JSON.parse(agence);
                const res = await fetch("/api/voyages?agenceId=" + s.agenceId, { cache: "no-store" })
                if (!res.ok) {
                    throw new Error("Failed")
                }
                const data = await res.json();
                return data
            } else {
                const res = await fetch("/api/voyages", { cache: "no-store" })
                if (!res.ok) {
                    throw new Error("Failed")
                }
                const data = await res.json();
                return data
            }
        };
        const getBus = async () => {
            const res = await fetch("/api/bus", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
        };
        const getEmploye = async () => {
            const res = await fetch("/api/employes", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
        };
        const selectVoyage = async () => {
            const tabVoyages: any[] = await getData();
            const tab: any[] = [];
            const tabTrajets: any[] = await getTrajet();
            const tabEmploye: any[] = await getEmploye();
            const tabBus: any[] = await getBus();

            let trajet: any = null;
            let employe: any = null;
            let bus: any = null;
            let placeO: number = 0;
            tabVoyages.map((r) => {
                tabTrajets.map((i) => {
                    if (r.trajetId == i.id) {
                        trajet = i;
                    }
                })
                tabBus.map((j) => {
                    if ((parseInt(r.busId) === j.id)) {
                        bus = j;
                    }
                })
                tabEmploye.map((j) => {
                    if ((parseInt(r.chauffeurId) === j.id)) {
                        employe = j;
                    }
                })
                if (bus) {
                    placeO = bus.capacite - r.placeDisponible;
                } else {
                    placeO = r.placeDisponible;
                }

                tab.push({ trajet: trajet, employe: employe, voyages: r, bus: bus, placeOccupees: placeO })
                trajet = null;
                bus = null;
                placeO = 0;
            })
            tab.reverse()
            setVoyage(tab)
        }
        selectVoyage()
    }, [voyages])
    const ready = async (item: any) => {
        if (item.chauffeurId != 0) {
            const voyage = {
                dateDepart: getDateFormat(item.dateDepart),
                dateArrivee: getDateFormat(item.dateArrivee),
                busId: item.busId,
                trajetId: item.trajetId,
                typeVoyage: item.typeVoyage,
                prixVoyage: item.prixVoyage,
                placeDisponible: item.placeDisponible,
                ready: "oui",
                chauffeurId: item.chauffeurId,
                heureDepart: item.heureDepart,
                numVoyage: item.numVoyage,
            }
            try {
                const response = await fetch(`/api/voyages/${item.id}`, {
                    method: 'PUT',
                    cache: "no-store",
                    body: JSON.stringify(voyage),
                })
                if (response.ok) {
                    alert("Voysage confirmé")
                }
            } catch (err) {
                console.log(err)

            }
        } else {
            alert("Aucun chauffeur n'est enregistré pour ce voyage. Veuillez modifier le voyage!")
        }
    }
    const close = () => {
        setBol(false)
        arrets.length = 0;
        setArrets([]);
    }
    const noready = async (item: any) => {
        if (item.chauffeurId != 0) {
            const voyage = {
                dateDepart: getDateFormat(item.dateDepart),
                dateArrivee: getDateFormat(item.dateArrivee),
                busId: item.busId,
                trajetId: item.trajetId,
                typeVoyage: item.typeVoyage,
                prixVoyage: item.prixVoyage,
                placeDisponible: item.placeDisponible,
                ready: "non",
                chauffeurId: item.chauffeurId,
                heureDepart: item.heureDepart,
                numVoyage: item.numVoyage,
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
        } else {
            alert("Aucun chauffeur n'est enregistré pour ce voyage")
        }
    }
    const getDate = (str: string) => {
        const date = new Date(str);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        return `${year}-${month}-${day}`
    }

    const edit = (str: number) => {
        props.childToParent({ id: str, action: "edit" })
    }
    const view = (str: string) => {
        props.childToParent({ id: str, action: "view" })
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
        <section className=" bg-white h-full w-full shadow-xl rounded-sm p-4">

            <div className='py-4 flex'>
                <HelpPopup message="Les voyages affichés en rouge sont celle où la date de départ est passée." />
            </div>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-400">
                    <thead className="text-sm border text-gray-700  dark:text-gray-400">
                        <tr>
                            <th rowSpan={1} scope="row" colSpan={1} className="border-b-2 p-2 border ">
                                <div className="items-center flex justify-between ">
                                    #Id
                                </div>
                            </th>
                            <th rowSpan={1} scope="row" colSpan={1} className="border-b-2 p-2 border ">
                                <div className="items-center flex justify-between ">
                                    NumVoyage
                                </div>
                            </th>
                            <th rowSpan={1} colSpan={1} scope="row" className="border-b-2 p-2  border ">
                                <div className=" items-center flex justify-between">
                                    #Trajet
                                </div>
                            </th>
                            <th rowSpan={1} colSpan={1} className="border-b-2 p-2 border ">
                                <div className=" items-center flex justify-between ">
                                    Numéro du Véhicule(Bus)
                                </div>
                            </th>
                            <th rowSpan={1} colSpan={1} className="border-b-2 p-2 border ">
                                <div className=" items-center flex justify-between ">
                                    Classe
                                </div>
                            </th>
                            <th rowSpan={1} colSpan={1} className="border-b-2 p-2 border ">
                                <div className=" items-center flex justify-between ">
                                    Chauffeur
                                </div>
                            </th>

                            <th rowSpan={1} colSpan={1} className="border-b-2 p-2 border ">
                                <div className="items-center flex justify-between ">
                                    Places restantes
                                </div>
                            </th>
                            <th rowSpan={1} colSpan={1} className="border-b-2 p-2 border ">
                                <div className="items-center flex justify-between ">
                                    Places occupées
                                </div>
                            </th>

                            <th className="border-b-2 p-2  border ">
                                <div className="items-center flex justify-between ">
                                    Date de Départ
                                </div>
                            </th>
                            <th className="border-b-2 p-2  border ">
                                <div className="items-center flex justify-between ">
                                    Date d&apos;arrivée

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
                                <th className="p-1 px-2 border  text-center">
                                    {item.voyages?.id}
                                </th>
                                <th className="p-1 px-2 border ">
                                    {item.voyages?.numVoyage}
                                </th>
                                <th className="p-1 px-2 border ">
                                    {item.trajet?.lieuDepart ?? "Aucun trajet n'est assigné à se voyage"} - {item.trajet?.lieuArrivee ?? ""}
                                </th>
                                <td className="p-1 px-2 border">
                                    Bus-0{item.bus?.id} ({item.bus?.marque ?? ""}  {item.bus?.modele ?? "Aucun bus n'est assigné à se voyage!"})
                                </td>
                                <td className="p-1 px-2 border">
                                    {item.bus?.typeBus}
                                </td>
                                <td className="p-1 px-2 border">
                                    <span> {item.employe?.nom}    {item.employe?.prenom}</span>

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
                                    <button type="button" onClick={() => { viewArret(item.trajet?.arrets, item.trajet?.prix); setTrajItem(item.trajet) }} className='bg-cyan-600 text-xs hover:bg-cyan-700 p-1 px-2 text-white '>Afficher les tarifs du voyage</button>
                                    <button type="button" onClick={() => view(item.voyages.id)} className='bg-cyan-400 text-xs hover:bg-cyan-500 p-1 px-2 text-white '>Bordereau de route</button>

                                    {
                                        item.voyages?.ready == "non" && compareDate(getDateFormat(item.voyages?.dateDepart)) ? (
                                            <>
                                                <button type="button" onClick={() => edit(item.voyages.id)} className='bg-yellow-400 text-xs p-1 px-2 hover:bg-yellow-500'>Editer</button>
                                                <button type="button" onClick={() => ready(item.voyages)} className='bg-green-400 text-xs p-1 px-2 hover:bg-green-500'>Confirmer</button>
                                            </>
                                        ) : null
                                    }

                                    {
                                        item.voyages?.ready == "oui" && compareDate(getDateFormat(item.voyages?.dateDepart)) ? (
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
                    <div className='fixed z-0 top-0 left-0 flex justify-center items-center bg-black/30 w-full h-full'>
                        <div className="w-full  max-w-2xl overflow-hidden bg-white shadow-2xl rounded-md  ">
                            <h2 className=" text-gray-100 text-sm p-4 bg-blue-500 bg-gradient-to-tr from-blue-700 uppercase">
                                Arrets
                            </h2>
                            <div className=" m-auto relative " style={{ width: 600 }}>
                                <div className='flex p-4 py-8 items-center gap-4 overflow-x-auto'>
                                    <div className='flex items-center gap-4'>
                                        <div className='text-center'>
                                            <div className='p-2 w-12 h-12 rounded-full border-black border-2 ring-4 ring-blue-500 text-white font-bold  justify-center flex item-center'>
                                                <Image width={35} height={35} alt='' src={busSvg} />
                                            </div>
                                            <h4 className=' mt-2 lowercase font-semibold text-gray-800 '>{trajItem.lieuDepart} </h4>
                                        </div>

                                    </div>
                                    {
                                        arrets.map((i: any, index: number) => (
                                            <div key={index} className='flex items-center gap-4'>
                                                <div>
                                                    <hr className=' border-dashed border-2 border-yellow-300' />
                                                    <span className='text-xs'>
                                                        {i.prix}Fcfa
                                                    </span>
                                                </div>
                                                <div className='text-center'>
                                                    <div className='p-2 w-12 h-12 rounded-full border-black border-2 ring-4 ring-blue-500 text-white font-bold  justify-center flex item-center'>
                                                        <Image width={35} height={35} alt='' src={positionSvg} />
                                                    </div>
                                                    <h4 className=' mt-2 lowercase font-semibold text-gray-800 '>{i.nom}</h4>
                                                </div>

                                            </div>
                                        ))
                                    }
                                    <div className='flex items-center gap-4'>
                                        <div>
                                            <hr className=' border-dashed border-2 border-yellow-300' />
                                            <span className='text-xs'>
                                                {trajItem.prix - prixA} Fcfa
                                            </span>
                                        </div>
                                        <div className='text-center'>
                                            <div className='p-2 w-12 h-12 rounded-full border-black border-2 ring-4 ring-blue-500 text-white font-bold  justify-center flex item-center'>
                                                <Image width={35} height={35} alt='' src={busSvg} />
                                            </div>
                                            <h4 className=' mt-2 lowercase font-semibold text-gray-800 '>{trajItem.lieuArrivee}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='p-4'>
                                <button onClick={close} className='border  p-1 rounded-md   mt-4 text-sm px-4 bg-stone-700 text-white'>Fermer</button>
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </section>
    )
}

export default VoyageTable