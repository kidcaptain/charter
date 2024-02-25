"use client"
import Image from "next/image";
import CardVoyage from "./cardVoyage";
import busSvg from "@/public/images/bus-logo.svg"
import { useState, useEffect, useRef } from "react";
import { getDateFormat, selectVoyage } from "@/functions/actionsClient";

export default function ModalTrajet(props: { isOpen: boolean, childToParent: Function, setData: Function, slug: string, typeBus: string, typeVoyage: string }) {

    const [voyages, setVoyages] = useState<any[]>([])
    const [voyagesResult, setVoyagesResult] = useState<any[]>([])
    const [dateDepart, setDateDepart] = useState<any>()
    const villes = ["Douala", "Yaoundé"]
    const villedepart = useRef<any>();
    const villearrivee = useRef<any>();
    const [onSearched, setOnsearched] = useState<boolean>(false)
    useEffect(() => {
        const getData = async () => {
            const data = await selectVoyage();
            setVoyages(data)
        }
        getData();
    }, [])
    const HandleSubmit = (tabs: any[]) => {
        const date = new Date();
        const tab: any[] = []
        if (villearrivee.current.value != "" && villedepart.current.value != "" && dateDepart) {
            tabs.map((item: any, i: number) => {
                if ((item.bus.typeBus == props.typeBus) && (item.voyages?.typeVoyage == props.typeVoyage) && (item.trajet?.lieuDepart == villedepart.current.value) && (item.trajet?.lieuArrivee == villearrivee.current.value)) {
                    tab.push(item)
                }
            })
            setVoyagesResult(tab)
            setOnsearched(true)
        }else{
            alert("Veuillez entrée la date de départ!")
        }
    }
    const getDate = (str: string) => {
        const date = new Date(str);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        return `${year}-${month}-${day}`
    }

    return (
        <>
            {props.isOpen ? (
                <section className="bg-black/50 w-full h-full top-0 left-0 fixed z-20">

                    <div className="max-w-xl mx-auto my-auto mt-4">
                        <div className="bg-white rounded-sm shadow-2xl shadow-black ">
                            <h1 className="text-center  text-lg p-4 bg-blue-600 uppercase font-medium text-white">Recherche de voyages  </h1>
                            <div className="bg-blue-600 relative h-60 p-4 flex justify-center">
                                <div className=" gap-1 bg-white absolute z-40 p-4 rounded-md text-center flex-col  mb-1 items-center">
                                    <div className="mt-4 border">
                                        <div className="relative flex">
                                            <div className=" bg-blue-800 p-2 inset-y-0 px-4 start-0 top-0 text-xs text-white gap-3 flex items-center rounded-sm pointer-events-none">
                                                Depart
                                            </div>
                                            <select id="countries" ref={villedepart} className="block  w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                                {villes.map((value: string, index: number) => (
                                                    <option key={index + 1} value={value}>{value}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mt-4 border">
                                        <div className="relative flex">
                                            <div className=" bg-blue-800 p-2 inset-y-0 px-4 text-xs text-white start-0 top-0 flex items-center rounded-sm pointer-events-none">
                                                Arrivée
                                            </div>
                                            <select id="countries" ref={villearrivee} className="block  w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                                {villes.map((value: string, index: number) => (
                                                    <option key={index + 1} value={value}>{value}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mt-4 border">
                                        <div className="relative flex">
                                            <div className="text-xs text-white bg-blue-800 p-2 inset-y-0 px-4 start-0 top-0 flex items-center rounded-sm pointer-events-none">
                                                Date
                                            </div>
                                            <input onChange={e => setDateDepart(e.target.value)} type="date" id="depart" name="depart" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2 focus:ring-2  focus:outline-none sm:text-md focus-visible:ring-blue-400" placeholder="Ville d'arrivée" />
                                        </div>
                                    </div>
                                    <button type="button" onClick={() => HandleSubmit(voyages)} className="bg-green-700 text-white w-96 p-3 text-xs mt-4 rounded-sm">Rechercher</button>
                                    
                                </div>

                            </div>
                            <div className="overflow-y-auto p-4 pt-8 bg-stone-200 h-full" style={{ maxHeight: 500 }}>
                                {
                                    !onSearched ? (
                                        <ul className="overflow-y-auto relative h-full p-4">
                                            {voyages.map((item: any, i: number) => (
                                                ((item.bus.typeBus == props.typeBus) && (item.voyages?.typeVoyage == props.typeVoyage)) ? (
                                                    <li key={i} className="my-2" onClick={() => { props.childToParent({ val: !props.isOpen, item: item }); props.setData(item); setOnsearched(false) }} >
                                                        <CardVoyage isHidden={true} id={item.voyages?.id} isVip={true} agence="" date={getDate(item.voyages?.dateDepart)} prix={item.voyages?.prixVoyage} lieuArrive={item.trajet?.lieuArrivee} heureArrive={item.trajet?.heureArrivee} lieuDepart={item.trajet?.lieuDepart} heureDepart={item.trajet?.heureDepart} placeDisponible={item.voyages?.placeDisponible} />
                                                    </li>
                                                ) : null
                                            ))}
                                        </ul>
                                    ) : (
                                        <ul className="overflow-y-auto relative h-full p-4">
                                            <li className="text-center text-gray-600  font-bold uppercase">Resultat</li>
                                            {voyagesResult.map((item: any, i: number) => (
                                                (getDateFormat(item.voyages?.dateDepart) == dateDepart) ? (
                                                    <li key={i} className="my-2" onClick={() => { props.childToParent({ val: !props.isOpen, item: item }); props.setData(item); setOnsearched(false) }} >
                                                        <CardVoyage isHidden={true} id={item.voyages?.id} isVip={true} agence="" date={getDate(item.voyages?.dateDepart)} prix={item.voyages?.prixVoyage} lieuArrive={item.trajet?.lieuArrivee} heureArrive={item.trajet?.heureArrivee} lieuDepart={item.trajet?.lieuDepart} heureDepart={item.trajet?.heureDepart} placeDisponible={item.voyages?.placeDisponible} />
                                                    </li>
                                                ) : null
                                            ))}

                                        </ul>
                                    )
                                }
                            </div>
                            <div className="p-4 px-8">
                                <button onClick={() => { props.childToParent({ val: !props.isOpen, item: null }); props.setData(null); setOnsearched(false) }} className="  text-white  text-sm p-2  bg-stone-800 rounded-sm">Fermer</button>
                                {
                                    onSearched ? ( <button type="button" onClick={() => setOnsearched(false)} className="bg-green-700 text-white p-2 text-sm mx-4 rounded-sm">Annuler la rechercher</button>) : null
                                }
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}
        </>

    )

}