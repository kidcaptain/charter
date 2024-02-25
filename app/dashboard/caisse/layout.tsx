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
import menu from "@/public/images/menu.svg";
import svg from "@/public/images/loader.svg";
import Image from "next/image";


export default function TicketSaleLayout({
  children,
}: {
  children: React.ReactNode
}) {


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
  const [method, setMethod] = useState<any>()
  const [employe, setEmploye] = useState<any>()
  const [passager, setPassager] = useState<any>(null)
  const [agence, setAgence] = useState<any>(null);
  const [numTicket, setNumTicket] = useState<number>(0);


  if (status === "unauthenticated") {
    router.push("/signin");
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
  const postReservation = async (id: number, voyageId: number,) => {
    const date = new Date()
    const year = date.getFullYear();
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    const data = {
      passagerId: id,
      voyageId: voyageId,
      agenceId: 1,
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
      agenceId: employe?.agenceId
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
      employeId: employe?.id
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
            agenceId: agence?.id
          }
          const res = await fetch('/api/passagers', {
            method: 'POST',
            body: JSON.stringify(e),
          })
          const d = await res.json()
          if (res.ok) {
            setPassager({ passager: d, prix: item.voyages?.prixVoyage })
            if (method == "reserver") {
              postReservation(d.id, item.voyages?.id);
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
      const res = await fetch("/api/tickets", { cache: "no-store" })
      if (!res.ok) {
        return null
      }
      const data: any[] = await res.json();
      setNumTicket(data.length)
    }
    getLenghtTicket()
    getData();
    const getEmploye = async () => {
      const res = await fetch("/api/utilisateurs/" + session?.user?.email, { cache: "no-store" })
      if (!res.ok) {
        return null
      }
      const data = await res.json();
      setEmploye(data)
      // console.log(data)
      const res2 = await fetch("/api/employes/" + data.employeId, { method: "GET", cache: "no-store" })
      if (!res2.ok) {
        return null
      }
      const data2 = await res2.json();
      const res3 = await fetch("/api/agences/" + data2.agenceId, { method: "GET", cache: "no-store" })
      if (!res3.ok) {
        return null
      }
      const data3 = await res3.json();
      localStorage.setItem("agence", JSON.stringify({ employeId: data2.id, userId: data.id, agenceId: data3.id }))
      setAgence(data3)
    };

    if (status === "authenticated") {
      getEmploye();
    }

  }, [session])


  return (
    <main className="flex">

      <section className=" w-full  h-full bg-white overflow-hidden" >
        <div className="grid grid-cols-6">
          <div className="bg-black col-span-2 relative min-h-screen overflow-hidden overflow-y-auto ">
            <div style={{ backgroundImage: "url('/images/travel.png')", }} className="w-full h-full bg-contain bg-opacity-25 bg-fixed  absolute z-0 top-0 left-0 opacity-40  m-auto max-w-4xl bg-gradient-to-t">

            </div>
            <div className="w-full h-full overflow-hidden p-10 relative col-span-5">
              <div className="w-full  ">
                <h2 className="text-3xl font-bold uppercase text-blue-500  text-left">Charter express</h2>
                <h2 className="text-3xl font-bold uppercase text-white text-left">Agence de {agence?.nom}</h2>
              </div>
              <div className=" py-2">
                <h1 className="text-lg text-left font-medium text-gray-100">Bienvenue, {session?.user?.name}!</h1>
              </div>
              {agence ? (
                <section className="relative ">

                  <div style={{ width: '100%', minHeight: 700, backdropFilter: "blur(1px)" }} className="bg-black/40 shadow-black  border-2 border-white/90 relative rounded-md overflow-hidden shadow-2xl m-auto z-10 max-w-4xl  ">
                    <h4 className="p-4 border-b  text-white  uppercase text-sm">
                      Réservation et achat de ticket
                    </h4>
                    <form onSubmit={HandlerSubmit} className="">
                      <div className="gap-2  grid grid-cols-2 p-4 ">
                        <div className="p-4 ">
                          <div className="mt-2">
                            <label className={`block mb-1 text-sm  font-bold text-gray-100 ${(validator && (value.nom == undefined)) ? "ring-2 ring-red-500" : ""}`}>Nom</label>
                            <input type="text" required autoComplete="off" onChange={handleInputChange} placeholder="Nom" name="nom" id="nom" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 " />
                          </div>
                          <div className="mt-2">
                            <label className="block mb-1 text-sm font-bold text-gray-100">Prénom</label>
                            <input type="text" required autoComplete="off" id="prenom" name="prenom" placeholder="Prénom" onChange={handleInputChange} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 " />
                          </div>
                          <div className="mt-2">
                            <label className="block mb-1 text-sm font-bold text-gray-100">Adresse</label>
                            <input type="text" required autoComplete="off" id="adresse" name="adresse" placeholder="Adresse" onChange={handleInputChange} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 " />
                          </div>
                          <div className="mt-2">
                            <label className="block mb-1 text-sm font-bold text-gray-100">Date de naissance</label>
                            <input type="date" required id="datenaissance" name="dateNaissance" placeholder="Date de Naissance" onChange={handleInputChange} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 " />
                          </div>
                          <div className="mt-2">
                            <label className="block mb-1 text-sm font-bold text-gray-100">Genre</label>
                            <div className="flex gap-4">
                              <input type="radio" required onChange={handleInputChange} id="genrem" name="genre" value="m" className="block p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 " />
                              <label htmlFor="genrem" className="text-sm font-bold text-gray-100">Homme</label>
                              <input type="radio" required onChange={handleInputChange} id="genref" value="f" name="genre" className="block p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 " />
                              <label htmlFor="genref" className="text-sm font-bold text-gray-100">Femme</label>
                            </div>
                          </div>
                          <div className="mt-2">
                            <label className="block mb-1 text-sm font-bold text-gray-100">Numèro de téléphone:</label>
                            <input type="tel" id="tel" autoComplete="off" name="tel" onChange={handleInputChange} aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2 focus:ring-2  focus:outline-none focus-visible:ring-blue-400" placeholder="620456789" required />
                          </div>
                          <div className="mt-2">
                            <label className="block mb-1 text-sm font-bold text-gray-100">Numèro de CNI:</label>
                            <input type="text" id="numCNI" autoComplete="off" name="numCNI" onChange={handleInputChange} aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2 focus:ring-2  focus:outline-none focus-visible:ring-blue-400" required />
                          </div>

                        </div>
                        <div className="p-4">
                          <div className="mt-2">
                            <label className="block mb-1 text-sm font-bold text-gray-100">Type de voyages:</label>
                            <select id="countries" ref={typeVoyage} required className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 ">
                              <option></option>
                              <option value="aller-retour">Aller-Retour</option>
                              <option value="aller simple">Aller Simple</option>
                            </select>
                          </div>
                          <div className="mt-2">
                            <label className="block mb-1 text-sm font-bold text-gray-100">Type de bus:</label>
                            <select id="countries" ref={typeClass} required className="block  w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 ">
                              <option></option>
                              <option value="simple">Standard</option>
                              <option value="vip">vip</option>
                            </select>
                          </div>

                          <div className="mt-2">
                            <label className="block mb-1 text-sm font-bold text-gray-100">Paiement</label>
                            <div className="flex gap-1">
                              <input type="radio" required onChange={e => getMethod(e.target.value)} id="reserver" name="method" value="reserver" className="block p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 " />
                              <label htmlFor="reserver" className="text-sm font-bold text-gray-100">Réserver</label>
                              <input type="radio" required onChange={e => getMethod(e.target.value)} id="payer" value="payer" name="method" className="block ml-4 p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 focus-visible:ring-blue-400 " />
                              <label htmlFor="payer" className="text-sm font-bold text-gray-100">Payer</label>
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
                            numticket: (numTicket + 1).toString(),
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

              ) : (<div>
                <Image src={svg} width={15} height={15} alt="Loader" className="animate-spin" /> <p className="text-white">Chargement du formulaire...</p>
              </div>)}

              <ModalTrajet isOpen={isOpenModal} setData={HandlerItem} typeBus={typeClass.current?.value} typeVoyage={typeVoyage.current?.value} slug="M" childToParent={HandlerChange} />
              {isOpenPopup ? (<Popup color={popupData?.color} title={popupData.title} message={popupData?.message} onShow={showModal} />) : null}

            </div>
          </div>
          <div className="col-span-4">
            <header className=" w-full top-0 shadow-md left-0 py-4 z-10  bg-white">
              <div className=" mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-14">
                  <nav className=" md:flex md:grow flex grow justify-end flex-wrap items-center">
                    <div className="bg-blue-100 p-4 rounded-full" >
                      <Image src={menu} width={15} height={15} alt="" />
                    </div>
                    <ul className="flex grow justify-end gap-4 flex-wrap items-center">
                      {/* <li>
                        <Link href="/dashboard/caisse/home" className={`${classname} ${pathname === `/dashboard/caisse/home` ? "text-blue-500 hover:text-blue-600 font-medium" : "text-stone-600 hover:text-stone-900 "}`}>
                          Accueil
                        </Link>
                      </li> */}
                      <li>
                        <Link href="/dashboard/caisse/passagers" className={`${classname} ${pathname === `/dashboard/caisse/passagers` ? "text-blue-500 hover:text-blue-600 font-medium" : "text-stone-600 hover:text-stone-900 "}`}>
                          Passagers
                        </Link>
                      </li>
                      <li>
                        <Link href="/dashboard/caisse/reservations" className={`${classname} ${pathname === `/dashboard/caisse/reservations` ? "text-blue-500 hover:text-blue-600 font-medium" : "text-stone-600 hover:text-stone-900 "}`}>
                          Réservation
                        </Link>
                      </li>
                      <li>
                        <Link href="/dashboard/caisse/ticket" className={`${classname} ${pathname === `/dashboard/caisse/ticket` ? "text-blue-500 hover:text-blue-600 font-medium" : "text-stone-600 hover:text-stone-900 "}`}>
                          Tickets
                        </Link>
                      </li>
                      <li>
                        <Link href="/dashboard/caisse/fiche" className={`${classname} ${pathname === `/dashboard/caisse/trajets` ? "text-blue-500 hover:text-blue-600 font-medium" : "text-stone-600 hover:text-stone-900 "}`}>
                          Fiche de recettes
                        </Link>
                      </li>
                      <li>
                        <Link href="/dashboard/caisse/recettes" className={`${classname} ${pathname === `/dashboard/caisse/trajets` ? "text-blue-500 hover:text-blue-600 font-medium" : "text-stone-600 hover:text-stone-900 "}`}>
                          Recettes
                        </Link>
                      </li>
                      <li>
                        <Link href="/dashboard/caisse/voyages" className={`${classname} ${pathname === `/dashboard/caisse/voyages` ? "text-blue-500 hover:text-blue-600 font-medium" : "text-stone-600 hover:text-stone-900 "}`}>
                          Voyages
                        </Link>
                      </li>
                      <UserAccountNav />
                    </ul>
                  </nav>
                </div>
              </div>
            </header>
            <div className=" w-full h-full relative min-h-screen bg-stone-50  justify-center">
              {children}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}