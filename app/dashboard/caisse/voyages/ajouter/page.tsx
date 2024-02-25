"use client"
import AddFormVoyage from "@/components/voyage/addFormVoyage";
import { useSession } from "next-auth/react"
import Link from "next/link";
import { useEffect, useState } from "react";
import svg from "@/public/images/loader.svg"
import Image from "next/image"
export default function Page() {
    const [id, setId] = useState<any>(null)
    const { data: session, status } = useSession()

    useEffect(() => {
        const agence = localStorage.getItem("agence")
      if (agence) {
        setId(JSON.parse(agence))
      }
        

    }, [session])


    return (
        <div className=" w-full p-10">
            <div className=" py-2 flex justify-between items-start">
                <h1 className="lowercase text-sm  text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/caisse/voyages"}>Voyages</Link> / <Link className="hover:text-blue-600" href="#">Ajouter</Link></h1>
            </div>
            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="text-xl text-gray-900">Programmer un voyage </h1>
            </div>
            <div className="max-w-2xl m-auto">
                {
                    id != null ? (<AddFormVoyage agenceId={id.agenceId} />) : (
                        <div>
                            <Image src={svg} width={50} height={50} alt="s" />
                        </div>
                    )
                }
            </div>

        </div>

    )
}