"use client"

import { selectReservationById } from "@/functions/actionsClient";
import Link from "next/link"
import { useEffect, useState } from "react";

interface IPrams {
    reservationId?: string
}

export default function Page({ params }: { params: IPrams }) {

    const [voyage, setVoyage] = useState<any>(null)

    useEffect(() => {
        const getData = async () => {
            const data = await selectReservationById(`${params.reservationId}`);
            setVoyage(data);
        }

        getData();

    }, [])

    return (
        <div className=" w-full p-10">
            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="text-xl text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/caisse/trajets"}>Accueil</Link>/<Link className="hover:text-blue-600" href="#">n°{params.reservationId}</Link></h1>
            </div>
            <div>
                <section className="flex justify-center w-full gap-4">
                    <table className="w-full text-left text-xs rtl:text-right text-gray-900 dark:text-gray-400">
                        <thead className="text-xs uppercase text-gray-900  dark:text-gray-400">
                            <tr>
                                <th scope="col" className="p-4 py-3 border-b-2">
                                    #
                                </th>
                                <th scope="col" className="p-4 py-3 border-b-2">
                                    Nom et prenom
                                </th>
                                <th scope="col" className="p-4 py-3 border-b-2 ">
                                    Justificatif
                                </th>

                                {/* <th scope="col" className="p-4 py-3 border-b-2">
                                Actions
                            </th> */}
                            </tr>
                        </thead>
                        <tbody className='text-xs'>
                            {voyage ? (
                                <tr className="border-b border-gray-200 bg-stone-100 dark:border-gray-700">
                                    <th scope="row" className="p-4 py-2  ">
                                        {voyage.reservation?.Id}
                                    </th>
                                    <td className=" p-4 py-2 ">
                                        {voyage.reservation?.statutReservation}
                                    </td>
                                    <td className=" p-4 py-2 ">
                                        {voyage.passager?.nom}
                                    </td>

                                </tr>
                            ) : null }
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    )
}