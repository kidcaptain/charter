"use client"
import ModalFiche from "@/components/modalFiche"

import AvanceTable from "@/components/employees/avanceTable"
import SanctionTable from "@/components/employees/sanctionTable"
import PrimeTable from "@/components/employees/primeTable"
import CongeTable from "@/components/employees/congeTable"
import EmployeeEditForm from "@/components/employees/employeeEditForm"
import Link from "next/link"


interface IPrams {
    employeId?: string
}


export default function Page({ params }: { params: IPrams }) {

  
    return (
        <div className="p-10 ">
               <div className=" py-2 flex justify-between items-start">
                <h1 className="lowercase text-sm  text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/directeur/employes"}>Employés</Link> / <Link className="hover:text-blue-600" href="#">Informations personnelles</Link></h1>
            </div>
            <div className="  ">
                <h2 className="p-4 bg-white uppercase border-b">
                    Informations Personnelles
                </h2>
                <ModalFiche isAdmin="directeur" id={params.employeId} />
            </div>
            <div className="  m-auto  mt-4">

                <div className="grid grid-cols-4 gap-4">
                    <div className=" col-span-3 bg-white">
                      <EmployeeEditForm id={params.employeId} />
                    </div>
                  
                    <div className="col-span-1">
                        <AvanceTable  id={params.employeId} />
                    </div>
                    <div className="col-span-1">
                        <SanctionTable  id={params.employeId} />
                    </div>
                    <div className="col-span-1">
                        <PrimeTable  id={params.employeId} />
                    </div>
                    <div className="col-span-1">
                        <CongeTable  id={params.employeId} />
                    </div>
                </div>
            </div>
        </div>
    )
}