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


  const typeUser = useRef<any>();
  const [mdp, setMdp] = useState<string>("");
  const [nom, setNom] = useState<string>("");
  const router = useRouter();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const signInData = await signIn('credentials', {
      username: nom,
      password: mdp,
      redirect: false,
    });
    if (signInData?.error) {
      console.log(signInData.error);
    } else {
      router.refresh()
      router.push("/hub")
    }
  }



  return (
    <main className="bg-cover  min-h-screen p-8 flex items-center  bg-stone-100 bg-gradient-to-t">
      <div className="mx-auto max-w-4xl">
        <div className='grid grid-cols-2 items-start justify-between shadow-xl m-auto  bg-white    border-2  rounded-md overflow-hidden'>
          <div className='col-span-1 '>
            <Image
              className=" h-full w-full container"
              src={img}
              alt="Next.js Logo"
              width={500}
              height={4007}
              priority
            />
          </div>
          <form onSubmit={e => onSubmit(e)} className='px-4'>
            <div className=' m-auto w-96'>
              <h1 className='my-4 text-stone-600 text-2xl text-center uppercase'>S&apos;authentifier</h1>
              <div className="mb-6">
                <label className="block mb-2 text-sm  text-gray-700 ">Identifiant</label>
                <input type="text" required id="nom" value={nom} onChange={e => setNom(e.target.value)} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm  text-gray-700 ">Mot de passe</label>
                <input type="password" required id="mdp" value={mdp} onChange={e => setMdp(e.target.value)} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                <Link href="/reset-password" className='text-sm text-right  text-blue-400'>Reinitialiser son mon de passe</Link>

              </div>
              <button type="submit" className="text-white w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center me-2 mb-2">Se connecter</button>
              {/* <Link href={`/dashboard/${route}/home`}>{route}</Link> */}
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}