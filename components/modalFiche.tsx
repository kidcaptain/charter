"use client"
import Link from "next/link";
import { useState } from "react"
import Popup from "./ui/popup";
import HelpPopup from "./ui/helpPopup";

export default function ModalFiche(props: { id?: string, isAdmin: string }) {

    const [methodeRemboursement, setMethodeRemboursement] = useState<string>("");

    const [showVacancy, setShowVacancy] = useState<boolean>(false);
    const [showSanction, setShowSanction] = useState<boolean>(false);
    const [showAvanceSalaire, setShowAvanceSalaire] = useState<boolean>(false);
    const [showPrimeExtra, setShowPrimeExtra] = useState<boolean>(false);
    const [popupData, setPopupData] = useState<{ message: string, title?: string, color: string }>({ message: "", title: "", color: "" })
    const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);

    const [data, setData] = useState<any>()

    const handleInputChang = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const configPopup = (message: string, color: string, title: string) => {
        setPopupData({ message: message, color: color, title: title })
        setIsOpenPopup(true)
        setTimeout(() => {
            setIsOpenPopup(false)
        }, 5000);
    }

    const HandlerSubmit = async (e: any) => {
        e.preventDefault()
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;

        const item = {
            montant: data.montant,
            motif: data.motif,
            remboursement: data.remboursement,
            dateUpdate: `${year}-${month}-${day}`,
            employeId: parseInt(`${props.id}`)
        }
        try {
            const response = await fetch('/api/avances', {
                method: 'POST',
                cache: "no-store",
                body: JSON.stringify(item),
            })
            if (response.ok) {
                setData(null)
                configPopup("Avance effectué", "green", "")
            }else{
                configPopup("Impossible d'afficher les données. Veuillez actualiser la page!", "red", "Reservation");
            }
        } catch (err) {
            console.log(err)
            configPopup("Impossible d'afficher les données. Veuillez actualiser la page!", "red", "Reservation");
        }
    }

    const HandlerSubmitConge = async (e: any) => {
        e.preventDefault()
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;

        const item = {
            nombreJour: data.nombreJour,
            dateDepart: data.dateDepart,
            motif: data.motif,
            dateUpdate: `${year}-${month}-${day}`,
            employeId: parseInt(`${props.id}`)
        }
        console.log(item)
        try {
            const response = await fetch('/api/conges', {
                method: 'POST',
                cache: "no-store",
                body: JSON.stringify(item),
            })
            if (response.ok) {
                setData(null)
                configPopup("Congé enregistré", "green", "")
            }else{
                configPopup("Impossible d'afficher les données. Veuillez actualiser la page!", "red", "Reservation");
            }
        } catch (err) {
            console.log(err)
            configPopup("Impossible d'afficher les données. Veuillez actualiser la page!", "red", "Reservation");
        }
    }

    const HandlerSubmitSanction = async (e: any) => {
        e.preventDefault()
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;

        const item = {
            label: data.label,
            description: data.description,
            dateUpdate: `${year}-${month}-${day}`,
            employeId: parseInt(`${props.id}`)
        }
        console.log(item)
        try {
            const response = await fetch('/api/sanctions', {
                method: 'POST',
                cache: "no-store",
                body: JSON.stringify(item),
            })
            if (response.ok) {
                setData(null)
                configPopup("Sanction enregistré", "green", "")
            }else{
                configPopup("Impossible d'afficher les données. Veuillez actualiser la page!", "red", "Reservation");
            }
        } catch (err) {
            console.log(err)
            configPopup("Impossible d'afficher les données. Veuillez actualiser la page!", "red", "Reservation");
        }
    }

    const HandlerSubmitPrime = async (e: any) => {
        e.preventDefault()
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;

        const item = {
            montant: data.montant,
            justificatif: data.justificatif,
            dateUpdate: `${year}-${month}-${day}`,
            employeId: parseInt(`${props.id}`)
        }
        console.log(item)
        try {
            const response = await fetch('/api/primes', {
                method: 'POST',
                cache: "no-store",
                body: JSON.stringify(item),
            })
            if (response.ok) {
                setData(null)
                configPopup("Sanction enregistré", "green", "")
            }else{
                configPopup("Impossible d'afficher les données. Veuillez actualiser la page!", "red", "Reservation");
            }
        } catch (err) {
            console.log(err)
            configPopup("Impossible d'afficher les données. Veuillez actualiser la page!", "red", "Reservation");
        }
    }

    return (
        <div className="bg-white w-full h-full">
            <div className="justify-start pb-5 gap-3 flex  p-4">
                <button type="button" onClick={() => setShowVacancy(true)} className=" hover:bg-slate-200 text-sm border p-2 rounded-sm font-medium bg-slate-50">Donner des Congés</button>
                <button type="button" onClick={() => setShowSanction(true)} className=" hover:bg-slate-200 text-sm border p-2 rounded-sm font-medium bg-slate-50">Donner une Sanction</button>
                <button type="button" onClick={() => setShowAvanceSalaire(true)} className=" hover:bg-slate-200 text-sm border p-2 rounded-sm font-medium bg-slate-50">Avance sur salaire</button>
                <button onClick={() => setShowPrimeExtra(true)} className=" hover:bg-slate-200 text-sm border p-2 rounded-sm font-medium bg-slate-50">Attribuer des primes et extra</button>
            {
                props.isAdmin === "admin" ? (    <Link href={`/dashboard/${props.isAdmin}/employees/${props.id}/bulletin`} className="hover:bg-black hover:text-white text-sm border border-black  flex items-center p-2 rounded-sm font-medium bg-slate-50 gap-2 px-4">Générer fiche de paie <HelpPopup message="Remplir et imprimer la fiche de paie d'un employé." />  </Link>) :     <Link href={`/dashboard/${props.isAdmin}/employes/${props.id}/bulletin`} className=" hover:bg-blue-600 text-white text-sm border p-2 rounded-sm font-medium bg-blue-400">Générer fiche de paie</Link>
            }
            </div>
            {showVacancy ? (
                <div className="bg-black/50 fixed z-40 h-full w-full top-0 left-0">
                    <div className="max-w-xl m-auto bg-white mt-20">
                        <h2 className="p-4 uppercase border-b">
                            Congés
                        </h2>
                        <form onSubmit={HandlerSubmitConge} className="p-4">
                            <div className="mt-4  gap-4">
                                <label className="block mb-1 text-sm  text-gray-900 font-bold">Nombre de jour</label>
                                <input max={1000} onChange={handleInputChang} required autoComplete="off" type="number" id="nombreJour" name="nombreJour" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-sm focus-visible:ring-blue-400 " />
                            </div>
                            <div className="mt-4  gap-4">
                                <label className="block mb-1 text-sm  text-gray-900 font-bold">Date de depart en congé</label>
                                <input onChange={handleInputChang} required autoComplete="off" type="date" id="dateDepart" name="dateDepart" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-sm focus-visible:ring-blue-400 " />
                            </div>
                            <div className="mt-4  gap-4">
                                <label className="block mb-1 text-sm  text-gray-900 font-bold">Motif</label>
                                <textarea onChange={handleInputChang} id="motif" required autoComplete="off" name="motif" className="block w-full p-2 h-52 resize-none text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-sm focus-visible:ring-blue-400 " ></textarea>
                            </div>
                            <button type="submit" className="text-white  py-2 hover:bg-blue-700 rounded-sm bg-blue-500 text-sm mt-4  p-2">
                                Enregistrer
                            </button>
                            <button type="button" onClick={() => setShowVacancy(false)} className="text-white mx-4 py-2 hover:bg-stone-700 rounded-sm bg-stone-500 text-sm mt-4  p-2">
                                Fermer
                            </button>
                        </form>
                    </div>
                </div>
            ) : null}
            {showSanction ? (
                <div className="bg-black/50 fixed z-40 h-full w-full top-0 left-0">
                    <form onSubmit={HandlerSubmitSanction} className="max-w-xl m-auto bg-white mt-20">
                        <h2 className="p-4 uppercase border-b">
                            Sanction
                        </h2>
                        <div className="p-4">
                            <div className="mt-4  gap-4">
                                <label className="block mb-1 text-sm  text-gray-900 font-bold">Intitulé de la sanction</label>
                                <input type="text" onChange={handleInputChang} name="label"  id="nom" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-sm focus-visible:ring-blue-400 " />
                            </div>
                            <div className="mt-4  gap-4">
                                <label className="block mb-1 text-sm  text-gray-900 font-bold">Description</label>
                                <textarea id="nom" onChange={handleInputChang} name="description" className="block w-full p-2 h-52 resize-none text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-sm focus-visible:ring-blue-400 " ></textarea>
                            </div>
                            <button type="submit" className="text-white  py-2 hover:bg-blue-700 rounded-sm bg-blue-500 text-sm mt-4  p-2">
                                Enregistrer
                            </button>
                            <button type="button" onClick={() => setShowSanction(false)} className="text-white mx-4 py-2 hover:bg-stone-700 rounded-sm bg-stone-500 text-sm mt-4  p-2">
                                Fermer
                            </button>
                        </div>
                    </form>
                </div>) : null}
            {showAvanceSalaire ? (
                <div className="bg-black/50 fixed z-40 h-full w-full top-0 left-0">
                    <div  className="max-w-xl m-auto bg-white mt-20">
                        <h2 className="p-4 uppercase border-b">
                            Effectuer une avance sur salaire
                        </h2>
                        <form onSubmit={HandlerSubmit} className="p-4">
                            <div className="mt-4  gap-4">
                                <label className="block mb-1 text-sm  text-gray-900 font-bold">Montant de l&apos;avance</label>
                                <input type="number" id="nom" onChange={handleInputChang} name="montant" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-sm focus-visible:ring-blue-400 " />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1 text-sm  text-gray-900 font-bold">Motif de l&apos;avance</label>
                                <textarea id="nom" onChange={handleInputChang} name="motif" className="block w-full p-2 h-52 resize-none text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-sm focus-visible:ring-blue-400 " ></textarea>
                            </div>
                            <hr />
                            <div className="mt-4">
                                <label htmlFor="" className="block mb-1 text-sm  text-gray-900 font-bold">Methode de remboursement</label>
                                <select onChange={handleInputChang} name="remboursement" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " id="">
                                    <option value="autres methodes">Autres Methodes</option>
                                    <option value="retenue sur salaire">Retenue sur salaire</option>
                                </select>
                            </div>
                            {/* {methodeRemboursement == "0" ? (
                                <div>
                                    <div className="mt-4  gap-4">
                                        <label className="block mb-1 text-sm  text-gray-900 font-bold">Nombre de mois </label>
                                        <input type="number" id="nom" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-sm focus-visible:ring-blue-400 " />
                                    </div>
                                    <div className="mt-4  gap-4">
                                        <label className="block mb-1 text-sm  text-gray-900 font-bold">Le montant retenu chaque mois (en pourcentage) </label>
                                        <input type="number" id="nom" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-sm focus-visible:ring-blue-400 " />
                                    </div>
                                </div>
                            ) : null
                            } */}
                            <button type="submit" className="text-white  py-2 hover:bg-blue-700 rounded-sm bg-blue-500 text-sm mt-4  p-2">
                                Enregistrer
                            </button>
                            <button type="button" onClick={() => setShowAvanceSalaire(false)} className="text-white mx-4 py-2 hover:bg-stone-700 rounded-sm bg-stone-500 text-sm mt-4  p-2">
                                Fermer
                            </button>
                        </form>
                    </div>
                </div>
            ) : null}
            {showPrimeExtra ? (
                <div className="bg-black/50 fixed z-40 h-full w-full top-0 left-0">
                    <form onSubmit={HandlerSubmitPrime} className="max-w-xl m-auto bg-white mt-20">
                        <h2 className="p-4 uppercase border-b">
                            Attribuer une prime ou un extra
                        </h2>
                        <div className="p-4">
                            <div className="mt-4 gap-4">
                                <label className="block mb-1 text-sm  text-gray-900 font-bold">Montant de la prime ou de l&apos;extra</label>
                                <input type="number" id="montant" onChange={handleInputChang} name="montant" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-sm focus-visible:ring-blue-400 " />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1 text-sm  text-gray-900 font-bold">Justificatif de la prime</label>
                                <textarea id="justificatif" onChange={handleInputChang} name="justificatif" className="block w-full p-2 h-52 resize-none text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-sm focus-visible:ring-blue-400 " ></textarea>
                            </div>
                            <button type="submit" className="text-white  py-2 hover:bg-blue-700 rounded-sm bg-blue-500 text-sm mt-4  p-2">
                                Enregistrer
                            </button>
                            <button type="button" onClick={() => setShowPrimeExtra(false)} className="text-white mx-4 py-2 hover:bg-stone-700 rounded-sm bg-stone-500 text-sm mt-4  p-2">
                                Fermer
                            </button>
                        </div>
                    </form>
                </div>
            ) : null}
                 {isOpenPopup ? (<Popup color={popupData?.color} title={popupData.title} message={popupData?.message} onShow={() => setIsOpenPopup(false)} />) : null}
        </div>

    )
}

