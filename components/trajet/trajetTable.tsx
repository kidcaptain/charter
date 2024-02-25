"use client"
import svg from '@/public/images/loader.svg'
import { useEffect, useState } from 'react';
import Image from "next/image";


const TrajetTable = (props: { childToParent: Function }) => {

    const [trajets, setTrajet] = useState<any[]>([])
    const [isNull, setIsNull] = useState<boolean>(false)

    const emptyData = () => {
       if (!isNull) {
        return <Image src={svg} className='animate-spin mx-auto' width={25} height={25} alt='Loader image' />;
       }else{
        return <p className='text-center'>Aucun trajet enregistré!</p>
       }
    }
    useEffect(() => {
        const getData = async () => {
            const res = await fetch("/api/trajets", { cache: "no-store" })
            const data = await res.json();
            setTrajet(data)
            
        };
        getData();
        setTimeout(() => {
            if (trajets.length == 0) {
                setIsNull(true)
            }
        }, 10000);

    }, [trajets])

    const deleteTrajet = async (id: number) => {
        if (confirm("Voulez vous supprimé cette element ?")) {
            const res = await fetch("/api/trajets/" + id, { method: "DELETE", cache: "no-store" })
            if (res.ok) {
                alert("Element supprimé!")
            }
        }
    }

    return (
        <section className=" bg-white shadow-2xl border rounded-md overflow-hidden   ">
            <h2 className=" text-gray-900 font-bold p-4 border-b uppercase">
                Trajets Table
            </h2>
            <div className="p-4">

                {trajets.length == 0 ?
                 emptyData() : 
                 (
                    <div className="relative overflow-x-auto" style={{height: 445}}>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400">
                            <thead className="text-sm text-gray-900 border font-bold  dark:text-gray-400">
                                <tr>
                                    <th scope="col" className=" py-3 px-1 border ">
                                        Id#
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border">
                                        Départ
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border ">
                                        Arrivée
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border">
                                        Heure de Départ
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border ">
                                        Heure d&apos;arrivée
                                    </th>

                                    <th scope="col" className=" py-3 px-1 border">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {trajets.map((item: any) => (
                                    <tr key={item.id} className="border-b border-gray-200 border dark:border-gray-900">
                                        <th scope="row" className=" py-1 px-1 border    ">
                                            {item.id}
                                        </th>
                                        <td className=" py-1 px-1 border ">
                                            {item.lieuDepart}
                                        </td>
                                        <td className=" py-1 px-1 border ">
                                            {item.lieuArrivee}
                                        </td>
                                        <td className=" py-1 px-1 border">
                                            {item.heureDepart}
                                        </td>
                                        <td className=" py-1 px-1 border">
                                            {item.heureArrivee}
                                        </td>

                                        <td className=" py-1 px-1 border flex flex-row items-start">
                                            <button type='button' onClick={() => deleteTrajet(item.id)} className="text-white rounded-sm hover:bg-red-500 bg-red-400 text-xs flex items-center gap-2 justify-center p-2">Retirer</button>
                                            <button onClick={() => props.childToParent(item.id)} className="bg-yellow-500  text-xs flex hover:bg-yellow-600 hover:text-white items-center gap-2 justify-center p-2">Editer</button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                )}

            </div>
        </section>
    )
}

export default TrajetTable