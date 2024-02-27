"use client"

import { droitAccesData } from "@/datas/droitAccesData";
import { useState, useEffect } from "react";

const AddFormUser = (props: { childToParent: Function, item: any }) => {
    const [value, setValue] = useState<any>()
    const [droitAcces, setDroitAcces] = useState<any[]>([]);



    const HandlerSubmit = async (e: any) => {
        const date = new Date()
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        const hours = (date.getHours()) < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
        const minutes = (date.getMinutes()) < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
        e.preventDefault()
        console.log(props.item.numCNI)
        if (value != null) {
            try {
                const datas = {
                    nomUtilisateur: value.nomUtilisateur,
                    motDePasse: value.motDePasse,
                    dateCreationCompte: `${year}-${month}-${day}T${hours}:${minutes}`,
                    dateDerniereConnexion: `${year}-${month}-${day}T${hours}:${minutes}`,
                    blocke: "false",
                    numCNI: props.item.numCNI,
                    employeId: props.item.id,
                    isConnected: "no",
                    droitsAccesId: value.droitsAccesId
                }

                const res = await fetch('/api/utilisateurs', {
                    method: 'POST',
                    cache: 'no-store',
                    body: JSON.stringify(datas),
                })
                    console.log(res)
                if (res.ok) {
                    props.childToParent(true);
                    setValue(null);
                    document.getElementById('buttonReset')?.click();
                }
            } catch (err: any) {
                console.log(err)
                props.childToParent(false);
            }
        }
    }

    const handleInputChange = (event: any) => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setValue((oldValue: any) => {
            return { ...oldValue, [target.name]: value }
        })
    }

    useEffect(() => {
        const getDroitAcces = async () => {
            const res = await fetch("/api/acces", { cache: "no-store" })
            if (!res.ok) {
                console.log("error")
            }
            const data = await res.json();
            setDroitAcces(data)
        };
        getDroitAcces();
        
    }, [])
    return (
        <div className="bg-black/50 fixed z-40 h-full w-full top-0 left-0">
            <form onSubmit={HandlerSubmit} className="max-w-2xl  m-auto bg-white mt-20">
                <h2 className=" p-4 uppercase text-white bg-blue-500">
                    Ajouter {props.item.nom} comme utilisateur
                </h2>
                <div className="p-4">
                    <div className="mt-4  gap-4">
                        <label className="block mb-1 text-sm font-medium text-gray-700  ">Nom d&apos;utilisateur</label>
                        <input type="text" placeholder="Nom d'utilisateur" required autoComplete="off" onChange={handleInputChange} id="nomUtilisateur" name="nomUtilisateur" className="block w-full p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                    </div>
                    <div className="mt-4">
                        <label className="block mb-1 text-sm font-medium text-gray-700  ">Mot de passe</label>
                        <input type="password" placeholder="Mot de Passe" name="motDePasse" required autoComplete="off" onChange={handleInputChange} id="motDePasse" className="block w-full p-1 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="droitsAccesId" className="block mb-1 text-sm font-medium text-gray-700 ">Type De Droits</label>
                        <select name="droitsAccesId" required autoComplete="off" onChange={handleInputChange} className="block w-full p-2 uppercase text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " id="droitsAccesId">
                            <option value="" ></option>
                            {droitAcces.map((item: any, index: number) => (
                                <option value={item.id} key={index + 1}>{item.TypeDroits}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className=" bg-white p-4   ">
                    <button type="submit" className="text-white hover:shadow-md  hover:bg-blue-700 rounded-sm bg-blue-500 text-xs  p-2">
                        Enregistrer
                    </button>
                    <button type="reset" id="buttonReset" className="text-white hover:shadow-md ml-2 hover:bg-stone-700 rounded-sm bg-stone-500 text-xs  p-2">
                        Recommencer
                    </button>      
                     <button type="button" onClick={() => { props.childToParent(false);}} className="text-white hover:shadow-md ml-2 hover:bg-stone-700 rounded-sm bg-stone-500 text-xs  p-2">
                        Fermer
                    </button>
                </div>
            </form>
        </div>

    )
}

export default AddFormUser