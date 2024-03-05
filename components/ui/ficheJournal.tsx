
import { getDateFormat } from "@/functions/actionsClient";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

export default function FicheJournal(props: { item: DataFicheJournal }) {
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
                <ComponentToPrint depenses={props.item.depenses} semaine={props.item.semaine} date1={props.item.date1} date2={props.item.date2} totalRecette={props.item.totalRecette} totalRecette2={props.item.totalRecette2} recettes={props.item.recettes} ref={(el) => (componentRef = el)} />
            </div>
        </>
    );
}
interface DataFicheJournal {
    depenses: any[],
    recettes: any[],
    date1: string,
    date2: string,
    totalRecette: number,
    totalRecette2: number
    semaine: string[]
}
class ComponentToPrint extends React.Component<DataFicheJournal> {

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
                <div className=" m-auto p-4 bg-white h-full w-full" id="document">
                    <div className="text-center font-bold my-8">
                        <h2 className="underline">CHARTER EXPRESS VOYAGES</h2>
                        <h4>Journal</h4>
                    </div>
                    <div className="text-xl p-4 text-center">
                        <span>Semaine du </span> {this.props.depenses[0]?.date} <span>au {this.props.depenses[6]?.date}</span>
                    </div>
                    {/* <div className="p-4">
                        <table className="w-full text-sm text-left rtl:text-right text-black">
                            <thead className="text-sm uppercase">
                                <tr className="bg-stone-400">
                                    <th scope="col" colSpan={5} className=" py-3 px-1 ">
                                        Semaine du
                                    </th>
                                    <th scope="col" className=" py-3 px-1  ">
                                        {this.props.date1}
                                    </th>
                                    <th scope="col" colSpan={4} className=" py-3 px-1  ">
                                        au
                                    </th>
                                    <th scope="col" colSpan={5} className=" py-3 px-1  ">
                                        {this.props.date2}
                                    </th>
                                </tr>
                                <tr>
                                    <th></th>
                                    {
                                        days.map((r: any, index: number) => (
                                            <th key={index} colSpan={2} scope="col" className=" py-3 px-1 border border-black  bg-stone-200">
                                                {r} {this.props.semaine[index]}
                                            </th>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <th scope="col" className="px-3 py-2 border  border-stone-500">
                                        Dépenses
                                    </th>
                                    {
                                        days.map(() => (
                                            <>
                                                <th scope="col" className="px-3 py-2 border  border-stone-500">
                                                    INTITULE
                                                </th>
                                                <th scope="col" className="px-3 py-2 border  border-stone-500">
                                                    MONTANT
                                                </th>
                                            </>
                                        ))
                                    }



                                </tr>
                            </thead>
                            <tbody className="bg-stone-100 ">
                                    <tr>
                                        
                                    </tr>
                                {
                                    days.map((e, index: number) => (
                                        <tr key={index + 1}>
                                            {this.props.depenses.map((item: any, j: number) => (
                                                item.jour == e ?

                                                    <>
                                                        <td className="px-3 py-2 border border-stone-400">
                                                            {item.typeVoyage}
                                                        </td>
                                                        <td className="px-3 py-2 border border-stone-400">
                                                            {item.montant}
                                                        </td>
                                                    </>
                                                    :
                                                    <>

                                                        <td className="px-3 py-2 border border-stone-400">
                                                            {item.typeVoyage}
                                                        </td>
                                                        <td className="px-3 py-2 border border-stone-400">
                                                            {item.montant}
                                                        </td>
                                                    </>

                                            ))}
                                        </tr>
                                    ))
                                }


                            </tbody>
                        </table>
                    </div> */}
                </div>
            </div>

        )
    }

}