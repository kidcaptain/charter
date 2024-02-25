"use client"
import { getDateFormat } from "@/functions/actionsClient"
import Link from "next/link"
import { FormEvent, useState, useEffect } from "react"


interface IPrams {
    vehiculeId?: string
}

export default function Page({ params }: { params: IPrams }) {
    const [chauffeur, setChauffeur] = useState<any>(null)
    const [bus, setBus] = useState<any>(null)
    const [fiche, setFiche] = useState<any>(null)

    const handleInputChange =   (event: any) => {
        const target = event.target
        const data = target.type === 'checkbox' ? target.checked : target.value
        setData((oldValue: any) => {
            return { ...oldValue, [target.name]: data }
        })
    }
    const [data, setData] = useState<any>()

    const HandlerSubmit = async () => {
        if (confirm("Voulez vous modifiez ces informations")) {
            const date = new Date();
            const year = date.getFullYear();
            const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
            const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;

            const fiches = {
                id: data.id,
                busId: bus.id,
                immatriculation: data.immatriculation ?? "",
                typeVehicule: data.typeVehicule ?? "",
                kilometrageInitial: data.kilometrageInitial ?? 0,
                dateAchat: `${getDateFormat(data.dateAchat) != "NaN-NaN-NaN" ? getDateFormat(data.dateAchat) : year+ '-' + month + '-' + day}T00:00:00.000Z`,
                dateMiseService: `${getDateFormat(data.dateMiseService) != "NaN-NaN-NaN" ? getDateFormat(data.dateMiseService) :  year+ '-' + month + '-' + day}T00:00:00.000Z`,
                dateRevision: `${getDateFormat(data.dateRevision) != "NaN-NaN-NaN" ? getDateFormat(data.dateRevision) :  year+ '-' + month + '-' + day}T00:00:00.000Z`,
                detailRevision: data.detailRevision ?? "" ,
                vidange: data.vidange ?? "",
                reperationEffectuees: data.reperationEffectuees ?? "",
                anomalies: data.anomalies ?? "",
                carburant: data.carburant ?? "",
                pannes: data.pannes ?? "",
                vandalisme: data.vandalisme ?? "",
                accident: data.accident ?? "",
                assurance: data.assurance ?? "non",
                contratEntretien: data.contratEntretien ?? "non",
                garanties: data.garanties ?? "non",
            }
            try {
                const response = await fetch(`/api/FicheSuivieVehicule`, {
                    method: 'POST',
                    cache: "no-store",
                    body: JSON.stringify(fiches),
                })
                const d = await response.json()
                console.log(d)
                if (response.ok) {
                    alert("Informations modifiées!")

                }
            } catch (err) {
                console.log(err)

            }
        }
    }

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`/api/bus/${params.vehiculeId}`, { method: "GET", cache: "no-store" })

            if (!res.ok) {
                throw new Error("Failed")
            }
            const val = await res.json();
            setBus(val)
            
            return val
        };

        const getFiche = async () => {
            const res = await fetch(`/api/FicheSuivieVehicule?busId=${params.vehiculeId}`, { method: "GET", cache: "no-store" })

            if (!res.ok) {
                throw new Error("Failed")
            }
            const val = await res.json();
            setData(val[0])
            setFiche(val[0])
        };

        const getChauffeur = async () => {
            const val = await getData()
            const res = await fetch(`/api/employes/${val.employeId}`, { cache: "no-store" })
            if (!res.ok) {
                console.log("error")
            }
            const data = await res.json();
            setChauffeur(data)
        };
        getChauffeur();
        getFiche();
    }, [])

    return (
        <div className="p-10 w-full">
            <div className=" py-4 flex lowercase text-sm justify-between items-start mb-2">
                <h1 className=" text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/admin/vehicles"}>Vehicules</Link> / <Link className="hover:text-blue-600" href={`/dashboard/admin/vehicles/${params.vehiculeId}`}>Fiche technique</Link> / <Link className="hover:text-blue-600" href="">Fiche de suivie</Link></h1>
            </div>
            <div>
                <div className="shadow-2xl border">
                    <h2 className="p-4 bg-white uppercase border-b">Fiche de suivie</h2>
                    <div className="border-b bg-white p-2">
                        <button type="button" onClick={HandlerSubmit} className="bg-gray-50 text-stone-800 border hover:bg-gray-200 text-xs p-2">Modifier</button>
                    </div>
                </div>
                <div className="p-20 max-w-5xl shadow-2xl m-auto mt-4 min-h-screen bg-white">
                    <div className="text-center font-bold my-8">
                        <h2>CHARTER EXPRESS VOYAGES</h2>
                        <ul>
                            <li>  ENTREPRISE DE TRANSPORT INTER-URBAIN</li>
                            <li> BP: 5029 YAOUNDE</li>
                            <li className="my-4">FICHE SUIVIE</li>
                        </ul>

                    </div>
                    <div>
                        <h3 className="p-4  uppercase  bg-stone-800 text-white border-black">Informations générales sur le vehicule</h3>
                        <div className=" uppercase text-sm border-black w-full">

                            <div>
                                <div className="border border-stone-700 uppercase p-2">Numéro d&apos;immatriculation </div>
                                <div className="border text-gray-600 border-stone-700 uppercase">
                                    <input type="text" name="immatriculation" onChange={handleInputChange} value={data?.immatriculation ?? ""} className="w-full h-full px-3 hover:bg-stone-200 py-4 focus-within:outline-none bg-stone-50" />
                                </div>
                            </div>
                            <div>
                                <div className="border border-stone-700 uppercase p-2">Marque et modèle </div>
                                <div className="border text-gray-600 border-stone-700 uppercase">
                                    <input type="text" value={`${bus?.marque ?? ""} ${bus?.modele ?? ""}`} className="w-full h-full px-3 hover:bg-stone-200 py-4 focus-within:outline-none bg-stone-50" />
                                </div>
                            </div>
                            <div>
                                <div className="border border-stone-700 uppercase p-2">Type de véhicule</div>
                                <div className="border text-gray-600 border-stone-700 uppercase">
                                    <input type="text" name="typeVehicule" onChange={handleInputChange} value={data?.typeVehicule ?? ""} className="w-full h-full px-3 hover:bg-stone-200 py-4 focus-within:outline-none bg-stone-50" />
                                </div>
                            </div>
                            <div>
                                <div className="border border-stone-700 uppercase p-2">Kilométrage initial</div>
                                <div className="border text-gray-600 border-stone-700 uppercase">
                                    <input type="number" name="kilometrageInitial" onChange={handleInputChange} value={data?.kilometrageInitial ?? fiche?.kilometrageInitial} className="w-full h-full px-3 hover:bg-stone-200 py-4 focus-within:outline-none bg-stone-50" />
                                </div>
                            </div>
                            <div>
                                <div className="border border-stone-700 uppercase p-2">Date d&apos;achat </div>
                                <div className="border text-gray-600 border-stone-700 uppercase">
                                    <input type="date" name="dateAchat" onChange={handleInputChange} value={data?.dateAchat ? getDateFormat(data?.dateAchat) : '2024-02-20'}   className="w-full h-full px-3 hover:bg-stone-200 py-4 focus-within:outline-none bg-stone-50" />
                                </div>
                            </div>
                            <div>
                                <div className="border border-stone-700 uppercase p-2">Date de mise en service</div>
                                <div className="border text-gray-600 border-stone-700 uppercase">
                                    <input type="date" name="dateMiseService" onChange={handleInputChange} value={data?.dateMiseService ? getDateFormat(data?.dateMiseService) : '2024-02-20'}  className="w-full h-full px-3 hover:bg-stone-200 py-4 focus-within:outline-none bg-stone-50" />
                                </div>
                            </div>
                        </div>
                        <h3 className="p-4 border uppercase  bg-stone-800 text-white border-black">Information sur le conducteur</h3>
                        {
                            chauffeur ? (
                                <div className=" uppercase text-sm  border-black w-full">
                                    <div>
                                        <div className="border border-stone-700 uppercase p-2">Nom et prenom</div>
                                        <div className="border text-gray-600 border-stone-700 px-3 py-4">{chauffeur?.nom} {chauffeur?.prenom}</div>
                                    </div>
                                    <div>
                                        <div className="border border-stone-700 uppercase p-2">Téléphone</div>
                                        <div className="border text-gray-600 border-stone-700 px-3 py-4">{chauffeur?.telephone}</div>
                                    </div>
                                    <div>
                                        <div className="border border-stone-700 uppercase p-2">Adresse</div>
                                        <div className="border text-gray-600 border-stone-700 px-3 py-4">{chauffeur?.adresse}</div>
                                    </div>
                                    <div>
                                        <div className="border border-stone-700 uppercase p-2">TYPE DE PERMIS</div>
                                        <div className="border text-gray-600 border-stone-700">
                                            <input type="text" className="w-full h-full px-3 hover:bg-stone-200 py-4 focus-within:outline-none bg-stone-50" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="border border-stone-700 uppercase p-2">Vérifications des dispositifs</div>
                                        <div className="border text-gray-600 border-stone-700 uppercase">
                                            <input type="text" className="w-full h-full px-3 hover:bg-stone-200 py-4 focus-within:outline-none bg-stone-50" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="border border-stone-700 uppercase p-2">Anomalies et dysfonctionnements </div>
                                        <div className="border text-gray-600 border-stone-700 uppercase">
                                            <input type="text" className="w-full h-full px-3 hover:bg-stone-200 py-4 focus-within:outline-none bg-stone-50" />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <h4 className="p-4 border uppercase text-sm  text-stone-600 border-black">Aucun conducteur pour se véhicule</h4>
                            )
                        }
                        <h3 className="p-4 border uppercase  bg-stone-800 text-white border-black">Suivi de l&apos;entretien</h3>
                        <div className=" uppercase text-sm  border-black w-full">
                            <div>
                                <div className="border border-stone-700 uppercase p-2">Dates des révisions</div>
                                <div className="border text-gray-600 border-stone-700">
                                    <input type="date"  name="dateRevision" value={data?.dateRevision ? getDateFormat(data?.dateRevision) : '2024-02-20'}  onChange={handleInputChange} className="w-full h-full px-3 hover:bg-stone-200 py-4 focus-within:outline-none bg-stone-50" /></div>
                            </div>
                            <div>
                                <div className="border border-stone-700 uppercase p-2">détails des révisions</div>
                                <div className="border text-gray-600 border-stone-700">
                                    <input type="text" value={data?.detailRevision ?? ""}  name="detailRevision" onChange={handleInputChange} className="w-full h-full px-3 hover:bg-stone-200 py-4 focus-within:outline-none bg-stone-50" /></div>
                            </div>
                            <div>
                                <div className="border border-stone-700 uppercase p-2">Vidanges et changements de filtres</div>
                                <div className="border text-gray-600 border-stone-700">
                                    <input type="text" value={data?.vidange ?? ""} name="vidange" onChange={handleInputChange} className="w-full h-full px-3 hover:bg-stone-200 py-4 focus-within:outline-none bg-stone-50" /></div>
                            </div>
                            <div>
                                <div className="border border-stone-700 uppercase p-2">Réparations effectuées</div>
                                <div className="border text-gray-600 border-stone-700 uppercase">
                                    <input type="text" value={data?.reperationEffectuees ?? ""} onChange={handleInputChange} name="reperationEffectuees" className="w-full h-full px-3 hover:bg-stone-200 py-4 focus-within:outline-none bg-stone-50" />
                                </div>
                            </div>
                            <div>
                                <div className="border border-stone-700 uppercase p-2">Anomalies et dysfonctionnements </div>
                                <div className="border text-gray-600 border-stone-700 uppercase">
                                    <input type="text" value={data?.anomalies ?? ""} onChange={handleInputChange} name="anomalies" className="w-full h-full px-3 hover:bg-stone-200 py-4 focus-within:outline-none bg-stone-50" />
                                </div>
                            </div>
                        </div>
                        <h3 className="p-4 border uppercase  bg-stone-800 text-white border-black">Suivi des consommations</h3>
                        <div className=" uppercase text-sm  border-black w-full">
                            <div>
                                <div className="border border-stone-700 uppercase p-2">carburant</div>
                                <div className="border text-gray-600 border-stone-700 ">
                                    <input type="text" value={data?.carburant ?? ""} onChange={handleInputChange} name="carburant" className="w-full h-full px-3 hover:bg-stone-200 py-4 focus-within:outline-none bg-stone-50" /></div>
                            </div>


                        </div>
                        <h3 className="p-4 border uppercase  bg-stone-800 text-white border-black">Suivi des incidents</h3>
                        <div className=" uppercase text-sm  border-black w-full">
                            <div>
                                <div className="border border-stone-700 uppercase p-2">Pannes et problèmes mécaniques</div>
                                <div className="border text-gray-600 border-stone-700">
                                    <input type="text" name="pannes" onChange={handleInputChange} value={data?.pannes ?? ""} className="w-full h-full px-3 hover:bg-stone-200 py-4 focus-within:outline-none bg-stone-50" /></div>
                            </div>
                            <div>
                                <div className="border border-stone-700 uppercase p-2">Vols et actes de vandalisme</div>
                                <div className="border text-gray-600 border-stone-700">
                                    <input type="text" name="vandalisme" onChange={handleInputChange} value={data?.vandalisme ?? ""} className="w-full h-full px-3 hover:bg-stone-200 py-4 focus-within:outline-none bg-stone-50" /></div>
                            </div>
                            <div>
                                <div className="border border-stone-700 uppercase p-2">Accidents</div>
                                <div className="border text-gray-600 border-stone-700">
                                    <input type="text" name="accident" onChange={handleInputChange} value={data?.accident ?? ""} className="w-full h-full px-3 hover:bg-stone-200 py-4 focus-within:outline-none bg-stone-50" /></div>
                            </div>
                        </div>
                        <h3 className="p-4 border uppercase  bg-stone-800 text-white border-black">Informations complémentaires</h3>
                        <div className=" uppercase text-sm  border-black w-full">
                            <div>
                                <div className="border border-stone-700 uppercase p-2">Assurances du véhicule</div>
                                <div className="border text-gray-600 border-stone-700 ">
                                    <input type="radio" id="ouiassurance" value="oui" name="assurance" checked={data?.assurance == "oui"} onChange={handleInputChange} className="block p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                    <label htmlFor="oui" className="text-xs font-bold text-gray-700">Oui</label>
                                    <input type="radio" id="nonassurance" value="non" name="assurance" checked={data?.assurance == "non"} onChange={handleInputChange} className="block p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                    <label htmlFor="non" className="text-xs font-bold text-gray-700">Non</label>
                                </div>
                            </div>
                            <div>
                                <div className="border border-stone-700 uppercase p-2">Contrats d&apos;entretien</div>
                                <div className="border text-gray-600 border-stone-700 ">
                                    <input type="radio" id="ouicontratEntretien" value="oui" name="contratEntretien" checked={data?.contratEntretien == "oui"} onChange={handleInputChange} className="block p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                    <label htmlFor="oui" className="text-xs font-bold text-gray-700">Oui</label>
                                    <input type="radio" id="noncontratEntretien" value="non" name="contratEntretien" checked={data?.contratEntretien == "non"} onChange={handleInputChange} className="block p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                    <label htmlFor="non" className="text-xs font-bold text-gray-700">Non</label>
                                </div>
                            </div>
                            <div>
                                <div className="border border-stone-700 uppercase p-2">Garanties constructeur</div>
                                <div className="border text-gray-600 border-stone-700 ">
                                    <input type="radio" id="garanties" value="oui" name="garanties" checked={data?.garanties == "oui"} onChange={handleInputChange} className="block p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                    <label htmlFor="oui" className="text-xs font-bold text-gray-700">Oui</label>
                                    <input type="radio" id="garanties" value="non" name="garanties" checked={data?.garanties == "non"} onChange={handleInputChange} className="block p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                    <label htmlFor="non" className="text-xs font-bold text-gray-700">Non</label>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}