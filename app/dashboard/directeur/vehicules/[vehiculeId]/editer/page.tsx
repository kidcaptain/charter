"use client"

import { FormEvent, useState , useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import EditFormVehicule from "@/components/vehicules/editFormVehicule"
interface IPrams {
    vehiculeId?: string
}

export default function Page({ params }: { params: IPrams }) {

    const router = useRouter();
    
    const editData = (val: any) => {
        if (val.isClose) {
            
        }else{
            if (val.isCompleted) {
                router.push('/dashboard/directeur/vehicules')
            } else {
                alert("Une erreur s'est produite!")
            }
        }
    }

    return (
        <div className=" w-full p-10">
           <div className=" py-4 flex lowercase text-sm justify-between items-start mb-2">
                <h1 className=" text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/directeur/vehicules"}>Vehicules</Link> / <Link className="hover:text-blue-600" href="#">Editer</Link></h1>
            </div>
            <div className="m-auto">
              <EditFormVehicule id={params.vehiculeId} childToParent={editData} />
            </div>
        </div>

    )
}
