"use client"

import { useState } from "react"

export default function Page() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    }

    const modalForm = () => {
        if (isOpen) {
            return (
                <div className="absolute bg-black/60 z-10 top-0 left-0 flex justify-center items-center w-full h-full">
                    <form className="w-96   bg-white p-8 rounded-2xl flex flex-col justify-between shadow-xl">
                        <h2 className="my-2 text-left font-bold text-black text-2xl">
                            Reser
                        </h2>
                        <form>
                            <div className="mt-2">
                                <label className="  text-xs font-medium text-gray-700  ">Nom</label>
                                <input type="text" required id="nom" className="block text-xs w-full p-1 text-gray-900 border border-gray-300 rounded-lg focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                            </div>
                            <div className="mt-2">
                                <label className="  text-xs font-medium text-gray-700  ">Adresse</label>
                                <input type="text" required id="prenom" className="block text-xs w-full p-1 text-gray-900 border border-gray-300 rounded-lg focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                            </div>
                            <div className="mt-2">

                                <label className="  text-xs font-medium text-gray-700  ">Numéro</label>
                                <input type="text" required id="prenom" className="block text-xs w-full p-1 text-gray-900 border border-gray-300 rounded-lg focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />

                            </div>

                        </form>
                        <button type="button" className="text-white flex px-6 text-xs mt-4 m-auto py-2 items-center gap-2 justify-center hover:shadow-md transition ease-linear hover:from-blue-700 rounded-md bg-blue-500 from-blue-600 bg-gradient-to-t p-2">
                            Enregistrer
                        </button>
                        <button onClick={handleButtonClick} className="hover:text-black text-stone-800 font-bold mt-2 text-xs flex items-center gap-2 justify-center p-2">Fermer</button>
                    </form>
                </div>
            )
        } else {
            return (<></>)
        }
    }
    return (
        <div className="w-full mx-auto">
            <h1 className="text-4xl uppercase text-gray-600 my-5">Tickets</h1>
            {modalForm()}
            <div className="flex gap-2 items-center my-2">
                <form className="flex items-center flex-row justify-start gap-2">
                    <input type="date" name="" className="p-2.5 w-52 rounded-md text-stone-500 border focus:outline-none text-xs focus:ring-green-400 focus:ring-4" id="" />
                    <select id="countries" className="block w-full p-2 font-semibold text-xs text-gray-900 border border-gray-300 rounded-lg focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                        <option value="0">Disponible</option>
                        <option value="1">Reservé</option>
                        <option value="2">Annulé</option>
                    </select>
                    <button className="text-white bg-green-600 border-b from-green-500 bg-gradient-to-t text-xs flex items-center gap-2 justify-center p-2.5 rounded-md">Rechercher</button>
                </form>
                {/* <button onClick={handleButtonClick} className="text-white bg-blue-600 from-blue-500 bg-gradient-to-t text-xs flex items-center gap-2 justify-center p-2.5 rounded-md">Nouvelle reservation</button> */}
            </div>
            <div className="py-7 col-span-3 w-full bg-white shadow-xl rounded-2xl">
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                    Id#
                                </th>
                                <th>
                                    NumVoyage
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Numéro de siège
                                </th>
                                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                    Prix du ticket (En Fcfa)
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Statut du ticket
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-bold text-sm text-gray-900 whitespace-nowrap bg-gray-50   dark:bg-gray-800">
                                    1
                                </th>
                                <td className="px-6 py-4">
                                    510
                                </td>
                                <td className="px-6 py-4">
                                    02
                                </td>
                                <td className="px-6 py-4">
                                    4500
                                </td>

                                <td className="px-6 py-4">
                                    <span className="text-yellow-400 font-bold">réservé</span>
                                </td>

                                <td className="px-6 py-4 flex flex-row">
                                    <button className="text-red-500 font-bold mt-2 text-xs flex items-center gap-2 justify-center p-2">Annuler le ticket</button>
                                    <button className="text-green-500 font-bold mt-2 text-xs flex items-center gap-2 justify-center p-2">Marquer le ticket disponible</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}