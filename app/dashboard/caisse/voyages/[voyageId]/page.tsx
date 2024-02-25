"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import svg from "@/public/images/loader.svg"
import Image from "next/image"
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


  useEffect(() => {
    const getTrajet = async (id: number) => {
      const res = await fetch("/api/trajets/" + id, { cache: "no-store" })
      if (!res.ok) {
        throw new Error("Failed")
      }
      const data = await res.json();
      setTrajet(data)
    };
    const agence = localStorage.getItem("agence")


    const getAgence = async (id: number) => {
      if (agence) {
        const t = JSON.parse(agence)
        const res = await fetch("/api/agences/" + t.agenceId, { cache: "no-store" })
        if (!res.ok) {
          throw new Error("Failed")
        }
        const data = await res.json();
        setAgence(data)
      }

    };
    const getEmploye = async (id: number) => {
      const res = await fetch("/api/employes/" + id, { cache: "no-store" })
      if (!res.ok) {
        throw new Error("Failed")
      }
      const data = await res.json();
      setChauffeur(data)
    };
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
      if (tickets.length > 0) {
        getAgence(tickets[0].agenceId);
      }
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
        <h1 className=" text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/caisse/voyages"}>Voyages</Link> / <Link className="hover:text-blue-600" href="#">BORDEREAU DE ROUTE</Link></h1>
      </div>
         <div className="max-w-7xl m-auto">
            <BordereauRoute item={{ bus: bus, trajet: trajet, voyage: voyage, passagers: passagers, chauffeur: chauffeur, agence: agence }} />
          </div>
    </div>
  )
}