"use client"
import ModalFiche from "@/components/modalFiche"
import InputForm from "@/components/ui/inputForm"
import Modal from "@/components/ui/modal"
import { useState, useEffect } from "react"
import Link from "next/link"
import NavLink from "@/components/ui/navLink"
import BordereauRoute from "@/components/ui/bordereauRoute"

interface IPrams {
  voyageId?: string
}

export default function Voyage({ params }: { params: IPrams }) {

  const [voyage, setVoyage] = useState<any>()

  const [bus, setBus] = useState<any[]>([])
  const [agence, setAgence] = useState<any[]>([])
  const [chauffeur, setChauffeur] = useState<any[]>([])
  const [passagers, setPassagers] = useState<any[]>([])
  const [trajet, setTrajet] = useState<any[]>([])
  const [chef, setChef] = useState<any>()
  const [depense, setdepense] = useState<any>()


  useEffect(() => {
    const getTrajet = async (id: number) => {
      const res = await fetch("/api/trajets/" + id, { cache: "no-store" })
      if (!res.ok) {
        throw new Error("Failed")
      }
      const data = await res.json();
      setTrajet(data)
    };
    const getAgence = async (id: number) => {

      const res = await fetch("/api/agences/" + id, { cache: "no-store" })
      if (!res.ok) {
        throw new Error("Failed")
      }
      const data = await res.json();
      setAgence(data)
    };
    const getEmploye = async (id: number) => {
      const res = await fetch("/api/employes/" + id, { cache: "no-store" })
      if (!res.ok) {
        throw new Error("Failed")
      }
      const data = await res.json();
      setChauffeur(data)
    };
    const getDepense = async () => {
      const res = await fetch("/api/depenses?typeDepense=carburant&typeDepense1=ration&typeDepense2=bus&typeDepense3=peage&typeDepense4=voyage&idTypeDepense=" + params.voyageId, { cache: "no-store" })
      if (!res.ok) {
        throw new Error("Failed")
      }
      const data: any[] = await res.json();
      let car: number = 0;
      let bus: number = 0;
      let voyage: number = 0;
      let ration: number = 0;
      let peage: number = 0;
      data.map((i) => {

        switch (i.typeDepense) {
          case "carburant":
            car += i.montant
            break;
          case "ration":
            bus += i.montant
            break;
          case "bus":
            voyage += i.montant
            break;
          case "peage":
            ration += i.montant
            break;
          case "voyage":
            peage += i.montant
            break;
          default:
            break;
        }
      })
      setdepense({
        carburant: car,
        peage: peage,
        ration: ration,
        autre: voyage + bus
      })

    };
    getDepense()
    const getBus = async (id: number) => {
      const res = await fetch(`/api/bus/${id}`, { cache: "no-store" })
      if (!res.ok) {
        throw new Error("Failed")
      }
      const data = await res.json();
      getEmploye(data.employeId)
      setBus(data)
    };

    const getPassager = async (id: number) => {
      const res = await fetch(`/api/passagers/${id}`, { cache: "no-store" })
      if (!res.ok) {
        throw new Error("Failed")
      }
      const data = await res.json();
      return data
    };
    const getTickets = async (id: number) => {
      const res = await fetch(`/api/ticket?voyageId=${id}`, { cache: "no-store" })
      if (!res.ok) {
        throw new Error("Failed")
      }
      const data = await res.json();

      return data
    };
    const getData = async () => {
      const res = await fetch(`/api/voyages/${params.voyageId}`, { method: "GET", cache: "no-store" })
      if (!res.ok) {
        throw new Error("Failed")
      }
      const val = await res.json();

      getTrajet(val.trajetId);
      getBus(val.busId);
      setVoyage(val);
      const tab: any[] = []
      const tickets: any[] = await getTickets(val.id);
      getAgence(val.agenceId);

      tickets.map(async (i: any) => {
        const p = await getPassager(i.passagerId)
        tab.push({ passager: p, ticket: i })

      })
      setPassagers(tab)

    };


    getData()
  }, [])

  return (
    <div className="p-10">
      <div className=" py-4 flex lowercase text-sm justify-between items-start mb-2">
        <h1 className=" text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/admin/voyages"}>Voyages</Link> / <Link className="hover:text-blue-600" href="#">BORDEREAU DE ROUTE</Link></h1>
      </div>
      <div className="shadow-2xl border rounded-md ">
        <h2 className="p-4 bg-white uppercase border-b font-bold">Bordereau de route </h2>

      </div>
      <BordereauRoute item={{ depense: { carburant: parseInt(depense?.carburant), peage: parseInt(depense?.peage), ration: parseInt(depense?.ration), autre: parseInt(depense?.autre)}, bus: bus, trajet: trajet, voyage: voyage, passagers: passagers, chauffeur: chauffeur, agence: agence }} />
    </div>
  )
}