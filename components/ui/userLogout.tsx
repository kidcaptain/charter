
"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useSession } from "next-auth/react";

const UserLogout = (props: { children : Function }) => {
    const { data: session, status } = useSession()

        const updateUser = async () => {
            const get = await fetch("/api/utilisateurs/" + session?.user?.email, {
                method: 'GET',
                cache: "no-store",
            })
            if (!get.ok) {
                console.log("error")
            } else {
                const user = await get.json()
                const datas = {
                    nomUtilisateur: user.nomUtilisateur,
                    motDePasse: user.motDePasse,
                    dateCreationCompte: `${user.dateCreationCompte}`,
                    dateDerniereConnexion: `${user.dateDerniereConnexion}`,
                    blocke: user.blocke,
                    numCNI: user.numCNI,
                    employeId: parseInt(user.employeId),
                    isConnected: "no",
                    droitsAccesId: parseInt(user.droitsAccesId)
                }
                const res = await fetch("/api/utilisateurs/" + session?.user?.email, {
                    method: 'PUT',
                    cache: "no-store",
                    body: JSON.stringify(datas),
                })
                if (!res.ok) {
                    console.log("error")
                } else {
                    props.children(true)
                }
            }

        }
       



    return (
        <button onClick={updateUser} className="text-white  bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300  rounded-sm text-sm p-2 px-5 text-center">
        Se Déconnecte
    </button>
    )
}

export default UserLogout