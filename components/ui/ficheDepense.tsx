
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

export default function FicheDepense(props: { item: DateFicheDepense }) {
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
                <ComponentToPrint
                    date={props.item.date}
                    depenseBus={props.item.depenseBus}
                    depense={props.item.depense}
                    ref={(el) => (componentRef = el)} />
            </div>
        </>
    );
}
export interface DateFicheDepense {
    depenseBus: any[],
    depense: any[],
    date: string
}
class ComponentToPrint extends React.Component<DateFicheDepense> {

    render() {
        let totalD: number = 0;
        this.props.depenseBus.map((i) => {
            totalD += parseInt(i.montant)
        })
        let total: number = 0;
        this.props.depense.map((i) => {
            total += parseInt(i.montant)
        })
        return (
            <div className="max-w-5xl m-auto p-4 bg-white h-full w-full">
                <div className="text-center font-bold my-8">
                    <h2>CHARTER EXPRESS VOYAGES</h2>
                    <ul className="text-xs">
                        <li>  ENTREPRISE DE TRANSPORT INTER-URBAIN</li>
                        <li> BP: 5029 YAOUNDE</li>
                        <li> N° Contribuable:M09020001474P</li>
                        <li>  RRCCM N°: 2002U04 du 15/10/2002</li>
                    </ul>

                </div>
                <div className="text-lg font-bold uppercase text-center p-4">
                    <span>Fiche de dépenses Journalieres du {this.props.date}</span>
                </div>
                <div></div>
                <div className="p-4">
                    <h1 className="p-2 text-center uppercase bg-stone-800 text-white">Depenses Mécaniques</h1>
                    <table className="w-full uppercase text-sm text-left rtl:text-right text-gray-800 ">
                        <thead className="text-sm bg-gray-200 text-center text-gray-900 border ">
                            <tr>

                                <th scope="col" className=" py-3 px-1 border border-stone-800">
                                    Désignations
                                </th>
                                <th scope="col" className=" py-3 px-1 border border-stone-800 ">
                                    Montants
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.props.depenseBus.map((item: any, i: number) => (
                                <tr key={i + 1}>
                                    <th className="px-1 py-3 border border-stone-800">
                                        {item.description}
                                    </th>
                                    <th className="px-1 py-3 text-right border border-stone-800">
                                        {item.montant} FCFA
                                    </th>
                                </tr>
                            ))}
                            <tr>
                                <th className="px-1 py-3 border border-stone-800">
                                    TOTAL
                                </th>
                                <th className="px-1 py-3 text-right border border-stone-800">
                                    {totalD} FCFA
                                </th>
                            </tr>

                        </tbody>
                    </table>
                    <h1 className="p-2 uppercase mt-8 text-center bg-stone-800 text-white">Autres dépenses</h1>
                    <table className="w-full text-sm uppercase text-left rtl:text-right text-gray-800 ">
                        <thead className="text-sm bg-gray-200 text-center text-gray-900 border ">
                            <tr>
                                <th scope="col" className=" py-3 px-1 border border-stone-800">
                                    Désignations
                                </th>
                                <th scope="col" className=" py-3 px-1 border border-stone-800 ">
                                    Montants
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.props.depense.map((item: any, i: number) => (
                                <tr key={i + 1}>
                                    <th className="px-1 py-3 uppercase font-semibold border border-stone-800">
                                        {item.description}
                                    </th>
                                    <th className="px-1 py-3 text-right border border-stone-800">
                                        {item.montant} FCFA
                                    </th>
                                </tr>
                            ))}
                            <tr>
                                <th className="px-1 py-3 border border-stone-800">
                                    TOTAL
                                </th>
                                <th className="px-1 py-3 text-right border border-stone-800">
                                    {total} FCFA
                                </th>
                            </tr>

                        </tbody>
                    </table>
                    <div className="font-bold mt-7">
                        <h2>TOTAL DEPENSES: {totalD + total} FCFA</h2>
                    </div>

                </div>
            </div >

        )
    }

}