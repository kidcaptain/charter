"use client"
import svg from '@/public/images/loader.svg'
import { useEffect, useState } from 'react';
import Image from "next/image";


const TrajetTable = (props: { childToParent: Function }) => {

    const [trajets, setTrajet] = useState<any[]>([])
    const [isNull, setIsNull] = useState<boolean>(false)
    const [arrets, setArrets] = useState<{ nom: string, prix: number }[]>([])
    const emptyData = () => {
        if (!isNull) {
            return <Image src={svg} className='animate-spin mx-auto' width={25} height={25} alt='Loader image' />;
        } else {
            return <p className='text-center'>Aucun trajet enregistré!</p>
        }
    }
    const viewArret = (val: { nom: string, prix: number }[]) => {
        setArrets(val);
    }
    const close = () => {
        setArrets([]);
    }
  
    useEffect(() => {
        const getData = async () => {
            const res = await fetch("/api/trajets", { cache: "no-store" })
            const data: any[] = await res.json();
            let tab : any[] = [];
            data.map((i) => {
                let a: any[] = []; 
                if (i.arrets != "") {
                    a = JSON.parse(i.arrets) 
                }
                tab.push({id: i.id, lieuDepart: i.lieuDepart, lieuArrivee: i.lieuArrivee, heureDepart: i.heureDepart, heureArrivee: i.heureArrivee, prix: i.prix, arrets: a})
            })
            setTrajet(tab)
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
                        <div className="relative overflow-x-auto" style={{ height: 445 }}>
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
                                      
                                        <td className=" py-1 px-1 border">
                                            Prix
                                        </td>
                                        <th scope="col" className=" py-3 px-1 border">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {trajets.map((item: any, index: number) => (
                                        <tr key={index+1} className="border-b border-gray-200 border dark:border-gray-900">
                                            <th scope="row" className=" py-1 px-1 border    ">
                                                {index+1}
                                            </th>
                                            <td className=" py-1 px-1 border ">
                                                {item.lieuDepart}
                                            </td>
                                            <td className=" py-1 px-1 border ">
                                                {item.lieuArrivee}
                                            </td>
                                           
                                            <td className=" py-1 px-1 border">
                                                {item.prix} fcfa
                                            </td>
                                            <td className=" py-1 gap-2 px-1 grid grid-cols-3 items-start">
                                                {
                                                    item.arrets != "" ? (<button type='button' onClick={() => viewArret(item.arrets)} className="text-white rounded-sm hover:bg-blue-500 bg-blue-400 text-xs flex items-center gap-2 justify-center p-2">Voir les arrêts</button>) :
                                                        null
                                                }
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
                {
                    arrets.length> 0? (
                        <div className='absolute z-0 top-0 left-0 flex justify-center items-center bg-black/30 w-full h-full'>
                        <div className="w-full max-w-96 overflow-hidden bg-white shadow-2xl rounded-md  ">
                            <h2 className=" text-gray-100 text-sm p-4 bg-blue-500 bg-gradient-to-tr from-blue-700 uppercase">
                                Arrets
                            </h2>
                            <div className="p-4">
                                {
                                    arrets.map((i: any, index: number) => (
                                        <div key={index} className='p-2 border-b'>
                                           { i.nom} ({i.prix} fcfa)
                                        </div>
                                    ))
                                }
                                 <button onClick={close} className='border  p-1 rounded-md   mt-4 w-full bg-stone-700 text-white'>Fermer</button>
                            </div>
                           
                                                        
                        </div>
                    </div>
                    ) : null
                }
        </section>
    )
}

export default TrajetTable