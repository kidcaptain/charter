export default function Page() {
    return (
        <div className="p-10 ">
            <div className="bg-white">
                <h2 className="p-4  uppercase border-b">
                    Fiche de dépenses journalières
                </h2>
                <div className="p-4 border">
                    <button className=" hover:bg-slate-200 text-sm border p-2 rounded-sm font-bold bg-slate-50">Modifier</button>
                    <button className=" hover:bg-slate-200 text-sm border p-2 rounded-sm font-bold bg-slate-50">Imprimer</button>
                </div>
                <div className="p-4">
                    <div>
                        <input type="date" name="" className="inline-block p-2 text-xs text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " id="" />
                        <button className=" hover:bg-green-600 inline-block text-xs border p-2 rounded-sm text-white bg-green-500">Génerer</button>
                    </div>
                </div>
            </div>
            <div className="p-4 w-full h-full min-h-full">
                <div className="max-w-5xl m-auto p-4 bg-white h-full w-full">
                    <div className="text-center font-bold my-8">
                        <h2>CHARTER EXPRESS VOYAGES</h2>
                        <ul className="text-xs">
                            <li>  ENTREPRISE DE TRANSPORT INTER-URBAIN</li>
                            <li> BP: 5029 YAOUNDE</li>
                            <li> N° Contribuable:M09020001474P</li>
                            <li>  RRCCM N°: 2002U04 du 15/10/2002</li>
                        </ul>

                    </div>
                    <div className="text-lg font-bold uppercase text-center p-4">
                        <span>Fiche de dépenses Journalieres du </span>
                    </div>
                    <div></div>
                    <div className="p-4">
                        <h1 className="p-2 text-center bg-stone-800 text-white">Depenses Mécaniques</h1>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400">
                            <thead className="text-sm bg-gray-200 text-gray-900 border dark:text-gray-400">
                                <tr>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800 ">
                                        
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800">
                                        Désignations
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800 ">
                                        Montants
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th className="px-1 py-3 border border-stone-800">
                                        25
                                    </th>
                                    <th className="px-1 py-3 border border-stone-800">
                                        Salaire de base
                                    </th>
                                    <th className="px-1 py-3 border border-stone-800">
                                        30000
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                        <h1 className="p-2 mt-8 text-center bg-stone-800 text-white">Autres dépenses</h1>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400">
                            <thead className="text-sm bg-gray-200 text-gray-900 border dark:text-gray-400">
                                <tr>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800">
                                        Désignations
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800 ">
                                        Montants
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th className="px-1 py-3 border border-stone-800">
                                        Salaire de base
                                    </th>
                                    <th className="px-1 py-3 border border-stone-800">
                                        30000
                                    </th>
                                </tr>
                            </tbody>
                        </table>    
                        
                    </div>
                </div>
            </div>
        </div>
    )
}