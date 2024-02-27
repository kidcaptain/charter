"use client";

import Image from 'next/image'
import img from '@/public/images/bus.jpg'
import Link from 'next/link'
import { FormEvent, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react';
import { useSession, getSession } from 'next-auth/react';
// import Cookies from "js-cookie";

export default function Page() {
    
    const [mdp, setMdp] = useState<string>("");
    const [nom, setNom] = useState<string>("");
    const router = useRouter();

    const addUserAdmin = async (id: number) => {
        const date = new Date()
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        const hours = (date.getHours()) < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
        const minutes = (date.getMinutes()) < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
        const datas = {
            nomUtilisateur: nom,
            motDePasse: mdp,
            dateCreationCompte: `${year}-${month}-${day}T${hours}:${minutes}`,
            dateDerniereConnexion: `${year}-${month}-${day}T${hours}:${minutes}`,
            blocke: "false",
            numCNI: `CE0`,
            employeId: 0,
            isConnected: "no",
            droitsAccesId: id

        }
        const res = await fetch('/api/utilisateurs', {
            method: 'POST',
            cache: 'no-store',
            body: JSON.stringify(datas),
        })
        if (res.ok) {
            router.push('/signin')
            document.getElementById('buttonReset')?.click();
        }
    }

    const HandlerSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const r = await fetch('/api/acces?TypeDroits=administrater', { method: 'GET', cache: "no-store" })
            const rep = await r.json();
            if (!r.ok) {
                if (confirm("Une erreur c'est produite veuillez actualiser la page et reessayer!")) {
                    window.location.reload()
                }else{
                    return null
                }
            }
            if (rep == null) {
                const create = await fetch('/api/acces', { method: "POST", body: JSON.stringify({ TypeDroits: "administrateur" }), cache: "no-store" });
                if (create.ok) {
                    const createRep = await create.json();
                    addUserAdmin(createRep.id)
                }
            } else {
                addUserAdmin(rep.id)
            }
        } catch (err: any) {
            if (confirm("Une erreur c'est produite veuillez actualiser la page et reessayer!")) {
                window.location.reload()
            }else{
                return null
            }
        }
    }


    return (
        <main className="bg-cover  min-h-screen p-8 flex items-center  bg-blue-400 bg-gradient-to-t">
            <div className="mx-auto max-w-4xl">
                <div className="items-start justify-between shadow-2xl m-auto  bg-white   rounded-md overflow-hidden">
                    <form onSubmit={HandlerSubmit} className="px-4">
                        <div className="m-auto w-96">
                            <h1 className='my-4 text-stone-600 text-lg text-center uppercase'>Enregistrer l&apos;administrateur</h1>
                            <div className="p-4">
                                <div className="mt-4  gap-4">
                                    <label className="block mb-1 text-sm font-medium text-gray-700  ">Nom d&apos;utilisateur</label>
                                    <input type="text" placeholder="Nom d'utilisateur" required autoComplete="off" onChange={e => setNom(e.target.value)} id="nomUtilisateur" name="nomUtilisateur" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-sm focus-visible:ring-blue-400 " />
                                </div>
                                <div className="mt-4">
                                    <label className="block mb-1 text-sm font-medium text-gray-700  ">Mot de passe</label>
                                    <input type="password" placeholder="Mot de Passe" name="motDePasse" required autoComplete="off" onChange={e => setMdp(e.target.value)} id="motDePasse" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-sm focus-visible:ring-blue-400 " />
                                </div>
                            </div>
                            <button type="submit" className="text-white w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center me-2 mb-2">S&apos;authentifier</button>
                            {/* <Link href={`/dashboard/${route}/home`}>{route}</Link> */}
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}