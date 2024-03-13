"use client"
import { getDateFormat } from "@/functions/actionsClient"
import { FormEvent, useEffect, useState } from "react"
import svg from "@/public/images/loader.svg";
import Image from "next/image";
interface Employe {
    nom: string,
    prenom: string,
    adresse: string,
    dateNaissance: string,
    genre: string,
    telephone: string,
    email: string,
    numCNI: string,
    dateEmbauche: string,
    agenceId: number,
    posteId: number
}

const EmployeeEditForm = (props: { id?: string }) => {

    const [employe, setEmploye] = useState<any>(null)
    const [poste, setPoste] = useState<any[]>([])
    const [agence, setAgence] = useState<any[]>([])





    const [data, setData] = useState<any>()

    const handleInputChange = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };



    const HandlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await fetch(`/api/employes/${props.id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
            })
            const a = await response.json()

            if (response.ok) {
                console.log(a)
            }
        } catch (err) {
            console.log(err)
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
            const res = await fetch(`/api/employes/${props.id}`, { method: "GET", cache: "no-store" })
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

            let pos: any = null;
            let age: any = null;
            tabPoste.map((i) => {
                if (employee.posteId == i.id) {
                    pos = i;
                    // setEmploye({ poste: i, employe: employee, agence: j })
                }
            })
            tabAgence.map((j) => {
                if (employee.agenceId == j.id) {
                    age = j
                }
            })
            setEmploye({ poste: pos, employe: employee, agence: age })
        }
        selectEmploye()

    }, [])

    return (
        employe ? (
            <form onSubmit={HandlerSubmit} className="rounded-md overflow-hidden shadow-2xl" >
                <h2 className="p-4  font-bold text-white bg-black uppercase">
                    Informations sur l&apos;employé
                </h2>

                <div className="grid grid-cols-3 uppercase">
                    <div>
                        <div className="border border-black p-4">
                            <h2 className="block mb-1 text-sm  text-gray-900 font-bold">Nom Complet</h2>
                            <p>{employe.employe?.nom} {employe.employe?.prenom}</p>
                        </div>
                        <div className="border border-black p-4">
                            <h2 className="block mb-1 text-sm  text-gray-900 font-bold">Adresse</h2>
                            <p>{employe.employe?.adresse}</p>
                        </div>
                        <div className="border border-black p-4">
                            <h2 className="block mb-1 text-sm  text-gray-900 font-bold">Téléphone</h2>
                            <p>{employe.employe?.telephone}</p>
                        </div>
                        <div className="border border-black p-4">
                            <h2 className="block mb-1 text-sm  text-gray-900 font-bold">Numéro CNI</h2>
                            <p>{employe.employe?.numCNI}</p>
                        </div>
                        <div className="border border-black p-4">
                            <h2 className="block mb-1 text-sm  text-gray-900 font-bold">Date de naissance</h2>
                            <p>{getDateFormat(employe.employe?.dateNaissance)}</p>
                        </div>
                        <div className="border border-black p-4">
                            <h2 className="block mb-1 text-sm  text-gray-900 font-bold">Genre</h2>
                            <p>{employe.employe?.genre === "m" ? "Homme" : "Femme"} </p>
                        </div>
                    </div>
                    <div>
                        <div className="border border-black p-4">
                            <h2 className="block mb-1 text-sm  text-gray-900 font-bold">Poste</h2>
                            <p>{employe.poste?.titre} </p>
                        </div>
                        <div className="border border-black p-4">
                            <h2 className="block mb-1 text-sm  text-gray-900 font-bold">Agence</h2>
                            <p>{employe.agence?.nom} </p>
                        </div>
                        <div className="border border-black p-4">
                            <h2 className="block mb-1 text-sm  text-gray-900 font-bold">matricule</h2>
                            <p>{employe.employe?.matricule ?? "Aucun"} </p>
                        </div>
                        <div className="border border-black p-4">
                            <h2 className="block mb-1 text-sm  text-gray-900 font-bold">Nature du contrat</h2>
                            <p>{employe.employe?.natureContrat ?? "Indeterminé"} </p>
                        </div>
                        <div className="border border-black p-4">
                            <h2 className="block mb-1 text-sm  text-gray-900 font-bold">ancienneté</h2>
                            <p>{employe.employe?.ancienneté ?? "Indeterminé"} </p>
                        </div>
                    </div>
                    <div>
                        {employe.employe?.imageCNIRecto ?
                            <div className="bg-gray-100 w-full h-1/2">
                                <img src={employe.employe?.imageCNIRecto} alt="Image CNI" />
                            </div> : null
                        }
                        {employe.employe?.imageCNIVerso ?
                            <div className="bg-gray-100 w-full h-1/2">
                                <img src={employe.employe?.imageCNIVerso} alt="Image CNI" />
                            </div> : null
                        }
                    </div>
                </div>

            </form>
        ) : (<Image src={svg} className='animate-spin mx-auto' width={25} height={25} alt='Loader image' />)
    )
}

export default EmployeeEditForm