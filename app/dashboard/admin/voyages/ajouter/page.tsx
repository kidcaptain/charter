"use client"

import Planning from "@/components/ui/planning";
import Popup from "@/components/ui/popup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import positionSvg from "@/public/images/position.svg"
import busSvg from "@/public/images/bus-logo.svg"

export default function Page() {
    const [arrets, setArrets] = useState<{ nom: string, prix: number }[]>([])
    const [data, setData] = useState<any>()
    const [bus, setBus] = useState<any[]>([])
    const [agences, setAgences] = useState<any[]>([])
    const [comVoy, setComVoy] = useState<number>(0)
    const [trajet, setTrajet] = useState<any[]>([])
    const messagesError: string[] = ["La date de départ doit être supérieure ou égale à date d'aujourd'hui!", "La date d'arrivée doit être supérieure ou date égale a la date de départ", "Date incorrect", "Formulaire incomplet!"]
    const [messageError, setMessageError] = useState<string>("");
    const day: number = new Date().getDate();
    const month: number = new Date().getMonth() + 1;
    const year: number = new Date().getFullYear();
    const [employe, setemploye] = useState<any[]>([])
    const [busId, setBusId] = useState<string | undefined>("")
    const [popupData, setPopupData] = useState<{ message: string, title?: string, color: string }>({ message: "", title: "", color: "" })
    const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
    const [trajItem, setTrajItem] = useState<any>()
    const router = useRouter();
    const configPopup = (message: string, color: string, title: string) => {
        setPopupData({ message: message, color: color, title: title })
        setIsOpenPopup(true)
        setTimeout(() => {
            setIsOpenPopup(false)
        }, 5000);
    }
    const [prixA, setprixA] = useState<number>(0)
    const viewArret = async (str: string) => {
        let val = JSON.parse(str).id;
        const res = await fetch("/api/trajets/" + val, { cache: "no-store" })
        if (!res.ok) {
            throw new Error("Failed")
        }
        const data = await res.json();
        setTrajItem(data);
        if (data) {
            setArrets(JSON.parse(data.arrets));
            let compt: number = 0;
            let po: { nom: string, prix: number }[] = JSON.parse(data.arrets);
            po.map((t) => {
                compt += t.prix;
            })
            setprixA(compt)
        } else {
            setprixA(JSON.parse(str).prix)
        }
    }

    const handleInputChange = (event: any) => {
        const target = event.target
        if (target.name == "busId") {
            const str = target.value;
            const array = str.split(',').map(Number);
            setBusId(array[0])
        }
        const data = target.type === 'checkbox' ? target.checked : target.value
        setData((oldValue: any) => {
            return { ...oldValue, [target.name]: data }
        })
    }

    const checkDates = (val: any) => {
        switch (val.name) {
            case "dateDepart":
                const d = new Date(val.value);
                if (day > d.getDate()) {
                    setMessageError(messagesError[0] + "(Jour incorrect)");
                } else if (month > d.getMonth() + 1) {
                    setMessageError(messagesError[0] + "(Mois incorrect)");
                } else if (year > d.getFullYear()) {
                    setMessageError(messagesError[0] + "Année incorrect")
                } else {
                    if (data.dateArrivee) {
                        const d2 = new Date(data.dateArrivee);
                        if (d2.getDate() < d.getDate()) {
                            setMessageError(messagesError[1] + "(Jour incorrect)");
                        } else if (d2.getMonth() + 1 < d.getMonth() + 1) {
                            setMessageError(messagesError[1] + "(Mois incorrect)");
                        } else if (d2.getFullYear() < d.getFullYear()) {
                            setMessageError(messagesError[1] + "Année incorrect")
                        } else {
                            setMessageError("");
                        }
                    }
                }

                break;
            case "dateArrivee":
                const depart: any = document.getElementById("dateDepart");
                if (depart.value) {
                    const d = new Date(depart.value);
                    const d2 = new Date(val.value);
                    if (d2.getDate() < d.getDate()) {
                        setMessageError(messagesError[1] + "(Jour incorrect)");
                    } else if (d2.getMonth() + 1 < d.getMonth() + 1) {
                        setMessageError(messagesError[1] + "(Mois incorrect)");
                    } else if (d2.getFullYear() < d.getFullYear()) {
                        setMessageError(messagesError[1] + "Année incorrect")
                    } else {
                        setMessageError("");
                    }
                }
                break;
            default:
                setMessageError("");
                break;
        }
    }

    const HandlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const str = data.busId;
        const array = str.split(',').map(Number);
        let trajet = JSON.parse(data.trajetId);
        const res = await fetch("/api/voyages", { cache: "no-store" })
        if (!res.ok) {
            throw new Error("Failed")
        }
        let bol: boolean = false;
        let bol2: boolean = true;
        const datas: any[] = await res.json();
        if (datas.length > 0) {
            datas.forEach((i) => {
                if (bol2) {
                    if (i.dateArrivee != data?.dateDepart && parseInt(i.busId) == parseInt(array[0])) {
                        bol = false;
                        let dateA = `${i.dateArrivee}`;
                        let dateD = `${data?.dateDepart}`;
                        if (parseInt(`${dateA[0]}${dateA[1]}${dateA[2]}${dateA[3]}`) <= parseInt(`${dateD[0]}${dateD[1]}${dateD[2]}${dateD[3]}`)) {
                            if (parseInt(`${dateA[5]}${dateA[6]}`) <= parseInt(`${dateD[5]}${dateD[6]}`)) {
                                if (parseInt(`${dateA[8]}${dateA[9]}`) <= parseInt(`${dateD[8]}${dateD[9]}`)) {
                                    bol = true;
                                } else {
                                    bol = false;
                                    bol2 = false;
                                }
                            } else {
                                bol = false;
                            }
                        } else {
                            bol = false;
                        }
                    } else {
                        bol = true;
                    }
                }
            })
        } else {
            bol = true
        }
        if (!data.dateArrivee) {
            router.refresh()
        }

        if (messageError == "" && bol) {
            const voyage = {
                agenceId: data.agenceId,
                dateDepart: data.dateDepart,
                dateArrivee: data.dateArrivee,
                busId: `${array[0]}`,
                trajetId: trajet.id,
                typeVoyage: data.typeVoyage,
                prixVoyage: trajet.prix,
                placeDisponible: array[1],
                chauffeurId: data.chauffeurId ?? 0,
                heureDepart: data.heureDepart,
                numVoyage: data.numVoyage,
            }



            try {
                const response = await fetch('/api/voyages', {
                    method: 'POST',
                    cache: "no-store",
                    body: JSON.stringify(voyage),
                })
                if (response.ok) {
                    configPopup("Voyage programmé", "blue", "")
                    document.getElementById("resetbtn")?.click()
                    setData(null)
                }
            } catch (err) {
                console.log(err)
                configPopup("Une erreur c'est produite veuillez actualiser la page et reessayer!", "yellow", "")
            }
        } else {

            if (!bol) {
                alert("Bus indisponible veuillez selectionner une plage horaire valide!")
            } else if (messageError == "") {
                configPopup("Veuillez remplir correctement les informations!", "red", "")
            }
        }
    }




    useEffect(() => {
        const getVoyage = async () => {
            const res = await fetch("/api/voyages", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data: any[] = await res.json();
            setComVoy(data.length)
        };
        getVoyage()
        const getTrajet = async () => {
            const res = await fetch("/api/trajets", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setTrajet(data)
        };
        const getEmploye = async () => {
            const resc = await fetch(`/api/postes`, { cache: "no-store" })
            if (!resc.ok) {
                throw new Error("Failed")
            }

            const data: any[] = await resc.json();
            data.map(async (z) => {
                if (z.titre == "chauffeur") {
                    const res = await fetch(`/api/employes?posteId=${z.id}`, { cache: "no-store" })
                    if (!res.ok) {
                        throw new Error("Failed")
                    }
                    const datas = await res.json();
                    setemploye(datas)
                }
            })
        };

        const getAgence = async () => {
            const res = await fetch("/api/agences", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setAgences(data)
        };

        const getBus = async () => {
            const res = await fetch("/api/bus", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setBus(data)
        };
        getEmploye()
        getBus();
        getTrajet();
        getAgence();
    }, [])



    return (
        <div className=" w-full p-10">
            <div className=" py-2 flex justify-between items-start">
                <h1 className="lowercase text-sm  text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/admin/voyages"}>Voyages</Link> / <Link className="hover:text-blue-600" href="#">Ajouter</Link></h1>
            </div>
            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="text-xl text-gray-900">Programmer un voyage </h1>
            </div>
            <div className="grid gap-4 items-start grid-cols-3 m-auto">
                <div className=" col-span-1">
                    <form onSubmit={HandlerSubmit} className="col-span-1 bg-white shadow-xl rounded-sm  ">
                        <h2 className=" text-gray-100 p-4 bg-green-500  uppercase">
                            Formulaire
                        </h2>
                        <div className=" m-auto p-4">
                            <div className="mt-4 text-center text-sm text-red-500 font-medium">
                                <span>
                                    {messageError != "" ? messageError : null}
                                </span>
                            </div>
                            <h3>Voyage N°{comVoy + 1}</h3>
                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Numérotation du Voyage</label>
                                <input onChange={handleInputChange} required type="text" id="numVoyage" placeholder={`EXP: VOY${comVoy + 1}`} name="numVoyage" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Bus</label>
                                <select id="busId" name="busId" required onChange={handleInputChange} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                    <option></option>
                                    {bus.map((item: any, i: number) => (
                                        <option key={i} value={[item.id, item.capacite]}>Bus-{item.id} {item.typeBus} ({item.marque} {item.modele} )</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Date de Départ</label>
                                <input onChange={e => { checkDates(e.target); handleInputChange(e) }} required type="date" id="dateDepart" placeholder="Départ" name="dateDepart" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Date de Arrivée</label>
                                <input onChange={e => { checkDates(e.target); handleInputChange(e) }} required type="date" id="dateArrivee" placeholder="Départ" name="dateArrivee" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Heure de Départ</label>
                                <input onChange={handleInputChange} required type="time" id="heureDepart" placeholder="Heure de départ" name="heureDepart" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                            </div>

                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Trajet</label>
                                <select id="trajetId" name="trajetId" required onChange={(e) => { handleInputChange(e); viewArret(e.target.value) }} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                    <option></option>
                                    {trajet.map((item: any, i: number) => (
                                        <option key={i} value={JSON.stringify({ id: item.id, prix: item.prix })}>{item.lieuDepart} - {item.lieuArrivee}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Agence</label>
                                <select id="agenceId" name="agenceId" required onChange={handleInputChange} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                    <option></option>
                                    {agences.map((item: any, i: number) => (
                                        <option key={i} value={item.id}>{item.nom} ({item.adresse})</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Type de voyages:</label>
                                <select id="typeVoyage" name="typeVoyage" required onChange={handleInputChange} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                    <option></option>
                                    <option value="aller-retour">Aller-Retour</option>
                                    <option value="aller simple">Aller Simple</option>
                                </select>
                            </div>
                            <div className="mt-4">
                                <label className="  text-sm uppercase">Attribuer un chauffeur</label>
                                <select id="chauffeurId" name="chauffeurId" onChange={handleInputChange} className="block w-full text-sm p-2 uppercase text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                    <option></option>
                                    {employe.map((item: any, i: number) => (
                                        <option key={i} value={item.id}>{item.nom} {item.prenom}</option>
                                    ))}
                                </select>
                            </div>
                            {/* <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Prix du voyage</label>
                                <input onChange={handleInputChange} required type="number" id="prixVoyage" name="prixVoyage" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                            </div> */}
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
             <div className="col-span-2">
             {
                    data?.busId ?
                        (<div>
                            <h2>Disponibilité du bus</h2>
                            <Planning id={busId} />
                        </div>) : null
                }
                {
                    data?.trajetId ?
                        (

                            <div className="w-full overflow-hidden bg-white border rounded-md  ">
                               <h2 className="p-4 "> Trajet {trajItem?.id}</h2>
                                <div className=" m-auto relative " style={{ width: 600 }}>
                                    <div className='flex p-4 py-8 items-center gap-4 overflow-x-auto'>
                                        <div className='flex items-center gap-4'>
                                            <div className='text-center'>
                                                <div className='p-2 w-12 h-12 rounded-full border-black border-2 ring-4 ring-blue-500 text-white font-bold  justify-center flex item-center'>
                                                    <Image width={35} height={35} alt='' src={busSvg} />
                                                </div>
                                                <h4 className=' mt-2 lowercase font-semibold text-gray-800 '>{trajItem?.lieuDepart} </h4>
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
                                                    {parseInt(trajItem?.prix) - prixA} Fcfa
                                                </span>
                                            </div>
                                            <div className='text-center'>
                                                <div className='p-2 w-12 h-12 rounded-full border-black border-2 ring-4 ring-blue-500 text-white font-bold  justify-center flex item-center'>
                                                    <Image width={35} height={35} alt='' src={busSvg} />
                                                </div>
                                                <h4 className=' mt-2 lowercase font-semibold text-gray-800 '>{trajItem?.lieuArrivee}</h4>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>

                        ) : null
                }
             </div>
            </div>

        </div>

    )
}