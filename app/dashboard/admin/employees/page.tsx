"use client"
import EmployeeAddForm from "@/components/employees/employeeAddForm";
import Image from "next/image";
import Popup from "@/components/ui/popup";
import { getDateFormat } from "@/functions/actionsClient";
import Link from "next/link";
import { useState, useEffect } from "react";
import svg from '@/public/images/loader.svg'
import HelpPopup from "@/components/ui/helpPopup";

export default function Page() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
    const [isOpenEditor, setIsOpenEditor] = useState<boolean>(false);
    const [isFind, setIsFind] = useState<boolean>(false);
    const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
    const [employees, setEmployees] = useState<any[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const [employeesResult, setEmployeesResult] = useState<any[]>([]);
    const [popupData, setPopupData] = useState<{ message: string, title?: string, color: string }>({ message: "", title: "", color: "" })

    const handleOnEmit = (val: boolean) => {
        if (val) {
            configPopup("Employé enregistré", "blue", "Enregistrement");
        } else {
            configPopup("Une erreur c'est produite vei", "red", "Reservation");
        }
    }
    const configPopup = (message: string, color: string, title: string) => {
        setPopupData({ message: message, color: color, title: title })
        setIsOpenPopup(true)
        setTimeout(() => {
            setIsOpenPopup(false)
        }, 5000);
    }
    const getEmployeByNom = async (name: string) => {
        const tab: never[] = [];
        setEmployees(tab);
        if (name != "") {
            const res = await fetch(`/api/employes?nom=${name}`, { method: "GET", cache: "no-store" })
            if (!res.ok) {
                configPopup("Impossible d'afficher les données. Veuillez actualiser la page!", "red", "Reservation");
            } else {
                const data = await res.json();
                setIsFind(true);
                setEmployeesResult(data);
            }

        } else {
            alert("Entrée une valeur dans la zone de texte")
        }
    };
    const deleteEmploye = async (id: number) => {
        if (confirm("Confimer la suppression")) {
            const res = await fetch(`/api/employes/${id}`, { method: "DELETE", cache: "no-store" })
            if (!res.ok) {
                configPopup("Impossible d'afficher les données. Veuillez actualiser la page!", "red", "Reservation");
            } else {
                configPopup("Employé supprimé", "green", "Reservation");
            }
        }

    }

    useEffect(() => {
        const getPoste = async () => {
            const res = await fetch("/api/postes", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
        };

        const getData = async () => {
            const res = await fetch("/api/employes", { cache: "no-store" })
            if (!res.ok) {
                configPopup("Impossible d'afficher les données. Veuillez actualiser la page!", "red", "Reservation");
            }
            const data = await res.json();
            return data
        };


        const selectEmploye = async () => {
            const tabEmploye: any[] = await getData();
            const tab: any[] = [];
            const tabPoste: any[] = await getPoste();
            tabEmploye.map((r) => {
                tabPoste.map((i) => {
                    if (r.posteId === i.id) {
                        tab.push({ poste: i, employe: r })
                    }
                })
            })
            setEmployees(tab)
        }
        selectEmploye()

    }, [employees])
    return (
        <div className=" p-10">
            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="text-xl text-gray-900">Les Employés</h1>
            </div>
            <div className=" gap-2 grid items-start grid-cols-4">
                {isOpenForm ?
                    (
                        <div className="bg-white transition-all overflow-hidden  col-span-1 shadow-2xl rounded-md">
                            <EmployeeAddForm childToParent={handleOnEmit}></EmployeeAddForm>
                            <button className="text-stone-500 border-stone-700 border rounded-md mt-4 hover:bg-stone-600 hover:text-white font-bold text-xs text-center p-2" type="button" onClick={() => setIsOpenForm(false)}>Fermer</button>
                        </div>
                    ) : null}
                <div className={(isOpen || isOpenForm || isOpenEditor) ? "  col-span-3 bg-white shadow-2xl rounded-md border" : " col-span-full bg-white shadow-2xl rounded-md border"}>
                    <h2 className="p-4 uppercase border-b font-bold text-xl">
                        Employés
                    </h2>
                    <div>
                        <div className="grid gap-2 grid-cols-5 items-center p-4 rounded-sm ">
                            <div className="col-span-2 flex items-center gap-2">
                                <input type="search" name="" onChange={(e) => setSearchValue(e.target.value)} placeholder="Rechercher par nom" className="focus:outline-none rounded-md border focus:ring-4 focus-visible:ring-green-500/30 focus-visible:bg-green-50 bg-stone-100 p-2 text-sm bg-inherit" id="" />
                                <button onClick={() => getEmployeByNom(searchValue)} className="text-white bg-green-600 hover:bg-green-700 font-medium text-sm p-2 rounded-sm">Rechercher</button>
                                <HelpPopup message="Faites une recherche d'un employé employé en fonction de son nom." />
                            </div>
                            <Link href={"/dashboard/admin/employees/salaires"} className="text-black text-center col-span-1 border border-black flex justify-center gap-2 items-center hover:bg-black bg-white hover:text-white font-medium text-sm  p-2 rounded-sm">Afficher les salaires <HelpPopup message="Imprimer et afficher les salaires des employés de chaques mois." /></Link>
                            <Link href={"/dashboard/admin/employees/utilisateurs"} className="text-black text-center col-span-1 flex items-center justify-center gap-2 hover:bg-black bg-white border-black border hover:text-white font-medium text-sm  p-2 rounded-sm">Utilisateurs
                                <HelpPopup message="Cliquez ici pour ajouter un utilisateur, vous avez aussi la possiblité de modifier les droits d'acces des utilisateurs." />
                            </Link>
                            <button onClick={() => { setIsOpenForm(true); setIsOpen(false); setIsOpenEditor(false) }} className="text-white col-span-1 bg-blue-600 hover:bg-blue-800 text-sm font-medium p-2 rounded-sm">Nouveau employé</button>

                            {/* <button className="bg-red-500 col-span-1 hover:bg-red-800 text-white font-medium text-xs p-2 rounded-sm">Tout Supprimer</button> */}
                        </div>
                        <div className="relative overflow-x-auto p-4" style={{ maxHeight: 700 }}>
                            {employees.length == 0 ?
                                (<h2 className="text-center text-gray-700 font-medium">Aucun employé enregistré</h2>) :
                                (
                                    <table className="w-full  text-left text-sm rtl:text-right text-gray-800 font-medium ">
                                        <thead className=" text-gray-900 uppercase ">
                                            <tr>
                                                <th scope="col" className="p-2 border-2 border-stone-700">
                                                    Id#
                                                </th>
                                                <th scope="col" className="p-2 border-2 border-stone-700">
                                                    Nom & Prenom
                                                </th>
                                                <th scope="col" className="p-2 border-2 border-stone-700 ">
                                                    Poste
                                                </th>
                                                {
                                                    !isOpenForm ? (<th scope="col" className="p-2 border-2 border-stone-700">
                                                        Salaire
                                                    </th>) : null
                                                }
                                                <th scope="col" className="p-2 border-2 border-stone-700">
                                                    Adresse
                                                </th>
                                                <th scope="col" className="p-2 border-2 border-stone-700">
                                                    Num de CNI
                                                </th>
                                                {
                                                    !isOpenForm ? (<th scope="col" className="p-2 border-2 border-stone-700">
                                                        Date de Naissance
                                                    </th>) : null
                                                }
                                               
                                                <th scope="col" className="p-2 border-2 border-stone-700">
                                                    Téléphone
                                                </th>
                                                {
                                                    !isOpenForm ? (<th scope="col" className="p-2 border-2 border-stone-700">
                                                        Email
                                                    </th>) : null
                                                }

                                                <th scope="col" className="p-2 border-2 border-stone-700">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {employees.map((item: any, index: number) => {
                                                return (
                                                    <tr key={index} >
                                                        <th scope="row" className="p-2 border-2 border-stone-700 ">
                                                            {index + 1}
                                                        </th>
                                                        <td className="p-2 border-2 border-stone-700 ">
                                                            {item.employe.nom} {item.employe.prenom}
                                                        </td>
                                                        <td className="p-2 border-2 border-stone-700 ">
                                                            {item.poste.titre}
                                                        </td>
                                                        <td className="p-2 border-2 border-stone-700 ">
                                                            {item.poste.salaire}
                                                        </td>
                                                        <td className="p-2 border-2 border-stone-700 ">
                                                            {item.employe.adresse}
                                                        </td>
                                                        <td className="p-2 border-2 border-stone-700 ">
                                                            {item.employe.numCNI}
                                                        </td>
                                                        {
                                                            !isOpenForm ? (<td className="p-2 border-2 border-stone-700 ">
                                                                {getDateFormat(item.employe.dateNaissance)}
                                                            </td>) : null
                                                        }

                                                        <td className="p-2 border-2 border-stone-700 ">{item.employe.telephone}</td>
                                                        {
                                                            !isOpenForm ? (<td className="p-2 border-2 border-stone-700 ">{item.employe.email}</td>) : null
                                                        }


                                                        <td className="p-2 border-2 border-stone-700 ">
                                                            <button onClick={() => deleteEmploye(item.employe.id)} className="bg-red-500 text-white font-medium text-xs text-center p-1 px-2">Retirer</button>
                                                            <Link href={`/dashboard/admin/employees/${item.employe.id}`} className="bg-cyan-500 p-1 px-2 text-white font-medium text-xs text-center ">Fiche Personnelle</Link>
                                                            <Link href={`/dashboard/admin/employees/${item.employe.id}/editer`} className="bg-yellow-500 p-1 px-2 text-white font-medium text-xs text-center ">Modifier</Link>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                )}
                        </div>
                    </div>
                </div>
            </div>
            {isFind ? (
                <section className="bg-black/50 w-full h-full  top-0 left-0 fixed z-20">
                    <div className=" mx-auto my-auto mt-8 w-full h-full flex justify-center items-center">
                        <div className="bg-white max-w-7xl mx-auto shadow-2xl rounded-md overflow-hidden">
                            <h2 className="p-4 border-b font-bold uppercase">Resultat de nom = {searchValue}</h2>
                            <div className="p-4">
                                <table className="w-full  text-left text-xs rtl:text-right text-gray-500 ">
                                    <thead className=" text-gray-900 uppercase ">
                                        <tr>
                                            <th scope="col" className="p-2 border-2 border-stone-700">
                                                Id#
                                            </th>
                                            <th scope="col" className="p-2 border-2 border-stone-700">
                                                Nom & Prenom
                                            </th>

                                            <th scope="col" className="p-2 border-2 border-stone-700">
                                                Adresse
                                            </th>
                                            <th scope="col" className="p-2 border-2 border-stone-700">
                                                Num de CNI
                                            </th>
                                            <th scope="col" className="p-2 border-2 border-stone-700">
                                                Date de Naissance
                                            </th>
                                            <th scope="col" className="p-2 border-2 border-stone-700">
                                                Téléphone
                                            </th>
                                            <th scope="col" className="p-2 border-2 border-stone-700">
                                                Email
                                            </th>
                                            <th scope="col" className="p-2 border-2 border-stone-700">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employeesResult.map((item: any, index: number) => {
                                            return (
                                                <tr key={index} className="border-b border-gray-200 ">
                                                    <th scope="row" className="p-2 border">
                                                        {index + 1}
                                                    </th>
                                                    <td className="p-2 border">
                                                        {item.nom} {item.prenom}
                                                    </td>

                                                    <td className="p-2 border">
                                                        {item.adresse}
                                                    </td>
                                                    <td className="p-2 border">
                                                        {item.numCNI}
                                                    </td>
                                                    <td className="p-2 border">
                                                        {getDateFormat(item.dateNaissance)}
                                                    </td>
                                                    <td className="p-2 border">{item.telephone}</td>
                                                    <td className="p-2 border">{item.email}</td>
                                                    <td className="p-2 border flex flex-row flex-wrap items-center">
                                                        <button onClick={() => deleteEmploye(item.id)} className="bg-red-500 text-white font-medium text-xs text-center p-1 px-2">Retirer</button>
                                                        <Link href={`/dashboard/admin/employees/${item.id}`} className="bg-cyan-500 p-1 px-2 text-white font-medium text-xs text-center ">Fiche Personnelle</Link>
                                                        <Link href={`/dashboard/admin/employees/${item.id}/editer`} className="bg-yellow-500 p-1 px-2 text-white font-medium text-xs text-center ">Modifier</Link>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <button type="button" onClick={() => setIsFind(false)} className="text-sm px-4 hover:bg-stone-900 mt-4  bg-stone-700 text-white rounded-md p-2">Fermer</button>
                        </div>
                    </div>
                </section>
            ) : null}
            {isOpenPopup ? (<Popup color={popupData?.color} title={popupData.title} message={popupData?.message} onShow={() => setIsOpenPopup(false)} />) : null}
        </div>
    )
}