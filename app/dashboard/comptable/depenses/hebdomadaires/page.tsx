export default function Page() {
    return (
        <div className="p-10 ">
            <div className="bg-white">
                <h2 className="p-4  uppercase border-b">
                    Fiche hebdomadaires des depenses
                </h2>
                <div className="p-4 border">
                    <button className=" hover:bg-slate-200 text-sm border p-2 rounded-sm font-bold bg-slate-50">Créer une fiche hebdomadaire</button>
                    <button className=" hover:bg-slate-200 text-sm border p-2 rounded-sm font-bold bg-slate-50">Modifier</button>
                    <button className=" hover:bg-slate-200 text-sm border p-2 rounded-sm font-bold bg-slate-50">Imprimer</button>
                </div>
                <div className="p-4">
                    <div>
                        <input type="week" name="" className="inline-block p-2 text-xs text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " id="" />
                        <button className=" hover:bg-green-600 inline-block text-xs border p-2 rounded-sm text-white bg-green-500">Valider</button>
                    </div>
                </div>
            </div>
            <div className="p-4 w-full h-full min-h-full">
                <div className="max-w-5xl m-auto p-4 bg-white h-full w-full">
                    <div className="text-center font-bold my-8">
                        <h2 className="underline">CHARTER EXPRESS VOYAGES</h2>
                        <h4>Fiche Hebdomadaire des dépenses</h4>
                    </div>
                    <div className="text-xl p-4">
                        <span>Semaine du </span> <span>au</span>
                    </div>
                    <div></div>
                    <div className="p-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400">
                            <thead className="text-sm text-gray-900 border ">
                                <tr>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800 ">
                                        Date
                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">
                                        Brut
                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800 ">
                                        Dépenses
                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">
                                        Retenues
                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">
                                        Caissière
                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">
                                        Visa
                                    </th>
                                </tr>
                            </thead>
                            <tbody >
                                <tr className="font-normal" >
                                    <th className="px-3 py-4 border border-stone-800">
                                        Lundi
                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                </tr>
                                <tr className="font-normal" >
                                    <th className="px-3 py-4 border border-stone-800">
                                        Mardi
                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                </tr>
                                <tr className="font-normal" >
                                    <th className="px-3 py-4 border border-stone-800">
                                        Mercredi
                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                </tr>
                                <tr className="font-normal" >
                                    <th className="px-3 py-4 border border-stone-800">
                                        Jeudi
                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                </tr>

                                <tr className="font-normal" >
                                    <th className="px-3 py-4 border border-stone-800">
                                        Vendredi
                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                </tr>
                                <tr className="font-normal" >
                                    <th className="px-3 py-4 border border-stone-800">
                                        Samedi
                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                </tr>
                                <tr className="font-normal" >
                                    <th className="px-3 py-4 border border-stone-800">
                                        Dimanche
                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                </tr>
                                <tr className="font-normal" >
                                    <th className="px-3 py-4 border border-stone-800 uppercase">
                                        Totaux
                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                </tr>

                            </tbody>
                        </table>
                        <div className="mt-5">
                            <table className="w-1/2 text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400">
                                <tr>
                                    <th className="py-4 px-2 border border-stone-800">Banque</th>
                                    <th className="py-4 px-2 border border-stone-800"></th>
                                </tr>
                                <tr>
                                    <th className="py-4 px-2 border border-stone-800">Autres dépenses</th>
                                    <th className="py-4 px-2 border border-stone-800"></th>
                                </tr>
                                <tr>
                                    <th className="py-4 px-2 border border-stone-800"></th>
                                    <th className="py-4 px-2 border border-stone-800"></th>
                                </tr>
                            </table>
                        </div>
                        <div className="mt-5 flex justify-between">
                            <span className="font-bold">Chef d&apos;agence</span>
                            <div className="flex items-center gap-4">
                                <span className="font-bold">Solde</span>
                                <div className="border p-4 w-52">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}