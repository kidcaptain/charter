"use client"
import sv1 from '@/public/images/passagers.svg'

import ModalFiche from "@/components/modalFiche";
import { useEffect, useState } from "react";
import EditFormPassager from '@/components/passager/editFormPassager';
import PassagerTable from '@/components/passager/passagerTable';
import AddFormPassager from '@/components/passager/AddFormPassager';
import { getDateFormat } from '@/functions/actionsClient';

export default function Page() {
    const [isOpenEditForm, setIsOpenEditForm] = useState<boolean>(false);
    const [data, setData] = useState<any>();

    const handleButtonClickEditForm = (val: boolean) => {
        setIsOpenEditForm(val);
        console.log(val)
    }
    const [session, setSession] = useState<any>(null)
    const getItem = (val: any) => {
        setData(val)
    }
    const [passagers, setPassagers] = useState([]);

    const [isOpenAddForm, setIsOpenAddForm] = useState<boolean>(false);

    const handleButtonClickAddForm = (val: boolean) => {
        setIsOpenAddForm(val);
    }

    useEffect(() => {
        const agence = localStorage.getItem("agence")
        if (agence) {
            setSession(JSON.parse(agence))
        }
        const getData = async () => {
            if (agence) {
                const s = JSON.parse(agence)
                const res = await fetch("/api/passagers?agenceId="+ s.agenceId, { cache: "no-store" })
                if (!res.ok) {
                    throw new Error("Failed")
                }
                const data = await res.json();
                setPassagers(data)
            } 
        }
        getData();

       

    }, [])


    return (
        <div className="w-full p-10">
            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="text-xl text-gray-900">Les Passagers </h1>
            </div>

            <div className="mt-4 gap-4 grid items-start grid-cols-4 mx-auto ">
              
                <section className={`  shadow-xl rounded-sm ${(isOpenEditForm || isOpenAddForm) ? " col-span-3 " : "col-span-full"} `}>
                    <div className="bg-white shadow-xl rounded-sm">
                        <h1 className=" p-4 text-gray-900 uppercase border-b">Les Passagers </h1>
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-left text-sm rtl:text-right text-gray-900 dark:text-gray-400">
                                <thead className="text-sm text-gray-900  dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="p-4 py-3 border-b-2">
                                            #
                                        </th>
                                        <th scope="col" className="p-4 py-3 border-b-2">
                                            Nom
                                        </th>
                                        <th scope="col" className="p-4 py-3 border-b-2 ">
                                            Prenom
                                        </th>
                                        <th scope="col" className="p-4 py-3 border-b-2">
                                            Adresse
                                        </th>
                                        <th scope="col" className="p-4 py-3 border-b-2">
                                            Genre
                                        </th>
                                        <th scope="col" className="p-4 py-3 border-b-2">
                                            Date de Naissance
                                        </th>
                                        <th scope="col" className="p-4 py-3 border-b-2">
                                            Téléphone
                                        </th>
                                       
                                       
                                    </tr>
                                </thead>
                                <tbody className='text-xs'>
                                    {passagers.map((item: any) => (
                                        <tr key={item.id} className="border-b border-gray-200 bg-stone-100 dark:border-gray-700">
                                            <th scope="row" className="p-4 py-2  ">
                                                {item.id}
                                            </th>
                                            <td className=" p-4 py-2 ">
                                                {item.nom}
                                            </td>
                                            <td className=" p-4 py-2 ">
                                                {item.prenom}
                                            </td>
                                            <td className=" p-4 py-2">
                                                {item.adresse}
                                            </td>
                                            <td className=" p-4 py-2">
                                                {item.genre === 'm' ? 'Homme' : 'Femme'}
                                            </td>
                                            <td className=" p-4 py-2">
                                                {getDateFormat(item.dateNaissance)}
                                            </td>
                                            <td className=" p-4 py-2">
                                                {item.telephone}
                                            </td>
                                       

                                         
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div >
                    {/* <PassagerTable agenceId={session?.agenceId} childToParent={handleButtonClickEditForm} setData={getItem} /> */}
                </section>
                {/* {isOpenEditForm ? (
                    <section className='bg-white col-span-1'>
                        <EditFormPassager item={data} />
                        <div className='p-4'>
                            <button onClick={() => { setIsOpenEditForm(false); setIsOpenAddForm(false) }} className="text-stone-500 font-bold text-xs text-center ">Fermer</button>
                        </div>
                    </section>
                ) : ""} */}

            </div>
        </div>
    )
}