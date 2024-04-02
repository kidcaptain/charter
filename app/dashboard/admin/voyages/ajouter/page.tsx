"use client"


import Popup from "@/components/ui/popup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import positionSvg from "@/public/images/position.svg"
import busSvg from "@/public/images/bus-logo.svg"
import PlanningChauffeur from "@/components/ui/planningChauffeur";
import PlanningWeekBus from "@/components/ui/planningWeekBus";
import svg from "@/public/images/valide.svg"

export default function Page() {
    const [arrets, setArrets] = useState<{ nom: string, prix: number }[]>([])
    const [data, setData] = useState<any>()
    const [bus, setBus] = useState<any[]>([])
    const [agences, setAgences] = useState<any[]>([])
    const [comVoy, setComVoy] = useState<number>(0)
    const [trajet, setTrajet] = useState<any[]>([])
    const day: number = new Date().getDate();
    const month: number = new Date().getMonth() + 1;
    const year: number = new Date().getFullYear();
    const hourNow: number = new Date().getHours();
    const minutesNow: number = new Date().getMinutes();
    const messagesError: string[] = [
        "La date de départ doit être supérieure ou égale à date d'aujourd'hui!",
        "L'heure de départ doit être supérieure ou date égale à" + hourNow + ":" + minutesNow,
        "L'heure d'arrivée doit être supérieure à l'heure de départ qui est ",
        "Date incorrect", "Formulaire incomplet!"
    ]
    const [messageError, setMessageError] = useState<string>("");

    const [employe, setemploye] = useState<any[]>([])
    const [busId, setBusId] = useState<string | undefined>("")
    const [popupData, setPopupData] = useState<{ message: string, title?: string, color: string }>({ message: "", title: "", color: "" })
    const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
    const [trajItem, setTrajItem] = useState<any>()
    const [numVoyage, setNumVoyage] = useState<string>("")
    const router = useRouter();
    const classNameLabel = "block text-sm font-bold text-gray-900 ";
    const classNameInput = "block w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none sm:text-md focus-visible:ring-blue-400";
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
    const [isToDay, setIsToDay] = useState<boolean>(false)
    const [DateIsCorrect, setDateIsCorrect] = useState<boolean>(true)
    const [HeureDepartIsCorrect, setHeureDepartIsCorrect] = useState<boolean>(true)
    const [HeureArriveeIsCorrect, setHeureArriveeIsCorrect] = useState<boolean>(true)
    const checkDateIsCorrect = (value: string): boolean => {
        const d = new Date(value);
        if (day == d.getDate() && month == d.getMonth() + 1 && year == d.getFullYear()) {
            setIsToDay(true);
        } else {
            setIsToDay(false);
        };
        if (day > d.getDate()) {
            setMessageError(messagesError[0] + "\n (Jour incorrect)");
            return false;
        } else if (month > d.getMonth() + 1) {
            setMessageError(messagesError[0] + "\n(Mois incorrect)");
            return false;
        } else if (year > d.getFullYear()) {
            setMessageError(messagesError[0] + "\n (Année incorrect)")
            return false;
        } else {
            return true;
        }
    }
    const checkHeureDepartIsCorrect = (value: string): boolean => {
        if (isToDay) {
            const hours: number = new Date().getHours();
            const minutes: number = new Date().getMinutes();
            const hour: string = value;
            if (hours > parseInt(hour[0] + hour[1])) {
                setMessageError(messagesError[1] + "\n (Heure incorrect)");
                return false;
            } else if ((minutes > parseInt(hour[3] + hour[4])) && hours == parseInt(hour[0] + hour[1])) {
                setMessageError(messagesError[1] + "\n (Minutes incorrect)");
                return false
            } else {
                return true;
            }
        } else {
            if (data?.heureArrivee) {
                const heureArrivee: string = data.heureArrivee;
                const hour: string = value;
                if (parseInt(heureArrivee[0] + heureArrivee[1]) < parseInt(hour[0] + hour[1])) {
                    setMessageError(messagesError[2] + value + "\n (Heure incorrect)");
                    return false;
                } else if ((parseInt(heureArrivee[3] + heureArrivee[4]) < parseInt(hour[3] + hour[4])) && parseInt(heureArrivee[0] + heureArrivee[1]) == parseInt(hour[0] + hour[1])) {
                    setMessageError(messagesError[2] + value + "\n (Minutes incorrect)");
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        }

    }
    const checkHeureArriveeIsCorrect = (valeur: string): boolean => {
        if (data?.heureDepart) {
            const heureDepart: string = data.heureDepart;
            const hour: string = valeur;
            if (parseInt(heureDepart[0] + heureDepart[1]) > parseInt(hour[0] + hour[1])) {
                setMessageError(messagesError[2] + data.heureDepart + "\n (Heure incorrect)");
                return false;
            } else if ((parseInt(heureDepart[3] + heureDepart[4]) > parseInt(hour[3] + hour[4])) && parseInt(heureDepart[0] + heureDepart[1]) == parseInt(hour[0] + hour[1])) {
                setMessageError(messagesError[2] + data.heureDepart + "\n (Minutes incorrect)");
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }
    const checkDates = (val: any) => {
        // let bol = DateIsCorrect;
        // let bol1 = HeureDepartIsCorrect;
        // let bol2 = HeureArriveeIsCorrect;
        switch (val?.name) {
            case "dateDepart":
                const d = new Date(val.value);
                if (day == d.getDate() && month == d.getMonth() + 1 && year == d.getFullYear()) {
                    setIsToDay(true);
                } else {
                    setIsToDay(false);
                };
                if (day > d.getDate()) {
                    setMessageError(messagesError[0] + "\n (Jour incorrect)");
                } else if (month > d.getMonth() + 1) {
                    setMessageError(messagesError[0] + "\n(Mois incorrect)");
                } else if (year > d.getFullYear()) {
                    setMessageError(messagesError[0] + "\n (Année incorrect)")
                } else {
                    setMessageError("")
                }
                break;
            case "heureDepart":
                if (isToDay) {
                    const hours: number = new Date().getHours();
                    const minutes: number = new Date().getMinutes();
                    const hour: string = val.value;
                    if (hours > parseInt(hour[0] + hour[1])) {
                        setMessageError(messagesError[1] + "\n (Heure incorrect)");

                    } else if ((minutes > parseInt(hour[3] + hour[4])) && hours == parseInt(hour[0] + hour[1])) {
                        setMessageError(messagesError[1] + "\n (Minutes incorrect)");

                    } else {
                    }
                } else {
                    if (data?.heureArrivee) {
                        const heureArrivee: string = data.heureArrivee;
                        const hour: string = val.value;
                        if (parseInt(heureArrivee[0] + heureArrivee[1]) < parseInt(hour[0] + hour[1])) {
                            setMessageError(messagesError[2] + val.value + "\n (Heure incorrect)");
                        } else if ((parseInt(heureArrivee[3] + heureArrivee[4]) < parseInt(hour[3] + hour[4])) && parseInt(heureArrivee[0] + heureArrivee[1]) == parseInt(hour[0] + hour[1])) {
                            setMessageError(messagesError[2] + val.value + "\n (Minutes incorrect)");
                        } else {
                            setMessageError("")
                        }
                    } else {
                    }
                }

                break;
            case "heureArrivee":
                const g = new Date(val.value);
                if (day == g.getDate() && month == g.getMonth() + 1 && year == g.getFullYear()) {
                    setIsToDay(true);
                } else {
                    setIsToDay(false);
                };
                if (day > g.getDate()) {
                    setMessageError(messagesError[0] + "\n (Jour incorrect)");
                } else if (month > g.getMonth() + 1) {
                    setMessageError(messagesError[0] + "\n(Mois incorrect)");
                } else if (year > g.getFullYear()) {
                    setMessageError(messagesError[0] + "\n (Année incorrect)")
                } else {
                    setMessageError("")
                }
                break;
            default:
                setMessageError(messagesError[3])
                break;
        }



        // if (!bol2 && data?.heureArrivee && val?.name != "heureArrivee") {
        //     bol2 = checkHeureArriveeIsCorrect(data?.heureArrivee)
        // }
        // if (!bol && data?.dateDepart && val?.name != "dateDepart") {
        //     bol = checkDateIsCorrect(data?.dateDepart)
        // }
        // if (bol) {
        //     setMessageError("")
        // }

        // setDateIsCorrect(bol)
        // setHeureDepartIsCorrect(bol1)
        // setHeureArriveeIsCorrect(bol2)

    }

    const HandlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const str = data.busId;
        const array = str.split(',').map(Number);
        let trajet = JSON.parse(data.trajetId);
        let agence = JSON.parse(data.agenceId);
        const res = await fetch("/api/voyages", { cache: "no-store" })
        if (!res.ok) {
            throw new Error("Failed")
        }
        let bol: boolean = false;
        let bol3: boolean = false;
        let bol2: boolean = true;
        const datas: any[] = await res.json();
        if (datas.length > 0) {
            datas.forEach((i) => {
                if (bol2) {
                    const dates1 = new Date(i.dateDepart);
                    const dates2 = new Date(data.dateDepart);

                    if (dates1.getDate() == dates2.getDate() && (dates1.getMonth() + 1) == (dates2.getMonth() + 1) && dates1.getFullYear() == dates2.getFullYear()) {
                        if (i.heureArrivee != data?.heureDepart && parseInt(i.busId) == parseInt(array[0])) {
                            bol = false;
                            let dateA = `${i.heureArrivee}`;
                            let dateD = `${data?.heureDepart}`;
                            if (parseInt(`${dateA[0]}${dateA[1]}`) <= parseInt(`${dateD[0]}${dateD[1]}`)) {
                                bol = true;
                            } else {
                                bol = false;
                            }
                        } else {
                            bol = true;
                        }
                        if (i.heureArrivee != data?.heureDepart && parseInt(i.chauffeurId) == parseInt(data?.chauffeurId)) {
                            bol3 = false;
                            let dateA = `${i.heureArrivee}`;
                            let dateD = `${data?.heureDepart}`;
                            if (parseInt(`${dateA[0]}${dateA[1]}`) <= parseInt(`${dateD[0]}${dateD[1]}`)) {
                                bol3 = true;
                            } else {
                                bol3 = false;
                            }
                        } else {
                            bol3 = true;
                        }
                    } else {
                        bol3 = true;
                        bol = true;
                    }
                }
            })
        } else {
            bol = true
            bol3 = true
        }


        if (messageError == "" && bol && bol3) {
            const voyage = {
                agenceId: agence.id,
                dateDepart: data.dateDepart,
                heureArrivee: data.heureArrivee,
                busId: `${array[0]}`,
                trajetId: trajet.id,
                prixVoyage: trajet.prix,
                placeDisponible: array[1],
                chauffeurId: data.chauffeurId ?? 0,
                heureDepart: data.heureDepart,
                numVoyage: numVoyage,
                placesOccupees: 0
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
            } else if (!bol3) {
                alert("Chauffeur indisponible!")
            } else if (messageError == "") {
                alert("Formulaire invalide!")
            } else {
                configPopup("Veuillez remplir correctement les informations!", "red", "");
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



    function generateMumVoy(value: string) {
        let agence: { id: number, nom: string } = JSON.parse(value);
        if (agence) {
            setNumVoyage(`${agence?.nom[0].toUpperCase()}${agence?.nom[1].toUpperCase()}${agence?.nom[3].toUpperCase()}${year}${month}${day}${new Date().getMinutes()}${comVoy}`);
        }
    }

    return (
        <div className=" w-full p-10">
            <div className=" py-2 flex justify-between items-start">
                <h1 className="lowercase text-sm  text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/admin/voyages"}>Voyages</Link> / <Link className="hover:text-blue-600 font-semibold" href="#">Ajouter</Link></h1>
            </div>
            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="text-xl text-gray-900">Programmer un voyage </h1>
            </div>
            <div className="grid gap-4 items-start grid-cols-3 m-auto">
                <div className=" col-span-1">
                    <form onSubmit={HandlerSubmit} className="col-span-1 bg-white rounded-md overflow-hidden shadow-2xl   ">
                        <h2 className=" font-bold text-gray-100 p-4 bg-green-500  uppercase">
                            Ajouter un voyage
                        </h2>
                        <div className=" m-auto p-4">
                            {messageError != "" ? (<p className="my-2 text-center uppercase text-xs text-gray-800 bg-red-200 rounded-md p-2 font-medium"> {messageError} </p>) : null}
                            <h3 className="text-center uppercase text-xl">Muméro voyage {numVoyage}</h3>
                            <div className="mt-4">
                                <div className="flex gap-1 mb-1 items-center">
                                    <label className={classNameLabel}>Bus</label>
                                    {((data?.busId && data?.busId != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                                </div>
                                <select id="busId" name="busId" required onChange={handleInputChange} className={`${classNameInput} uppercase ${((data?.busId && data?.busId != "")) ? "bg-green-50  ring-green-400/30 ring-4" : "bg-gray-50"}`} >
                                    <option></option>
                                    {bus.map((item: any, i: number) => (
                                        <option key={i} value={[item.id, item.capacite]}>Bus-{item.id} {item.typeBus} ({item.marque} {item.modele} )</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-4">
                                <div className="flex gap-1 mb-1 items-center">
                                    <label className={classNameLabel}>Chauffeur</label>
                                    {((data?.chauffeurId && data?.chauffeurId != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                                </div>
                                <select id="chauffeurId" name="chauffeurId" onChange={handleInputChange} className={`${classNameInput} uppercase ${((data?.chauffeurId && data?.chauffeurId != "")) ? "bg-green-50  ring-green-400/30 ring-4" : "bg-gray-50"}`} >
                                    <option></option>
                                    {employe.map((item: any, i: number) => (
                                        <option key={i} value={item.id}>{item.nom} {item.prenom}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-4">
                                <div className="flex gap-1 mb-1 items-center">
                                    <label className={classNameLabel}>Date de Départ</label>
                                    {((data?.dateDepart && data?.dateDepart != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                                </div>
                                <input onChange={e => { checkDates(e.target); handleInputChange(e) }} required type="date" id="dateDepart" placeholder="Départ" name="dateDepart" className={`${classNameInput} ${((data?.dateDepart && data?.dateDepart != "")) ? "bg-green-50 ring-green-400/30 ring-4" : "bg-gray-50"}`} />
                            </div>
                            <div className="mt-4">
                                <div className="flex gap-1 mb-1 items-center">
                                    <label className={classNameLabel}>Heure de Départ</label>
                                    {((data?.heureDepart && data?.heureDepart != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                                </div>
                                <input onChange={e => { checkDates(e.target); handleInputChange(e) }} required type="time" id="heureDepart" placeholder="Heure de départ" name="heureDepart" className={`${classNameInput} ${((data?.heureDepart && data?.heureDepart != "")) ? "bg-green-50 ring-green-400/30 ring-4" : "bg-gray-50"}`} />
                            </div>
                            <div className="mt-4">
                                <div className="flex gap-1 mb-1 items-center">
                                    <label className={classNameLabel}>Heure d&apos;Arrivée</label>
                                    {((data?.heureArrivee && data?.heureArrivee != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                                </div>
                                <input onChange={e => { checkDates(e.target); handleInputChange(e) }} required type="time" id="heureArrivee" placeholder="Départ" name="heureArrivee" className={`${classNameInput} ${((data?.heureArrivee && data?.heureArrivee != "")) ? "bg-green-50 ring-green-400/30 ring-4" : "bg-gray-50"}`} />
                            </div>
                            <div className="mt-4">
                                <div className="flex gap-1 mb-1 items-center">
                                    <label className={classNameLabel}>Trajet</label>
                                    {((data?.trajetId && data?.trajetId != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                                </div>
                                <select id="trajetId" name="trajetId" required onChange={(e) => { handleInputChange(e); viewArret(e.target.value) }} className={`${classNameInput} uppercase ${((data?.trajetId && data?.trajetId != "")) ? "bg-green-50 ring-green-400/30 ring-4" : "bg-gray-50"}`} >
                                    <option></option>
                                    {trajet.map((item: any, i: number) => (
                                        <option key={i} value={JSON.stringify({ id: item.id, prix: item.prix })}>N°0{item.id} ({item.lieuDepart} - {item.lieuArrivee} {JSON.parse(item.arrets).length == 0 ? "" : JSON.parse(item.arrets).map((i: any, k: number) => `- ${i.nom} `)}) {JSON.parse(item.arrets).length == 0 ? "Aucun arrêt" : ""}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-4">
                                <div className="flex gap-1 mb-1 items-center">
                                    <label className={classNameLabel}>Agence</label>
                                    {((data?.agenceId && data?.agenceId != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                                </div>

                                <select id="agenceId" name="agenceId" required onChange={(e) => { handleInputChange(e); generateMumVoy(e.target.value) }} className={`${classNameInput} uppercase ${((data?.agenceId && data?.agenceId != "")) ? "bg-green-50 ring-green-400/30 ring-4" : "bg-gray-50"}`} >
                                    <option></option>
                                    {agences.map((item: any, i: number) => (
                                        <option key={i} value={JSON.stringify({ id: item.id, nom: item.nom })}>{item.nom} ({item.adresse})</option>
                                    ))}
                                </select>
                            </div>

                            {/* <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Type de voyages:</label>
                                <select id="typeVoyage" name="typeVoyage" required onChange={handleInputChange} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                    <option></option>
                                    <option value="aller-retour">Aller-Retour</option>
                                    <option value="aller simple">Aller Simple</option>
                                </select>
                            </div> */}

                            {/* <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Prix du voyage</label>
                                <input onChange={handleInputChange} required type="number" id="prixVoyage" name="prixVoyage" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                            </div> */}
                            <div className="mt-4 flex gap-2">
                                <button type="submit" className="text-white text-sm flex px-4 hover:bg-blue-700 rounded-sm bg-blue-500  p-2">
                                    Enregistrer
                                </button>
                                <button type="reset" onClick={() => { setData(null); setNumVoyage(""); setMessageError("") }} id="resetbtn" className="text-white  text-sm flex px-4  hover:shadow-md  hover:bg-stone-700 rounded-sm bg-stone-500 p-2">
                                    Recommencer
                                </button>
                            </div>
                        </div>
                    </form>
                    {isOpenPopup ? (<Popup color={popupData?.color} title={popupData.title} message={popupData?.message} onShow={() => setIsOpenPopup(false)} />) : null}
                </div>
                <div className="col-span-2">
                    {
                        data?.busId ?
                            (<div className="bg-yellow-500 shadow-2xl rounded-md overflow-hidden text-white">
                                <h2 className="p-4 border-b uppercase font-bold">Disponibilité du bus</h2>
                                <PlanningWeekBus id={busId} />
                            </div>
                            ) : null
                    }
                    {
                        data?.chauffeurId ?
                            (<div className="bg-blue-500 mt-4 shadow-2xl rounded-md overflow-hidden text-white">
                                <h2 className="p-4 border-b uppercase font-bold">Disponibilité du chauffeur</h2>
                                <PlanningChauffeur id={data?.chauffeurId} />
                            </div>) : null
                    }
                    {
                        data?.trajetId ?
                            (
                                <div className="w-full mt-4 overflow-hidden bg-white shadow-2xl rounded-md  ">
                                    <h2 className="p-4 border-b font-bold uppercase text-gray-900"> Trajet et arrêts (TRAJ-{trajItem?.id} {trajItem?.lieuDepart}-{trajItem?.lieuArrivee})</h2>
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