"use client"

import { useEffect, useRef } from "react"


export default function Page() {
  
    return (
        <div className="mx-auto">
            <div className="grid grid-cols-4 gap-5">
                <div className="bg-blue-400 from-blue-500 justify-start gap-4 bg-gradient-to-l rounded-2xl shadow-lg text-white flex flex-row stroke-yellow-200 fill-yellow-300 items-center p-4 ">
                    <div>
                        <div className="bg-blue-50 p-2 rounded-full">
                            <svg width="48px" height="48px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="2"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"></path></g></svg>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">5</h2>
                        <h4 className="">Agences</h4>
                    </div>
                </div>

                <div className="bg-blue-500 from-blue-600 justify-start gap-4 bg-gradient-to-l rounded-2xl shadow-lg text-white flex flex-row stroke-yellow-200 fill-yellow-300 items-center p-4 ">
                    <div>
                        <div className="bg-blue-50 p-2 rounded-full">
                            <svg width="48px" height="48px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="2"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"></path></g></svg>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">200</h2>
                        <h4 className="">Employées</h4>
                    </div>
                </div>
                <div className="bg-blue-700 from-blue-800 justify-start gap-4 bg-gradient-to-l rounded-2xl shadow-lg text-white flex flex-row stroke-yellow-200 fill-yellow-300 items-center p-4 ">
                    <div>
                        <div className="bg-blue-50 p-2 rounded-full">
                            <svg width="48px" height="48px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="2"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"></path></g></svg>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">10</h2>
                        <h4 className="">Véhicules</h4>
                    </div>
                </div>
                <div className="bg-blue-900 from-blue-950 justify-start gap-4 bg-gradient-to-l rounded-2xl shadow-lg text-white flex flex-row stroke-yellow-200 fill-yellow-300 items-center p-4 ">
                    <div>
                        <div className="bg-blue-50 p-2 rounded-full">
                            <svg width="48px" height="48px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="2"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"></path></g></svg>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">10</h2>
                        <h4 className="">Utilisateurs de l&apos;application</h4>
                    </div>
                </div>
            </div>
            <h1 className="my-4 text-2xl text-stone-500">Enregistrement</h1>
            <div className="grid grid-cols-3 mt-4 gap-8 items-start">
                <form className="col-span-1 bg-white rounded-2xl p-8 shadow-xl">
                    <h2 className="my-4 font-bold text-slate-600 text-center">Nouveau Employé</h2>
                    <div className=" mx-auto">
                        <div className="mt-4 gap-4">
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Nom</label>
                            <input type="text" required id="nom" className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                        </div>
                        <div className="mt-4">
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Prénom</label>
                            <input type="text" required id="prenom" className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                        </div>
                        <div className="mt-4">
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Adresse</label>
                            <input type="text" required id="adresse" className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                        </div>
                        <div className="mt-4">
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Date de naissance</label>
                            <input type="date" required id="datenaissance" className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                        </div>
                        <div className="mt-4">
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Numéro de Carte d&apos;identité</label>
                            <input type="text" required id="datenaissance" className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                        </div>
                        <div className="mt-4">
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Genre</label>
                            <div className="flex gap-4">
                                <input type="checkbox" required id="genrem" value="m" className="block p-1 text-gray-900 border border-gray-300 rounded-lg focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                <label htmlFor="genrem" className="text-xs font-bold text-gray-700">Homme</label>
                                <input type="checkbox" required id="genref" value="f" className="block p-1 text-gray-900 border border-gray-300 rounded-lg focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                                <label htmlFor="genref" className="text-xs font-bold text-gray-700">Femme</label>
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Numèro de téléphone:</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-yellow-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 18">
                                        <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                                    </svg>
                                </div>
                                <input type="tel" id="tel" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2 focus:ring-2  focus:outline-none sm:text-md focus-visible:ring-blue-400" pattern="[0-9]{9}" placeholder="620456789" required />
                            </div>
                        </div>
                    </div>
                    <button type="button" className="text-white mt-4 flex w-full m-auto py-2 items-center gap-2 justify-center hover:shadow-md transition ease-linear hover:from-blue-700 rounded-md bg-blue-500 text-sm from-blue-600 bg-gradient-to-t p-2">
                        Enregistrer
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" width="24px" height="24px" viewBox="0 0 24 24"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></g></svg>
                    </button>
                </form>
                <div className="col-span-1 bg-white rounded-2xl p-8 shadow-xl">
                    <h2 className="my-4 font-bold text-slate-600 text-center">Bus</h2>
                    <div className="mx-auto">
                        <div className="mt-4  gap-4">
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Marque</label>
                            <input type="text" required id="nom" className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                        </div>
                        <div className="mt-4">
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Modèle</label>
                            <input type="text" required id="prenom" className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                        </div>
                        <div className="mt-4">
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Type de bus</label>
                            <select id="countries" className="block w-full p-2 uppercase text-xs text-gray-900 border border-gray-300 rounded-lg focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 ">
                                <option value="0">Vip</option>
                                <option value="1">Simple</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Année de Fabrication</label>
                            <input type="date" required id="datenaissance" className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                        </div>
                        <div className="mt-4">
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Capacité</label>
                            <input type="number" required id="datenaissance" className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                        </div>
                        <div className="mt-4">
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Place Disponible</label>
                            <input type="number" required id="datenaissance" className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                        </div>
                        <div className="mt-4">
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Place Total</label>
                            <input type="number" required id="datenaissance" className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                        </div>

                    </div>
                    <button type="button" className="text-white flex w-full mt-4 m-auto py-2 items-center gap-2 justify-center hover:shadow-md transition ease-linear hover:from-blue-700 rounded-md bg-blue-500 text-sm from-blue-600 bg-gradient-to-t p-2">
                        Enregistrer
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" width="24px" height="24px" viewBox="0 0 24 24"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></g></svg>
                    </button>
                </div>
                <div className="col-span-1 bg-white p-4 rounded-2xl shadow-xl">
                    <h2 className="my-2 font-bold text-slate-600">Utilisateur en ligne</h2>
                    <div className="relative overflow-x-auto">
                        <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">


                            <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                                <li className="flex items-center">
                                    <svg className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    Patrick
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    Paul
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-3.5 h-3.5 me-2 text-gray-500 dark:text-gray-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    Karl
                                </li>
                            </ul>

                        </ul>
                    </div>

                </div>
            </div>
        </div>
    )
}