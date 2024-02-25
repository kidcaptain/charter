"use client"
import Header from "@/components/ui/header"
import DashboardNav from "@/components/ui/dashboardNav";
import { LinksDirector } from "@/datas/links";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import UserAccountNav from "@/components/ui/userAccountNav";
import Link from "next/link";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const router = useRouter()


  const { data: session, status } = useSession()
  if (status === "unauthenticated") {
    router.push("/signin");
  }

  const [agence, setAgence] = useState<any>(null);

  useEffect(() => {

    const getEmploye = async () => {
      const res = await fetch("/api/utilisateurs/" + session?.user?.email, { cache: "no-store" })
      if (!res.ok) {
        return null
      }
      const data = await res.json();
      // setEmploye(data)
      // console.log(data)
      const res2 = await fetch("/api/employes/" + data.employeId, { method: "GET", cache: "no-store" })
      if (!res2.ok) {
        return null
      }
      const data2 = await res2.json();
      const res3 = await fetch("/api/agences/" + data2.agenceId, { method: "GET", cache: "no-store" })
      if (!res3.ok) {
        return null
      }
      const data3 = await res3.json();
      localStorage.setItem("agence", JSON.stringify({ employeId: data2.id, userId: data.id, agenceId: data3.id }))
      setAgence(data3)
    };

    if (status === "authenticated") {
      getEmploye();
    }

  }, [session])
  
  return (

    <main className="flex">
      <DashboardNav items={LinksDirector} label="Chef d'agence" />  
      <section className=" w-full min-h-screen h-full bg-white overflow-hidden" >
      <header className=" w-full relative  top-0 left-0  border-b-2  bg-stone-100">
            <div className=" mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-14">
                    <nav className="hidden md:flex md:grow">
                        <ul className="flex grow justify-end flex-wrap items-center">
                            {
                                session?.user ? (
                                    <li className="flex flex-row items-center">
                                        <div title="Voir son profil">
                                            <span className=" text-gray-600 hover:text-gray-700 px-4 py-3 text-sm  flex items-center transition duration-150 ease-in-out" >
                                            {session?.user?.name}
                                            </span>
                                        </div>
                                        <div>
                                           <UserAccountNav />
                                        </div>
                                    </li>
                                ) : (
                                    <Link href={"/signin"} className="text-white  bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-red-300  rounded-sm text-sm p-2 px-5 text-center">S&apos;authentifier</Link>
                                )
                           }
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
        <div className=" w-full h-full relative min-h-screen justify-center">
            {children}
        </div>
      </section>
    </main>
  )
}