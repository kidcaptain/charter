"use client"

import { FormEvent, useState , useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
interface IPrams {
    recetteId?: string
}

export default function Page({ params }: { params: IPrams }) {

    const [data, setData] = useState<any>({
        nom: "",
        typeService: "",
        typePaiement: "",
        montant: 0,
        dateTransaction: "",
        note: ""  
    })
    const [trajet, setTrajet] = useState<any>()
    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`/api/recette/${params.recetteId}`, { method: "GET", cache: "no-store" })

            if (!res.ok) {
                throw new Error("Failed")
            }
            const val = await res.json();
            setTrajet({ ...val });
            setData({ ...val });
        };
        getData();
    }, [params.recetteId])

    const handleInputChange = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleResetForm = () => {
        setData(trajet);
    }
    // const handleInputChange = (event: any) => {
    //     const target = event.target
    //     const datas = target.value
    //     setTrajet((oldValue: any) => {
    //         return { ...oldValue, [target.name]: datas }
    //     })
    // }

    const HandlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(data)
        try {
            const response = await fetch(`/api/recette/${params.recetteId}`, {
                method: 'PUT',
                body: JSON.stringify(data),
            })
            if (response.ok) {
                router.push("/dashboard/caisse/recettes")
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className=" w-full p-10">
            <div className=" py-2 flex justify-between items-start">
                <h1 className="lowercase text-sm  text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/admin/recettes"}>recettes</Link> / <Link className="hover:text-blue-600" href="#">Fiche n°{params.recetteId}</Link></h1>
            </div>
            <div>
                <section className="flex justify-center w-full gap-4">
                    <form onSubmit={HandlerSubmit} className="min-w-96 bg-white shadow-xl rounded-sm  ">
                        <h2 className=" text-gray-100 p-4 bg-cyan-500  uppercase">
                            Editer une fiche de recette
                        </h2>
                        <div className="w-80 mx-auto p-4">
                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Libellé</label>
                                <input onChange={handleInputChange} value={data.nom} required type="text" id="nom" placeholder="Nom" name="nom" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Type de services</label>
                                <input onChange={handleInputChange} value={data.typeService} required type="text" id="typeService" placeholder="" name="typeService" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="typePaiement" className="block mb-1 text-sm font-medium text-gray-700 ">Type De Paiement</label>
                                <select name="typePaiement" required value={data.typePaiement} autoComplete="off" onChange={handleInputChange} className="block w-full p-2 uppercase text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " id="typePaiement">
                                    <option value="cash" >Cash</option>
                                    <option value="mobile money" >Mobile money</option>
                                </select>
                            </div>

                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Montant</label>
                                <input onChange={handleInputChange} value={data.montant} required type="number" id="montant" name="montant" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                            </div>
                          
                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">Note</label>
                                <textarea onChange={handleInputChange} required value={data.note} id="note" name="note" className="block h-44 resize-none w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " ></textarea>
                            </div>
                            <div className="mt-4 flex">
                                <button type="submit" className="text-white text-sm flex px-4  hover:shadow-md  hover:from-blue-700 rounded-sm bg-blue-500  from-blue-600 bg-gradient-to-t p-2">
                                    Enregistrer
                                </button>
                                <button type="reset" id="resetbtn" className="text-white text-sm flex px-4  hover:shadow-md  hover:from-stone-700 rounded-sm bg-stone-500  from-stone-600 bg-gradient-to-t p-2">
                                    Recommencer
                                </button>
                            </div>
                        </div>
                      
                    </form>
                    {/* <div className="col-span-1 bg-white rounded-sm">
                        <h2 className=" text-gray-100 p-4 bg-green-500  uppercase">
                            Information - Trajet N°{params.trajetId}
                        </h2>

                        <ul className="flex flex-col gap-4 p-4 ">
                            <li><h5 className="font-bold">Trajet</h5><span className="text-sm">{trajet.lieuArrivee} - {trajet.lieuDepart}</span></li>
                            <li><h5 className="font-bold">Heure de Départ</h5> <span className="text-sm">{trajet.heureDepart}</span></li>
                            <li><h5 className="font-bold">Heure d&apos;arrivé</h5>  <span className="text-sm">{trajet.heureArrivee}</span></li>
                            <li><h5 className="font-bold">Distance</h5>  <span className="text-sm">{trajet.distance} Km</span></li>
                        </ul>
                    </div> */}
                </section>
            </div>
        </div>

    )
}
