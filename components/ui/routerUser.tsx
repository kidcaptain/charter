
"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RouterUser = (props: { session: string | null | undefined, id: string | null | undefined }) => {
    const router = useRouter();
    useEffect(() => {
        const updateUser = async () => {
            const get = await fetch("/api/utilisateurs/" + props.id, {
                method: 'GET',
                cache: "no-store",
            })
            if (!get.ok) {
                console.log("error")
                // router.back();
                // return null
            } else {
                
                const user = await get.json()

                const date = new Date()
                const year = date.getFullYear();
                const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
                const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;2
                const hours = (date.getHours()) < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
                const minutes = (date.getMinutes()) < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
                const datas = {
                    nomUtilisateur: user.nomUtilisateur,
                    dateCreationCompte: `${user.dateCreationCompte}`,
                    dateDerniereConnexion: `${year}-${month}-${day}T${hours}:${minutes}:00.000Z`,
                    blocke: user.blocke,
                    numCNI: user.numCNI,
                    isConnected: "yes",
                    droitsAccesId: parseInt(user.droitsAccesId),
                    motDePasse: user.motDePasse,
                    employeId: user.employeId
                }
             
                const res = await fetch("/api/utilisateurs/" + props.id, {
                    method: 'PUT',
                    cache: "no-store",
                    body: JSON.stringify(datas),
                })
                if (!res.ok) {
                    console.log("error")
                    // alert("error d'authentification");
                    // router.back();
                    // return null
                } else {    
                    getDroitAcces();
                }
            }

        }
        const getDroitAcces = async () => {
            const res = await fetch("/api/acces?id=" + props.session, { cache: "no-store" })
            if (!res.ok) {
                console.log("error")
            }
            const data = await res.json();
            router.refresh();
            switch (data.TypeDroits) {
                case "administrateur":
                    router.push('/dashboard/admin/home')
                    break;
                case "comptable":
                    router.push('/dashboard/comptable/home')
                    break;
                case "chefagence":
                    router.push('/dashboard/directeur/home')
                    break;
                case "chauffeur":
                    router.push('/dashboard/chauffeur/vehicule')
                    break;
                default:
                    router.push('/dashboard/caisse/passagers')
                    break;
            }
        };
        updateUser();

    }, [])


    return null
}

export default RouterUser