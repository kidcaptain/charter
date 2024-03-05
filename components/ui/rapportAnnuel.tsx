
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

export default function RapportAnnuel(props: { item: DataRapportAnnuel }) {
    let componentRef: any = useRef();

    return (
        <>
            <div>
                {/* button to trigger printing of target component */}
                <ReactToPrint
                    trigger={() => <button className="p-2 bg-blue-500 text-white">Imprimer</button>}
                    content={() => componentRef}
                />

                {/* component to be printed */}
                <ComponentToPrint simple={props.item.simple} total={props.item.total} date={props.item.date} ref={(el) => (componentRef = el)} />
            </div>
        </>
    );
}

export interface DataRapportAnnuel {
    simple: any[],
    date: string,
    total: number
}

class ComponentToPrint extends React.Component<DataRapportAnnuel> {

    render() {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        const hours = (date.getHours()) < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
        const minutes = (date.getMinutes()) < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
        const days: string[] = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
        return (
            <div className="p-4 w-full h-full min-h-full" id="fichier">
                <div className="max-w-5xl  font-serif m-auto p-4 bg-white h-full w-full" id="document">
                    <div className="text-center font-medium my-8">
                        <h2 className=" text-4xl">CHARTER EXPRESS VOYAGES</h2>
                        <h3>ENTREPRISE DE TRANSPORT INTER-URBAIN</h3>
                        <h3>BP: 5029 YAOUNDE-TEL: 699 91 76 12</h3>
                        <h3>N° contribuable: M09020001474P - RCCM N° 202 U 04 du 15/10/2002</h3>
                        <h3>site web: www.charter-voyage.com - Email: directiongeneral@charter.com</h3>
                    </div>
                    <hr className="border-2 border-black" />
                    <div className="text-xl p-4 text-right">
                        Yaoundé, le <span > {`${year}-${month}-${day}`} </span>
                    </div>
                    <h2 className="underline text-2xl text-center uppercase font-bold">Rapport hebdomadaire</h2>
                    <h3>N°BUS </h3>
                    <div className="p-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-800 ">
                            <thead className="text-sm text-center text-gray-900 border ">
                                <tr>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">
                                        Jours
                                    </th>
                                  
                                    <th scope="col" className=" py-4 px-2 border border-stone-800 ">
                                        MONTANTS
                                    </th>
                                   
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">
                                        Nombre de voyages effectués
                                    </th>

                                 
                                </tr>
                            </thead>
                            <tbody className="text-center">

                            {
                                    days.map((i: string, index: number) => {
                                        return (
                                            (
                                                <tr key={index + 1} className="font-normal" >
                                                    <th className="px-3 py-4 border border-stone-800">
                                                        {i}
                                                    </th>
                                                  
                                                    <th className=" border px-3 py-4 border-stone-800">
                                                        {parseInt(this.props?.simple[index]?.montant).toString() == "NaN" ? 0 : parseInt(this.props?.simple[index]?.montant).toString()}
                                                    </th>
                                                    <th className=" border border-stone-800">
                                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                                    </th>
                                                
                                                    
                                                </tr>
                                            )

                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <div className="mt-5 flex justify-between ">
                            <div className="flex items-center gap-4">
                                <span className="font-bold">TOTAL</span>
                                <div className="">
                                    {this.props.total} Fcfa
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}