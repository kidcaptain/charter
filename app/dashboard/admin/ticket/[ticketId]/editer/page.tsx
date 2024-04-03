
'use client'


import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

import { getDateFormat, selectVoyage } from "@/functions/actionsClient";
import ModalTrajet from "@/components/modalTrajets";
import Popup from "@/components/ui/popup";
import ComponentTicketPrint from "@/components/ui/ComponentToPrint";
import CardVoyage from "@/components/cardVoyage";
import HelpPopup from "@/components/ui/helpPopup";
import Image from "next/image";
import positionSvg from "@/public/images/position.svg"
import busSvg from "@/public/images/bus-logo.svg"
import closeSvg from "@/public/images/close.svg"
import Link from "next/link";

export default function Page({ params }: { params: { ticketId: string } }) {

    const router = useRouter()
    const [tab, setTab] = useState<boolean>(false);
    const [tab2, setTab2] = useState<boolean>(false);
    const [passagers, setPassagers] = useState<any[]>([])
    const [tab3, setTab3] = useState<boolean>(false);
    const [reste, setReste] = useState<number>(0)
    const [avance, setAvance] = useState<number>(0)
    const [remboursement, setRemboursement] = useState<number>(0)
    const [sup, setsup] = useState<number>(0)
    const [vipP, setVipP] = useState<number>(0)
    const [prixF, setprixF] = useState<number>(0)
    const { data: session, status } = useSession()
    const [typeClass, setTypeClass] = useState<string>("");
    const [dateConfirmation, setDateConfirmation] = useState<string>("");
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
    const [trajItem, setTrajItem] = useState<any>()
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();

    const [popupData, setPopupData] = useState<{ message: string, title?: string, color: string }>({ message: "", title: "", color: "" })
    const [value, setValue] = useState<{
        nom: string,
        prenom: string,
        adresse: string,
        dateNaissance: string,
        genre: string,
        telephone: string,
        email: string,
        numCNI: string,
        agenceId: number,
        id: number
    }>({
        nom: "",
        prenom: "",
        adresse: "",
        dateNaissance: "",
        genre: "",
        telephone: "",
        email: "",
        numCNI: "",
        agenceId: 0,
        id: 0
    })
    const [voyages, setVoyage] = useState<any[]>([])
    const [agences, setAgences] = useState<any[]>([])
    const [method, setMethod] = useState<string>("")
    const [employe, setEmploye] = useState<any>()
    const [passager, setPassager] = useState<any>(null)
    const [agence, setAgence] = useState<any>(null);
    const [ty, setTy] = useState<string>("");
    const [numTicket, setNumTicket] = useState<number>(0);
    const [trajets, setTrajets] = useState<any[]>([]);
    const [isReady, setIsReady] = useState<boolean>(false);
    if (status === "unauthenticated") {
        router.push("/signin");
    }


    const [onSearched, setOnsearched] = useState<boolean>(false);

    const getMethod = (val: any) => {
        setMethod(val)
    }
    const validationTab = () => {
        if (typePaiement != "") {
            setTab(false)
            setTab2(false)
            setTab3(true)
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
                // editVoyage(item.voyages);
                setReste(0)
                configPopup("Reservation effectuée", "blue", "Reservation")
            }
        } catch (err) {
            console.log(err)
        }
    }
    const editVoyage = async (item: any, id: number, idT: number) => {

        const voyageData = {
            dateDepart: getDateFormat(item.dateDepart),
            heureArrivee: item.heureArrivee,
            placeDisponible: item.placeDisponible,
            prixVoyage: item.prixVoyage,
            busId: item.busId,
            trajetId: item.trajetId,
            agenceId: item.agenceId,
            ready: item.ready,
            chauffeurId: item.chauffeurId,
            heureDepart: item.heureDepart,
            numVoyage: item.numVoyage,
            placesOccupees: parseInt(item.placesOccupees) + 1,

        }
        try {
            const res = await fetch(`/api/voyages/${item.id}`, {
                method: 'PUT', cache: 'no-store', body: JSON.stringify(voyageData)
            })
            if (res.ok) {
                const d = await res.json();
                postLigneRecette(d.message, id, idT)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const editVoyage2 = async (item: any, id: number, idT: number) => {

        const voyageData = {
            dateDepart: getDateFormat(item.dateDepart),
            heureArrivee: item.heureArrivee,
            placeDisponible: item.placeDisponible,
            prixVoyage: item.prixVoyage,
            busId: item.busId,
            trajetId: item.trajetId,
            agenceId: item.agenceId,
            ready: item.ready,
            chauffeurId: item.chauffeurId,
            heureDepart: item.heureDepart,
            numVoyage: item.numVoyage,
            placesOccupees: parseInt(item.placesOccupees) - 1,
        }

        try {
            const res = await fetch(`/api/voyages/${item.id}`, {
                method: 'PUT', cache: 'no-store', body: JSON.stringify(voyageData)
            })
            if (res.ok) {
                const d = await res.json();
                postLigneRecette(d.message, id, idT)
            }
        } catch (error) {
            console.log(error)
        }

    }
    const [arrets, setArrets] = useState<{ nom: string, prix: number }[]>([])
    const [prixA, setprixA] = useState<number>(0)
    const [bolTrajet, setbolTrajet] = useState<boolean>(false)
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

    const postTicket = async (id: number, voyageId: any) => {
        if (voy.placesOccupees < voy.placeDisponible || item?.voyages?.placesOccupees < item?.voyages?.placeDisponible) {
            const date = new Date()
            const year = date.getFullYear();
            const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
            const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
            const hours = (date.getHours()) < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
            const minutes = (date.getMinutes()) < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
            const data = {
                numeroSiege: parseInt(voy.placesOccupees + 1) ?? parseInt(item.voyages.placesOccupees + 1),
                prixTicket: parseInt(`${sup}`) + parseInt(`${prixF}`),
                voyageId: voyageId,
                typeTicket: item?.bus?.typeBus,
                statusTicket: "valide",
                dateCreation: `${year}-${month}-${day}T${hours}:${minutes}`,
                passagerId: id,
                employeId: tick.employeId,
                destination: `${tr.lieuDepart ?? item?.trajet?.lieuDepart} / ${dest == "" ? (tr.lieuArrivee ?? item?.trajet.lieuArrivee) : (tr.lieuArrivee ?? dest)}`,
            }
            // console.log(data)
            try {
                const res = await fetch(`/api/ticket/${params.ticketId}`, {
                    method: 'PUT', cache: 'no-store', body: JSON.stringify(data)
                })
                if (res.ok) {
                    const t = await res.json();
                    setNumTicket(t.id)
                    setIsReady(true)
                    if (item) {
                        editVoyage(item.voyages, id, t.id);
                        editVoyage2(voy, id, t.id)
                    } else {
                        editVoyage(voy, id, t.id);
                    }
                    configPopup("Ticket payé", "green", "Reservation")
                }
            } catch (err) {
                console.log(err)
            }
        } else {
            alert("Plus de places disponibles!")
        }

    }
    const postLigneRecette = async (voyage: any, id: number, idT: number) => {
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
            let montant = 0
            if (item) {
                montant = parseInt(voy.prixVoyage)
            };
            const tab: any[] = await res.json();
            if (tab.length > 0) {
                const updateData = {
                    busId: tab[0].busId,
                    voyageId: tab[0].voyageId,
                    montant: parseInt(tab[0].montant) + parseInt(voyage.prixVoyage) - montant,
                    signature: tab[0].signature,
                    date: tab[0].date,
                    agenceId: tab[0].agenceId,
                }
                // console.log(updateData)
                const resupdate = await fetch(`/api/lignerecette/${tab[0].id}`, {
                    method: 'PUT', cache: 'no-store', body: JSON.stringify(updateData)
                })
                if (resupdate.ok) {
                    postRecette(voyage, id, idT)
                }
            } else {
                const respost = await fetch(`/api/lignerecette`, {
                    method: 'POST', cache: 'no-store', body: JSON.stringify(data)
                })
                if (respost.ok) {
                    postRecette(voyage, id, idT)
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
    const postRecette = async (voyage: any, id: number, idT: number) => {
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
        const data = {
            nom: nom,
            typeService: typeService,
            typePaiement: typePaiement,
            montant: montantRecette,
            dateTransaction: `${year}-${month}-${day}T00:00:00.000Z`,
            note: recette?.note,
            agenceId: voyage.agenceId,
            remboursement: remboursement,
            passagerId: id,
            voyageId: voyage.id,
            ticketId: idT
        }

        try {
            const respost = await fetch(`/api/recette/${recette.id}`, {
                method: 'PUT', cache: 'no-store', body: JSON.stringify(data)
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
        const date = new Date()
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;

        if (item != null || voy) {
            try {
                let datel = getDateFormat(`${value?.dateNaissance}`);
                const e = {
                    nom: value?.nom.trim().toLowerCase(),
                    prenom: value?.prenom.trim().toLowerCase(),
                    adresse: value?.adresse.toLowerCase(),
                    dateNaissance: datel ?? `${year}-${month}-${day}`,
                    genre: value?.genre ?? "",
                    telephone: value?.telephone.trim(),
                    numCNI: value?.numCNI,
                }
                const res = await fetch('/api/passagers/' + value?.id, {
                    method: 'PUT',
                    body: JSON.stringify(e),
                })
                const d = await res.json()
                if (res.ok && d) {
                    setPassager(d)

                    if (item) {
                        postTicket(value.id, item.voyages?.id)
                        setTicket(item)
                    } else {
                        postTicket(value.id, voy?.id)
                      
                    }
                }
            } catch (err) {
                console.log(err)
                configPopup("Erreur d'enregistrement veillez reessayer!!", "red", "Error d'enregistrement")
            }
        } else {
            configPopup("Renseignez tout les informations!", "red", "Error d'enregistrement")
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
    const compareDate = (value: string, hour: number, minute: number) => {
        const date = new Date(value);
        const date2 = new Date();
        if (date.getFullYear() >= date2.getFullYear()) {
            if (date.getMonth() >= date2.getMonth()) {
                if (date.getDate() >= date2.getDate()) {
                    if (date.getDate() == date2.getDate()) {
                        if (hour >= hours) {
                            if (hour == hours) {
                                if (minute >= minutes) {
                                    return true
                                } else {
                                    return false
                                }
                            } else {
                                return true
                            }
                        } else {
                            return false
                        }
                    } else {
                        return true
                    }
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
        if (item?.bus?.typeBus != "simple") {
            setVipP(5000)
        }

        getMethod("payer")
        setTab2(true)
        setTab(false)
    }
    const handleItemOnclick = () => {
        setTab(true)
    }
    const [recette, setRecette] = useState<any>()
    const [bus, setBus] = useState<any>()
    const getRecette = async (id: number, voyageId: number) => {
        const res = await fetch("/api/recette", { cache: "no-store" })
        if (!res.ok) {
            throw new Error("Failed")
        }
        const data: any[] = await res.json();
        data.map((j) => {
            if (id === j.passagerId && voyageId == j.voyageId) {
                setRecette(j)
                setTypePaiement(j.typePaiement);
                setRemboursement(j.remboursement);
            }
        })
    };
    const [voy, setVoy] = useState<any>();
    const [tick, setTick] = useState<any>();
    const [tr, settr] = useState<any>();
    useEffect(() => {
        const getPassagers = async (id: number) => {
            const res = await fetch("/api/passagers/" + id, { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setPassagers(data)
            setValue(data)
        };
        const getTrajetById = async (id: number) => {
            const res = await fetch("/api/trajets/" + id, { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            settr(data)
        };
        const getBusById = async (id: number) => {
            const res = await fetch("/api/bus/" + id, { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setBus(data)
        };
        const getTrajet2 = async () => {
            const res = await fetch("/api/trajets", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
        };

        const getTicketById = async () => {
            const res = await fetch("/api/ticket/" + params.ticketId, { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setTick(data)
            getPassagers(data.passagerId);
            getVoyageById(data.voyageId)
        };

        const getVoyageById = async (id: number) => {
            const res = await fetch("/api/voyages/" + id, { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setVoy(data)
            getTrajetById(data.trajetId)
            setprixF(data.prixVoyage)
            getBusById(data.busId)
        };
        getTicketById()

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
            });
            setVoyage(tab)
        }

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
        <section className="w-full h-full relative  ">
            <div className="grid h-full grid-cols-4">
                <div className="col-span-3 p-10">
                    <div className=" flex justify-between items-start">
                        <h1 className="lowercase text-sm  text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/admin/ticket"}>Ticket</Link> / <Link className="hover:text-blue-600 font-semibold" href="#">Editer</Link></h1>
                    </div>
                    <div className="   flex justify-between items-start mb-2">
                        <h1 className="text-xl my-2 text-gray-900">Modificaion du ticket</h1>
                    </div>
                    <section className={`relative p-5 flex gap-4 justify-start items-start ${(!tab && !tab2) ? 'flex-col ' : 'flex-row'}`}>
                        <div style={{ width: '100%', minHeight: "100%", backdropFilter: "blur(1px)" }} className={`shadow-2xl max-w-3xl border rounded-md h-full relative overflow-hidden z-10 ${(tab || tab2 || tab3) ? 'block' : 'hidden'}`}>
                            <h4 className="border-b p-4 text-black font-bold uppercase text-xl">
                                Formulaire de ventes
                            </h4>
                            <form onSubmit={HandlerSubmit} className="px-10 py-5">
                                <div>
                                    <div className={`${(tab && !tab2) ? 'block' : 'hidden'}`}>
                                        <h4 className="text-blue-400 font-medium flex items-center gap-4 uppercase"> <div className="bg-blue-400 flex justify-center items-center w-4 h-4 text-black p-4 rounded-full">2</div> Information du client  <HelpPopup message="Remplir correctement tout les informations demandées." /></h4>

                                        <div className="mt-2">
                                            <label className="block mb-1 text-sm font-bold text-gray-800">Numèro de CNI <span className="text-red-500">*</span></label>
                                            <input type="text" id="numCNI" autoComplete="off" value={value?.numCNI ?? ""} name="numCNI" onChange={handleInputChange} aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2 focus:ring-2  focus:outline-none focus-visible:ring-blue-400" />
                                        </div>
                                        <div className="mt-2">
                                            <label className={`block mb-1 text-sm  font-bold text-gray-800 ${(validator && (value?.nom == undefined)) ? "ring-2 ring-red-500" : ""}`}>Nom  <span className="text-red-500">*</span> </label>
                                            <input type="text" autoComplete="off" value={value?.nom ?? ""} onChange={handleInputChange} placeholder="Nom" name="nom" id="nom" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 " />
                                        </div>
                                        <div className="mt-2">
                                            <label className="block mb-1 text-sm font-bold text-gray-800">Prénom <span className="text-red-500">*</span></label>
                                            <input type="text" autoComplete="off" value={value?.prenom ?? ""} id="prenom" name="prenom" placeholder="Prénom" onChange={handleInputChange} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 " />
                                        </div>
                                        <div className="mt-2">
                                            <label className="block mb-1 text-sm font-bold text-gray-800">Adresse <span className="text-red-500">*</span></label>
                                            <input type="text" autoComplete="off" value={value?.adresse ?? ""} id="adresse" name="adresse" placeholder="Adresse" onChange={handleInputChange} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 " />
                                        </div>
                                        <div className="mt-2">
                                            <label className="block mb-1 text-sm font-bold text-gray-800">Numèro de téléphone <span className="text-red-500">*</span></label>
                                            <input type="tel" id="telephone" autoComplete="off" value={value?.telephone ?? ""} name="telephone" onChange={handleInputChange} aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2 focus:ring-2  focus:outline-none focus-visible:ring-blue-400" placeholder="620456789" />
                                        </div>
                                        <div className="mt-2">
                                            <label className="block mb-1 text-sm font-bold text-gray-800">Date de naissance</label>
                                            <input type="date" id="datenaissance" name="dateNaissance" value={getDateFormat(`${value?.dateNaissance}`) ?? ""} placeholder="Date de Naissance" onChange={handleInputChange} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 " />
                                        </div>
                                        <div className="mt-2">
                                            <label className="block mb-1 text-sm font-bold text-gray-800">Genre</label>
                                            <div className="flex gap-4">
                                                <input type="radio" onChange={handleInputChange} id="genrem" name="genre" value="m" checked={value?.genre === "m"} className="block p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 " />
                                                <label htmlFor="genrem" className="text-sm font-bold text-gray-800">Homme</label>
                                                <input type="radio" onChange={handleInputChange} id="genref" value="f" name="genre" checked={value?.genre === "f"} className="block p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 " />
                                                <label htmlFor="genref" className="text-sm font-bold text-gray-800">Femme</label>
                                            </div>
                                        </div>

                                        <h5 className="my-4 text-sm">Les champs avec le signe <span className="text-red-500">*</span> sont obligatoires</h5>
                                        <div className="mt-4">
                                            <button type="button" onClick={() => { setTab(false); setTab2(false) }} className=" p-2 px-3 rounded-md hover:bg-stone-400 hover:text-white border border-stone-500 text-stone-500 font-bold">Recommencer</button>
                                            <button type="button" onClick={() => {
                                                let idv; if (item) {
                                                    idv = item?.voyages?.id

                                                } else { idv = voy.id }; handleNextTab(); getRecette(parseInt(`${value?.id}`), idv)
                                            }} className=" mx-2 p-2 px-3 rounded-md hover:bg-blue-400 hover:text-white border border-blue-500 text-blue-500 font-bold">Continuer</button>
                                        </div>
                                    </div>
                                    <div className={`px-4 ${(!tab && tab2) ? 'block' : 'hidden'}`}>
                                        <div className="mt-2">
                                            <h4 className="text-blue-400 font-medium flex items-center gap-4 "> <div className="bg-blue-400 flex justify-center items-center w-4 h-4 text-black p-4 rounded-full">3</div><span className="uppercase">Fiche de recette</span><HelpPopup message="Remplir correctement tout les informations demandées." /></h4>
                                            <div>
                                                <div className="mt-4">
                                                    <div className="flex gap-4 mb-1 items-start">
                                                        <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Service</label>
                                                        {/* {((data?.nom && data?.nom != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null} */}
                                                    </div>
                                                    <input value={"Achat de ticket de bus"} disabled type="text" id="nom" placeholder="Nom" name="nom" className={`block text-sm w-full p-2 text-black border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-200  sm:text-md focus-visible:ring-blue-400  `} />
                                                </div>

                                                <div className="mt-4">
                                                    <div className="flex gap-4 mb-1 items-start">
                                                        <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Prix du ticket</label>
                                                        {/* {((data?.montant && data?.montant != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null} */}
                                                    </div>
                                                    <input value={prixF} type="number" id="montant" disabled name="montant" className={`"block w-full p-2 text-sm text-black border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-200 sm:text-md focus-visible:ring-blue-400 `} />
                                                </div>

                                                {
                                                    item?.bus?.typeBus != "simple" ? (
                                                        <>
                                                            <div className="mt-4">
                                                                <div className="flex gap-4 mb-1 items-start">
                                                                    <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Prix vip</label>
                                                                    {/* {((data?.montant && data?.montant != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null} */}
                                                                </div>
                                                                <input type="number" value={vipP} disabled onChange={(e) => setVipP(parseInt(e.target.value))} id="montant" name="montant" className={`"block w-full p-2 text-sm text-black border border-gray-300 bg-gray-200 rounded-sm focus:ring-2  focus:outline-none  sm:text-md focus-visible:ring-blue-400 `} />
                                                            </div>
                                                        </>
                                                    ) : null
                                                }
                                                <div className="mt-4">
                                                    <div className="flex gap-4 mb-1 items-start">
                                                        <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Net à payer </label>
                                                        {/* {((data?.montant && data?.montant != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null} */}
                                                    </div>
                                                    <input value={sup + prixF + vipP} type="number" disabled onChange={(e) => setsup(parseInt(e.target.value))} id="montant" name="montant" className={`"block w-full p-2 text-sm text-black border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-200 sm:text-md focus-visible:ring-blue-400 `} />
                                                </div>
                                                <div className="mt-4">
                                                    <div className="flex gap-4 mb-1 items-start">
                                                        <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Remboursement</label>
                                                    </div>
                                                    <input type="number" id="remboursement" value={remboursement} name="remboursement" onChange={e => setRemboursement(parseInt(e.target.value))} min={0} className={`"block w-full p-2 text-sm text-black border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 `} />
                                                </div>
                                                <div className="mt-4">
                                                    <div className="flex gap-4 mb-1 items-start">
                                                        <label htmlFor="typePaiement" className="block mb-1 text-sm font-medium text-gray-900 ">Type De Paiement</label>
                                                        {/* {((data?.typePaiement && data?.typePaiement != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null} */}
                                                    </div>
                                                    <select name="typePaiement" value={typePaiement} onChange={(e) => setTypePaiement(e.target.value)} autoComplete="off" className={`block w-full p-2 uppercase text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400  `} id="typePaiement">
                                                        <option value="" ></option>
                                                        <option value="cash" >Cash</option>
                                                        <option value="orange money" >Orange money</option>
                                                        <option value="mobile money" >Mtn Mobile money</option>
                                                    </select>
                                                </div>

                                            </div>

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
                                                    client: `${passager?.nom} ${passager?.prenom}`,
                                                    tel: passager?.telephone,
                                                    depart: getDateFormat(ticket?.voyages?.dateDepart ?? tr.dateDepart),
                                                    voyage:  voy.numVoyage ?? ticket?.voyages?.numVoyage,
                                                    montant: parseInt(`${sup}`) + parseInt(`${prixF}`),
                                                    remboursement: remboursement,
                                                    caisse: `GUICHET ${session?.user?.name}`,
                                                    numticket: params.ticketId,
                                                    bus: `${ bus?.immatriculation ?? ticket?.bus?.immatriculation}`,
                                                    trajet: `${ticket?.trajet?.lieuDepart ?? tr.lieuDepart} / ${dest == "" ? ticket?.trajet.lieuArrivee ?? tr.lieuArrivee : dest}`,
                                                    siege: voy?.placesOccupees ?? ticket?.voyages?.placesOccupees + 1
                                                }} />


                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <button type="reset" id="resetbtn" className="text-white mt-4 hidden opacity-0 py-2 items-center gap-2 justify-center hover:shadow-md transition ease-linear hover:from-stone-700 rounded-sm bg-stone-500 text-sm from-stone-600 bg-gradient-to-t p-2">
                                    Recommencer
                                </button>
                            </form>
                        </div>
                        {(!tab && !tab2 && !tab3) ? (
                            <div className=" h-full py-5" >
                                <div className="my-2  font-bold text-blue-400 flex items-center gap-2">
                                    <span className="uppercase">Modifier le voyage</span>
                                    {/* <HelpPopup message="Cliquez sur le voyage pour le selectionner." /> */}
                                </div>
                                <button type="button" onClick={() => { setTab(true); }} className="p-2 px-3 text-sm rounded-md hover:bg-blue-400 hover:text-white border border-blue-500 text-blue-500 font-semibold">Ne pas modifier le voyage</button>
                                <ul className="mt-8 grid grid-cols-3 items-start gap-2 relative h-full ">
                                    {voyages.map((item: any, i: number) => ((item.voyages?.placeDisponible != item.voyages?.placesOccupees && compareDate(getDateFormat(item.voyages?.dateDepart), parseInt(`${item.voyages?.heureDepart[0]}${item.voyages?.heureDepart[1]}`), parseInt(`${item.voyages?.heureDepart[3]}${item.voyages?.heureDepart[4]}`)) && item.voyages?.ready != "oui" && item.trajet && item.bus && item.voyages.chauffeurId != 0) ?
                                        <li key={i} className="cursor-pointer rounded-xl shadow-xl border" >
                                            <CardVoyage bus={item.bus.immatriculation} isHidden={true} id={item.voyages?.id} isVip={item.bus.typeBus == "vip"} agence={item.voyages?.agenceId} date={getDateFormat(item.voyages?.dateDepart)} prix={item.voyages?.prixVoyage} lieuArrive={item.trajet?.lieuArrivee} heureArrive={""} lieuDepart={item.trajet?.lieuDepart} heureDepart={item.voyages?.heureDepart} placeDisponible={parseInt(item.voyages?.placeDisponible) - parseInt(item.voyages?.placesOccupees)} />
                                            <hr className={`border-dashed border-2  border-spacing-4 ${item.bus.typeBus == "vip" ? 'border-yellow-400' : 'border-slate-700'} `} />
                                            <div className="p-4 text-sm">
                                                <button className="text-blue-500 font-semibold" onClick={() => { setbolTrajet(true); setTrajItem(item.trajet); viewArret(JSON.stringify({ id: item.trajet.id, prix: item.trajet.prix })) }}>Afficher le trajet</button>
                                                <h4 className="my-2 text-xl text-stone-400">
                                                    Selectionner l&apos;arrêts
                                                </h4>
                                                <ul>
                                                    <li title="Trajet normale" onClick={() => { setItem({ ...item, prixFinal: item.trajet.prix, dest: "" }); setDest(""); handleItemOnclick(); setprixF(item.trajet.prix) }} className={`p-1 py-2 rounded-md my-1 border border-b-2 grid cursor-pointer grid-cols-2 bg-slate-600 text-white hover:bg-slate-800 `}>
                                                        <span >{item.trajet?.lieuDepart} - {item.trajet?.lieuArrivee}</span> <span className="text-right uppercase">{item.trajet.prix} fcfa</span>
                                                    </li>
                                                    <hr className={`border-dashed border my-2 border-spacing-4 ${item.bus.typeBus == "vip" ? 'border-yellow-400' : 'border-slate-700'} `} />
                                                    {
                                                        item.trajet?.arrets != "" ?
                                                            JSON.parse(item.trajet?.arrets).map((i: any, index: number) => (
                                                                <li onClick={() => { setItem({ ...item, prixFinal: i.prix, dest: i.nom }); setDest(i.nom); handleItemOnclick(); setprixF(i.prix) }} key={index} className={`p-1 py-2 border rounded-md my-1 cursor-pointer border-b-2 grid grid-cols-2 ${index % 2 == 0 ? 'bg-blue-600 hover:bg-blue-700 text-white border-b-blue-400' : 'text-white bg-slate-600 hover:bg-slate-800'}`}>
                                                                    <span>{item.trajet?.lieuDepart} - {i.nom}</span> <span className="text-right uppercase ">{parseInt(JSON.parse(item.trajet?.arrets)[index - 1]?.prix ?? 0) + parseInt(JSON.parse(item.trajet?.arrets)[index]?.prix)} fcfa</span>
                                                                </li>
                                                            ))
                                                            : null
                                                    }
                                                </ul>
                                            </div>
                                        </li> : null
                                    ))}
                                </ul>
                            </div>
                        ) : null}
                        {(!tab && tab2) ? (
                            <div>
                                {(item != null) ? (
                                    <div className="bg-white shadow-2xl text-sm p-4">
                                        <h4 className="text-gray-800 mb-4 font-medium flex items-center gap-4 "><span className="uppercase">Recapitulatif</span></h4>
                                        <div className=" w-96 rounded-md border mb-4 overflow-hidden">
                                            <h6 className="p-4 uppercase border-b bg-blue-500 text-white font-bold">Information du Client</h6>
                                            <ul>
                                                <li className="py-2 font-semibold border-b px-4 flex text-gray-700 flex-row gap-4">
                                                    <span>Nom et prénom:</span> <span>{value?.nom} {value?.prenom}</span>
                                                </li>
                                                <li className="py-2 px-4 font-semibold border-b  flex flex-row text-gray-700 gap-4">
                                                    <span>Téléphone:</span> <span>{value?.telephone}</span>
                                                </li>
                                                <li className="py-2 px-4 font-semibold border-b  flex flex-row text-gray-700 gap-4">
                                                    <span>Numéro CNI:</span> <span>{value?.numCNI}</span>
                                                </li>
                                                <li className="py-2 px-4 font-semibold border-b  flex flex-row text-gray-700 gap-4">
                                                    <span>Adresse:</span> <span>{value?.adresse}</span>
                                                </li>
                                                <li className="py-2 px-4 font-semibold border-b  flex flex-row text-gray-700 gap-4">
                                                    <span>Date de naissance:</span> <span>{getDateFormat(`${value?.dateNaissance}`)}</span>
                                                </li>
                                                <li className="py-2 px-4 font-semibold border-b  flex flex-row text-gray-700 gap-4">
                                                    <span>Genre:</span> <span>{value?.genre == "m" ? "Homme" : "Femme"}</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className=" w-96 rounded-md border mb-4 overflow-hidden">
                                            <h6 className="p-4 uppercase border-b bg-blue-500 text-white font-bold">Voyage</h6>
                                            <ul>
                                                <li className="py-2 font-semibold border-b px-4 flex text-gray-700 flex-row gap-4">
                                                    <span>Trajet:</span> <span>{item.trajet?.lieuDepart} - {dest == "" ? item?.trajet.lieuArrivee : dest}</span>
                                                </li>
                                                <li className="py-2 px-4 font-semibold border-b  flex flex-row text-gray-700 gap-4">
                                                    <span>Prix du ticket:</span> <span>{item.prixFinal ?? prixF}  FCFA</span>
                                                </li>
                                                <li className="py-2 px-4 font-semibold border-b  flex flex-row text-gray-700 gap-4">
                                                    <span>Date et heure de départ:</span> <span>Le {getDateFormat(item.voyages?.dateDepart ?? voy.dateDepart)} à {item.voyages?.heureDepart ?? voy.heureDepart}</span>
                                                </li>
                                                <li className="py-2 px-4 font-semibold border-b  flex flex-row text-gray-700 gap-4">
                                                    <span>Bus:</span> <span>{item.bus?.immatriculation ?? bus?.immatriculation}</span>
                                                </li>

                                            </ul>
                                        </div>

                                    </div>
                                ) : null}
                            </div>
                        ) : null}
                    </section>
                    {
                        bolTrajet ?
                            (
                                <div className="bg-black/50 fixed top-0 left-0 w-full h-full z-20">
                                    <div className="flex justify-center items-center">
                                        <div className="min-w-96 mt-4 overflow-hidden bg-white shadow-2xl rounded-md ">
                                            <h2 className="p-4 bg-blue-500 items-center font-bold text-left flex justify-between  text-white uppercase">
                                                Trajet et arrêts
                                                <button onClick={() => { setbolTrajet(false); setTrajItem(null) }} className="bg-white rounded-full hover:opacity-100 opacity-70 p-2"><Image src={closeSvg} width={15} height={15} alt="Image" /></button>
                                            </h2>
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
                                    </div>
                                </div>

                            ) : null
                    }
                </div>
                {
                    tr && bus && voy ?
                        <div className="col-span-1 shadow-2xl h-full min-h-screen bg-slate-800" >
                            <h2 className="text-center text-white p-2" >Ticket actuel</h2>
                            <div className=" shadow-2xl text-sm">
                                <h4 className="text-gray-800 mb-4 font-medium flex items-center gap-4 "><span className="uppercase">Recapitulatif</span></h4>
                                <div className=" w-96 rounded-md border mb-4 bg-white mx-auto overflow-hidden">
                                    <h6 className="p-4 uppercase border-b bg-blue-500 text-white font-bold">Information du Client</h6>
                                    <ul>
                                        <li className="py-2 font-semibold border-b px-4 flex text-gray-700 flex-row gap-4">
                                            <span>Nom et prénom:</span> <span>{value?.nom} {value?.prenom}</span>
                                        </li>
                                        <li className="py-2 px-4 font-semibold border-b  flex flex-row text-gray-700 gap-4">
                                            <span>Téléphone:</span> <span>{value?.telephone}</span>
                                        </li>
                                        <li className="py-2 px-4 font-semibold border-b  flex flex-row text-gray-700 gap-4">
                                            <span>Numéro CNI:</span> <span>{value?.numCNI}</span>
                                        </li>
                                        <li className="py-2 px-4 font-semibold border-b  flex flex-row text-gray-700 gap-4">
                                            <span>Adresse:</span> <span>{value?.adresse}</span>
                                        </li>
                                        <li className="py-2 px-4 font-semibold border-b  flex flex-row text-gray-700 gap-4">
                                            <span>Date de naissance:</span> <span>{getDateFormat(`${value?.dateNaissance}`)}</span>
                                        </li>
                                        <li className="py-2 px-4 font-semibold border-b  flex flex-row text-gray-700 gap-4">
                                            <span>Genre:</span> <span>{value?.genre == "m" ? "Homme" : "Femme"}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className=" w-96 rounded-md border mb-4 bg-white mx-auto overflow-hidden">
                                    <h6 className="p-4 uppercase border-b bg-blue-500  text-white font-bold">Voyage</h6>
                                    <ul>
                                        <li className="py-2 font-semibold border-b px-4 flex text-gray-700 flex-row gap-4">
                                            <span>Trajet:</span> <span>{tr?.lieuDepart} - {dest == "" ? tr.lieuArrivee : dest}</span>
                                        </li>
                                        <li className="py-2 px-4 font-semibold border-b  flex flex-row text-gray-700 gap-4">
                                            <span>Prix du ticket:</span> <span>{tick?.prixTicket}  FCFA</span>
                                        </li>
                                        <li className="py-2 px-4 font-semibold border-b  flex flex-row text-gray-700 gap-4">
                                            <span>Date et heure de départ:</span> <span>Le {getDateFormat(voy?.dateDepart ?? voy.dateDepart)} à {voy?.heureDepart ?? voy.heureDepart}</span>
                                        </li>
                                        <li className="py-2 px-4 font-semibold border-b  flex flex-row text-gray-700 gap-4">
                                            <span>Bus:</span> <span>{bus?.immatriculation}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className=" w-96 rounded-md border mb-4 bg-white mx-auto overflow-hidden">
                                    <h6 className="p-4 uppercase border-b bg-blue-500  text-white font-bold">Ticket</h6>
                                    <ul>
                                     
                                        <li className="py-2 px-4 font-semibold border-b  flex flex-row text-gray-700 gap-4">
                                            <span>Numéro de Siege:</span> <span>{tick?.numeroSiege}</span>
                                        </li>
                                        <li className="py-2 px-4 font-semibold border-b  flex flex-row text-gray-700 gap-4">
                                            <span>Classe:</span> <span>{tick?.typeTicket}</span>
                                        </li>
                                        <li className="py-2 px-4 font-semibold border-b  flex flex-row text-gray-700 gap-4">
                                            <span>Date: </span> <span> {getDateFormat(tick?.dateCreation)}</span>
                                        </li>
                                        <li className="py-2 px-4 font-semibold border-b  flex flex-row text-gray-700 gap-4">
                                            <span>Destination:</span> <span>{tick?.destination}</span>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                            <hr className={`border-dashed border-2  border-spacing-4 ${bus?.typeBus == "vip" ? 'border-yellow-400' : 'border-slate-700'} `} />
                            <div className="p-4 text-sm ">
                                <button className="text-blue-500 font-semibold" onClick={() => { setbolTrajet(true); setTrajItem(tr); viewArret(JSON.stringify({ id: tr.id, prix: tr.prix })) }}>Afficher le trajet</button>
                                <h4 className="my-2 text-xl text-stone-400">
                                    Changer l&apos;arrêt de voyage
                                </h4>
                                <ul>
                                    <li title="Trajet normale" onClick={() => { setItem({ ...{ bus: bus, voyages: voy, trajet: tr }, prixFinal: tr?.prix, dest: "" }); setDest(""); handleItemOnclick(); setprixF(tr.prix) }} className={`p-1 py-2 rounded-md my-1 border border-b-2 grid cursor-pointer grid-cols-2 bg-slate-600 text-white hover:bg-slate-800 `}>
                                        <span >{tr?.lieuDepart} - {tr?.lieuArrivee}</span> <span className="text-right uppercase">{tr?.prix} fcfa</span>
                                    </li>
                                    <hr className={`border-dashed border my-2 border-spacing-4 ${bus?.typeBus == "vip" ? 'border-yellow-400' : 'border-slate-700'} `} />
                                    {
                                        tr?.arrets != "" ?
                                            JSON.parse(`${tr?.arrets}`).map((i: any, index: number) => (
                                                <li onClick={() => { setItem({ ...{ bus: bus, voyages: voy, trajet: tr }, prixFinal: i.prix, dest: i.nom }); setDest(i.nom); handleItemOnclick(); setprixF(i.prix) }} key={index} className={`p-1 py-2 border rounded-md my-1 cursor-pointer border-b-2 grid grid-cols-2 ${index % 2 == 0 ? 'bg-blue-600 hover:bg-blue-700 text-white border-b-blue-400' : 'text-white bg-slate-600 hover:bg-slate-800'}`}>
                                                    <span>{tr?.lieuDepart} - {i.nom}</span> <span className="text-right uppercase ">{parseInt(JSON.parse(tr?.arrets)[index - 1]?.prix ?? 0) + parseInt(JSON.parse(tr?.arrets)[index]?.prix)} fcfa</span>
                                                </li>
                                            ))
                                            : null
                                    }
                                </ul>
                            </div>
                        </div> : null
                }
            </div>
            {isOpenPopup ? (<Popup color={popupData?.color} title={popupData.title} message={popupData?.message} onShow={showModal} />) : null}
        </section>
    )
}