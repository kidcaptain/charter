
import Image from "next/image";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import logo from "@/public/images/logo.jpeg"
export default function RapportJourn(props: { item: DataRapportJourn }) {
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
                <ComponentToPrint bus={props.item.bus} chauffeur={props.item.chauffeur}  simple={props.item.simple} total={props.item.total} date={props.item.date} ref={(el) => (componentRef = el)} />
            </div>
        </>
    );
}

export interface DataRapportJourn {
    simple: any[],
    date: string,
    total: number,
    bus: any,
    chauffeur: any
}

class ComponentToPrint extends React.Component<DataRapportJourn> {

    render() {

        return (
            <div className="p-4 w-full h-full min-h-full" id="fichier">
                <div className="max-w-5xl m-auto p-4 bg-white h-full w-full" id="document">
                    <div className="text-center font-medium my-8">
                        <Image src={logo} width={100} height={100} alt="" className="m-auto" />
                        <h2 className=" text-4xl">CHARTER EXPRESS VOYAGES</h2>
                        <h3>ENTREPRISE DE TRANSPORT INTER-URBAIN</h3>
                        <h3>BP: 5029 YAOUNDE-TEL: 699 91 76 12</h3>
                        <h3>N° contribuable: M09020001474P - RCCM N° 202 U 04 du 15/10/2002</h3>
                        <h3>site web: www.charter-voyage.com - Email: directiongeneral@charter.com</h3>
                    </div>
                    <hr className="border-2 border-black" />
                    <div className="text-xl p-4 text-right">
                        Yaoundé, le <span > {this.props.date} </span>
                    </div>
                    <h2 className="underline text-2xl my-4 text-center uppercase font-bold">Rapport Journalière</h2>
                    <span className=" font-bold">N°BUS:</span><span > BUS-0{this.props.bus?.id} </span>
                    {/* <h3 className="p-4 font-bold">CHAUFFEUR: {this.props.chauffeur?.nom} {this.props.chauffeur?.prenom}</h3> */}
                    <div className="p-4 mt-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-800 ">
                            <thead className="text-sm text-center text-gray-900 border ">
                                <tr>
                                   
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">
                                        ALLER
                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">
                                        CHAUFFEURS
                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800 ">
                                        MONTANTS
                                    </th>

                                    <th scope="col" className=" py-4 px-2 border border-stone-800">
                                        NOMBRE DE PASSAGES
                                    </th>

                                    <th scope="col" className=" py-4 px-2 border border-stone-800">
                                        PLACES RESTANTES
                                    </th>
                                    
                                 

                                </tr>
                            </thead>
                            <tbody className="text-center ">

                                {
                                    this.props.simple.map((i: any, index: number) => {
                                        return (
                                            (
                                                <tr key={index + 1} className=" uppercase" >
                                              
                                                    <th className=" border  px-3 py-4  border-stone-900">
                                                        {i.voyage?.typeVoyage}
                                                    </th>
                                                    <th className=" border px-3 py-4  border-stone-800">
                                                        {i.chauffeur}
                                                    </th>
                                                    <th className=" border px-3 py-4 border-stone-800">
                                                        {i.recette?.montant} FCFA
                                                    </th> 
                                                    <th className=" border px-3 py-4 border-stone-800">
                                                       
                                                        {parseInt(this.props.bus?.capacite) - parseInt(i.voyage?.placeDisponible)}
                                                    </th>
                                                    <th className=" border px-3 py-4  border-stone-800">
                                                        {i.voyage.placeDisponible}
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
                                    {this.props.total} FCFA
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}