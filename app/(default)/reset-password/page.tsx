"use client";

import Image from 'next/image'
import img from '@/public/images/bus.png'
import Link from 'next/link'
import { FormEvent, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
// import Cookies from "js-cookie";

export default function Home() {

  const typeUser = useRef<any>();
  const [mdp, setMdp] = useState<string>("");
  const [nom, setNom] = useState<string>("");
  const router = useRouter();


  const getData = async (event: FormEvent) => {
    event.preventDefault();
    if (nom === "admin") {
      router.push("/dashboard/admin/home")
    }else{
      router.push("/dashboard/caisse/home")
    }
    // const response = await fetch(`/api/users?mdp=${mdp}&nom=${nom}`, {
    //   cache: "no-cache",
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
     
    // });

    // if (!response.ok) throw new Error("Login failed");
    // const user = await response.json(); 
    // switch (user[0].blocke) {
    //   case "standard":
    //       router.push("/dashboard/caisse/home")
    //     break;
    //   case "administrateur":
    //       router.push("/dashboard/admin/home")
    //     break;
    //   default:
    //     break;
    // }
    // localStorage.setItem('user', user[0]);

    // const { token } = await response.json();
    // document.cookie = `token=${token}; path=/`;
    // return response.json();
  }



  return (
    <main className="bg-cover  min-h-screen items-center justify-between p-8 flex bg-stone-800"> 
     <div className="mx-auto max-w-4xl">
     <h2 className='text-5xl text-white font-bold my-4 text-center  uppercase bg-gradient-to-l bg-clip-text'>Charter Express</h2>
     <div className='justify-between shadow-3xl shadow-black  m-auto  bg-white  rounded-2xl overflow-hidden'>
      
        <form onSubmit={e => getData(e)} className='p-5 max-w-xs flex mx-auto items-center justify-center'>
          <div className='max-w-sm m-auto  text-center'>
           <h1 className='my-4 font-semibold text-2xl uppercase'>Récuperer votre nom de passe </h1>
           <div>
             <div className="mb-6">
              <label className="block mb-2 text-sm font-semibold text-gray-700 ">Identifiant de l&apos;utilisateur</label>
              <input type="text" required id="nom" value={nom} onChange={e => setNom(e.target.value)} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-semibold text-gray-700 ">Numèro de Téléphone</label>
              <input type="text" required id="nom" value={nom} onChange={e => setNom(e.target.value)} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-2  focus:outline-none bg-gray-50 sm:text-md focus-visible:ring-blue-400 " />
            </div>
           </div>
            <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Envoie un message</button>
            {/* <Link href={`/dashboard/${route}/home`}>{route}</Link> */}
          </div>
        </form>
      </div>
     </div>
    </main>
  )
}