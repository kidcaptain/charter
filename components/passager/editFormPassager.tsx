import { FormEvent, useEffect, useState } from "react"

interface Passager {
    id: number,
    nom: string,
    prenom: string,
    adresse: string,
    dateNaissance: string,
    genre: string,
    telephone: number,
    email: string
}
const EditFormPassager = (props: { item: Passager }) => {

    const [data, setData] = useState<any>(props.item)
    const [agence, setAgence] = useState<any[]>([])

    const handleInputChange = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const HandlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await fetch(`/api/passagers?id=${props.item.id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
            })
            const a = await response.json()

            if (response.ok) {
                console.log(a)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const getAgence = async () => {
            const res = await fetch("/api/agences", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setAgence(data)
        };
        getAgence();
        setData(props.item)
    }, [props])


    return (

        <form onSubmit={HandlerSubmit} className=" bg-white w-full h-full ">
            <h1 className=" p-4 text-white bg-cyan-600 uppercase border-b">Editer</h1>
            <div className=" p-4">
                <div className="mt-4  gap-4">
                    <label className="block mb-1 text-sm font-bold text-gray-700 dark:text-white">Nom</label>
                    <input type="text" value={data.nom} onChange={handleInputChange} id="nom" name="nom" className="block w-full p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                </div>
                <div className="mt-4">
                    <label className="block mb-1 text-sm font-bold text-gray-700 dark:text-white">Prénom</label>
                    <input type="text" value={data.prenom} onChange={handleInputChange} id="prenom" name="prenom" className="block w-full p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                </div>
                <div className="mt-4">
                    <label className="block mb-1 text-sm font-bold text-gray-700 dark:text-white">Adresse</label>
                    <input type="text" value={data.adresse} onChange={handleInputChange} id="adresse" name="adresse" className="block w-full p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                </div>
                {/* <div className="mt-4">
                    <label className="block mb-1 text-sm font-bold text-gray-700 dark:text-white">Numéro de Carte d&apos;identité</label>
                    <input type="text" value={data.nom} id="prenom" className="block w-full p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                </div> */}
                <div className="mt-4">
                    <label className="block mb-1 text-sm font-bold text-gray-700 dark:text-white">Date de naissance</label>
                    <input type="date" value={data.dateNaissance} onChange={handleInputChange} id="dateNaissance" name="dateNaissance" className="block w-full p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                </div>
                <div className="mt-4">
                    <label className="block mb-1 text-sm font-bold text-gray-700 dark:text-white">Genres</label>
                    <div className="flex gap-4">
                        <input type="checkbox" id="genrem" value="m" onChange={handleInputChange} checked={data.genre === "m"} name="genre" className="block p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                        <label htmlFor="genrem" className="text-xs font-bold text-gray-700">Homme</label>
                        <input type="checkbox" id="genref" value="f" onChange={handleInputChange} checked={data.genre === "f"} name="genre" className="block p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                        <label htmlFor="genref" className="text-xs font-bold text-gray-700">Femme</label>
                    </div>
                </div>
                <div className="mt-4">
                    <label className="block mb-1 text-sm font-bold text-gray-700 dark:text-white">Numèro de téléphone:</label>
                    <input type="tel" id="telephone" value={data.telephone} onChange={handleInputChange} name="telephone" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2 focus:ring-2  focus:outline-none sm:text-md focus-visible:ring-blue-400" placeholder="620456789" />
                </div>
                <div className="mt-4">
                        <label htmlFor="" className="block mb-1 text-sm font-bold text-gray-900 ">Agence</label>
                    <select name="agenceId" value={data.agenceId}  autoComplete="off" onChange={handleInputChange} className={`block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 `} id="agenceId">
                        <option value="" ></option>
                        {agence.map((item: any, index: number) => (
                            <option value={item.id} key={index}>{item.nom}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="text-white  flex mt-4 py-2 items-center gap-2 justify-center hover:shadow-md transition ease-linear hover:bg-cyan-700 rounded-sm bg-cyan-500 text-sm  from-cyan-600 bg-gradient-to-t p-2">
                    Modifer
                </button>
            </div>
        </form>
    )
}

export default EditFormPassager