"use client"

import { useEffect, useState } from 'react';

const SanctionTable = (props: { id?: string }) => {

    const [sanction, setSanction] = useState([])

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`/api/sanctions?employeId=${props.id}`, { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setSanction(data)
        };
        getData();
    }, [sanction])

    return (
        <div className="bg-white border overflow-hidden shadow-2xl rounded-md">
            <h1 className=" p-4 text-gray-900 uppercase border-b font-bold">Les sanctions</h1>
            <div className="relative overflow-x-auto">
                <table className="w-full text-left text-xs rtl:text-right text-gray-900 dark:text-gray-400">
                    <thead className="text-xs uppercase text-gray-900  dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4 py-3 border-b-2">
                                #
                            </th>
                            <th scope="col" className="p-4 py-3 border-b-2">
                                Label
                            </th>
                            <th scope="col" className="p-4 py-3 border-b-2 ">
                                Montant
                            </th>
                            
                            {/* <th scope="col" className="p-4 py-3 border-b-2">
                                Actions
                            </th> */}
                        </tr>
                    </thead>
                    <tbody className='text-xs'>
                        {sanction.map((item: any, index: number) => (
                            <tr key={index} className="border-b border-gray-200 bg-stone-100 dark:border-gray-700">
                                <th scope="row" className="p-4 py-2  ">
                                    {item.id}
                                </th>
                                <td className=" p-4 py-2 ">
                                    {item.label}
                                </td>
                                <td className=" p-4 py-2 ">
                                    {item.description}
                                </td>
                             
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default SanctionTable