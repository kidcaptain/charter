
'use client'

import UserAccountNav from "@/components/ui/userAccountNav"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

import { getDateFormat, selectVoyage } from "@/functions/actionsClient";
import ModalTrajet from "@/components/modalTrajets";
import Popup from "@/components/ui/popup";
import ComponentTicketPrint from "@/components/ui/ComponentToPrint";
import CardVoyage from "@/components/cardVoyage";
import svg from "@/public/images/loader.svg";
import Image from "next/image";
import HelpPopup from "@/components/ui/helpPopup";

export default function Page() {

    const router = useRouter()
    const [tab, setTab] = useState<boolean>(false);
    const [tab2, setTab2] = useState<boolean>(false);
    const [tab3, setTab3] = useState<boolean>(false);
    const [reste, setReste] = useState<number>(0)
    const [avance, setAvance] = useState<number>(0)
    const { data: session, status } = useSession()
    const [typeClass, setTypeClass] = useState<string>("");
    const [dateConfirmation, setDateConfirmation] = useState<string>("");
    const [typeVoyage, setTypeVoyage] = useState<string>("");
    const [typePaiement, setTypePaiement] = useState<string>("");
    const [trajet, setTrajet] = useState<string>("");
    const [agenceId, setAgenceId] = useState<string>("");
    const [dest, setDest] = useState<string>("");
    const [item, setItem] = useState<any>(null);
    const [ticket, setTicket] = useState<any>(null);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [bol, setBol] = useState<boolean>(false);
    const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
    const [validator, setValidator] = useState<boolean>(false);
    const [popupData, setPopupData] = useState<{ message: string, title?: string, color: string }>({ message: "", title: "", color: "" })
    const [value, setValue] = useState<any>()
    const [voyages, setVoyage] = useState<any[]>([])
    const [agences, setAgences] = useState<any[]>([])
    const [method, setMethod] = useState<string>("")
    const [employe, setEmploye] = useState<any>()
    const [passager, setPassager] = useState<any>(null)
    const [agence, setAgence] = useState<any>(null);
    const [numTicket, setNumTicket] = useState<number>(0);
    const [trajets, setTrajets] = useState<any[]>([]);
    const [isReady, setIsReady] = useState<boolean>(false);
    if (status === "unauthenticated") {
        router.push("/signin");
    }


    const [voyagesResult, setVoyagesResult] = useState<any[]>([]);
    const [dateDepart, setDateDepart] = useState<any>();
    const [onSearched, setOnsearched] = useState<boolean>(false);
    const HandleSubmit = () => {
        const tab: any[] = []
        voyages.map((item: any) => {
            if ((item.bus.typeBus == typeClass) && (item.voyages?.typeVoyage == typeVoyage) && (item.voyages?.trajetId == parseInt(trajet)) && (item.voyages?.agenceId == parseInt(agenceId))) {
                tab.push(item)
            }
        })
        setVoyagesResult(tab)
        setOnsearched(true)
    }

    const replace = (str: string) => {
        return str.replaceAll("-", "")
    }
    const getMethod = (val: any) => {
        setMethod(val)
    }
    const validationTab = () => {
        switch (method) {
            case "payer":
                setTab(false)
                setTab2(false)
                setTab3(true)
                break;
            case "reserver":
                setTab(false)
                setTab2(false)
                setTab3(false)
                break;
            default:
                alert("Cochez l'une des deux options")
                break;
        }
    }
    // Functions
    const handleInputChange = (event: any) => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setValue((oldValue: any) => {
            return { ...oldValue, [target.name]: value }
        })
    }
    const postReservation = async (id: number, voyageId: number, agenceId: number) => {
        const date = new Date()
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        const data = {
            passagerId: id,
            voyageId: voyageId,
            agenceId: agenceId,
            dateReservation: `${year}-${month}-${day}`,
            statutReservation: "en attente",
            avance: avance,
            dateConfirmation: dateConfirmation
        }
        try {
            const res = await fetch(`/api/reservations`, {
                method: 'POST', cache: 'no-store', body: JSON.stringify(data)
            })
            if (res.ok) {
                editVoyage(item.voyages);
                setReste(0)
                configPopup("Reservation effectuée", "blue", "Reservation")
            }
        } catch (err) {
            console.log(err)
        }
    }
    const editVoyage = async (item: any) => {
        // if (item.placeDisponible != 0) {
        const voyageData = {
            dateDepart: getDateFormat(item.dateDepart),
            dateArrivee: getDateFormat(item.dateArrivee),
            placeDisponible: (parseInt(item.placeDisponible) - 1) < 0 ? 0 : (parseInt(item.placeDisponible) - 1),
            typeVoyage: item.typeVoyage,
            prixVoyage: item.prixVoyage,
            busId: item.busId,
            trajetId: item.trajetId,
            agenceId: item.agenceId,
            ready: item.ready
        }
        // console.log(voyageData)
        try {
            const res = await fetch(`/api/voyages/${item.id}`, {
                method: 'PUT', cache: 'no-store', body: JSON.stringify(voyageData)
            })
            if (res.ok) {
                const d = await res.json();
                postLigneRecette(d.message)
            }
        } catch (error) {
            console.log(error)
        }

    }
    const postTicket = async (id: number, voyageId: any) => {

        const date = new Date()
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        const hours = (date.getHours()) < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
        const minutes = (date.getMinutes()) < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
        const data = {
            numeroSiege: (item.voyages?.placeDisponible),
            prixTicket: item.voyages?.prixVoyage,
            voyageId: voyageId,
            typeTicket: typeClass,
            statusTicket: "valide",
            dateCreation: `${year}-${month}-${day}T${hours}:${minutes}`,
            passagerId: id,
            employeId: 0
        }
        // console.log(data)
        try {
            const res = await fetch(`/api/ticket`, {
                method: 'POST', cache: 'no-store', body: JSON.stringify(data)
            })
            if (res.ok) {
                const t = await res.json();
                setNumTicket(t.id)
                setIsReady(true)
                editVoyage(item.voyages);
                configPopup("Ticket payé", "green", "Reservation")
            }
        } catch (err) {
            console.log(err)
        }

    }
    const postLigneRecette = async (voyage: any) => {
        const date = new Date()
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        const data = {
            busId: voyage.busId,
            voyageId: voyage.id,
            montant: voyage.prixVoyage,
            signature: "",
            date: `${year}-${month}-${day}T00:00:00.000Z`,
            agenceId: voyage.agenceId
        }

        try {
            const res = await fetch(`/api/lignerecette?date=${data.date}&busId=${data.busId}&voyageId=${data.voyageId}`, {
                method: 'GET', cache: 'no-store'
            })
            const tab: any[] = await res.json();
            if (tab.length > 0) {
                const updateData = {
                    busId: tab[0].busId,
                    voyageId: tab[0].voyageId,
                    montant: parseInt(tab[0].montant) + parseInt(voyage.prixVoyage),
                    signature: tab[0].signature,
                    date: tab[0].date,
                    agenceId: tab[0].agenceId,
                }
                // console.log(updateData)
                const resupdate = await fetch(`/api/lignerecette/${tab[0].id}`, {
                    method: 'PUT', cache: 'no-store', body: JSON.stringify(updateData)
                })
                if (resupdate.ok) {
                    postRecette(voyage)
                }
            } else {
                const respost = await fetch(`/api/lignerecette`, {
                    method: 'POST', cache: 'no-store', body: JSON.stringify(data)
                })
                if (respost.ok) {
                    postRecette(voyage)
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
    const postRecette = async (voyage: any) => {
        const date = new Date()
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        let nom: string = "";
        let typeService: string = "";
        let montantRecette: number = 0;

        if (method == "payer") {
            nom = "Achat de ticket de bus";
            typeService = "ventes";
            montantRecette = voyage.prixVoyage;
        }
        if (method == "reserver") {
            nom = "reservation de ticket de bus";
            typeService = "reservation";
            montantRecette = avance;
        }

        const data = {
            nom: nom,
            typeService: typeService,
            typePaiement: typePaiement,
            montant: montantRecette,
            dateTransaction: `${year}-${month}-${day}T00:00:00.000Z`,
            note: "",
            agenceId: voyage.agenceId,
        }

        try {
            const respost = await fetch(`/api/recette`, {
                method: 'POST', cache: 'no-store', body: JSON.stringify(data)
            })
            if (respost.ok) {
                document.getElementById("resetbtn")?.click()
                router.refresh()
            }
        } catch (err) {
            console.log(err)
        }
    }
    const HandlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (item.voyages?.placeDisponible != 0) {

            if (item != null) {
                try {
                    const e = {
                        nom: value.nom,
                        prenom: value.prenom,
                        adresse: value.adresse,
                        dateNaissance: value.dateNaissance,
                        genre: value.genre,
                        telephone: value.tel,
                        email: "",
                        numCNI: value.numCNI,
                        agenceId: item.voyages?.agenceId
                    }
                    const res = await fetch('/api/passagers', {
                        method: 'POST',
                        body: JSON.stringify(e),
                    })
                    const d = await res.json()
                    if (res.ok) {
                        setPassager({ passager: d, prix: item.voyages?.prixVoyage })
                        if (method == "reserver") {
                            postReservation(d.id, item.voyages?.id, e.agenceId);
                        }
                        if (method == "payer") {
                            postTicket(d.id, item.voyages?.id)
                        }
                        setMethod("")
                        setTicket(item)
                        setItem(null)
                        setValue(null)
                    }
                } catch (err) {
                    console.log(err)
                    configPopup("Erreur d'enregistrement veillez reessayer!!", "red", "Error d'enregistrement")
                }
            } else {
                configPopup("Renseignez tout les informations!", "red", "Error d'enregistrement")
            }

        }
        else {
            alert("Plus de places disponibles!")
        }
    }
    const configPopup = (message: string, color: string, title: string) => {
        setPopupData({ message: message, color: color, title: title })
        setIsOpenPopup(true)
        setTimeout(() => {
            setIsOpenPopup(false)
        }, 5000);
    }
    const HandlerItem = (value: any) => {
        setItem(value)
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
    const HandlerChange = (value: any) => {
        // console.log(value)
        setIsOpenModal(value.val);
        if (value.val == false && value.item != null) {
            setBol(true)
        } else {
            setBol(false)
        }
    }
    const showModal = (val: boolean) => {
        setIsOpenPopup(val)
    }
    const handleNextTab = () => {
        if (value?.nom && value?.prenom && value?.adresse && value?.dateNaissance && value?.genre && value?.numCNI) {
            setTab2(true)
            setTab(false)
        } else {
            alert("Veillez remplir correctement le formulaire!")
        }
    }
    const handleItemOnclick = () => {
        setTab(true)
    }

    useEffect(() => {

        const getTrajet2 = async () => {
            const res = await fetch("/api/trajets", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
        };

        const getVoyage = async () => {
            const res = await fetch("/api/voyages", { cache: "no-store" })
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

        const getData = async () => {
            const tabVoyages: any[] = await getVoyage();
            const tab: any[] = [];
            const tabTrajets: any[] = await getTrajet2();
            const tabBus: any[] = await getBus();
            tabVoyages.map((r: any) => {
                let traj: any;
                let bus: any;
                tabTrajets.map((i) => {
                    if ((r.trajetId === i.id)) {
                        traj = i
                    }
                })
                tabBus.map((j) => {
                    if (parseInt(r.busId) === j.id) {
                        bus = j
                    }
                })
                tab.push({ trajet: traj, voyages: r, bus: bus });
            })
            setVoyage(tab)
        }

        // const getLenghtTicket = async () => {
        //     const res = await fetch("/api/ticket", { cache: "no-store" })
        //     if (!res.ok) {
        //         return null
        //     }
        //     const data: any[] = await res.json();
        //     setNumTicket(data.length)
        // }
        const getTrajet = async () => {
            const res = await fetch("/api/trajets", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setTrajets(data)
        };
        getTrajet()
        const getAgences = async () => {
            const res = await fetch("/api/agences", { cache: "no-store" })
            if (!res.ok) {
                return null
            }
            const data: any[] = await res.json();
            setAgences(data)
        }
        getData();
        getAgences();
    }, [])

    const reset = () => {
        setOnsearched(false);
    }
    return (
        <section className="w-full h-full relative p-10 ">
            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="text-xl text-gray-900">Réservation et achat de tickets</h1>
            </div>
            <section className={`relative flex  justify-start  ${(!tab && !tab2) ? 'flex-col' : 'flex-row'}`}>
                <div style={{ width: '100%', minHeight: "100%", backdropFilter: "blur(1px)" }} className=" shadow-2xl max-w-3xl border rounded-md h-full relative overflow-hidden z-10    ">
                    <h4 className="border-b p-4 text-black font-bold uppercase text-xl">
                        Formulaire de ventes et reservation
                    </h4>
                    <form onSubmit={HandlerSubmit} className="px-10 py-5">
                        <div>
                            <div className={`px-4 ${(!tab && !tab2 && !tab3) ? 'block' : 'hidden'}`}>
                                <div className="text-blue-400 relative font-medium flex items-center gap-4 ">
                                    <div className="bg-blue-400 flex justify-center items-center w-4 h-4 text-black p-4 rounded-full">1</div>

                                    <p className="uppercase">
                                        Choissir un voyage
                                    </p>
                                    <HelpPopup message="Vous retrouvez un formulaire de recherche et les différents voyages disponibles. " />
                                </div>
                                <div className="flex gap-4 justify-start">
                                    <div className="mt-2">
                                        <label className="block mb-1 text-sm font-bold text-gray-800">Type de voyages:</label>
                                        <select id="countries" onChange={e => setTypeVoyage(e.target.value)} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 ">
                                            <option></option>
                                            <option value="aller-retour">Aller-Retour</option>
                                            <option value="aller simple">Aller Simple</option>
                                        </select>
                                    </div>
                                    <div className="mt-2">
                                        <label className="block mb-1 text-sm font-bold text-gray-800">Type de bus:</label>
                                        <select id="countries" onChange={e => setTypeClass(e.target.value)} className="block  w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 ">
                                            <option></option>
                                            <option value="simple">Standard</option>
                                            <option value="vip">vip</option>
                                        </select>
                                    </div>
                                    <div className="mt-2">
                                        <label className="block mb-1 text-sm font-bold text-gray-800">Agences:</label>
                                        <select id="agenceId" name="agenceId" onChange={e => setAgenceId(e.target.value)} className="block  w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 ">
                                            <option></option>
                                            {
                                                agences.map((i: any, index: number) => (
                                                    <option key={index + 1} value={i.id}>{i.nom}</option>
                                                ))}
                                        </select>
                                    </div>
                                    <div className="mt-2">
                                        <label className="block mb-1 text-sm font-bold text-gray-800">Trajet:</label>
                                        <select id="trajetId" name="trajetId" onChange={e => setTrajet(e.target.value)} className="block w-full p-2 text-sm font-bold text-gray-900 border shadow  border-gray-300  focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-green-400 ">
                                            <option></option>
                                            {trajets.map((item: any, i: number) => (
                                                <option key={i} value={[item.id]}>{item.lieuDepart} - {item.lieuArrivee} ({item.heureArrivee} - {item.heureDepart})</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-4">

                                    <button type="button" onClick={() => HandleSubmit()} disabled={voyages.length == 0} className={` p-2 px-3 rounded-md  hover:text-white border  text-sm ${voyages.length > 0 ? 'text-green-700 hover:bg-green-500 border-green-500' : "text-stone-500 hover:bg-stone-400 border-stone-500"}font-bold`}>Rechercher</button>
                                    {
                                        onSearched ? (
                                            <button type="button" onClick={reset} className=" mx-2 p-2 px-3 rounded-md hover:bg-blue-400 hover:text-white border border-blue-500 text-sm text-blue-500 font-bold">Tout afficher</button>
                                        ) : null
                                    }
                                </div>
                            </div>
                            <div className={`${(tab && !tab2) ? 'block' : 'hidden'}`}>
                                <h4 className="text-blue-400 font-medium flex items-center gap-4 uppercase"> <div className="bg-blue-400 flex justify-center items-center w-4 h-4 text-black p-4 rounded-full">2</div> Information du client  <HelpPopup message="Remplir correctement tout les informations demandées." /></h4>
                                <div className="mt-2">
                                    <label className={`block mb-1 text-sm  font-bold text-gray-800 ${(validator && (value.nom == undefined)) ? "ring-2 ring-red-500" : ""}`}>Nom</label>
                                    <input type="text" required autoComplete="off" onChange={handleInputChange} placeholder="Nom" name="nom" id="nom" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 " />
                                </div>
                                <div className="mt-2">
                                    <label className="block mb-1 text-sm font-bold text-gray-800">Prénom</label>
                                    <input type="text" required autoComplete="off" id="prenom" name="prenom" placeholder="Prénom" onChange={handleInputChange} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 " />
                                </div>
                                <div className="mt-2">
                                    <label className="block mb-1 text-sm font-bold text-gray-800">Adresse</label>
                                    <input type="text" required autoComplete="off" id="adresse" name="adresse" placeholder="Adresse" onChange={handleInputChange} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 " />
                                </div>
                                <div className="mt-2">
                                    <label className="block mb-1 text-sm font-bold text-gray-800">Date de naissance</label>
                                    <input type="date" required id="datenaissance" name="dateNaissance" placeholder="Date de Naissance" onChange={handleInputChange} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 " />
                                </div>
                                <div className="mt-2">
                                    <label className="block mb-1 text-sm font-bold text-gray-800">Genre</label>
                                    <div className="flex gap-4">
                                        <input type="radio" onChange={handleInputChange} id="genrem" name="genre" value="m" className="block p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 " />
                                        <label htmlFor="genrem" className="text-sm font-bold text-gray-800">Homme</label>
                                        <input type="radio" onChange={handleInputChange} id="genref" value="f" name="genre" className="block p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 " />
                                        <label htmlFor="genref" className="text-sm font-bold text-gray-800">Femme</label>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <label className="block mb-1 text-sm font-bold text-gray-800">Numèro de téléphone:</label>
                                    <input type="tel" id="tel" autoComplete="off" name="tel" onChange={handleInputChange} aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2 focus:ring-2  focus:outline-none focus-visible:ring-blue-400" placeholder="620456789" required />
                                </div>
                                <div className="mt-2">
                                    <label className="block mb-1 text-sm font-bold text-gray-800">Numèro de CNI:</label>
                                    <input type="text" id="numCNI" autoComplete="off" name="numCNI" onChange={handleInputChange} aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2 focus:ring-2  focus:outline-none focus-visible:ring-blue-400" required />
                                </div>
                                <div className="mt-4">
                                    <button type="button" onClick={() => { setTab(false); setTab2(false) }} className=" p-2 px-3 rounded-md hover:bg-stone-400 hover:text-white border border-stone-500 text-stone-500 font-bold">Recommencer</button>
                                    <button type="button" onClick={handleNextTab} className=" mx-2 p-2 px-3 rounded-md hover:bg-blue-400 hover:text-white border border-blue-500 text-blue-500 font-bold">Continuer</button>
                                </div>
                            </div>
                            <div className={`px-4 ${(!tab && tab2) ? 'block' : 'hidden'}`}>
                                <div className="mt-2">
                                    <h4 className="text-blue-400 font-medium flex items-center gap-4 "> <div className="bg-blue-400 flex justify-center items-center w-4 h-4 text-black p-4 rounded-full">3</div><span className="uppercase">Fiche de recette</span><HelpPopup message="Remplir correctement tout les informations demandées." /></h4>
                                    <div className="mt-4">

                                        <div className="flex gap-1">
                                            <input type="radio" required onChange={e => getMethod(e.target.value)} id="reserver" name="method" value="reserver" className="block p-1  text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 " />
                                            <label htmlFor="reserver" className="text-sm font-bold text-gray-800">Réserver</label>
                                            <input type="radio" required onChange={e => getMethod(e.target.value)} id="payer" value="payer" name="method" className="block ml-4 p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 " />
                                            <label htmlFor="payer" className="text-sm font-bold text-gray-800">Payer</label>
                                        </div>
                                    </div>
                                    {
                                        (method == "payer" && item) ? (
                                            <>
                                                <div className="mt-4">
                                                    <div className="flex gap-4 mb-1 items-start">
                                                        <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Service</label>
                                                        {/* {((data?.nom && data?.nom != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null} */}
                                                    </div>
                                                    <input value={"Achat de ticket de bus"} disabled type="text" id="nom" placeholder="Nom" name="nom" className={`block text-sm w-full p-2 text-black border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-200  sm:text-md focus-visible:ring-blue-400  `} />
                                                </div>
                                                <div className="mt-4">
                                                    <div className="flex gap-4 mb-1 items-start">
                                                        <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Montant à payer</label>
                                                        {/* {((data?.montant && data?.montant != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null} */}
                                                    </div>
                                                    <input value={parseInt(item.prixFinal)} disabled type="number" id="montant" name="montant" className={`"block w-full p-2 text-sm text-black border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-200 sm:text-md focus-visible:ring-blue-400 " ue-400  `} />
                                                </div>
                                                <div className="mt-4">
                                                    <div className="flex gap-4 mb-1 items-start">
                                                        <label htmlFor="typePaiement" className="block mb-1 text-sm font-medium text-gray-900 ">Type De Paiement</label>
                                                        {/* {((data?.typePaiement && data?.typePaiement != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null} */}
                                                    </div>
                                                    <select name="typePaiement" required onChange={(e) => setTypePaiement(e.target.value)} autoComplete="off" className={`block w-full p-2 uppercase text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400  `} id="typePaiement">
                                                        <option value="" ></option>
                                                        <option value="cash" >Cash</option>
                                                        <option value="mobile money" >Mobile money</option>
                                                    </select>
                                                </div>
                                            </>
                                        ) : null
                                    }
                                    {
                                        method == "reserver" && item ? (
                                            <>
                                                <div className="mt-4">
                                                    <div className="flex gap-4 mb-1 items-start">
                                                        <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Service</label>
                                                        {/* {((data?.nom && data?.nom != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null} */}
                                                    </div>
                                                    <input value={"reservation de ticket de bus"} disabled type="text" id="nom" placeholder="Nom" name="nom" className={`block text-sm w-full p-2 text-black border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-200  sm:text-md focus-visible:ring-blue-400  `} />
                                                </div>
                                                <div className="mt-4">
                                                    <div className="flex gap-4 mb-1 items-start">
                                                        <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Avance versée</label>
                                                        {/* {((data?.montant && data?.montant != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null} */}
                                                    </div>
                                                    <input type="number" id="montant" onChange={e => setAvance(parseInt(e.target.value))} max={parseInt(item.prixFinal)} name="montant" className={`"block w-full p-2 text-sm text-black border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " ue-400  `} />
                                                </div>
                                                <div className="mt-4">
                                                    <div className="flex gap-4 mb-1 items-start">
                                                        <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">reste à payé</label>
                                                        {/* {((data?.montant && data?.montant != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null} */}
                                                    </div>
                                                    <input disabled type="number" onChange={e => setReste(parseInt(e.target.value))} value={parseInt(item.prixFinal) - avance} id="montant" name="montant" className={`"block w-full p-2 text-sm text-black border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " ue-400  `} />
                                                </div>
                                                <div className="mt-4">
                                                    <div className="flex gap-4 mb-1 items-start">
                                                        <label htmlFor="typePaiement" className="block mb-1 text-sm font-medium text-gray-900 ">Type De Paiement</label>
                                                        {/* {((data?.typePaiement && data?.typePaiement != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null} */}
                                                    </div>
                                                    <select name="typePaiement" required autoComplete="off" onChange={(e) => setTypePaiement(e.target.value)} className={`block w-full p-2 uppercase text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400  `} id="typePaiement">
                                                        <option value="" ></option>
                                                        <option value="cash" >Cash</option>
                                                        <option value="mobile money" >Mobile money</option>
                                                    </select>
                                                </div>
                                                <div className="mt-4">
                                                    <div className="flex gap-4 mb-1 items-start">
                                                        <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Date de confirmation de la reservation</label>
                                                        {/* {((data?.montant && data?.montant != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null} */}
                                                    </div>
                                                    <input type="date" id="dateConfirmation" name="dateConfirmation" onChange={(e) => setDateConfirmation(e.target.value)} className={`"block w-full p-2 text-sm text-black border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " ue-400  `} />
                                                </div>
                                            </>
                                        ) : null
                                    }
                                    <div className="mt-4">
                                        <button type="button" onClick={() => { setTab(true); setTab2(false); setMethod("") }} className=" p-2 px-3 rounded-md hover:bg-stone-400 text-sm hover:text-white border border-stone-500 text-stone-500 font-bold">Retour</button>
                                        <button type="submit" onClick={validationTab} className=" mx-2 p-2 px-3 rounded-md hover:bg-blue-400 hover:text-white border border-blue-500 text-sm text-blue-500 font-bold">Valider</button>
                                    </div>
                                </div>
                            </div>
                            <div className={`px-8 ${(!tab && !tab2 && tab3) ? 'block' : 'hidden'}`}>
                                <div className="my-4">
                                    <button type="reset" onClick={() => { window.location.reload() }} className=" p-2 px-3 rounded-md hover:bg-stone-400 text-sm hover:text-white border border-stone-500 text-stone-500 font-bold">Nouvelle vente</button>
                                </div>
                                {(isReady) ? (
                                    <div>
                                        <ComponentTicketPrint item={{
                                            client: `${passager?.passager?.nom} ${passager?.passager?.prenom}`,
                                            tel: passager?.passager?.telephone,
                                            depart: getDateFormat(ticket?.voyages?.dateDepart),
                                            voyage: `C${ticket?.voyages?.id}`,
                                            montant: ticket?.voyage?.prixVoyage,
                                            remboursement: 0,
                                            caisse: `GUICHET ${session?.user?.name}`,
                                            numticket: numTicket.toString(),
                                            type: ticket?.voyage?.typeVoyage,
                                            trajet: `${ticket?.trajet?.lieuDepart} / ${dest == "" ? ticket?.trajet.lieuArrivee : dest}`,
                                            siege: ticket?.bus?.capacite - ticket?.voyages?.placeDisponible + 1
                                        }} />
                                        <p className="p-4 uppercase">
                                            client:{passager?.passager?.nom} {passager?.passager?.prenom}, téléphone client:{passager?.passager?.telephone},départ: {getDateFormat(ticket?.voyages?.dateDepart)}, Numèro de bus:{ticket?.bus?.id},
                                            trajet:{ticket?.trajet?.lieuDepart}/{ticket?.trajet.lieuArrivee}, voyageN°: {ticket?.voyages?.id}, numèro de siège:{ticket?.bus?.capacite - ticket?.voyages?.placeDisponible < 10 ? '0' + (ticket?.bus?.capacite - ticket?.voyages?.placeDisponible) : ticket?.bus?.capacite - ticket?.voyages?.placeDisponible}
                                        </p>
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        {/* <div className="flex gap-4 p-4 justify-end">
                            {
                                bol || !((passager != null) && (ticket != null) && method === "payer") ? (
                                    <button type="submit" className="text-white mt-4 flex py-2 items-center gap-2 justify-center hover:shadow-md transition ease-linear hover:from-blue-700 rounded-sm bg-blue-500 text-sm from-blue-600 bg-gradient-to-t p-2">
                                        Enregistrer
                                    </button>
                                ) : null
                            }
                          
                        </div> */}
                        <button type="reset" id="resetbtn" className="text-white mt-4 hidden opacity-0 py-2 items-center gap-2 justify-center hover:shadow-md transition ease-linear hover:from-stone-700 rounded-sm bg-stone-500 text-sm from-stone-600 bg-gradient-to-t p-2">
                            Recommencer
                        </button>
                    </form>

                </div>
                {(!tab && !tab2 && !tab3) ? (
                    <div className=" h-full px-10 py-5" >
                        <div className="my-2  font-bold text-blue-400 flex items-center gap-2">
                            <span className="uppercase">Voyages disponibles </span>
                            <HelpPopup message="Cliquez sur le voyage pour le selectionner." />
                        </div>
                        {
                            !onSearched ? (
                                <ul className=" grid grid-cols-4 items-start gap-8 relative h-full ">
                                    {voyages.map((item: any, i: number) => ((item.voyages?.placeDisponible != 0 && compareDate(getDateFormat(item.voyages?.dateDepart)) && item.voyages?.ready != "oui") ?
                                        <li key={i} className=" hover:translate-y-2 hover:shadow-green-900/50 shadow-2xl rounded-md" >
                                            <CardVoyage isHidden={true} id={item.voyages?.id} isVip={item.bus.typeBus == "vip"} agence={item.voyages?.agenceId} date={getDateFormat(item.voyages?.dateDepart)} prix={item.prixFinal} lieuArrive={item.trajet?.lieuArrivee} heureArrive={item.trajet?.heureArrivee} lieuDepart={item.trajet?.lieuDepart} heureDepart={item.trajet?.heureDepart} placeDisponible={item.voyages?.placeDisponible} />


                                            <div className="p-4 text-sm">
                                                <h4 className="my-2 font-bold text-green-400">
                                                    Selectionner l&apos;arrêts
                                                </h4>
                                                <ul>
                                                    <li onClick={() => { setItem({ ...item, prixFinal: item.trajet.prix, dest: "" }); setDest(""); handleItemOnclick() }} className={`p-1 py-2 rounded-md my-1 border border-b-2 grid cursor-pointer grid-cols-2 bg-white hover:bg-stone-100 `}>
                                                        <span >{item.trajet?.lieuDepart} - {item.trajet?.lieuArrivee}</span> <span className="text-right uppercase">{item.trajet.prix} fcfa</span>
                                                    </li>
                                                    {
                                                        item.trajet?.arrets != "" ?
                                                            JSON.parse(item.trajet?.arrets).map((i: any, index: number) => (
                                                                <li onClick={() => { setItem({ ...item, prixFinal: i.prix, dest: i.nom }); setDest(i.nom); handleItemOnclick() }} key={index} className={`p-1 py-2 border rounded-md my-1 cursor-pointer border-b-2 grid grid-cols-2 ${index % 2 == 0 ? 'bg-blue-200 hover:bg-blue-300 border-b-blue-400' : 'bg-white hover:bg-stone-100'}`}>
                                                                    <span>{item.trajet?.lieuDepart} - {i.nom}</span> <span className="text-right uppercase ">{i.prix} fcfa</span>
                                                                </li>
                                                            ))
                                                            : null
                                                    }

                                                </ul>
                                            </div>
                                        </li> : null
                                    ))}
                                </ul>
                            ) : (
                                <ul className=" grid grid-cols-4 gap-8 relative h-full ">
                                    {voyagesResult.map((item: any, i: number) => (item.voyages?.placeDisponible != 0 && compareDate(getDateFormat(item.voyages?.dateDepart)) && item.voyages?.ready != "oui" ?
                                        <li key={i} onClick={() => { setItem(item); handleItemOnclick() }} className="cursor-pointer border" >
                                            <CardVoyage isHidden={true} id={item.voyages?.id} isVip={item.bus.typeBus == "vip"} agence={item.voyages?.agenceId} date={getDateFormat(item.voyages?.dateDepart)} prix={item.voyages?.prixVoyage} lieuArrive={item.trajet?.lieuArrivee} heureArrive={item.trajet?.heureArrivee} lieuDepart={item.trajet?.lieuDepart} heureDepart={item.trajet?.heureDepart} placeDisponible={item.voyages?.placeDisponible} />

                                          
                                            <div className="p-4 text-sm">
                                                <h4 className="my-2 font-bold text-green-400">
                                                    Selectionner l&apos;arrêts
                                                </h4>
                                                <ul>
                                                    <li onClick={() => { setItem({ ...item, prixFinal: item.trajet.prix, dest: "" }); setDest(""); handleItemOnclick() }} className={`p-1 py-2 rounded-md my-1 border border-b-2 grid cursor-pointer grid-cols-2 bg-white hover:bg-stone-100 `}>
                                                        <span >{item.trajet?.lieuDepart} - {item.trajet?.lieuArrivee}</span> <span className="text-right uppercase">{item.trajet.prix} fcfa</span>
                                                    </li>
                                                    {
                                                        item.trajet?.arrets != "" ?
                                                            JSON.parse(item.trajet?.arrets).map((i: any, index: number) => (
                                                                <li onClick={() => { setItem({ ...item, prixFinal: i.prix, dest: i.nom }); setDest(i.nom); handleItemOnclick() }} key={index} className={`p-1 py-2 border rounded-md my-1 cursor-pointer border-b-2 grid grid-cols-2 ${index % 2 == 0 ? 'bg-blue-200 hover:bg-blue-300 border-b-blue-400' : 'bg-white hover:bg-stone-100'}`}>
                                                                    <span>{item.trajet?.lieuDepart} - {i.nom}</span> <span className="text-right uppercase ">{i.prix} fcfa</span>
                                                                </li>
                                                            ))
                                                            : null
                                                    }

                                                </ul>
                                            </div>
                                        </li> : null
                                    ))}
                                </ul>
                            )
                        }
                    </div>
                ) : null}
                {(!tab && tab2) ? (
                    <div>
                        {(item != null) ? (
                            <div className=" p-4">
                                <h4 className="text-blue-400 my-4 font-medium flex items-center gap-4 "><span className="uppercase">Recapitulatif</span><HelpPopup message="Cliquez sur retour pour changer ces informations." /></h4>
                                <div className="bg-white shadow-2xl w-96 rounded-md border overflow-hidden">
                                    <h6 className="p-4 uppercase border-b font-bold">Client</h6>
                                    <ul>
                                        <li className="py-2 font-semibold  px-4 flex text-gray-700 flex-row justify-between">
                                            <span>Nom et prénom:</span> <span>{value.nom} {value.prenom}</span>
                                        </li>
                                        <li className="py-2 px-4 font-semibold flex flex-row text-gray-700 justify-between">
                                            <span>telephone:</span> <span>{value.tel}</span>
                                        </li>
                                        <li className="py-2 px-4 font-semibold flex flex-row text-gray-700 justify-between">
                                            <span>numéro CNI:</span> <span>{value.numCNI}</span>
                                        </li>
                                    </ul>
                                </div>
                                <CardVoyage isHidden={true} id={item.voyages?.id} isVip={item.bus.typeBus == "vip"} agence={item.voyages?.agenceId} date={getDateFormat(item.voyages?.dateDepart)} prix={item.prixFinal} lieuArrive={dest} heureArrive={item.trajet?.heureArrivee} lieuDepart={item.trajet?.lieuDepart} heureDepart={item.trajet?.heureDepart} placeDisponible={item.voyages?.placeDisponible} />
                            </div>
                        ) : null}
                    </div>
                ) : null}
            </section>
            {/* ) : (<div>
                    <Image src={svg} width={15} height={15} alt="Loader" className="animate-spin" /> <p className="text-white">Chargement du formulaire...</p>
                </div>)} */}
            {/* <ModalTrajet isOpen={isOpenModal} setData={HandlerItem} trajet={trajet.current} typeBus={typeClass.current?.value} typeVoyage={typeVoyage.current?.value} childToParent={HandlerChange} /> */}
            {isOpenPopup ? (<Popup color={popupData?.color} title={popupData.title} message={popupData?.message} onShow={showModal} />) : null}
        </section>
    )
}