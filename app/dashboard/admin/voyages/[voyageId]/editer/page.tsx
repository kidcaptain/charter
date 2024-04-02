"use client"
import { getDateFormat } from "@/functions/actionsClient";
import Image from "next/image";
import Link from "next/link";
import loaderSvg from "@/public/images/loader.svg";
import { FormEvent, useState, useEffect } from "react"
import Planning from "@/components/ui/planning";
import PlanningWeekBus from "@/components/ui/planningWeekBus";
import PlanningChauffeur from "@/components/ui/planningChauffeur";
interface IPrams {
    voyageId?: string
}
export default function Page({ params }: { params: IPrams }) {
    const [employe, setemploye] = useState<any[]>([])
    const [bol, setBol] = useState<boolean>(false)
    const [data, setData] = useState<any>(
        {
            dateDepart: "",
            dateArrivee: "",
            busId: 0,
            trajetId: 0,
            typeVoyage: "",
            prixVoyage: 0,
            placeDisponible: 0
        }
    )
    const [bus, setBus] = useState<any[]>([])
    const [busData, setBusData] = useState<any>()
    const [trajetData, setTrajetData] = useState<any>()
    const [trajet, setTrajet] = useState<any[]>([])

    const handleInputChange = (event: any) => {
        const target = event.target;
        if (target.name == "busId") {
            const str = target.value;
            const array = str.split(',').map(Number);
            setData((oldValue: any) => {
                return { ...oldValue, busId: array[0], capacite: array[1] }
            })
        } else if (target.name == "trajetId") {
            let trajet = JSON.parse(target.value);
            setData((oldValue: any) => {
                return { ...oldValue, trajetId: trajet.id, prix: trajet.prix }
            })
        } else {
            const datas = target.type === 'checkbox' ? target.checked : target.value
            setData((oldValue: any) => {
                return { ...oldValue, [target.name]: datas }
            })
        }

    }

    const HandlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let trajet = JSON.parse(data.trajetId);
        let bols: boolean = false;
        let bol3: boolean = false;
        let bol2: boolean = true;
        if (confirm("Les modifications risques impactées d'autres les éléments! \nVoulez-vous confirmer les modifications?")) {
            const res = await fetch("/api/voyages", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const datas: any[] = await res.json();
            if (datas.length > 0) {
                datas.forEach((i) => {
                    if (bol2) {
                        const dates1 = new Date(i.dateDepart);
                        const dates2 = new Date(data.dateDepart);

                        if (dates1.getDate() == dates2.getDate() && (dates1.getMonth() + 1) == (dates2.getMonth() + 1) && dates1.getFullYear() == dates2.getFullYear()) {
                            if (i.heureArrivee != data?.heureDepart && parseInt(i.busId) == parseInt(data.busId)) {
                                bols = false;
                                let dateA = `${i.heureArrivee}`;
                                let dateD = `${data?.heureDepart}`;
                                if (parseInt(`${dateA[0]}${dateA[1]}`) <= parseInt(`${dateD[0]}${dateD[1]}`)) {
                                    bols = true;
                                } else {
                                    bols = false;
                                }
                            } else {
                                bols = true;
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
                            bols = true;
                        }
                    }
                })
            } else {
                bols = true
            }
        } else {
            bols = true;
        }
        if (bols) {
            let t = data.trajetId;
            let p = data.prixVoyage;
            if (data.placeDisponible == busData?.capacite) {
                if (trajet != data.trajetId) {
                    t = trajet.id;
                    p = parseInt(trajet.prix);
                }
            }
            let dateL: string = data.dateDepart;
            if (dateL.length > 23) {
                dateL = getDateFormat(data.dateDepart)
            }
            const voyage = {
                agenceId: data.agenceId,
                dateDepart: dateL,
                heureArrivee: data.heureArrivee,
                busId: data?.busId,
                trajetId: t ?? data.trajetId,
                prixVoyage: p ?? data.prixVoyage,
                placeDisponible: data?.capacite ?? data.placeDisponible,
                ready: data.ready,
                chauffeurId: data.chauffeurId,
                heureDepart: data.heureDepart,
                numVoyage: data.numVoyage,
                placesOccupees: data.placesOccupees,
            }
            console.log(voyage)
            try {
                const response = await fetch(`/api/voyages/${params.voyageId}`, {
                    method: 'PUT',
                    cache: "no-store",
                    body: JSON.stringify(voyage),
                })
                if (response.ok) {
                    alert("Voyage programmé")
                }
            } catch (err) {
                console.log(err)
                alert("Une erreur s'est produite!")
            }
        } else {
            if (!bols) {
                alert("Bus indisponible veuillez selectionner une plage horaire valide!")
            } else if (!bol3) {
                alert("Chauffeur indisponible!")
            }
        }
    }




    useEffect(() => {
        const getBusById = async (id: number) => {
            const res = await fetch("/api/bus/" + id, { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setBusData(data)
            return data
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
        const getTrajetById = async (id: number) => {
            const res = await fetch("/api/trajets/" + id, { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setTrajetData(data)
            return data
        };
        const getTrajet = async () => {
            const res = await fetch("/api/trajets", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setTrajet(data)
        };
        const getData = async () => {
            const res = await fetch(`/api/voyages/${params.voyageId}`, { method: "GET", cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const val = await res.json();
            const _daB = await getBusById(val.busId);
            const _daT = await getTrajetById(val.trajetId);
            setData({ ...val, capacite: _daB.capacite, prix: _daT.prix });

            setBol(true)
            // setValue({ ...val });
        };
        getData()
        const getBus = async () => {
            const res = await fetch("/api/bus", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setBus(data)
        };
        getEmploye();
        getBus();
        getTrajet();
    }, [])

    return (
        <div className=" w-full p-10">
            <div className=" py-4 flex lowercase text-sm justify-between items-start mb-2">
                <h1 className=" text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/admin/voyages"}>Voyages</Link> / <Link className="hover:text-blue-600 font-semibold" href="#">éditer</Link></h1>
            </div>
            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="text-xl text-gray-900">Programmer un voyage </h1>
            </div>
            <div className="grid gap-4 grid-cols-3 m-auto">
                <div className=" col-span-1">
                    <form onSubmit={HandlerSubmit} className="col-span-1 bg-white rounded-md overflow-hidden shadow-2xl  ">
                        <h2 className=" text-gray-100 font-bold p-4 bg-blue-500  uppercase">
                            Modifier un voyage
                        </h2>
                        <div className=" m-auto p-4">
                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 ">Numéro Voyage</label>
                                <input onChange={handleInputChange} value={data.numVoyage} disabled type="text" id="numVoyage" placeholder="" name="numVoyage" className="block cursor-not-allowed text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-300  focus-visible:ring-blue-400 " />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 ">Bus</label>
                                <select id="busId" name="busId" value={[data?.busId, data?.capacite].toString()} onChange={handleInputChange} className="block w-full p-2 uppercase text-gray-900 border text-sm border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50  focus-visible:ring-blue-400 ">
                                    <option></option>
                                    {bus.map((item: any, i: number) => (
                                        <option key={i} value={[item.id, item.capacite]}>Bus-{item.id} {item.typeBus} ({item.marque} {item.modele})</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 ">Chauffeur</label>
                                <select id="chauffeurId" name="chauffeurId" value={data.chauffeurId} onChange={handleInputChange} className="block w-full text-sm p-2 uppercase text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50  focus-visible:ring-blue-400 ">
                                    <option></option>
                                    {employe.map((item: any, i: number) => (
                                        <option key={i} value={item.id}>{item.nom} {item.prenom}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 ">Date de départ</label>
                                <input onChange={handleInputChange} value={getDateFormat(data.dateDepart)} type="date" id="dateDepart" placeholder="Départ" name="dateDepart" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50  focus-visible:ring-blue-400 " />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 ">Heure de départ</label>
                                <input onChange={handleInputChange} type="time" value={data.heureDepart} id="heureDepart" placeholder="Arrivée" name="heureDepart" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50  focus-visible:ring-blue-400 " />
                            </div>

                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 ">Heure d&apos;arrivée</label>
                                <input onChange={handleInputChange} type="time" value={data.heureArrivee} id="heureArrivee" placeholder="Arrivée" name="heureArrivee" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50  focus-visible:ring-blue-400 " />
                            </div>

                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 ">Trajet</label>
                                <select id="trajetId" value={JSON.stringify({ id: data?.trajetId, prix: data?.prix })} name="trajetId" onChange={handleInputChange} className="block w-full p-2 uppercase text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50  focus-visible:ring-blue-400 ">
                                    <option></option>
                                    {trajet.map((item: any, i: number) => (
                                        <option key={i} value={JSON.stringify({ id: item.id, prix: item.prix })}>N°0{item.id} ({item.lieuDepart} - {item.lieuArrivee}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <button type="submit" className="text-white text-sm flex px-4 hover:bg-blue-700 rounded-sm bg-blue-500  p-2">
                                    Modifier
                                </button>
                                <button type="reset" id="resetbtn" className="text-white text-sm flex px-4  hover:bg-stone-700 rounded-sm bg-stone-500  p-2">
                                    Effacer
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-span-2">
                    {
                        data?.busId ?
                            (<div className=" border border-stone-500 shadow-2xl rounded-md">
                                <h2 className=" p-4 border-b font-bold uppercase text-sm">Disponibilité du bus-{busData?.id} {busData?.typeBus} ({busData?.marque} {busData?.modele})</h2>
                                <PlanningWeekBus id={data?.busId} />
                            </div>) : null
                    }
                    {
                        data?.chauffeurId ?
                            (<div className=" mt-4 shadow-2xl rounded-md border border-stone-500 overflow-hidden">
                                <h2 className="p-4 border-b font-bold uppercase text-sm">Disponibilité du chauffeur</h2>
                                <PlanningChauffeur id={data?.chauffeurId} />
                            </div>) : null
                    }
                </div>
            </div>
        </div>
    )
}