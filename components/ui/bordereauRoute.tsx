
import { getDateFormat } from "@/functions/actionsClient";
import Image from "next/image";
import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";

export default function BordereauRoute(props: { item: DataBordereau }) {
    let componentRef: any = useRef();

    return (
        <>
            <div>
                {/* button to trigger printing of target component */}
                <ReactToPrint
                    trigger={() => <button className="p-2 bg-blue-500 text-sm text-white">Imprimer</button>}
                    content={() => componentRef}
                />

                {/* component to be printed */}
                <ComponentToPrint depense={props.item.depense} bus={props.item.bus} agence={props.item.agence} chauffeur={props.item.chauffeur} trajet={props.item.trajet} voyage={props.item.voyage} passagers={props.item.passagers} ref={(el) => (componentRef = el)} />
            </div>
        </>
    );
}
interface DataBordereau {
    bus: any,
    trajet: any,
    voyage: any,
    passagers: any[],
    agence: any,
    chauffeur: any
    depense: {
        carburant: number,
        peage: number,
        ration: number,
        autre: number
    }

}
class ComponentToPrint extends React.Component<DataBordereau> {

    render() {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        const hour = (date.getHours()) < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
        const minute = (date.getMinutes()) < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
        let total = 0;
        this.props.passagers.map((i) => {
            total += i.ticket.prixTicket;
        })
        return (
            <div className="bg-white text-sm font-sans py-10  px-8 border max-w-7xl m-auto">
                <div className="grid grid-cols-3 mb-10 items-start">
                    <div className="text-left ">
                        <h2 className="text-2xl font-bold">CHARTER EXPRESS</h2>
                        <ul className=" font-semibold">
                            <li> ENTREPRISE DE TRANSPORT INTER-URBAIN</li>
                            <li> BP: 5029 YAOUNDE</li>
                            <li> N° Contribuable:M09020001474P</li>
                            <li>  RRCCM N°: 2002U04 du 15/10/2002</li>
                        </ul>
                    </div>
                    <Image src={"/images/logo.jpeg"} width={85} height={85} alt="" className="m-auto" />
                    <h1 className="text-center  text-2xl uppercase bg-stone-200 ">Bordereau de route</h1>
                </div>
                <div className="grid grid-cols-2 uppercase">
                    <h4 className="flex items-center gap-2"><span className="font-bold">Départ :</span> {this.props.trajet?.lieuDepart}</h4>
                    <h4 className="flex items-center gap-2"><span className="font-bold">Déstination :</span>  {this.props.trajet?.lieuArrivee} </h4>
                </div>
                <div className=" grid grid-cols-4 items-start  my-4 text-left">
                    <div className="border border-black p-2 uppercase"><span className="font-bold ">Date :</span> {year}-{month}-{day} </div>
                    <div className="border border-black p-2 uppercase"><span className="font-bold">Heure :</span> {hour}:{minute}</div>
                    <div className="border border-black p-2 uppercase"><span className="font-bold">Bus N° :</span> {this.props.bus?.id}</div>
                    <div className="border border-black p-2 uppercase"><span className="font-bold">Voyage N° :</span> {this.props.voyage?.id}</div>
                </div>
                <div className="overflow-hidden " style={{ maxHeight: 800 }}>
                    <table className="w-full  text-center border ">
                        <thead className="text-xs uppercase  ">
                            <tr>
                                <th scope="col" className="  border border-black  ">
                                    N°
                                </th>
                                <th scope="col" className=" p-2 border border-black  ">
                                    Nom et Prénom
                                </th>
                                <th scope="col" className="p-2 border  border-black">
                                    N° CNI
                                </th>
                                <th scope="col" className="p-2 border  border-black">
                                    Destinat
                                </th>
                                <th scope="col" className="p-2 border border-black  ">
                                    Tarif
                                </th>
                                <th scope="col" className="p-2 border border-black  ">
                                    Manut.
                                </th>
                                <th scope="col" className="p-2 border border-black">
                                    Prix Total
                                </th>
                                <th scope="col" className="p-2 border border-black">
                                    N° Billet
                                </th>

                            </tr>
                        </thead>
                        <tbody className=" text-xs font-medium text-center   " >
                            {
                                this.props.passagers?.map((i: any, index: number) => (
                                    <tr key={index + 1} className="border-b border-gray-200 text-left ">
                                        <th scope="row" className=" border text-center border-black font-medium text-gray-900  ">
                                            {index + 1}
                                        </th>
                                        <th scope="row" className="p-2 border border-black font-medium text-gray-900  ">
                                            {i.passager?.nom} {i.passager.prenom}
                                        </th>
                                        <td className="border p-2 border-black">
                                            {i.passager.numCNI}
                                        </td>
                                        <td className="border p-2 border-black">

                                        </td>
                                        <td className="p-2  border  border-black text-right ">
                                            {i.ticket.prixTicket} FCFA
                                        </td>
                                        <td className="p-2  border  border-black text-right ">

                                        </td>
                                        <td className="p-2 border border-black text-right">
                                            {this.props.voyage?.prixVoyage} FCFA
                                        </td>
                                        <td className="p-2 border border-black">
                                            {i.ticket.numeroSiege}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="grid mt-4 grid-cols-2 items-start">
                    <div className="     text-xs">
                        <div className=""><div className="font-bold  uppercase py-2 ">Signature</div> </div>
                        <div className="flex items-center gap-5"><div className="font-bold uppercase py-2 ">Chef d&apos;agence </div> {this.props.agence?.chef} </div>
                        <div className="flex items-center gap-5"><div className="font-bold  uppercase py-2 ">Nom du chauffeur</div> {this.props.chauffeur?.nom} {this.props.chauffeur?.prenom}</div>
                        <div className=""><div className="font-bold uppercase py-2 ">Chef d&apos;agence arrivée </div> </div>
                        <div className="flex items-center gap-5"><div className="font-bold uppercase py-2 ">Heure d&apos;arrivée</div> {this.props.trajet?.heureArrivee}</div>
                        <div className=""><div className="font-bold uppercase py-2 ">Observations</div></div>
                    </div>
                    <div className="  text-xs font-bold text-center bg-stone-100">
                        <div className=" grid grid-cols-2"><div className="font-bold uppercase p-2 border border-stone-600">Carburant</div> <div className=" uppercase border border-stone-600">{this.props.depense.carburant}</div> </div>
                        <div className=" grid grid-cols-2"><div className="font-bold uppercase p-2 border border-stone-600">Peage</div> <div className="uppercase border border-stone-600">{this.props.depense.peage}</div></div>
                        <div className=" grid grid-cols-2"><div className="font-bold uppercase p-2 border border-stone-600">Ration</div> <div className="uppercase border border-stone-600">{this.props.depense.ration}</div></div>
                        <div className=" grid grid-cols-2"><div className="font-bold uppercase p-2 border border-stone-600">Autres depenses</div> <div className=" uppercase border border-stone-600">{this.props.depense.autre}</div></div>
                        <div className=" grid grid-cols-2"><div className="font-bold uppercase p-2 border border-stone-600">Recette nette</div> <div className=" uppercase border border-stone-600">{total - this.props.depense.carburant - this.props.depense.peage - this.props.depense.ration - this.props.depense.autre} Fcfa</div></div>

                    </div>
                </div>
            </div>
        )

    }
}

