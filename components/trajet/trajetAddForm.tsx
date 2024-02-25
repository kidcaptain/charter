"use client"
import svg from "@/public/images/valide.svg"
import Image from "next/image";
import { FormEvent, useState } from "react"


const TrajetAddForm = (props: { childToParent: Function }) => {

    const [data, setData] = useState<any>();

    const className = "block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 "

    const handleInputChange = (event: any) => {
        const target = event.target
        const data = target.type === 'checkbox' ? target.checked : target.value
        setData((oldValue: any) => {
            return { ...oldValue, [target.name]: data }
        })
    }
    const reset = () => {
        setData(null)
    }
    const HandlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/trajets', {
                method: 'POST',
                body: JSON.stringify(data),
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

    return (
        <form onSubmit={HandlerSubmit} className="col-span-1 overflow-hidden bg-white shadow-2xl rounded-md  ">
            <h2 className=" text-gray-100 font-bold p-4 bg-blue-500 bg-gradient-to-tr from-blue-700 uppercase">
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
                <div className="mt-4">
                    <div className="flex gap-4 mb-1 items-start">
                        <label className="block text-sm font-bold text-gray-900 dark:text-white">Heure de Départ</label>
                        {((data?.heuredepart && data?.heuredepart != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                    </div>

                    <input onChange={handleInputChange} required type="time" id="heuredepart" name="heuredepart" className={`${className} ${((data?.heuredepart && data?.heuredepart != "")) ? "bg-green-50 ring-green-400/30 ring-4" : ""} `} />
                </div>
                <div className="mt-4">
                    <div className="flex gap-4 mb-1 items-start">
                        <label className="block text-sm font-bold text-gray-900 dark:text-white">Heure d&apos;arrivée</label>
                        {((data?.heurearrivee && data?.heurearrivee != "")) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                    </div>
                    <input onChange={handleInputChange} required type="time" id="heurearrivee" name="heurearrivee" className={`${className} ${((data?.heurearrivee && data?.heuredepart != "")) ? "bg-green-50 ring-green-400/30 ring-4" : ""}`} />
                </div>
                <div className="mt-4">
                    <div className="flex gap-4 mb-1 items-start">
                        <label className="block text-sm font-bold text-gray-900 dark:text-white">Nombre de kilomètre entre les deux points</label>
                        {((data?.distance && parseInt(data?.distance) > 0)) ? (<Image src={svg} width={15} height={15} alt="Image" />) : null}
                    </div>
                    <input onChange={handleInputChange} required type="number" id="distance" name="distance" className={`${className} ${((data?.distance && data?.distance != "") && parseInt(data?.distance) > 0) ? "bg-green-50 ring-green-400/30 ring-4" : ""}`} />
                </div>
                <div className="mt-4 flex gap-4">
                    <button type="submit" className="text-white text-sm flex px-4  hover:shadow-md  hover:bg-blue-700 rounded-sm bg-blue-500   p-2">
                        Enregistrer
                    </button>
                    <button type="reset" onClick={reset} id="resetbtn" className="text-white text-sm flex px-4  hover:shadow-md  hover:bg-stone-700 rounded-sm bg-stone-500 p-2">
                        Reset
                    </button>
                </div>
            </div>
            
        </form>
    )
}

export default TrajetAddForm
