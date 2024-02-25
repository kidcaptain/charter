"use client"

import { useEffect, useState } from 'react';

const PrimeTable = (props: { id?: string }) => {

    const [prime, setPrime] = useState([])

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`/api/primes?employeId=${props.id}`, { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setPrime(data)
        };
        getData();
    }, [prime])

    return (
        <div className="bg-white shadow-xl rounded-sm">
            <h1 className=" p-4 text-gray-900 uppercase border-b">Les primes</h1>
            <div className="relative overflow-x-auto">
                <table className="w-full text-left text-xs rtl:text-right text-gray-900 dark:text-gray-400">
                    <thead className="text-xs uppercase text-gray-900  dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4 py-3 border-b-2">
                                #
                            </th>
                            <th scope="col" className="p-4 py-3 border-b-2">
                                Montant
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
                        {prime.map((item: any, index: number) => (
                            <tr key={index} className="border-b border-gray-200 bg-stone-100 dark:border-gray-700">
                                <th scope="row" className="p-4 py-2  ">
                                    {item.id}
                                </th>
                                <td className=" p-4 py-2 ">
                                    {item.montant}
                                </td>
                                <td className=" p-4 py-2 ">
                                    {item.justificatif}
                                </td>
                              
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default PrimeTable