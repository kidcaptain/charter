
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

export default function Page() {

    const pathname = usePathname();
    const classname = `text-sm p-2 text-center`
    const router = useRouter()


    const { data: session, status } = useSession()
    // Variables
    const typeClass = useRef<any>();
    const typeVoyage = useRef<any>();
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
    const [method, setMethod] = useState<any>()
    const [employe, setEmploye] = useState<any>()
    const [passager, setPassager] = useState<any>(null)
    const [agence, setAgence] = useState<any>(null);
    const [numTicket, setNumTicket] = useState<number>(0);


    if (status === "unauthenticated") {
        router.push("/signin");
    }

    const replace  = (str: string) => {
        return  str.replaceAll("-", "")
      }
    const getMethod = (val: any) => {
        setMethod(val)
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
        }
        try {
            const res = await fetch(`/api/reservations`, {
                method: 'POST', cache: 'no-store', body: JSON.stringify(data)
            })
            if (res.ok) {
                editVoyage(item.voyages);
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
            agenceId: item.agenceId
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
            typeTicket: typeClass.current.value,
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
        console.log(data)
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
            } else {
                const respost = await fetch(`/api/lignerecette`, {
                    method: 'POST', cache: 'no-store', body: JSON.stringify(data)
                })
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
                        agenceId: value.agenceId
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
                        } else {
                            postTicket(d.id, item.voyages?.id)
                        }
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
    useEffect(() => {
        const getData = async () => {
            const data = await selectVoyage();
            setVoyage(data);
        }
        const getLenghtTicket = async () => {
            const res = await fetch("/api/ticket", { cache: "no-store" })
            if (!res.ok) {
                return null
            }
            const data: any[] = await res.json();
            setNumTicket(data.length)
        }
        getLenghtTicket()
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


    return (
        <section className="w-full h-full relative ">
            <section className="relative ">
                <div style={{ width: '100%', minHeight: "100%", backdropFilter: "blur(1px)" }} className=" shadow-2xl h-full p-10  relative overflow-hidden z-10 max-w-4xl  ">
                    <h4 className="border-b  text-black font-bold uppercase text-sm">
                        Réservation et achat de ticket
                    </h4>
                    <form onSubmit={HandlerSubmit} className="">
                        <div className="gap-2  grid grid-cols-2 ">
                            <div className="">
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
                                        <input type="radio" required onChange={handleInputChange} id="genrem" name="genre" value="m" className="block p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 " />
                                        <label htmlFor="genrem" className="text-sm font-bold text-gray-800">Homme</label>
                                        <input type="radio" required onChange={handleInputChange} id="genref" value="f" name="genre" className="block p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 " />
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
                            </div>
                            <div className="p-4">
                                <div className="mt-2">
                                    <label className="block mb-1 text-sm font-bold text-gray-800">Type de voyages:</label>
                                    <select id="countries" ref={typeVoyage} required className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 ">
                                        <option></option>
                                        <option value="aller-retour">Aller-Retour</option>
                                        <option value="aller simple">Aller Simple</option>
                                    </select>
                                </div>
                                <div className="mt-2">
                                    <label className="block mb-1 text-sm font-bold text-gray-800">Type de bus:</label>
                                    <select id="countries" ref={typeClass} required className="block  w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 ">
                                        <option></option>
                                        <option value="simple">Standard</option>
                                        <option value="vip">vip</option>
                                    </select>
                                </div>
                                <div className="mt-2">
                                    <label className="block mb-1 text-sm font-bold text-gray-800">Agences:</label>
                                    <select id="agenceId" name="agenceId" onChange={handleInputChange}  required className="block  w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 ">
                                        <option></option>
                                        { 
                                        agences.map((i: any, index: number) => (
                                            <option key={index+1} value={i.id}>{i.nom}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mt-2">
                                    <label className="block mb-1 text-sm font-bold text-gray-800">Paiement</label>
                                    <div className="flex gap-1">
                                        <input type="radio" required onChange={e => getMethod(e.target.value)} id="reserver" name="method" value="reserver" className="block p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 " />
                                        <label htmlFor="reserver" className="text-sm font-bold text-gray-800">Réserver</label>
                                        <input type="radio" required onChange={e => getMethod(e.target.value)} id="payer" value="payer" name="method" className="block ml-4 p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 " />
                                        <label htmlFor="payer" className="text-sm font-bold text-gray-800">Payer</label>
                                    </div>
                                </div>
                                {!bol ? (
                                    <button type="button" onClick={() => { setIsOpenModal(true); setBol(true) }} className="text-white mt-4 flex py-2 items-center gap-2 justify-center hover:shadow-md transition ease-linear hover:from-blue-700 rounded-sm bg-blue-500 text-sm from-blue-600 bg-gradient-to-t p-2">
                                        Valider
                                    </button>
                                ) : null
                                }
                                {(item != null) ? (
                                    <div className="mt-2">
                                        <CardVoyage isHidden={true} id={item.voyages?.id} isVip={true} agence="" date={getDateFormat(item.voyages?.dateDepart)} prix={item.voyages?.prixVoyage} lieuArrive={item.trajet?.lieuArrivee} heureArrive={item.trajet?.heureArrivee} lieuDepart={item.trajet?.lieuDepart} heureDepart={item.trajet?.heureDepart} placeDisponible={item.voyages?.placeDisponible} />
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className="px-8">
                            {((passager != null) && (ticket != null) && method === "payer") ? (
                                <ComponentTicketPrint item={{
                                    client: `${passager?.passager?.nom} ${passager?.passager?.prenom}`,
                                    tel: passager?.passager?.telephone,
                                    depart: getDateFormat(ticket?.voyages?.dateDepart),
                                    voyage: `C${ticket?.voyages?.id}`,
                                    montant: ticket?.voyage?.prixVoyage,
                                    remboursement: 0,
                                    caisse: `GUICHET ${session?.user?.name}`,
                                    numticket: (numTicket + 1).toString() + replace(getDateFormat(ticket?.voyage?.dateDepart)),
                                    type: ticket?.voyage?.typeVoyage,
                                    trajet: `${ticket?.trajet?.lieuDepart} / ${ticket?.trajet.lieuArrivee}`,
                                    siege: ticket?.voyages?.placeDisponible
                                }} />
                            ) : null}
                        </div>
                        <div className="flex gap-4 p-4 justify-end">
                            {
                                bol || !((passager != null) && (ticket != null) && method === "payer") ? (
                                    <button type="submit" className="text-white mt-4 flex py-2 items-center gap-2 justify-center hover:shadow-md transition ease-linear hover:from-blue-700 rounded-sm bg-blue-500 text-sm from-blue-600 bg-gradient-to-t p-2">
                                        Enregistrer
                                    </button>
                                ) : null
                            }
                            <button type="reset" onClick={() => { setItem(null); setBol(false); setPassager(null) }} id="resetbtn" className="text-white mt-4 flex py-2 items-center gap-2 justify-center hover:shadow-md transition ease-linear hover:from-stone-700 rounded-sm bg-stone-500 text-sm from-stone-600 bg-gradient-to-t p-2">
                                Recommencer
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            {/* ) : (<div>
                    <Image src={svg} width={15} height={15} alt="Loader" className="animate-spin" /> <p className="text-white">Chargement du formulaire...</p>
                </div>)} */}
            <ModalTrajet isOpen={isOpenModal} setData={HandlerItem} typeBus={typeClass.current?.value} typeVoyage={typeVoyage.current?.value} slug="M" childToParent={HandlerChange} />
            {isOpenPopup ? (<Popup color={popupData?.color} title={popupData.title} message={popupData?.message} onShow={showModal} />) : null}
        </section>
    )
}