"use client"
import AddFormUser from "@/components/employees/addFormUser";
import HelpPopup from "@/components/ui/helpPopup";
import { getDateFormat } from "@/functions/actionsClient";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Page() {

    const [employees, setEmployees] = useState<any[]>([]);
    const [utilisateurs, setUtilisateurs] = useState<any[]>([]);
    const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
    const [editPoste, setEditPoste] = useState<boolean>(false);
    const [popupData, setPopupData] = useState<{ message: string, title?: string, color: string }>({ message: "", title: "", color: "" })
    const [show, setShow] = useState<boolean>(false);
    const [item, setItem] = useState<any>(null)
    const [userTotal, setUserTotal] = useState<number>(0)

    const configPopup = (message: string, color: string, title: string) => {
        setPopupData({ message: message, color: color, title: title })
        setIsOpenPopup(true)
        setTimeout(() => {
            setIsOpenPopup(false)
        }, 5000);
    }
    const changePoste = async (val: string, item: any) => {
        if (confirm("Voulez changer les droits d'acces de cette utilisateur?")) {
            try {
                const datas = {
                    nomUtilisateur: item.nomUtilisateur,
                    motDePasse: item.motDePasse,
                    dateCreationCompte: item.dateCreationCompte,
                    dateDerniereConnexion: item.dateDerniereConnexion,
                    blocke: item.blocke,
                    numCNI: item.numCNI,
                    employeId: item.id,
                    isConnected: "no",
                    droitsAccesId: val,
                }
                const response = await fetch(`/api/utilisateurs/${item.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(datas),
                })
                const a = await response.json()
                if (!response.ok) {
                    console.log(a)
                }else{
                    setEditPoste(false)
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
    const addToUser = (val: any) => {
        setItem(val);
        setShow(true)
    }

    const handleChilToParent = (val: boolean) => {
        setShow(false);
        if (val) {

        }
    }
    const banned = async (item: any, val: string) => {
        try {
            const datas = {
                nomUtilisateur: item.nomUtilisateur,
                motDePasse: item.motDePasse,
                dateCreationCompte: item.dateCreationCompte,
                dateDerniereConnexion: item.dateDerniereConnexion,
                blocke: val,
                numCNI: item.numCNI,
                employeId: item.id,
                isConnected: "no",
                droitsAccesId: item.droitsAccesId,
            }
            const response = await fetch(`/api/utilisateurs/${item.id}`, {
                method: 'PUT',
                body: JSON.stringify(datas),
            })
            const a = await response.json()

            if (!response.ok) {
                console.log(a)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const [value, setValue] = useState<any>()
    const [droitAcces, setDroitAcces] = useState<any[]>([]);



    const HandlerSubmit = async (e: any) => {
        const date = new Date()
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        const hours = (date.getHours()) < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
        const minutes = (date.getMinutes()) < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
        e.preventDefault()

        try {
            const datas = {
                nomUtilisateur: `${employees[value.nomUtilisateur].nom.toLowerCase()}${employees[value.nomUtilisateur].prenom.toLowerCase()}`,
                motDePasse: value.motDePasse,
                dateCreationCompte: `${year}-${month}-${day}T${hours}:${minutes}`,
                dateDerniereConnexion: `${year}-${month}-${day}T${hours}:${minutes}`,
                blocke: "false",
                numCNI: employees[value.nomUtilisateur].numCNI,
                employeId: employees[value.nomUtilisateur].id,
                isConnected: "no",
                droitsAccesId: value.droitsAccesId
            }

            const res = await fetch('/api/utilisateurs', {
                method: 'POST',
                cache: 'no-store',
                body: JSON.stringify(datas),
            })
            console.log(res)
            if (res.ok) {
                console.log(datas)
                alert("Utilisateur créer")
            }
        } catch (err: any) {
            console.log(err)

        }
    }

    const handleInputChange = (event: any) => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setValue((oldValue: any) => {
            return { ...oldValue, [target.name]: value }
        })
    }


    useEffect(() => {
        const getPoste = async () => {
            const res = await fetch("/api/acces", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
        };

        const getAgence = async () => {
            const res = await fetch("/api/agences", { method: "GET", cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
        };


        const getUtilisateur = async () => {
            const res = await fetch("/api/utilisateurs", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();

            return data
        };

        const getAcces = async () => {
            const res = await fetch("/api/acces", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setDroitAcces(data)
        };
        getAcces()
        const getEmploye = async () => {
            const res = await fetch("/api/employes", { cache: "no-store" })
            if (!res.ok) {
                configPopup("Impossible d'afficher les données. Veuillez actualiser la page!", "red", "Reservation");
            }
            const data = await res.json();
            setEmployees(data)

        };
        getEmploye();


        const getData = async () => {
            const res = await fetch("/api/employes", { cache: "no-store" })
            if (!res.ok) {
                configPopup("Impossible d'afficher les données. Veuillez actualiser la page!", "red", "Reservation");
            }
            const data = await res.json();
            return data
        };

        const selectUtilisateur = async () => {
            const tabEmploye: any[] = await getData();
            const tab: any[] = [];
            const tabPoste: any[] = await getPoste();
            const tabAgence: any[] = await getAgence();
            const tabUser: any[] = await getUtilisateur();

            tabUser.map((r) => {
                tabEmploye.map((i) => {
                    tabPoste.map((j) => {
                        tabAgence.map((k) => {
                            if ((r.employeId == i.id) && (r.droitsAccesId == j.id) && (k.id == i.agenceId)) {
                                tab.push({ ...r, ...{ poste: j.TypeDroits }, ...{ emplacement: k.nom }, ...{ posteId: j.id } })
                            }
                        })
                    })

                })
            })
            setUtilisateurs(tab)
            setUserTotal(tab.length)
        }

        selectUtilisateur()

    }, [utilisateurs])
    return (
        <section className="p-10">
            <div className=" py-2 flex justify-between items-start">
                <h1 className="lowercase text-sm  text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/admin/employees"}>Employés</Link> / <Link className="hover:text-blue-600" href="#">Utilisateurs</Link></h1>
            </div>
            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="text-xl text-black font-bold">Utilisateurs ({userTotal})</h1>
                <Link href={'/dashboard/admin/employees/utilisateurs/acces'} className="bg-blue-500 p-2 text-xs text-white ">Ajouter un droit d&apos;acces</Link>
            </div>
            <div className="grid grid-cols-6 gap-4">
                <div className="relative col-span-4 bg-white rounded-sm border shadow-2xl  text-sm" >
                    <h2 className="p-4 text-black flex items-center gap-2 font-bold border-b text-xl"><span className="uppercase">Utilisateurs</span>   <HelpPopup message="Ici vous pouvez bloquer un compte utilisateur et l'empecher d'acceder à l'application." /></h2>
                    <div className=" p-4 overflow-y-auto" style={{ maxHeight: 400 }}>
                        <table className="w-full  text-left rtl:text-right text-gray-50" >
                            <thead className=" text-black">
                                <tr>
                                    <th scope="col" className="p-2 border-2 border-stone-700">
                                        Id#
                                    </th>
                                    <th scope="col" className="p-2 border-2 border-stone-700">
                                        Nom d&apos;utilisateur
                                    </th>
                                    <th scope="col" className="p-2 border-2 border-stone-700 ">
                                        Date de création
                                    </th>
                                    <th scope="col" className="p-2 border-2 border-stone-700">
                                        Dernière connexion
                                    </th>
                                    <th scope="col" className="p-2 border-2 border-stone-700">
                                        En ligne
                                    </th>
                                    <th scope="col" className="p-2  border-2 border-stone-700">
                                        Role
                                        <HelpPopup message="Cliquez sur la case en dessous pour modifier le role." />
                                    </th>
                                    <th scope="col" className="p-2 border-2 border-stone-700">
                                        Emplacement
                                    </th>

                                    <th scope="col" className="p-2 border-2 border-stone-700">
                                        Actions

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {utilisateurs.map((item: any, index: number) => {
                                    return (
                                        <tr key={index} className={`border-b text-gray-800 border-gray-200 `}>
                                            <th scope="row" className="p-2 border">
                                                {index + 1}
                                            </th>
                                            <td className="p-2 border">
                                                {item.nomUtilisateur}
                                            </td>

                                            <td className="p-2 border">
                                                {getDateFormat(item.dateCreationCompte)}
                                            </td>
                                            <td className="p-2 border">
                                                {getDateFormat(item.dateDerniereConnexion)}
                                            </td>
                                            <td className="p-2 border">
                                                {item.isConnected}
                                            </td>
                                            <td className="p-2 border" onClick={() => setEditPoste(true)}>
                                                {
                                                    editPoste ? (<select name="droitsAccesId" autoComplete="off" onChange={(e) => changePoste(e.target.value, item)} className="block w-full p-2 uppercase text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " id="droitsAccesId">
                                                        {droitAcces.map((item: any, index: number) => (
                                                            (item.TypeDroits != "administrateur") ?
                                                                (
                                                                    <option value={item.id} key={index + 1}>{item.TypeDroits}</option>
                                                                ) : null
                                                        ))}
                                                    </select>) : (<span>{item.poste}</span>)
                                                }



                                            </td>
                                            <td className="p-2 border">
                                                {item.emplacement}
                                            </td>
                                            <td className="p-2 border">
                                                {item.blocke == "true" ? (<button onClick={() => banned(item, "false")} className="bg-blue-500 text-white font-medium text-xs text-center p-1 px-2">Débloquer</button>) : (<button onClick={() => banned(item, "true")} className="bg-red-500 text-white font-medium text-xs text-center p-1 px-2">Bloquer</button>)}
                                            </td>
                                        </tr>
                                    );
                                })}


                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-span-2 ">
                    <form onSubmit={HandlerSubmit} className="  m-auto border rounded-md overflow-hidden shadow-2xl bg-white ">
                        <h2 className=" p-4 uppercase font-bold text-white bg-blue-500">
                            Ajouter un utilisateur
                        </h2>
                        <div className="p-4">
                            <div className="mt-4  gap-4">
                                <label className="flex items-center gap-2 mb-1 text-sm font-medium text-gray-700 dark:text-white">Nom d&apos;utilisateur   <HelpPopup message="Le nom d'utilisateur est addition du nom et du prenom de l'employé." /></label>

                                <select name="nomUtilisateur" required autoComplete="off" onChange={handleInputChange} className="block w-full p-2  text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " id="nomUtilisateur">
                                    <option value="" ></option>
                                    {employees.map((item: any, index: number) => (
                                        <option value={index} key={index + 1}>{item.nom.toLowerCase()}{item.prenom.toLowerCase()}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Mot de passe</label>
                                <input type="password" placeholder="Mot de Passe" name="motDePasse" required autoComplete="off" onChange={handleInputChange} id="motDePasse" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="droitsAccesId" className="flex items-center gap-2 mb-1 text-sm font-medium text-gray-700 ">Type De Droits <HelpPopup message="Le type de droit correspond au differents type de compte qui peuvent être utiliser dans l'application." /></label>
                                <select name="droitsAccesId" required autoComplete="off" onChange={handleInputChange} className="block w-full p-2 uppercase text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " id="droitsAccesId">
                                    <option value="" ></option>
                                    {droitAcces.map((item: any, index: number) => (
                                        (item.TypeDroits != "administrateur") ?
                                            (
                                                <option value={item.id} key={index + 1}>{item.TypeDroits}</option>
                                            ) : null
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className=" bg-white p-4   ">
                            <button type="submit" className="text-white hover:shadow-md  hover:bg-blue-700 rounded-sm bg-blue-500 text-xs  p-2">
                                Enregistrer
                            </button>
                            <button type="reset" id="buttonReset" className="text-white hover:shadow-md ml-2 hover:bg-stone-700 rounded-sm bg-stone-500 text-xs  p-2">
                                Recommencer
                            </button>

                        </div>
                    </form>
                </div>
            </div>

        </section>
    )
}