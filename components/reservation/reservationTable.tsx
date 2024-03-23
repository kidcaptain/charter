import { getDateFormat, selectReservation } from "@/functions/actionsClient";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ReservationTable() {

    const [reservation, setReservation] = useState<any[]>([])

    useEffect(() => {
        const getVoyage = async () => {
            const res = await fetch("/api/voyages", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
        };
        const getPassager = async () => {
            const res = await fetch("/api/passagers", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
        };

        const getReservationTable = async () => {
            const res = await fetch("/api/reservations", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
        };
        const agence = localStorage.getItem("agence")

        const getReservation = async () => {

            const tabPassager: any[] = await getPassager();
            const tabVoyages: any[] = await getVoyage();
            const tabReservation: any[] = await getReservationTable();
            const tab: any[] = [];
            let passager: any = null;
            let voyage: any = null;

            tabReservation.map((r) => {
                tabPassager.map((i) => {
                    if ((r.passagerId === i.id)) {
                        passager = i;
                    }
                })
                tabVoyages.map((j) => {
                    if ((r.voyageId === j.id)) {
                        voyage = j;
                    }
                })
                tab.push({ passager: passager, voyages: voyage, reservation: r })
            })
            setReservation(tab.reverse())
        }

        getReservation()

    }, [reservation])
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
            } else {
                const respost = await fetch(`/api/lignerecette`, {
                    method: 'POST', cache: 'no-store', body: JSON.stringify(data)
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    const HandlerSubmit = async (id: number, validite: string, item: any) => {
        if (confirm("Confirmé l'opération")) {
            const data = {
                passagerId: item.reservation.passagerId,
                voyageId: item.reservation.voyageId,
                dateReservation: getDateFormat(item.reservation.dateReservation),
                statutReservation: validite,
                agenceId: item.voyages?.agenceId,
                avance: item.reservation.avance,
                dateConfirmation: item.reservation.dateConfirmation
            }
            try {
                const response = await fetch(`/api/reservations/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                })
                const a = await response.json()

                if (response.ok) {
                    if (validite === "validé") {
                        postTicket(item.reservation.voyageId, item, a)
                    } else {
                        editVoyage(item, a)
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

    const editVoyage = async (item: any, a: any) => {
        if (a.statutReservation == "annulé") {
            let plac: number = (parseInt(item.placeDisponible) + 1) < 0 ? 0 : (parseInt(item.placeDisponible) + 1);
            const voyageData = {
                dateDepart: getDateFormat(item.dateDepart),
                dateArrivee: getDateFormat(item.dateArrivee),
                placeDisponible: plac,
                typeVoyage: item.typeVoyage,
                prixVoyage: item.prixVoyage,
                busId: item.busId,
                trajetId: item.trajetId,
                agenceId: item?.agenceId,
                ready: item.ready,
                chauffeurId: item.chauffeurId,
                heureDepart: item.heureDepart,
                numVoyage: item.numVoyage,
            }
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

    }
    const getBus = async (id: number) => {
        const res = await fetch(`/api/bus/${id}`, {
            method: 'GET', cache: 'no-store'
        })
        if (res.ok) {
            const bus = await res.json();
            return bus.typeBus
        }
        return "simple"
    }
    const postTicket = async (voyageId: any, item: any, a: any) => {

        const date = new Date()
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        const hours = (date.getHours()) < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
        const minutes = (date.getMinutes()) < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
        const typeTicket = await getBus(item.voyages.busId);

        const data = {
            numeroSiege: (item.voyages?.placeDisponible),
            prixTicket: item.voyages?.prixVoyage,
            voyageId: item.reservation.voyageId,
            typeTicket: typeTicket,
            statusTicket: "valide",
            dateCreation: `${year}-${month}-${day}T${hours}:${minutes}`,
            agenceId: item.voyages?.agenceId,
            passagerId: item.passager.id,
            employeId: 0
        }
        try {
            const res = await fetch(`/api/ticket`, {
                method: 'POST', cache: 'no-store', body: JSON.stringify(data)
            })
            if (res.ok) {
                editVoyage(item.voyages, a);
                // configPopup("Ticket payé", "green", "Reservation")
            }
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <section className="w-full h-full">
            <div className="col-span-3  h-full  ">
                <h2 className="p-4  text-gray-700 text-left">
                    Réservations
                </h2>
                <div className="p-4 text-left">
                    <div className="grid grid-cols-5 shadow-lg bg-stone-100 p-4 rounded-md text-gray-900 text-sm font-semibold justify-between">
                        <div>Dates</div>
                        <div>Passagers </div>
                        <div>Type de voyage</div>
                        <div>A confirmer avant le </div>
                        <div>Type de voyage</div>
                    </div>
                    <ul className="overflow-hidden overflow-y-auto p-4" style={{ maxHeight: 400 }}>
                        {reservation.map((item: any, i: number) => (
                            <li title={item.reservation.statutReservation} key={i} className={` ${(i % 2) == 0 ? ' bg-lime-100' : 'bg-white '} shadow-lg  border my-4 overflow-hidden rounded-xl  items-center  text-sm `}>
                                <div className="grid-cols-5 p-3 grid justify-between text-gray-800 items-center font-medium">
                                    <div >{getDateFormat(item.voyages?.dateDepart ?? "")}</div>
                                    <div className="w-full">
                                        <span className="first-letter:uppercase" >{item.passager?.nom ?? ""} {item.passager?.prenom ?? ""}</span> <br />
                                        <div className="flex gap-8 items-center" >{item.passager?.adresse ?? ""} <ul><li className="list-disc">{item.passager?.numCNI ?? ""}</li></ul></div>
                                    </div>

                                    <span className="font-bold" >{item.voyages?.prixVoyage ?? 0} Fcfa</span>
                                    <span className="text-red-500">{item.reservation.dateConfirmation}</span>
                                    <span >{item.voyages?.typeVoyage ?? ""}</span>

                                </div>
                                <div className={`flex border-t  p-2  gap-2  ${item.reservation.statutReservation === "annulé" ? "bg-red-400" : "bg-white"}`} >
                                    { }
                                    {
                                        item.reservation.statutReservation === "validé" ? (
                                            <div>
                                                <Link href={"/dashboard/caisse/ticket"} className="text-cyan-700 hover:text-white hover:bg-cyan-500 rounded-sm bg-cyan-100 text-xs  p-2">
                                                    Générer le ticket
                                                </Link>
                                            </div>
                                        ) : null
                                    }
                                    {
                                        item.reservation.statutReservation === "en attente" ? (
                                            <div>
                                                <button onClick={() => HandlerSubmit(item.reservation.Id, "validé", item)} type="button" className="text-green-700 hover:text-white hover:bg-green-500 rounded-sm bg-green-100 text-xs  p-2">
                                                    Confirmer
                                                </button>
                                                <button onClick={() => HandlerSubmit(item.reservation.Id, "annulé", item)} type="button" className="text-red-700 hover:text-white hover:bg-red-500 rounded-sm bg-red-100 text-xs p-2">
                                                    Annuler
                                                </button>
                                            </div>
                                        ) : null
                                    }
                                </div>
                            </li>
                        ))
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}

