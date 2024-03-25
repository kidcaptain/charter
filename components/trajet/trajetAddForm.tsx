"use client"
import svg from "@/public/images/valide.svg"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react"


const TrajetAddForm = (props: { childToParent: Function }) => {

    const [data, setData] = useState<any>();
    const [prixD, setprixD] = useState<number>(0);
    const router = useRouter();
    const className = "block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 "
    const [arrets, setArrets] = useState<{ nom: string, prix: number }[]>([])

    const handleInputChange = (event: any) => {
        const target = event.target
        const data = target.type === 'checkbox' ? target.checked : target.value
        setData((oldValue: any) => {
            return { ...oldValue, [target.name]: data }
        })
    }
    const handleArretInputChange = (val: any, index: number) => {
        let tab: { nom: string, prix: number }[] = arrets;
        if (val.type == "number") {
            tab[index].prix = parseInt(val.value.toString())
        } else {
            tab[index].nom = val.value.toString()
        }
        setArrets(tab)
    }
    const reset = () => {
        setData(null)
        setArrets([])
    }



    const HandlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let prix: number = 0;

        if (arrets.length > 0) {
            arrets.map((i) => {
                prix += i.prix;
            })
        } else {
            prix = data.prix;
        }
        const datas = { ...data, distance: 0, prix: parseInt(`${prix}`) + parseInt(`${prixD}`), arrets: JSON.stringify(data.tabArret) }
        try {
            const response = await fetch('/api/trajets', {
                method: 'POST',
                body: JSON.stringify(datas),
            })
            if (response.ok) {
                props.childToParent(true)
                const btn: HTMLElement | null = document.getElementById("resetbtn");
                btn?.click();
                setData(null);
            } else {
                props.childToParent(false)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const addArret = () => {
        const tab: { nom: string, prix: number }[] = arrets;
        tab.push({ nom: "", prix: 0 });
        setArrets(tab)
        router.refresh()
    }
    const deleteArret = () => {
        const tab: { nom: string, prix: number }[] = arrets;
        tab.pop();
        setArrets(tab)
        router.refresh()
    }
    const allDeleteArret = () => {
        const tab: { nom: string, prix: number }[] = arrets;
        tab.length = 0;
        setArrets(tab)
        router.refresh()
    }

    return (
        <form onSubmit={HandlerSubmit} className="col-span-1 overflow-hidden bg-white shadow-2xl rounded-md  ">
            <h2 className=" text-gray-100 font-bold p-4 bg-blue-500 uppercase">
                Créer un trajet de voyage
            </h2>
            <div className=" p-4">
                {((data?.lieudepart && data?.lieudepart != "") && (data?.lieuarrivee == data?.lieudepart)) ? (<div className="text-xs bg-yellow-100 my-2 p-4">Le lieu de départ et le lieu d&apos;arrivée sont pariels</div>) : null}
                <div className="mt-4">
                    <div className="flex gap-4 mb-1 items-start">
                        <label className="block text-sm font-bold text-gray-900 dark:text-white">Lieu de Départ</label>
                        {((data?.lieudepart && data?.lieudepart != "") && (data?.lieuarrivee != data?.lieudepart)) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                    </div>
                    <input onChange={handleInputChange} required type="text" id="lieudepart" placeholder="Départ" name="lieudepart" className={`${className} ${((data?.lieudepart && data?.lieudepart != "") && (data?.lieuarrivee != data?.lieudepart)) ? "bg-green-50 ring-green-400/30 ring-4" : ""}`} />
                </div>
                <div className="mt-4">
                    <div className="flex gap-4 mb-1 items-start">
                        <label className="block text-sm font-bold text-gray-900 dark:text-white">Lieu d&apos;arrivée</label>
                        {((data?.lieuarrivee && data?.lieuarrivee != "") && (data?.lieuarrivee != data?.lieudepart)) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                    </div>
                    <input onChange={handleInputChange} required type="text" id="lieuarrivee" placeholder="Arrivée" name="lieuarrivee" className={`${className} ${((data?.lieuarrivee && data?.lieuarrivee != "") && (data?.lieuarrivee != data?.lieudepart)) ? "bg-green-50 ring-green-400/30 ring-4" : ""}`} />
                </div>
                <button type="button" onClick={addArret} className="border-blue-400 border text-blue-400 mt-4 text-sm p-1" >Ajouter un arrêt</button>
                {
                    arrets.length > 0 ? (<fieldset >
                        <h3 className="mt-4 font-bold">Arrêts</h3>
                        {
                            arrets.map((i: { nom: string, prix: number }, index: number) => (
                                <div key={index} className="my-2">

                                    <label className="block text-sm  text-gray-900 dark:text-white">Arrêt N° {index + 1}</label>
                                    <input onChange={(e) => handleArretInputChange(e.target, index)} required type="text" id={`arretNom${index + 1}`} placeholder="nom" name={`arretNom${index + 1}`} className={`block my-1 text-sm w-full p-1.5 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400`} />
                                    <input onChange={(e) => handleArretInputChange(e.target, index)} required type="number" min={0} id={`arretPrix${index + 1}`} placeholder="prix" name={`arretPrix${index + 1}`} className={`block my-1 text-sm w-full p-1.5 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400`} />
                                </div>
                            ))
                        }
                        <div className="my-2">
                            <label className="block text-sm font-bold text-gray-900 dark:text-white">Prix du dernier arrêt au lieu d&apos;arrivée</label>
                            <input onChange={(e) => setprixD(parseInt(e.target.value))} required type="number" min={0} placeholder="prix" name="prixD" className={`block my-1 text-sm w-full p-1.5 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400`} />
                        </div>
                        
                    </fieldset>) : 
                    <div className="my-4">
                        <label className="block text-sm  font-bold text-gray-900 dark:text-white">Prix du trajet</label>
                        <input onChange={handleInputChange} required type="number" min={0} id="prix" placeholder="prix" name="prix" className={`block my-1 text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400`} />
                    </div>
                }
                <div className="grid grid-cols-3 gap-1">
                    {
                        arrets.length > 1 ?
                            <button type="button" onClick={deleteArret} className="border-red-400 border mt-2 text-red-400  text-sm p-1" >Retirer</button> : null}
                    {
                        arrets.length > 0 ?
                            <button type="button" onClick={allDeleteArret} className="border-stone-400 border mt-2 text-stone-400  text-sm p-1" >Tout annuler</button> : null}
                </div>
       
                <div className="mt-4 flex gap-4">
                    <button type="submit" className="text-white text-sm flex px-4  hover:shadow-md  hover:bg-blue-700 rounded-sm bg-blue-500   p-2">
                        Enregistrer
                    </button>
                    <button type="reset" onClick={reset} id="resetbtn" className="text-white text-sm flex px-4  hover:shadow-md  hover:bg-stone-700 rounded-sm bg-stone-500 p-2">
                        Recommencer
                    </button>
                </div>
            </div>

        </form>
    )
}

export default TrajetAddForm