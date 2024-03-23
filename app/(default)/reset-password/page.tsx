"use client";

import Image from 'next/image'
import img from '@/public/images/bus.png'
import Link from 'next/link'
import { FormEvent, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
// import Cookies from "js-cookie";

export default function Home() {


  const [tel, setTel] = useState<string>("");
  const [nom, setNom] = useState<string>("");
  const [mdp, setMdp] = useState<string>("");
  const [mdp2, setMdp2] = useState<string>("");
  const [user, setUser] = useState<any>();
  const [step, setStep] = useState<boolean>(false);
  const [step2, setStep2] = useState<boolean>(false);
  const router = useRouter();


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const res = await fetch(`/api/utilisateurs?nomUtilisateur=${nom}&numCNI=${tel}`, {
      method: 'GET',
      cache: 'no-store',
    })
    if (res.ok) {
   
      const users: any[] = await res.json()
      if (users.length > 0) {
        setStep(true)
        setUser(users[0])
      }else{
        alert("Numéro de carte d'identité ne correspond pas au compte de " + nom)
      }

      // router.push('/signin')
      // document.getElementById('buttonReset')?.click();
    }
  }

  const handleSubmit2 = async (event: FormEvent) => {
    if (mdp === mdp2) {
      event.preventDefault();
      const data = {
        nomUtilisateur: user?.nomUtilisateur,
        motDePasse: mdp,
        dateCreationCompte: user?.dateCreationCompte,
        dateDerniereConnexion: user?.dateDerniereConnexion,
        blocke: user?.blocke,
        numCNI: user?.numCNI,
        employeId: parseInt(user?.employeId),
        isConnected: user?.isConnected,
        droitsAccesId: parseInt(user?.droitsAccesId),
      }
      const res = await fetch(`/api/utilisateurs?id=${user?.id}`, {
        method: 'PUT',
        cache: 'no-store',
        body: JSON.stringify(data)
      })
      if (res.ok) {
        setStep2(true)
        setStep(true)
        // router.push('/signin')
        // document.getElementById('buttonReset')?.click();
      }
    } else {
      alert("Les mots de passe ne pas identiques!");
    }
  }



  return (
    <main className="bg-cover  min-h-screen p-8 flex items-center  bg-blue-400 bg-gradient-to-t">
      <div className="mx-auto ">
        <div className="items-start justify-between shadow-2xl m-auto  w-full bg-white   rounded-md overflow-hidden">
          {
            !step && !step2 ? (
              <form onSubmit={handleSubmit} className='p-10 flex mx-auto items-center justify-center'>
                <div className=' m-auto'>
                  <h1 className='my-4 font-semibold text-center text-2xl text-gray-500 uppercase'>Récupération du compte </h1>
                  <h1 className='my-4 font-semibold text-center  text-gray-500 uppercase'>Entrez les informations suivantes</h1>
                  <div>
                    <div className="mb-6">
                      <label className="block mb-2 text-sm font-semibold text-gray-700 ">Nom d&apos;utilisateur</label>
                      <input type="text" required id="nom" onChange={e => setNom(e.target.value)} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                    </div>
                    <div className="mb-6">
                      <label className="block mb-2 text-sm font-semibold text-gray-700 ">Numèro de Carte d&apos;identité</label>
                      <input type="text" required id="nom" onChange={e => setTel(e.target.value)} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                    </div>
                  </div>
                  <button type="submit" className=" border w-full border-blue-700 block text-blue-700 hover:bg-blue-800 hover:text-white px-4 focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm p-2 text-center me-2 mb-2">Valider</button>
                  <Link href={`/signin`} className='text-xs text-blue-500 font-bold hover:underline'>Retour à la page de connexion</Link>
                  <div className='flex flex-row justify-center gap-4 mt-4'>
                    <div className='basis-3 bg-blue-400 rounded-full h-3'></div>
                    <div className='basis-3 bg-stone-400 rounded-full h-3'></div>
                    <div className='basis-3 bg-stone-400 rounded-full h-3'></div>
                  </div>
                </div>
              </form>
            ) : null
          }
          {
            step && !step2 ? (
              <form onSubmit={handleSubmit2} className='p-10 max-w-xl flex mx-auto items-center justify-center'>
                <div className=' m-auto '>
                  <h1 className='my-4 font-semibold text-2xl uppercase text-gray-500 '>Récuperer du compte </h1>
                  <h1 className='my-4 font-semibold text-center  text-gray-500 uppercase'>Entrez votre nouveau mot de passe {nom}</h1>
                  <div>
                    <div className="mb-6">
                      <label className="block mb-2 text-sm font-semibold text-gray-700 ">Nouveau mot de passe</label>
                      <input type="password" required name='password' id="password" onChange={e => setMdp(e.target.value)} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                    </div>
                    <div className="mb-6">
                      <label className="block mb-2 text-sm font-semibold text-gray-700 ">Confirmer le nouveau mot de passe</label>
                      <input type="password" required name='password2' id="password2" onChange={e => setMdp2(e.target.value)} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                    </div>
                  </div>
                  <button type="submit" className=" border w-full border-blue-700 block text-blue-700 hover:bg-blue-800 hover:text-white px-4 focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm p-2 text-center me-2 mb-2">Valider</button>
                  <div className='flex flex-row justify-center gap-4 mt-4'>
                    <div className='basis-3 bg-blue-400 rounded-full h-3'></div>
                    <div className='basis-3 bg-blue-400 rounded-full h-3'></div>
                    <div className='basis-3 bg-stone-400 rounded-full h-3'></div>
                  </div>
                </div>
              </form>
            ) : null
          }
          {
            step && step2 ? (
              <div className='p-10 max-w-xl flex mx-auto items-center justify-center'>
                <div className=' m-auto '>
                  <h1 className='my-4 font-semibold text-2xl uppercase text-gray-500 '>Compte récuperé </h1>
                  {/* <h1 className='my-4 font-semibold text-center  text-gray-500 uppercase'>Entrez les indivations suivantes</h1> */}
                  <Link href={`/signin`} className='text-xs text-blue-500 text-center font-bold hover:underline'>Vous pouvez vous connecter avec votre nouveau mot de passe</Link>
                </div>
                <div className='flex flex-row justify-center gap-4 mt-4'>
                  <div className='basis-3 bg-blue-400 rounded-full h-3'></div>
                  <div className='basis-3 bg-blue-400 rounded-full h-3'></div>
                  <div className='basis-3 bg-blue-400 rounded-full h-3'></div>
                </div>
              </div>
            ) : null
          }
        </div>
      </div>
    </main>

  )
}