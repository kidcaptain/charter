"use client"
import ModalListPassager from "@/components/modalListPassager";
import TrajetAddForm from "@/components/trajet/trajetAddForm";
import TrajetTable from "@/components/trajet/trajetTable";
import NewVoyageList from "@/components/voyage/newVoyageList";
import SearchFormVoyage from "@/components/voyage/searchFormVoyage";
import VoyageTable from "@/components/voyage/voyageTable";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function Voyages() {

    const router = useRouter()

    const editerEvent = (val: any) => {
        switch (val.action) {
            case "edit":
                router.push(`/dashboard/admin/voyages/${val.id}/editer`)
                break;
            case "view":
                    router.push(`/dashboard/admin/voyages/${val.id}`)
                break;
            default:
                break;
        }
    }
    return (
        <div className="p-10">
          
                <div className=" w-full">
                    <div className=" py-4 flex justify-between items-start mb-2">
                        <h1 className="text-xl text-gray-900">Voyages</h1>
                        <Link href={"/dashboard/admin/voyages/ajouter"} className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-sm text-xs px-5 py-2.5 text-center">
                            Programmer un voyage
                        </Link>
                    </div>
                    <section className="grid grid-cols-8 grid-rows-4 w-full gap-4">
                        <section className="col-span-8 row-span-1">
                            <SearchFormVoyage />
                        </section>
                        <section className="col-span-8 row-span-3">
                            <VoyageTable childToParent={editerEvent} />
                        </section>
                    </section>
                </div>
        </div>)
}