"use client"
import EmployeeAddForm from "@/components/employees/employeeAddForm";
import Image from "next/image";
import Popup from "@/components/ui/popup";
import { getDateFormat } from "@/functions/actionsClient";
import Link from "next/link";
import { useState, useEffect } from "react";
import svg from '@/public/images/loader.svg'

export default function Page() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenForm, setIsOpenForm] = useState<boolean>(false);

    const [isFind, setIsFind] = useState<boolean>(false);
    const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
    const [employees, setEmployees] = useState<any[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const [employeesResult, setEmployeesResult] = useState<any[]>([]);
    const [popupData, setPopupData] = useState<{ message: string, title?: string, color: string }>({ message: "", title: "", color: "" })


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
             
                <div className={" col-span-full bg-white shadow-2xl rounded-md border"}>
                    <h2 className="p-4 uppercase border-b">
                        Employés
                    </h2>
                    <div>
                        <div className="grid gap-2 grid-cols-8 items-start p-4 rounded-sm ">
                            <div className="col-span-2">
                                <input type="search" name="" onChange={(e) => setSearchValue(e.target.value)} placeholder="Rechercher par nom" className="focus:outline-none border focus:ring-4 focus-visible:ring-green-500/30 focus-visible:bg-green-50 bg-stone-100 p-2 text-sm  w-full bg-inherit" id="" />
                                <button onClick={() => getEmployeByNom(searchValue)} className="text-white bg-green-600 hover:bg-green-700 font-medium text-xs p-2 mt-4 rounded-sm">Rechercher</button>
                            </div>
                            <Link href={"/dashboard/comptable/employees/salaires"} className="text-white text-center col-span-1 hover:bg-cyan-700 bg-cyan-500 font-medium text-xs  p-2 rounded-sm">Afficher les salaires</Link>
                          
                        </div>
                        <div className="relative overflow-x-auto p-4" style={{maxHeight: 700}}>
                            {employees.length == 0 ?
                                (<Image src={svg} className='animate-spin mx-auto' width={25} height={25} alt='Loader image' />) :
                                (
                                    <table className="w-full  text-left text-sm rtl:text-right text-gray-500 ">
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
                                                       
                                                            <Link href={`/dashboard/comptable/employees/${item.employe.id}`} className="bg-cyan-100 text-cyan-800 p-2 hover:text-white hover:bg-cyan-600 font-medium text-xs text-center ">Fiche Personnelle</Link>
                                                           
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

        </div>
    )
}