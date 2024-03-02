"use client";

import { useEffect, useState } from 'react';

import CardDoughnut from "@/components/cardDoughnut";

const GridDoughnut = () => {

    const [reservationAnnule, setReservationAnnule] = useState<number>(0);
    const [reservationConfirme, setReservationConfirme] = useState<number>(0);
    const [depense, setDepenses] = useState<number>(0);
    const [recette, setRecette] = useState<number>(0);
    const [ticketSimple, setTicketSimple] = useState<number>(0);
    const [ticketVip, setTicketVip] = useState<number>(0);
    const [voyageRetour, setvoyageRetour] = useState<number>(0);
    const [voyageSimple, setvoyageSimple] = useState<number>(0);
    const [isLoad, setIsLoad] = useState<boolean>(false);

    useEffect(() => {

        const getReservation = async () => {
            const res = await fetch("/api/reservations", { cache: "no-store" })
            if (!res.ok) {
                setIsLoad(false)
                return []
            }
            const data: any[] = await res.json();
            data.forEach((r) => {
                if (r.statutReservation == "annulée") {
                    setReservationAnnule(reservationAnnule + 1)
                } else {
                    setReservationConfirme(reservationConfirme + 1)
                }
            })
            setIsLoad(true)
        };
        getReservation()
        const getRecette = async () => {
            const res = await fetch("/api/recette", { cache: "no-store" })
            if (!res.ok) {
                setIsLoad(false)
                return []
            }
            const data: any[] = await res.json();
            data.forEach((r) => {
                setRecette(r.montant + recette)
            })
            setIsLoad(true)
        };
        getRecette()
        const getDepenses = async () => {
            const res = await fetch("/api/depenses", { cache: "no-store" })
            if (!res.ok) {
                setIsLoad(false)
                return []
            }
            const data: any[] = await res.json();
            var montant: number = 0;
            data.forEach((r) => {
                montant += parseInt(r.montant)
            })

            setDepenses(montant)
            setIsLoad(true)

        };
        getDepenses()
        const getTicket = async () => {
            const res = await fetch("/api/ticket", { cache: "no-store" })
            if (!res.ok) {
                setIsLoad(false)
                return []
            }
            const data: any[] = await res.json();
            data.forEach((r) => {
                if (r.typeVoyage == "simple") {
                    setTicketSimple(ticketSimple + 1)
                } else {
                    setTicketVip(ticketVip + 1)
                }
            })
            setIsLoad(true)
        };
        getTicket()
        const getVoyages = async () => {
            const res = await fetch("/api/voyages", { cache: "no-store" })
            if (!res.ok) {
                setIsLoad(false)
                return []
            }
            const data: any[] = await res.json();
            data.forEach((r) => {
                if (r.typeVoyage == "aller-retour") {
                    setvoyageRetour(voyageRetour + 1)
                } else {
                    setvoyageSimple(voyageSimple + 1)
                }
            })
            setIsLoad(true)
        };
        getVoyages()

    }, [])


            return (
                <div className="grid-cols-4 gap-4 grid ">
                    <CardDoughnut id="ticket" val={ticketSimple} val2={ticketVip} color="blue" back1="#0e7490" back2="#15803d" label1="Simple" label2="VIP" title="Ventes de tickets" />
                    <CardDoughnut id="bus" val={depense} val2={recette} color="blue" back1="#ff6384" back2="#36a2eb" label1="Dépenses" label2="recettes" title="Dépenses et recettes" />
                    <CardDoughnut id="passager" val={reservationAnnule} val2={reservationConfirme} color="blue" back1="#da3200" back2="#5fd85c" label1="Réservation annulée" label2="Réservation confirmée" title="Réservations" />
                    <CardDoughnut id="s" val={voyageSimple} val2={voyageRetour} color="blue" back1="#545ef0" back2="" label1="Voyages aller simple" label2="voyages aller-retour" title="Voyages effecutés" />
                </div>
            )


}

export default GridDoughnut