
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import CardEmploye from "@/components/director/cardEmploye";
import CardVoyage from "@/components/director/cardVoyage";
import CardBarChart from "@/components/cardBarChart";
import { useEffect } from "react";
import CardTicket from "@/components/director/cardTicket";
import TableUserOnline from "@/components/director/TableUserOnline";
export default async function HomeDashboard() {
    const session = await getServerSession(authOptions);

    if (session?.user) {
        return (
            <div className="">
               
                <section className="grid grid-cols-6">
                    <div className="col-span-4 p-10" >
                    <h2 className="text-2xl text-gray-600 text-left m-auto my-10 font-bold">Bienvenue "{session?.user?.name}"</h2>
                        <div className="grid-cols-3 gap-4 items-center grid">
                            <div className="col-span-1">
                                <CardEmploye />
                            </div>
                            <div className="col-span-1">
                                <CardVoyage />
                            </div>
                            <div className="col-span-1">
                                <CardTicket />
                            </div>
                        </div>
                        <div className="overflow-hidden bg-white mt-8 shadow-2xl border rounded-2xl">
                            <CardBarChart title="Recettes et Dépenses" />
                        </div>
                        <div className="overflow-hidden mt-8  rounded-2xl">
                            <h2 className="p-4 font-bold text-gray-800">Utilisateurs</h2>
                           <TableUserOnline />
                        </div>
                    </div>
                    <div className="col-span-2 p-10 min-h-screen bg-stone-100">

                    </div>
                </section>

            </div>
        )
    }
    return <h2>Please login to see this admin page</h2>
};  