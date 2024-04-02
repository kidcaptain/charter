"use client";

import Image from 'next/image'
import img from '@/public/images/bus.jpg';
import loaderSvg from '@/public/images/loader.svg';
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react';
import React from 'react';

export default function Page() {

  const [mdp, setMdp] = useState<string>("");
  const [nom, setNom] = useState<string>("");
  const [isLogging, setIsLogging] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const signInData = await signIn('credentials', {
      username: nom.trim(),
      password: mdp.trim(),
      redirect: false,
    });
    setIsLogging(true)
    setTimeout(() => {
      if (signInData?.error) {
        setIsLogging(false)
        setMessage("Le Mot de passe ou le nom d'utilisateur est incorrect ou utilisateur inexistant!")
        console.log(signInData.error);
      } else {
        router.refresh()
        router.push("/hub")
      }
    }, 2000);

  }

  return (
    <main className="bg-cover  min-h-screen relative p-8 flex items-center  bg-stone-100 bg-gradient-to-t">
      <div className='grid grid-cols-2 absolute z-0 top-0 w-full h-full left-0'>
        <div className='col-span-1 bg-blue-500'>

        </div>
      </div>
      <div className="mx-auto relative z-10 max-w-4xl ">
        <h1 className='text-center text-5xl font-bold my-4 '><span className='text-white'>Charter</span> <span className='text-blue-500'>Express</span> <span className='text-white'>Voyages</span></h1>
        <div className='grid grid-cols-2 items-start justify-between m-auto bg-white shadow-2xl border-blue-500   border-2  rounded-md overflow-hidden'>
          <div className='col-span-1 '>
            <Image
              className=" h-full w-full container "
              src={img}
              alt="Next.js Logo"
              width={500}
              height={0}
              priority
            />
          </div>
          <form onSubmit={e => onSubmit(e)} >
            <div className=' m-auto px-4'>
              <h1 className='mt-4 text-stone-600 text-2xl text-left uppercase'>S&apos;authentifier</h1>
              <h6 className='text-xs text-red-400 mb-4 font-medium text-left'>{message}</h6>
              <div className="mb-6">
                <label className="block mb-2 text-sm  text-gray-700 ">Nom d&apos;utilisateur</label>
                <input type="text" required id="nom" placeholder="Nom de l'utilisateur" value={nom} onChange={e => { setNom(e.target.value); setMessage("") }} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm  text-gray-700 ">Mot de passe</label>
                <input type="password" placeholder='Mot de passe' required id="mdp" value={mdp} onChange={e => { setMdp(e.target.value); setMessage("") }} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
                <Link href="/reset-password" className='text-sm text-right  text-blue-400'>Reinitialiser son mon de passe</Link>
              </div>
              <button type="submit" className="text-white w-full bg-gradient-to-r rounded-md from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2">Se connecter</button>
            </div>
          </form>
        </div>
      </div>
      {
        isLogging ? (
          <div className='fixed bg-black/30 w-full z-10 h-full top-0 left-0 flex items-center justify-center'>
            <Image
              className="animate-spin"
              src={loaderSvg}
              alt="Next.js Logo"
              width={50}
              height={50}
              priority
            />
          </div>
        ) : null
      }

    </main>
  )
}