"use client"
import { getDateFormat } from "@/functions/actionsClient";
import Image from "next/image";
import Link from "next/link";
import svg from '@/public/images/loader.svg'
import { FormEvent, useState, useEffect } from "react"
import Popup from "@/components/ui/popup";
interface IPrams {
    employeId?: string
}
export default function Page({ params }: { params: IPrams }) {

    const [employe, setEmploye] = useState<any>(null);
    const [poste, setPoste] = useState<any[]>([]);
    const [agence, setAgence] = useState<any[]>([]);
    const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
    const [popupData, setPopupData] = useState<{ message: string, title?: string, color: string }>({ message: "", title: "", color: "" })
    const [file, setFile] = useState<File>();
    const [file2, setFile2] = useState<string>("");
    const [file3, setFile3] = useState<string>("");

    const [data, setData] = useState<any>(
        {
            nom: "",
            prenom: "",
            adresse: "",
            dateNaissance: "",
            genre: "",
            telephone: 0,
            email: "",
            numCNI: "",
            dateEmbauche: "",
            agenceId: 0,
            posteId: 0
        }
    )
    const [posteEmploye, setPosteEmploye] = useState<any>(
        {
            id: 0,
            titre: "",
        }
    )
    const [agenceEmploye, setAgenceEmploye] = useState<any>(
        {
            nom: "",
            id: 0
        }
    )

    const handleInputChange = (event: any) => {
        const target = event.target
        const data = target.type === 'checkbox' ? target.checked : target.value
        setData((oldValue: any) => {
            return { ...oldValue, [target.name]: data }
        })
    }

    const HandlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (confirm("Voulez vous modifiez ces informations")) {
            const employed = {
                nom: data.nom,
                prenom: data.prenom,
                adresse: data.adresse,
                dateNaissance: `${data.dateNaissance}`,
                genre: data.genre,
                telephone: data.telephone,
                email: data.email,
                numCNI: data.numCNI,
                dateEmbauche: `${data.dateEmbauche}`,
                agenceId: parseInt(data.agenceId),
                posteId: parseInt(data.posteId),
                imageCNIRecto: data.imageCNIRecto,
                imageCNIVerso: data.imageCNIVerso,
                matricule: data.matricule,
                natureContrat: data.natureContrat,
                anciennete: data.anciennete
            }
            try {
                const response = await fetch(`/api/employes/${params.employeId}`, {
                    method: 'PUT',
                    cache: "no-store",
                    body: JSON.stringify(employed),
                })
                if (response.ok) {
                    configPopup("Informations modifiées!", "green", "");
                }
            } catch (err) {
                console.log(err)
                configPopup("Impossible de modifier ces données veuillez. Veuillez actualiser la page!", "red", "Reservation");
            }
        }
    }
    const configPopup = (message: string, color: string, title: string) => {
        setPopupData({ message: message, color: color, title: title })
        setIsOpenPopup(true)
        setTimeout(() => {
            setIsOpenPopup(false)
        }, 5000);
    }

    const onSubmitRecto = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file) return;
        try {
            const dataImg = new FormData();
            dataImg.append("files", file);
            const res = await fetch('/api/other', {
                method: 'POST',
                body: dataImg
            })
            const p = await res.json()
            if (!res.ok) {
                alert("Impossible de télécharger le fichier!")
                return;
            }
            
            const datas = {
                adresse: data.adresse,
                agenceId: data.agenceId,
                anciennete: data.anciennete,
                dateEmbauche: data.dateEmbauche,
                dateNaissance: data.dateNaissance,
                email: data.email,
                genre: data.genre,
                imageCNIRecto: p.fileUrl,
                imageCNIVerso: data.imageCNIVerso,
                matricule: data.matricule,
                natureContrat: data.natureContrat,
                nom: data.nom,
                numCNI: data.numCNI,
                posteId: data.posteId,
                prenom: data.prenom,
                telephone: data.telephone,
            }
            setFile3(p.fileUrl)
            console.log(data)
            const reps = await fetch("/api/employes/" + params.employeId, { method: 'PUT', cache: "no-store", body: JSON.stringify(datas) })
            if (!reps.ok) {
                configPopup("Impossible de modifier ces données veuillez. Veuillez actualiser la page!", "red", "Reservation");
                return;
            }
            configPopup("Informations modifiées!", "green", "");

        } catch (error) {
            console.error(error)
        }
    }
    const onSubmitVerso = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file) return;
        try {
            const dataImg = new FormData();
            dataImg.append("files", file);
            const res = await fetch('/api/other', {
                method: 'POST',
                body: dataImg
            })
            const p = await res.json()
            if (!res.ok) {
                alert("Impossible de télécharger le fichier!")
                return;
            }
            
            const datas = {
                adresse: data.adresse,
                agenceId: data.agenceId,
                anciennete: data.anciennete,
                dateEmbauche: data.dateEmbauche,
                dateNaissance: data.dateNaissance,
                email: data.email,
                genre: data.genre,
                id: data.id,
                imageCNIRecto: data.imageCNIRecto,
                imageCNIVerso: p.fileUrl,
                matricule: data.matricule,
                natureContrat: data.natureContrat,
                nom: data.nom,
                numCNI: data.numCNI,
                posteId: data.posteId,
                prenom: data.prenom,
                telephone: data.telephone,

            }
            setFile2(p.fileUrl)
            console.log(data)
            const reps = await fetch("/api/employes/" + params.employeId, { method: 'PUT', cache: "no-store", body: JSON.stringify(datas) })
            if (!reps.ok) {
                configPopup("Impossible de modifier ces données veuillez. Veuillez actualiser la page!", "red", "Reservation");
                return;
            }
            configPopup("Informations modifiées!", "green", "");

        } catch (error) {
            console.error(error)
        }
    }




    useEffect(() => {
        const getPoste = async () => {
            const res = await fetch("/api/postes", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setPoste(data)
            return data
        };



        const getAgence = async () => {
            const res = await fetch("/api/agences", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setAgence(data)
            return data
        };

        const getData = async () => {
            const res = await fetch(`/api/employes/${params.employeId}`, { method: "GET", cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
        };

        const selectEmploye = async () => {
            const employee = await getData();
            const tabPoste: any[] = await getPoste();
            const tabAgence: any[] = await getAgence();
            tabPoste.map((i) => {
                tabAgence.map((j) => {
                    if ((employee.posteId == i.id) && (employee.agenceId == j.id)) {
                        setData(employee)
                        setEmploye({ poste: i, employe: employee, agence: j })
                        setPosteEmploye(poste)
                        setAgenceEmploye(agence)
                    }
                })
            })
        }
        selectEmploye()

    }, [])

    return (
        <div className=" w-full p-10">
            <div className=" py-4 flex lowercase text-sm justify-between items-start mb-2">
                <h1 className=" text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/admin/employees"}>Employés</Link> / <Link className="hover:text-blue-600" href="#">Editer</Link></h1>
            </div>
            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="text-xl text-gray-900">Profile employé</h1>
            </div>
            {!employe ?
                (<Image src={svg} className='animate-spin mx-auto' width={25} height={25} alt='Loader image' />) :
                (
                    <div className="grid grid-cols-2 gap-4">
                        <form onSubmit={HandlerSubmit} className="rounded-md overflow-hidden shadow-2xl" >
                            <h2 className="p-4 bg-blue-600 bg-gradient-to-br from-blue-800 font-bold text-white uppercase border-b">
                                Edition
                            </h2>
                            <div className=" p-4 grid grid-cols-2 gap-4">
                                <div>
                                    <div className=" ">
                                        <label className="block mb-1 text-sm  text-gray-900 font-bold">Nom</label>
                                        <input type="text" id="nom" name="nom" value={data?.nom} onChange={handleInputChange} className="block w-full p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block mb-1 text-sm  text-gray-900 font-bold">Prénom</label>
                                        <input type="text" id="prenom" name="prenom" value={data?.prenom} onChange={handleInputChange} className="block w-full p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block mb-1 text-sm  text-gray-900 font-bold">Adresse</label>
                                        <input type="text" id="adresse" name="adresse" value={data?.adresse} onChange={handleInputChange} className="block w-full p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block mb-1 text-sm  text-gray-900 font-bold">Numéro de Carte d&apos;identité</label>
                                        <input type="text" id="numCNI" name="numCNI" value={data?.numCNI} onChange={handleInputChange} className="block w-full p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block mb-1 text-sm  text-gray-900 font-bold">Numèro de téléphone:</label>
                                        <input type="tel" id="telephone" name="telephone" value={data?.telephone} onChange={handleInputChange} aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2 focus:ring-2  focus:outline-none sm:text-md focus-visible:ring-blue-400" placeholder="620456789" />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block mb-1 text-sm  text-gray-900 font-bold">Date de naissance</label>
                                        <input type="date" id="dateNaissance" name="dateNaissance" value={getDateFormat(data?.dateNaissance)} className="block w-full p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block mb-1 text-sm  text-gray-900 font-bold">Genres</label>
                                        <div className="flex gap-4">
                                            <input type="radio" id="genrem" value="m" name="genre" checked={data?.genre === "m"} onChange={handleInputChange} className="block p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                            <label htmlFor="genrem" className="text-xs font-bold text-gray-700">Homme</label>
                                            <input type="radio" id="genref" value="f" name="genre" checked={data?.genre === "f"} onChange={handleInputChange} className="block p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                            <label htmlFor="genref" className="text-xs font-bold text-gray-700">Femme</label>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="">
                                        <label htmlFor="" className="block mb-1 text-sm  text-gray-900 font-bold">Poste {posteEmploye.id}</label>
                                        <select value={data.posteId} onChange={handleInputChange} name="posteId" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " id="">
                                            {poste.map((item: any, index: number) => (
                                                <option value={item.id} key={index}>{item.titre}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block mb-1 text-sm  text-gray-900 font-bold">Agence</label>
                                        <select value={data.agenceId} onChange={handleInputChange} name="agenceId" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " id="">
                                            <option value="" ></option>
                                            {agence.map((item: any, index: number) => (
                                                <option value={item.id} key={index}>{item.nom}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block mb-1 text-sm  text-gray-900 font-bold">Matricule</label>
                                        <input type="text" value={data.matricule} onChange={handleInputChange} id="matricule" name="matricule" className="block w-full p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                    </div>

                                    <div className="mt-4">
                                        <label className="block mb-1 text-sm  text-gray-900 font-bold">Nature du contrat</label>
                                        <input type="text" id="natureContrat" name="natureContrat" value={data.natureContrat} onChange={handleInputChange} className="block w-full p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block mb-1 text-sm  text-gray-900 font-bold">Ancienneté</label>
                                        <div className="flex gap-4">
                                            <input type="radio" id="oui" value="0" name="anciennete" checked={data?.anciennete == 0} onChange={handleInputChange}  className="block p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                            <label htmlFor="oui" className="text-xs font-bold text-gray-700">Oui</label>
                                            <input type="radio" id="non" value="1" name="anciennete" checked={data?.anciennete == 1} onChange={handleInputChange}  className="block p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                            <label htmlFor="non" className="text-xs font-bold text-gray-700">Non</label>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="text-white focus:ring-2  focus-visible:ring-blue-400 focus:outline-none  hover:shadow-md  hover:bg-blue-700 rounded-sm bg-blue-500 text-sm mt-4 p-2">
                                    Modifier
                                </button>
                                <button type="reset" className="text-white focus:ring-2 mx-2 focus-visible:ring-blue-400 focus:outline-none  hover:shadow-md  hover:bg-stone-700 rounded-sm bg-stone-500 text-sm mt-4 p-2">
                                    Reinitialiser
                                </button>
                            </div>
                        </form>
                        <div>
                            <form onSubmit={onSubmitVerso}>
                                <label htmlFor="" className="block mb-1 text-sm  text-gray-900 font-bold">Verso de la CNI</label>
                                <input type="file" required onChange={(e) => setFile(e.target.files?.[0])} name="file" id="file" accept="jpg" />
                                <button className="bg-orange-400 text-xs uppercase text-white p-2 font-bold">Uploader</button>
                            </form>
                            <Image src={employe.employe.imageCNIVerso == "" ? file2 : employe.employe.imageCNIVerso} width={400} height={200} alt="p" />
                            <form onSubmit={onSubmitRecto}>
                                <label htmlFor="" className="block mb-1 text-sm  text-gray-900 font-bold">Recto de la CNI</label>
                                <input type="file" required onChange={(e) => setFile(e.target.files?.[0])} name="file" id="file" accept="jpg" />
                                <button className="bg-orange-400 text-xs uppercase text-white p-2 font-bold">Uploader</button>
                            </form>
                            <Image src={employe.employe.imageCNIRecto == "" ? file3 : employe.employe.imageCNIRecto} width={400} height={200} alt="p" />
                        </div>
                    </div>
                )}
            {isOpenPopup ? (<Popup color={popupData?.color} title={popupData.title} message={popupData?.message} onShow={() => setIsOpenPopup(false)} />) : null}
        </div>
    )
}