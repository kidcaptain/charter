"use client"
import { useEffect, useState } from 'react';
import InputForm from '../ui/inputForm';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import flecheSvg from '@/public/images/fleche.svg'
import { getDateFormat } from '@/functions/actionsClient';
const VoyageTable = (props: { childToParent: Function }) => {
    const [voyages, setVoyage] = useState<any[]>([])

    const router = useRouter()

    useEffect(() => {
        const getTrajet = async () => {
            const res = await fetch("/api/trajets", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
        };

        const agence = localStorage.getItem("agence");

        const getData = async () => {

          if (agence) {
            const s = JSON.parse(agence);
            const res = await fetch("/api/voyages?agenceId=" + s.agenceId, { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
          }else{
            const res = await fetch("/api/voyages", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
          }
        };
        const getBus = async () => {
            const res = await fetch("/api/bus", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            return data
        };
        const selectVoyage = async () => {
            const tabVoyages: any[] = await getData();
            const tab: any[] = [];
            const tabTrajets: any[] = await getTrajet();
            const tabBus: any[] = await getBus();
            tabVoyages.map((r) => {
                tabTrajets.map((i) => {
                    tabBus.map((j) => {
                        if ((r.trajetId === i.id) && (parseInt(r.busId) === j.id)) {
                            tab.push({ trajet: i, voyages: r, bus: j, placeOccupees: (j.placesDisponible - r.placeDisponible) })
                        }
                    })

                })
            })
            tab.reverse()
            setVoyage(tab)
        }
        selectVoyage()
    }, [voyages])
    const ready = async (item: any) => {
        const voyage = {
            dateDepart: getDateFormat(item.dateDepart),
            dateArrivee: getDateFormat(item.dateArrivee),
            busId: item.busId,
            trajetId: item.trajetId,
            typeVoyage: item.typeVoyage,
            prixVoyage: item.prixVoyage,
            placeDisponible: item.placeDisponible,
            ready: "oui"
        }
        try {
            const response = await fetch(`/api/voyages/${item.id}`, {
                method: 'PUT',
                cache: "no-store",
                body: JSON.stringify(voyage),
            })
            if (response.ok) {
                alert("Voyage confirmé")
            }
        } catch (err) {
            console.log(err)
           
        }
    }
    const getDate = (str: string) => {
        const date = new Date(str);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        return `${year}-${month}-${day}`
    }

    const edit = (str: number) => {
        props.childToParent({id: str, action: "edit"})
    }
    const view = (str: string) => {
        props.childToParent({id: str, action: "view"})
    }
    const classVoyage = (numb: number, str: string) => {
        if (numb == 0 && (str == "non" || str == "")) {
            return `border-b border-gray-200 text-sm  bg-cyan-100 border-cyan-300 border-b-2 hover:bg-cyan-200  `
        }else if (numb == 0 && str == "oui") {
            return "cursor-not-allowed border-b border-gray-200 text-sm  bg-lime-100 border-lime-300 border-b-2 hover:bg-lime-200"
        } else{
            return 'bg-gray-50 border-b border-gray-200 text-sm   cursor-pointer hover:bg-gray-200'
        }
    } 
    return (
        <section className=" bg-white h-full w-full shadow-xl rounded-sm">
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-400">
                    <thead className="text-sm border text-gray-700  dark:text-gray-400">
                        <tr>
                            <th rowSpan={1} scope="row" colSpan={1} className="border-b-2 p-2 border ">
                                <div className="items-center flex justify-between ">
                                    #Id
                                    <Image src={flecheSvg} height={15} width={15} alt='image' />
                                </div>
                            </th>
                            <th rowSpan={1} colSpan={1} scope="row" className="border-b-2 p-2  border ">
                                <div className=" items-center flex justify-between">
                                    #Trajet
                                    <Image src={flecheSvg} height={15} width={15} alt='image' />
                                </div>
                            </th>
                            <th rowSpan={1} colSpan={1} className="border-b-2 p-2 border ">
                                <div className=" items-center flex justify-between ">
                                    Nom du Véhicule
                                    <Image src={flecheSvg} height={15} width={15} alt='image' />
                                </div>
                            </th>
                            <th rowSpan={1} colSpan={1} className="border-b-2 p-2 border ">
                                <div className=" items-center flex justify-between ">
                                    Type de voyage
                                    <Image src={flecheSvg} height={15} width={15} alt='image' />
                                </div>
                            </th>
                            <th rowSpan={1} colSpan={1} className="border-b-2 p-2 border ">
                                <div className="items-center flex justify-between ">
                                    Places restantes
                                    <Image src={flecheSvg} height={15} width={15} alt='image' />
                                </div>
                            </th>
                            <th rowSpan={1} colSpan={1} className="border-b-2 p-2 border ">
                                <div className="items-center flex justify-between ">
                                    Places occupées
                                    <Image src={flecheSvg} height={15} width={15} alt='image' />
                                </div>
                            </th>
                            <th rowSpan={1} colSpan={1} className="border-b-2 p-2 border ">
                                <div className=" items-center flex justify-between ">
                                    Prix du ticket
                                    <Image src={flecheSvg} height={15} width={15} alt='image' />
                                </div>
                            </th>
                            <th className="border-b-2 p-2  border ">
                                <div className="items-center flex justify-between ">
                                    Date de Départ
                                    <Image src={flecheSvg} height={15} width={15} alt='image' />
                                </div>
                            </th>
                            <th className="border-b-2 p-2  border ">
                                <div className="items-center flex justify-between ">
                                    Date d&apos;arrivée
                                    <Image src={flecheSvg} height={15} width={15} alt='image' />
                                </div>
                            </th>
                            <th className="border-b-2 p-2  border ">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {voyages.map((item: any, i: number) => (
                            <tr key={i} title={`${item.voyages?.placeDisponible == 0 ? 'Plein' : ''}`} className={classVoyage(item.voyages?.placeDisponible, item.voyages?.ready)}>
                                <th className="p-2 border ">
                                    {item.voyages?.id}
                                </th>
                                <th className="p-2 border ">
                                    {item.trajet?.lieuDepart} - {item.trajet.lieuArrivee}
                                </th>
                                <td className="p-2 border">
                                    {item.bus?.marque}  {item.bus?.modele}
                                </td>
                                <td className="p-2 border">
                                    {item.voyages?.typeVoyage}
                                </td>
                                <td className="p-2 border ">
                                    {item.voyages?.placeDisponible}
                                </td>
                                <td className="p-2 border">
                                    {item.placeOccupees}
                                </td>
                                <td className="p-2 border">
                                    {item.voyages?.prixVoyage} fcfa
                                </td>
                                <td className="p-2 border">
                                    {getDate(item.voyages?.dateDepart)}
                                </td>
                                <td className="p-2 border">
                                    {getDate(item.voyages?.dateArrivee)}
                                </td>
                                <td>
                                    <button type="button" onClick={() => view(item.voyages.id)} className='bg-cyan-400 hover:bg-cyan-500 p-2 text-white '>Bordereau de route</button>
                                    <button type="button" onClick={() => edit(item.voyages.id)} className='bg-yellow-400 p-2 hover:bg-yellow-500'>Editer</button>
                                    {
                                        item.voyages?.placeDisponible == 0 && item.voyages?.ready != "oui" ? (
                                            <button type="button" onClick={() => ready(item.voyages)} className='bg-green-400 p-2 hover:bg-green-500'>Confirmer</button>
                                        ) : null
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>

    )
}

export default VoyageTable