
import Image from "next/image";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import InputForm from "./inputForm";
import SelectForm from "./selectForm";

export default function PrintComponent(props: { item: DataPrintComponent }) {
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
                <ComponentToPrint depenses={props.item.depenses} caissier={props.item.caissier} chef={props.item.chef} agence={props.item.agence} recettes={props.item.recettes} ref={(el) => (componentRef = el)} />
            </div>
        </>
    );
}
interface DataPrintComponent {
    depenses: any[],
    recettes: any[],
    agence: any,
    caissier: any[],
    chef: string
}
class ComponentToPrint extends React.Component<DataPrintComponent> {

    render() {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        const days: string[] = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
        let totalDepense: number = 0;
        this.props.depenses.map((i) => {
            totalDepense = totalDepense + parseInt(i.montant)
        })
        let totalBrut: number = 0;
        this.props.recettes.map((i) => {
            totalBrut = totalBrut + parseInt(i.montant)
        })
        return (
            <div className="p-4 w-full h-full min-h-full" id="fichier">
                <div className="max-w-5xl m-auto p-4 bg-white h-full w-full" id="document">
                    <div className="text-center font-bold my-8">
                        <h2 className="underline">Agence de voyages</h2>
                        <h4>Fiche Hebdomadaire des dépenses</h4>
                        <h4>Agence de {this.props.agence?.nom}</h4>
                    </div>
                    <Image src={"/images/logo.jpeg"} width={80} height={80} alt="" className="m-auto" />
                    <div className="text-xl p-4 text-center">
                        <span>Semaine du </span> {this.props.depenses[0]?.date} <span>au {this.props.depenses[6]?.date}</span>
                    </div>
                    <div className="p-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-800 ">
                            <thead className="text-sm text-gray-900 border ">
                                <tr>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800 ">
                                        Date
                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">
                                        Brut
                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800 ">
                                        Dépenses (Fcfa)
                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">
                                        Retenues
                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">
                                        Caissière
                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">
                                        Visa
                                    </th>
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    days.map((i: string, index: number) => {
                                        return (
                                            (
                                                <tr key={index + 1} className="font-normal" >
                                                    <th className="px-3 py-4 border border-stone-800">
                                                        {i}
                                                    </th>
                                                    <th className=" border w-40 px-3 py-4 border-stone-800">
                                                        {parseInt(this.props?.recettes[index]?.montant).toString() == "NaN" ? 0 : parseInt(this.props?.recettes[index]?.montant).toString()} Fcfa
                                                    </th>
                                                    <th className=" border px-3 py-4 border-stone-800">
                                                        {parseInt(this.props?.depenses[index]?.montant).toString() == "NaN" ? 0 : parseInt(this.props?.depenses[index]?.montant).toString()} Fcfa
                                                    </th>
                                                    <th className=" border border-stone-800">
                                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                                    </th>
                                                    <th className=" border border-stone-800 px-3 py-4 ">
                                                        <SelectForm text="aucun" array={this.props.caissier} onChange={() => { }} name="s" />
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
                            <tfoot>
                                <tr className="font-normal" >
                                    <th className="px-3 py-4 border border-stone-800 uppercase">
                                        Totaux
                                    </th>
                                    <th className="border  px-3 py-4 border-stone-800">
                                        {totalBrut} FCFA
                                    </th>
                                    <th className="border px-3 py-4 border-stone-800">
                                        {totalDepense} FCFA
                                    </th>
                                    <th className="border border-stone-800">
                                      
                                    </th>
                                    <th className="border border-stone-800">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                </tr>
                            </tfoot>
                        </table>

                        <div className="mt-5 flex justify-between items-center">
                            <div>
                                <label className="font-semibold uppercase">Chef d&apos;agence: {this.props.chef}</label>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="font-bold">Solde</span>
                                <div className="border border-black w-52">
                                    <input type="text" value={(totalDepense + totalBrut) + " FCFA"} className="w-full h-full p-2 focus-within:outline-none bg-stone-50" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}