"use client"
import Link from "next/link";
import CardVoyage from "./cardVoyage";
import { usePathname } from "next/navigation";

export default function ModalListPassager(props: {childToParent: Function, isOpen: boolean}) {

    const pathname = usePathname()
    return (
        <section className="bg-black/50 w-full h-full top-0 left-0 absolute z-20">
            <div className="max-w-3xl mx-auto my-auto mt-4">
                <div className="bg-white p-4 px-8 rounded-md shadow-2xl shadow-black ">
                    <h1 className="text-center font-bold my-4 text-2xl uppercase">Bordereau de route</h1>
                    <div className="flex justify-between text-sm uppercase">
                        <h4><span className="font-bold">Départ</span>: BAFANA</h4>
                        <h4><span className="font-bold">Déstination</span>: YAOUNDE</h4>
                    </div>
                    <div className=" grid grid-cols-4 items-start text-sm my-4 text-center">
                        <div className="border"><span className="font-bold ">Date</span>: 13/02/2023</div>
                        <div className="border"><span className="font-bold">Heure</span>: 15:20</div>
                        <div className="border"><span className="font-bold">Bus N°</span>: 667</div>
                        <div className="border"><span className="font-bold">Voyage N°</span>: 1</div>
                    </div>
                    <div className="overflow-hidden bg-stone-200" style={{ maxHeight: 800 }}>
                        <table className="w-full text-sm text-left rtl:text-right border dark:text-gray-400">
                            <thead className="text-xs uppercase bg-gray-100 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className=" p-2 border bg-gray-50 dark:bg-gray-800">
                                        N°
                                    </th>
                                    <th scope="col" className=" p-2 border bg-gray-50 dark:bg-gray-800">
                                        Nom et Prénom
                                    </th>
                                    <th scope="col" className="p-2 border ">
                                        N° CNI
                                    </th>
                                    <th scope="col" className="p-2 border bg-gray-50 dark:bg-gray-800">
                                        Tarif
                                    </th>
                                    <th scope="col" className="p-2 border">
                                        Prix Total
                                    </th>
                                    <th scope="col" className="p-2 border">
                                        N° Ticket
                                    </th>

                                </tr>
                            </thead>
                            <tbody className="bg-gray-50">
                                <tr className="border-b border-gray-200 dark:b">
                                    <th scope="row" className="p-2 border font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                        1
                                    </th>
                                    <th scope="row" className="p-2 border font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                        Nana
                                    </th>
                                    <td className="border">
                                        20191530Y15
                                    </td>
                                    <td className="p-2 bg-gray-50 border dark:bg-gray-800">
                                        4500
                                    </td>
                                    <td className="p-2 border">
                                        4500
                                    </td>
                                    <td className="p-2 border">
                                        350
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <div className="bg-gray-100 p-4 text-xs">
                            <div className="my-2"><div className="font-bold  uppercase py-2 ">Nom du chauffeur</div> Youssoufa</div>
                            <div className="my-2"><div className="font-bold uppercase py-2 ">Chef d&apos;agence arrivée</div> BAFANA</div>
                            <div className="my-2"><div className="font-bold uppercase py-2 ">Heure d&apos;arrivée</div> BAFANA</div>
                            <div className="my-2"><div className="font-bold uppercase py-2 ">Observation</div> BAFANA</div>
                        </div>
                        <div className="  text-xs bg-stone-200">
                            <div className=" grid grid-cols-2"><div className="font-bold uppercase p-2 border border-stone-600">Carburant</div> <div className=" uppercase p-2 border border-stone-600">4500</div></div>
                            <div className=" grid grid-cols-2"><div className="font-bold uppercase p-2 border border-stone-600">Peage</div> <div className="uppercase p-2 border border-stone-600">1500</div></div>
                            <div className=" grid grid-cols-2"><div className="font-bold uppercase p-2 border border-stone-600">Ration</div> <div className="uppercase p-2 border border-stone-600"></div></div>
                            <div className=" grid grid-cols-2"><div className="font-bold uppercase p-2 border border-stone-600">Autres depenses</div> <div className=" uppercase p-2 border border-stone-600">4000</div></div>
                            <div className=" grid grid-cols-2"><div className="font-bold uppercase p-2 border border-stone-600">Recette nette</div> <div className=" uppercase p-2 border border-stone-600">10000</div></div>
                        </div>
                    </div>
                  <div className="flex">
                  <button className="text-blue-500 font-bold mt-2 text-xs flex items-center gap-2 justify-center p-2">Imprimer</button>
                    <Link href={`${pathname}/4`}  className="text-yellow-600 font-bold mt-2 text-xs flex items-center gap-2 justify-center p-2">Modifier</Link>
                  </div>
                    <button onClick={() => props.childToParent(!props.isOpen)} className=" font-bold text-white w-full text-sm p-2 mt-4 mx-auto bg-stone-400 from-stone-500 bg-gradient-to-tr rounded-md">Fermer</button>
                </div>
            </div>
        </section>
    )

}