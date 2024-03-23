"use client";

import { SessionProvider, signOut } from "next-auth/react";
import UserLogout from "./userLogout";
import { useSession } from "next-auth/react";

const UserAccountNav = () => {

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
                const signInData = await signOut({
                    redirect: true,
                    callbackUrl: `${window.location.origin}/signin`,
                });
            }
        }

    }


    return (
        <button onClick={updateUser} className="text-white  bg-red-500 bg-gradient-to-tr from-orange-500 shadow-md rounded-xl font-semibold hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 text-sm p-2 px-5 text-center">
            Se Déconnecte
        </button>
    )
};

export default UserAccountNav;
