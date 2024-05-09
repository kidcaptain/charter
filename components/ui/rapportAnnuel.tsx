
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import GraphLine from "./graphLine";
import Image from "next/image";
import logoSvg from "@/public/images/logo.jpeg"

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
                <ComponentToPrint bus={props.item.bus} simple={props.item.simple} total={props.item.total} date={props.item.date} ref={(el) => (componentRef = el)} />
            </div>
        </>
    );
}

export interface DataRapportAnnuel {
    simple: any[],
    date: string,
    total: number,
    bus: string | undefined
}

class ComponentToPrint extends React.Component<DataRapportAnnuel> {

    render() {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        const hours = (date.getHours()) < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
        const minutes = (date.getMinutes()) < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
        const days: string[] = [
            "JANVIER",
            "FEVRIER",
            "MARS",
            "AVRIL",
            "MAI",
            "JUIN",
            "JUILLET",
            "AOUT",
            "SEPTEMBRE",
            "OCTOBRE",
            "NOVEMBRE",
            "DECEMBRE"]
        return (
            <div className="p-4 w-full h-full min-h-full" id="fichier">
                <div className="max-w-7xl m-auto p-4 bg-white h-full w-full" id="document">
                    <Image src={logoSvg} className="m-auto" width={75} height={75} alt="" />
                    <div className="text-center font-medium my-2">
                        <h2 className=" text-3xl font-bold">Agence de voyages</h2>
                        <h3>ENTREPRISE DE TRANSPORT INTER-URBAIN</h3>
                        <h3>BP: 5029 YAOUNDE-TEL: 699 91 76 12</h3>
                        <h3>N° contribuable: M09020001474P - RCCM N° 202 U 04 du 15/10/2002</h3>
                        <h3>site web: www.charter-voyage.com - Email: directiongeneral@charter.com</h3>
                    </div>
                    <hr className="border my-1 border-black" />
                    <div className="text-xl p-2 text-right">
                        Yaoundé, le <span > {year}-{month}-{day} </span>
                    </div>
                    <h2 className="underline text-2xl text-center uppercase font-bold">Rapport Annuel de {this.props.date}</h2>
                    <h3 className="my-4"><span className="font-bold">BUS:</span> BUS-0{this.props.bus ? this.props.bus : 0}</h3>
                    <div >
                        <GraphLine production={this.props.simple} />
                        <table className="w-full mt-4 text-sm text-left rtl:text-right text-gray-800 ">
                            <thead className="text-sm text-center text-gray-900 border ">
                                <tr>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">
                                        MOIS
                                    </th>

                                    <th scope="col" className=" py-4 px-2 border border-stone-800 ">
                                        MONTANTS
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {
                                    days.map((i: string, index: number) => {
                                        return (
                                            (
                                                <tr key={index + 1} className="font-normal" >
                                                    <th className="p-2 border border-stone-800">
                                                        {i}
                                                    </th>

                                                    <th className=" border p-2 border-stone-800">
                                                        {this.props?.simple[index] ?? 0} FCFA
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
                                <span className="font-bold">TOTAL SUR L&apos;ANNEE</span>
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