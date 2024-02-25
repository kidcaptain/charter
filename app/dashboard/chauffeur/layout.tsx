'use client'
// import { useEffect } from 'react'

import UserAccountNav from "@/components/ui/userAccountNav"
import { SessionProvider } from "next-auth/react"
import Link from "next/link";
import { usePathname } from "next/navigation"

export default function TicketSaleLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname();
  const classname = `text-sm p-2 text-center`
  // useEffect(() => {
  //   if (localStorage.getItem('user') === "text-stone-600 hover:text-stone-900 ") {
  //     navigate('/')
  //   }
  // })

  return (
    <main className="flex">

      <section className=" w-full min-h-screen h-full bg-stone-200 overflow-hidden" >
        <header className=" w-full top-0 shadow-md left-0 py-4 z-10  bg-white">
          <div className=" mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-14">
              <nav className=" md:flex md:grow flex grow justify-end flex-wrap items-center">
                <div>
                  <h2 className="font-bold text-xl text-yellow-500">Charter express</h2>
                  <h4 className="text-stone-500">(Chauffeur/Conducteur)</h4>
                </div>
                <ul className="flex grow justify-end gap-4 flex-wrap items-center">
                  <li>
                    <Link href="/dashboard/chauffeur/vehicule"  className={`${classname} ${pathname === `/dashboard/chauffeur/vehicule` ? "text-blue-500 hover:text-blue-600 font-medium" : "text-stone-600 hover:text-stone-900 "}`}>
                      Accueil
                    </Link>
                  </li>
               
                  <UserAccountNav />
                </ul>
              </nav>
            </div>
          </div>
        </header>
        <div className=" w-full h-full relative min-h-screen justify-center">
          <SessionProvider>
            {children}
          </SessionProvider>
        </div>
    
      </section>
    </main>
  )
}