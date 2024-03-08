"use client"
import ModalFiche from "@/components/modalFiche"
import InputForm from "@/components/ui/inputForm"
import Modal from "@/components/ui/modal"
import { useState, useEffect, FormEvent } from "react"
import Link from "next/link"
import NavLink from "@/components/ui/navLink"
import BordereauRoute from "@/components/ui/bordereauRoute"
import { getDateFormat } from "@/functions/actionsClient"

interface IPrams {
  voyageId?: string
}

export default function Voyage({ params }: { params: IPrams }) {

  const [voyage, setVoyage] = useState<any>()

  const [bus, setBus] = useState<any[]>([])
  const [agence, setAgence] = useState<any[]>([])
  const [chauffeur, setChauffeur] = useState<string>("")
  const [passagers, setPassagers] = useState<any[]>([])
  const [trajet, setTrajet] = useState<any[]>([])
  const [employe, setemploye] = useState<any[]>([])
  const [id, setid] = useState<string>("")
  const [depense, setdepense] = useState<any>()

  const HandlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/voyages/" + params.voyageId, { cache: "no-store" })
    if (!res.ok) {
      throw new Error("Failed")
    }
    const data = await res.json();
    const voyage = {
      dateDepart: getDateFormat(data.dateDepart),
      dateArrivee: getDateFormat(data.dateArrivee),
      busId: data.busId,
      trajetId: data.trajetId,
      typeVoyage: data.typeVoyage,
      prixVoyage: data.prixVoyage,
      placeDisponible: data.placeDisponible,
      employeId: id
    }
    try {
      const response = await fetch(`/api/voyages?id=${params.voyageId}`, {
        method: 'PUT',
        cache: "no-store",
        body: JSON.stringify(voyage),
      })
      if (response.ok) {
        alert("Chauffeur attribué")
      }
    } catch (err) {
      console.log(err)
      alert("Une erreur s'est produite!")
    }
  };


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
      setBus(data)
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
    getEmploye()
    const getPassager = async () => {
      const res = await fetch(`/api/passagers`, { cache: "no-store" })
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
      const a: any[] = await getPassager();
      tickets.map((i: any) => {
        a.map((k) => {
          if (k.id == i.passagerId) {
            tab.push({ passager: k, ticket: i })
          }
        })
      })
      if (val.employeId != 0) {
        const ress = await fetch(`/api/employes/${val.employeId}`, { cache: "no-store" })
        const datas = await ress.json();
        setChauffeur(datas.nom + " " + datas.prenom)
      }
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
        <form className="p-4" onSubmit={HandlerSubmit}>
          <div className="mt-2">
            <label className="  text-sm uppercase">Attribuer un chauffeur</label>
            <select id="idTypeDepense" name="idTypeDepense" onChange={(e) => { setChauffeur(JSON.parse(e.target.value)?.nom); setid(JSON.parse(e.target.value)?.id) }} className="block w-96 text-sm p-2 uppercase text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
              <option></option>
              {employe.map((item: any, i: number) => (
                <option key={i} value={JSON.stringify({ id: item.id, nom: `${item.nom} ${item.prenom}` })}>{item.nom} {item.prenom}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="p-2 bg-green-400 text-sm  w-96"> Enregistrer</button>
        </form>
      </div>

      <BordereauRoute item={{ depense: { carburant: parseInt(depense?.carburant), peage: parseInt(depense?.peage), ration: parseInt(depense?.ration), autre: parseInt(depense?.autre) }, bus: bus, trajet: trajet, voyage: voyage, passagers: passagers, chauffeur: chauffeur, agence: agence }} />

    </div>
  )
}