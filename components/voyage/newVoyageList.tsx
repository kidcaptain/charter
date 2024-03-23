"use client"
import { getDateFormat, selectVoyageToDay } from '@/functions/actionsClient';
import { useEffect, useState } from 'react';
import CardVoyage from '../cardVoyage';

const NewVoyageList = () => {
    const [voyages, setVoyage] = useState<any[]>([])
    useEffect(() => {
        const getData = async () => {
            const data = await selectVoyageToDay();
            setVoyage(data)
        }
        getData();
    }, [])
  
    return (
        <div className="relative overflow-hidden">
            <h2 className=" text-gray-900 text-sm p-4 border-b uppercase">
                Voyages pour la journée d&apos;aujourd&apos;hui
            </h2>
            <div className="p-4 text-left overflow-y-auto" style={{ height: 550 }}>
                {voyages.map((item: any, i: number) => (
                    <div key={i} className='my-4'>
                       {/* : <CardVoyage id={item.voyages?.id} isHidden={false} isVip={true} agence="" date={getDateFormat(item.voyages?.dateDepart)} prix={item.voyages?.prixVoyage} lieuArrive={item.trajet?.lieuArrivee} heureArrive={item.trajet?.heureArrivee} lieuDepart={item.trajet?.lieuDepart} heureDepart={item.trajet?.heureDepart} placeDisponible={item.voyages?.placeDisponible} /> */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NewVoyageList