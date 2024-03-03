
import { getDateFormat } from "@/functions/actionsClient";
import Image from "next/image";
import React, { useRef } from "react";
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
                <ComponentToPrint bus={props.item.bus} agence={props.item.agence} chauffeur={props.item.chauffeur} trajet={props.item.trajet} voyage={props.item.voyage} passagers={props.item.passagers} ref={(el) => (componentRef = el)} />
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
}
class ComponentToPrint extends React.Component<DataBordereau> {

    render() {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        const hour = (date.getHours()) < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
        const minute = (date.getMinutes()) < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
        return (
            <div className="bg-white text-sm py-10 px-8 border max-w-7xl m-auto">
                 <div className="text-center font-bold my-8">
                        <h2>CHARTER EXPRESS VOYAGES</h2>
                        <ul>
                            <li>  ENTREPRISE DE TRANSPORT INTER-URBAIN</li>
                            <li> BP: 5029 YAOUNDE</li>
                            <li> N° Contribuable:M09020001474P</li>
                            <li>  RRCCM N°: 2002U04 du 15/10/2002</li>
                        </ul>
                        <Image src={"/images/logo.jpeg"} width={85} height={85} alt="" className="m-auto" />

                    </div>
                <h1 className="text-center font-bold my-4 text-4xl uppercase">Bordereau de route</h1>
                <h2 className="text-center font-bold my-4 text-2xl uppercase">Agence {this.props.agence?.nom}</h2>
                <div className="flex justify-between  uppercase">
                    <h4 className="flex items-center gap-2"><span className="font-bold">Départ :</span> {this.props.trajet?.lieuDepart}</h4>
                    <h4 className="flex items-center gap-2"><span className="font-bold">Déstination :</span>  {this.props.trajet?.lieuArrivee} </h4>
                </div>
                <div className=" grid grid-cols-4 items-start  my-4 text-center">
                    <div className="border flex items-center gap-2 p-2 uppercase"><span className="font-bold ">Date :</span> {year}-{month}-{day} </div>
                    <div className="border flex items-center gap-2 p-2 uppercase"><span className="font-bold">Heure :</span> {hour}:{minute}</div>
                    <div className="border flex items-center gap-2 p-2 uppercase"><span className="font-bold">Bus N° :</span> {this.props.bus?.id}</div>
                    <div className="border flex items-center gap-2 p-2 uppercase"><span className="font-bold">Voyage N° :</span> {this.props.voyage?.id}</div>
                </div>
                <div className="overflow-hidden bg-stone-200" style={{ maxHeight: 800 }}>
                    <table className="w-full  text-left rtl:text-right border dark:text-gray-400">
                        <thead className="text-sm uppercase bg-gray-100 dark:text-gray-400">
                            <tr>
                                <th scope="col" className=" p-2 border bg-gray-50 dark:bg-gray-800">
                                    N°
                                </th>
                                <th scope="col" className=" p-2 border bg-gray-50 dark:bg-gray-800">
                                    Nom et Prénom
                                </th>
                                <th scope="col" className="p-2 border ">
                                    N° CNI
                                </th>
                                <th scope="col" className="p-2 border bg-gray-50 dark:bg-gray-800">
                                    Tarif
                                </th>
                                <th scope="col" className="p-2 border">
                                    Prix Total
                                </th>
                                <th scope="col" className="p-2 border">
                                    N° Ticket
                                </th>

                            </tr>
                        </thead>
                        <tbody className="bg-gray-50">
                            {
                                this.props.passagers?.map((i: any, index: number) => (
                                    <tr key={index + 1} className="border-b border-gray-200 dark:b">
                                        <th scope="row" className="p-2 border font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                            {index+1}
                                        </th>
                                        <th scope="row" className="p-2 border font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                            {i.passager?.nom} {i.passager.prenom}
                                        </th>
                                        <td className="border">
                                            {i.passager.numCNI}
                                        </td>
                                        <td className="p-2 bg-gray-50 border dark:bg-gray-800">
                                            {i.ticket.prixTicket}
                                        </td>
                                        <td className="p-2 border">
                                            {this.props.voyage?.prixVoyage}
                                        </td>
                                        <td className="p-2 border">
                                            {i.ticket.numeroSiege}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="grid mt-4 grid-cols-2 items-start">
                    <div className="     text-sm">
                        <div className=""><div className="font-bold  uppercase py-2 ">Nom du chauffeur</div> {this.props.chauffeur?.nom} {this.props.chauffeur?.prenom}</div>
                        <div className=""><div className="font-bold uppercase py-2 ">Chef d&apos;agence </div> </div>
                        <div className=""><div className="font-bold uppercase py-2 ">Heure d&apos;arrivée</div> {this.props.trajet?.heureArrivee}</div>
                        <div className=""><div className="font-bold uppercase py-2 ">Observation</div> <textarea name="" placeholder="Observation" className="bg-gray-100 w-full resize-none focus-visible:outline-none" id="" cols={30} rows={10}></textarea></div>
                    </div>
                    <div className="  text-sm ">
                        <div className=" grid grid-cols-2"><div className="font-bold uppercase p-2 border border-stone-600">Carburant</div> <div className=" uppercase border border-stone-600"><input type="text" className="w-full h-full p-2 " /></div>
                            <div className=" grid grid-cols-2"><div className="font-bold uppercase p-2 border border-stone-600">Peage</div> <div className="uppercase border border-stone-600"><input type="text" className="w-full h-full p-2 " /></div></div>
                            <div className=" grid grid-cols-2"><div className="font-bold uppercase p-2 border border-stone-600">Ration</div> <div className="uppercase border border-stone-600"><input type="text" className="w-full h-full p-2 " /></div></div>
                            <div className=" grid grid-cols-2"><div className="font-bold uppercase p-2 border border-stone-600">Autres depenses</div> <div className=" uppercase border border-stone-600"><input type="text" className="w-full h-full p-2 " /></div></div>
                            <div className=" grid grid-cols-2"><div className="font-bold uppercase p-2 border border-stone-600">Recette nette</div> <div className=" uppercase border border-stone-600"><input type="text" className="w-full h-full p-2 " /></div></div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

