"use client"
import { getDateFormat } from "@/functions/actionsClient";
import Image from "next/image";
import Link from "next/link";
import loaderSvg from "@/public/images/loader.svg";
import { FormEvent, useState, useEffect } from "react"
import Planning from "@/components/ui/planning";
interface IPrams {
    voyageId?: string
}
export default function Page({ params }: { params: IPrams }) {
    const year: number = new Date().getFullYear();
    const [employe, setemploye] = useState<any[]>([])
    const [cap, setCap] = useState<number>(0)
    const [tra, setTra] = useState<string>("")
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
    const [comVoy, setComVoy] = useState<number>(0)
    const [busId, setBusId] = useState<string | undefined>("")
    const [bus, setBus] = useState<any[]>([])
    const [busData, setBusData] = useState<any>()
    const [trajet, setTrajet] = useState<any[]>([])

    const handleInputChange = (event: any) => {
        const target = event.target;
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

    const HandlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const str = data.busId;
        const array = str.split(',').map(Number);
        let trajet = JSON.parse(data.trajetId);
        let bols: boolean = false;
        if (data.placeDisponible == busData?.capacite) {
            const res = await fetch("/api/voyages", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }

            let bol2: boolean = true;
            const datas: any[] = await res.json();
            if (datas.length > 0) {
                datas.forEach((i) => {
                    if (bol2) {

                        if (i.dateArrivee != data?.dateDepart && parseInt(i.busId) == parseInt(array[0])) {
                            let dateA = `${i.dateArrivee}`;
                            let dateD = `${data?.dateDepart}`;
                            if (parseInt(`${dateA[0]}${dateA[1]}${dateA[2]}${dateA[3]}`) <= parseInt(`${dateD[0]}${dateD[1]}${dateD[2]}${dateD[3]}`)) {

                                if (parseInt(`${dateA[5]}${dateA[6]}`) <= parseInt(`${dateD[5]}${dateD[6]}`)) {

                                    if (parseInt(`${dateA[8]}${dateA[9]}`) <= parseInt(`${dateD[8]}${dateD[9]}`)) {


                                        bols = true;
                                    } else {
                                        bols = false;
                                        bol2 = false;
                                    }
                                } else {
                                    bols = false;
                                }
                            } else {
                                bols = false;
                            }
                        }
                    }
                })
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
            let dateV: string = data.dateArrivee;
            if (dateV.length > 23) {
                dateV = getDateFormat(data.dateArrivee)
            }
            const voyage = {
                agenceId: data.agenceId,
                dateDepart: dateL,
                dateArrivee: dateV,
                busId: `${array[0]}`,
                trajetId: t ?? data.trajetId,
                typeVoyage: data.typeVoyage,
                prixVoyage: p ?? data.prixVoyage,
                placeDisponible: array[1] ?? data.placeDisponible,
                ready: data.ready,
                chauffeurId: data.chauffeurId,
                heureDepart: data.heureDepart,
                numVoyage: data.numVoyage,
            }
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
            alert("Bus indisponible veuillez selectionner une plage horaire valide!")
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
        const getVoyage = async () => {
            const res = await fetch("/api/voyages", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data: any[] = await res.json();
            setComVoy(data.length)
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
            setData({ ...val });
            getBusById(val.busId);
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
                <h1 className=" text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/admin/voyages"}>Voyages</Link> / <Link className="hover:text-blue-600" href="#">Editer</Link></h1>
            </div>
            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="text-xl text-gray-900">Programmer un voyage </h1>
            </div>
            {!busData ? <Image src={loaderSvg} width={20} height={20} alt="" className=" animate-spin " /> : null}
            <div className="grid gap-4 grid-cols-3 m-auto">

                <div className=" col-span-1">

                    {data.placeDisponible == busData?.capacite ? (
                        <form onSubmit={HandlerSubmit} className="col-span-1 bg-white shadow-xl rounded-sm  ">
                            <h2 className=" text-gray-100 p-4 bg-cyan-500  uppercase">
                                Modification
                            </h2>
                            <div className=" m-auto p-4">
                                <div className="mt-4">
                                    <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Numéro Voyage</label>
                                    <input onChange={handleInputChange} value={data.numVoyage} type="text" id="numVoyage" placeholder="" name="numVoyage" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                </div>
                                <div className="mt-4">
                                    <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Date de Départ</label>
                                    <input onChange={handleInputChange} value={getDateFormat(data.dateDepart)} type="date" id="dateDepart" placeholder="Départ" name="dateDepart" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                </div>
                                <div className="mt-4">
                                    <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Date d&apos;arrivée</label>
                                    <input onChange={handleInputChange} type="date" value={getDateFormat(data.dateArrivee)} id="dateArrivee" placeholder="Arrivée" name="dateArrivee" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                </div>
                                <div className="mt-4">
                                    <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Bus</label>
                                    <select id="busId" name="busId" value={data.busId} onChange={handleInputChange} className="block w-full p-2 uppercase font-semibold text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                        <option></option>
                                        {bus.map((item: any, i: number) => (
                                            <option key={i} value={[item.id, item.capacite]}>Bus: N°0{item.busId} {item.marque} {item.modele} ({item.typeBus})</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mt-4">
                                    <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Trajet</label>
                                    <select id="trajetId" value={data.trajetId} name="trajetId" onChange={handleInputChange} className="block w-full p-2 uppercase font-semibold text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                        <option></option>
                                        {trajet.map((item: any, i: number) => (
                                            <option key={i} value={JSON.stringify({ id: item.id, prix: item.prix })}>N°0{item.id} ({item.lieuDepart} - {item.lieuArrivee} {JSON.parse(item.arrets).length == 0 ? "" : JSON.parse(item.arrets).map((i: any, k: number) => `- ${i.nom} `)}) {JSON.parse(item.arrets).length == 0 ? "Aucun arrêt" : ""}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mt-4">
                                    <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Type de voyages:</label>
                                    <select id="typeVoyage" value={data.typeVoyage} name="typeVoyage" onChange={handleInputChange} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                        <option value="aller-retour">Aller-Retour</option>
                                        <option value="aller simple">Aller Simple</option>
                                    </select>
                                </div>
                                <div className="mt-4">
                                    <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Attribuer un chauffeur</label>
                                    <select id="chauffeurId" name="chauffeurId" value={data.chauffeurId} onChange={handleInputChange} className="block w-full text-sm p-2 uppercase text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                        <option></option>
                                        {employe.map((item: any, i: number) => (
                                            <option key={i} value={item.id}>{item.nom} {item.prenom}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mt-4 flex">
                                    <button type="submit" className="text-white text-sm flex px-4  hover:shadow-md  hover:from-cyan-700 rounded-sm bg-cyan-500  from-cyan-600 bg-gradient-to-t p-2">
                                        Modifier
                                    </button>
                                    <button type="reset" hidden id="resetbtn" className="text-white text-sm flex px-4  hover:shadow-md  hover:from-stone-700 rounded-sm bg-stone-500  from-stone-600 bg-gradient-to-t p-2">
                                        Effacer
                                    </button>
                                </div>
                            </div>
                        </form>) : (
                        <form onSubmit={HandlerSubmit} className="col-span-1 bg-white shadow-xl rounded-sm  ">
                            <h2 className=" text-gray-100 p-4 bg-cyan-500  uppercase">
                                Modification
                            </h2>
                            <div className=" m-auto p-4">

                                <div className="mt-4">
                                    <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Numéro Voyage</label>
                                    <input onChange={handleInputChange} value={data.numVoyage} type="text" id="numVoyage" placeholder="" name="numVoyage" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                </div>
                                <div className="mt-4">
                                    <label className="  text-sm uppercase">Attribuer un chauffeur</label>
                                    <select id="chauffeurId" name="chauffeurId" value={data.chauffeurId} onChange={handleInputChange} className="block w-full text-sm p-2 uppercase text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                        <option></option>
                                        {employe.map((item: any, i: number) => (
                                            <option key={i} value={item.id}>{item.nom} {item.prenom}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mt-4 flex">
                                    <button type="submit" className="text-white text-sm flex px-4  hover:shadow-md  hover:from-cyan-700 rounded-sm bg-cyan-500  from-cyan-600 bg-gradient-to-t p-2">
                                        Modifier
                                    </button>
                                    <button type="reset" id="resetbtn" className="text-white text-sm flex px-4  hover:shadow-md  hover:from-stone-700 rounded-sm bg-stone-500  from-stone-600 bg-gradient-to-t p-2">
                                        Effacer
                                    </button>
                                </div>
                            </div>
                        </form>
                    )
                    }
                </div>
                {
                    data?.busId && busId != "" ?
                        (<div className="col-span-2">
                            <h2>Disponibilité du bus</h2>
                            <Planning id={busId} />
                        </div>) : null
                }
            </div>
        </div>
    )
}