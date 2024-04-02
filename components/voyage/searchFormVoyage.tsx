import { getDateFormat } from "@/functions/actionsClient"
import ToggleInput from "../ui/toggleInput"
import { FormEvent, useState, useEffect } from "react"
import Link from "next/link"

const SearchFormVoyage = () => {
    const [bus, setBus] = useState<any[]>([])
    const [trajet, setTrajet] = useState<any[]>([])
    const [datas, setDatas] = useState<any[]>([])
    const [data, setData] = useState<any>()
    const [bol, setBol] = useState<boolean>()
    const [typeVoyage, setTypeVoyage] = useState<string>("aller simple")

    const handleInputChange = (event: any) => {
        const target = event.target
        const data = target.type === 'checkbox' ? target.checked : target.value
        setData((oldValue: any) => {
            return { ...oldValue, [target.name]: data }
        })
    }

    const HandlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await fetch(`/api/voyages?busId=${data?.busId}&trajetId=${data?.trajetId}`, {
                method: 'GET',
                cache: "no-store",
            })

            if (response.ok) {
                const d = await response.json();
                setDatas(d)
                setBol(true)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        const getTrajet = async () => {
            const res = await fetch("/api/trajets", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setTrajet(data)
        };

        const getBus = async () => {
            const res = await fetch("/api/bus", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setBus(data)
        };
        getBus();
        getTrajet();
    }, [])

    const handlerEmit = (val: string) => {
        setTypeVoyage(val)
    }
    return (
        <section className="w-full h-full bg-white shadow-xl rounded-sm">
            <h2 className=" text-white bg-green-600 p-4 border-b uppercase">
                Rechercher
            </h2>
            <div className="p-4">
                <form onSubmit={HandlerSubmit}>
                    <div className="flex items-end gap-2">
                        <div>
                            <label htmlFor="" className="text-sm font-bold">Trajets</label>
                            <select id="trajetId" name="trajetId" onChange={handleInputChange} className="block p-2 text-sm font-bold text-gray-900 border shadow  border-gray-300  focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-green-400 ">
                                <option></option>
                                {trajet.map((item: any, i: number) => (
                                    <option key={i} value={[item.id]}>{item.lieuDepart} - {item.lieuArrivee} ({item.heureArrivee} - {item.heureDepart})</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="" className="text-sm font-bold">Bus</label>
                            <select id="busId" name="busId" onChange={handleInputChange} className="block p-2 text-sm text-gray-900 border shadow  border-gray-300  focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-green-400 ">
                                <option></option>
                                {bus.map((item: any, i: number) => (
                                    <option key={i} value={item.id}>{item.marque} {item.modele} ({item.typeBus})</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className=" p-2 text-sm font-medium text-white bg-green-700 rounded-sm border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            Rechercher
                        </button>
                    </div>
                </form>
            </div>
            {
                bol ? (
                    <div className="w-full fixed top-0 h-full left-0 bg-black/40 z-40 flex justify-center items-center">
                        <div className=" max-w-7xl bg-white">
                            <h2 className="font-bold p-4 uppercase text-xl text-gray-700">Resultat de la recherche</h2>
                            <table className="w-full text-sm text-left rtl:text-right  text-gray-900  dark:text-gray-400">
                                <thead className="text-sm border text-gray-700  dark:text-gray-400">
                                    <tr>
                                        <th rowSpan={1} scope="row" colSpan={1} className="border-b-2 p-2 border ">
                                            #Id
                                        </th>
                                        <th rowSpan={1} colSpan={1} scope="row" className="border-b-2 p-2  border ">
                                            Date de départ
                                        </th>
                                        <th rowSpan={1} colSpan={1} className="border-b-2 p-2 border ">
                                            Date d&apos;arrivée
                                        </th>
                                        <th rowSpan={1} colSpan={1} className="border-b-2 p-2 border ">
                                            Places Disponible
                                        </th>
                                        <th rowSpan={1} colSpan={1} className="border-b-2 p-2 border ">
                                            Prix du voyage
                                        </th>
                                        <th>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datas.map((item: any, i: number) => (
                                        <tr key={i} className="border-b hover:bg-gray-200  border-gray-200 text-sm bg-gray-50  dark:border-gray-700">
                                            <th className="p-2 border ">
                                            {item.numVoyage}
                                            </th>
                                            <th className="p-2 border ">
                                                {getDateFormat(item.dateDepart)}
                                            </th>
                                            <td className="p-2 border">
                                                {getDateFormat(item.dateArrivee)}
                                            </td>
                                            <td className="p-2 border">
                                                {item.placeDisponible}
                                            </td>
                                            <td className="p-2 border">
                                                {item.prixVoyage}
                                            </td>
                                            <td>
                                                <Link href={`/dashboard/admin/voyages/${item.id}`} className='bg-cyan-400 p-2 text-white '>Bordereau de route</Link>
                                                <Link href={`/dashboard/admin/voyages/${item.id}/editer`} className='bg-yellow-400 p-2 '>Editer</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button onClick={()=> setBol(false)} className="bg-stone-800 text-white p-2">Fermer</button>
                        </div>
                    </div>
                ) : null
            }


        </section>
    )
}

export default SearchFormVoyage