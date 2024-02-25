"use client"

import { useEffect, useState } from 'react';

const CongeTable = (props: { id?: string }) => {

    const [conge, setConge] = useState([])

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`/api/conges?employeId=${props.id}`, { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setConge(data)
        };
        getData();
    }, [conge])

    return (
        <div className="bg-white shadow-xl rounded-sm">
            <h1 className=" p-4 text-gray-900 uppercase border-b">Les conges</h1>
            <div className="relative overflow-x-auto">
                <table className="w-full text-left text-xs rtl:text-right text-gray-900 dark:text-gray-400">
                    <thead className="text-xs uppercase text-gray-900  dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4 py-3 border-b-2">
                                #
                            </th>
                            <th scope="col" className="p-4 py-3 border-b-2">
                                Nombre de jour
                            </th>
                            <th scope="col" className="p-4 py-3 border-b-2 ">
                                Date de depart en congé
                            </th>
                            <th scope="col" className="p-4 py-3 border-b-2 ">
                                Motif
                            </th>
                            
                            {/* <th scope="col" className="p-4 py-3 border-b-2">
                                Actions
                            </th> */}
                        </tr>
                    </thead>
                    <tbody className='text-xs'>
                        {conge.map((item: any, index: number) => (
                            <tr key={index} className="border-b border-gray-200 bg-stone-100 dark:border-gray-700">
                                <th scope="row" className="p-4 py-2  ">
                                    {item.id}
                                </th>
                                <td className=" p-4 py-2 ">
                                    {item.nombreJour}
                                </td>
                                <td className=" p-4 py-2 ">
                                    {item.dateDepart}
                                </td>
                                <td className=" p-4 py-2 ">
                                    {item.motif}
                                </td>
                                
                              
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default CongeTable