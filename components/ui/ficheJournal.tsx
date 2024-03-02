
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
                <ComponentToPrint depenses={props.item.depenses} semaine={props.item.semaine} recettes={props.item.recettes} ref={(el) => (componentRef = el)} />
            </div>
        </>
    );
}
interface DataFicheJournal {
    depenses: any[],
    recettes: any[],
    semaine: {
        lundi: any[],
        mardi: any[],
        mercredi: any[],
        jeudi: any[],
        vendredi: any[],
        samedi: any[],
        dimanche: any[]
    }
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
                    <div className="p-4">
                        <table className="w-full text-sm font-mono text-left rtl:text-right text-gray-800 ">
                            <thead className="text-sm text-gray-900  ">
                                <tr className="text-center">
                                    <th scope="col" className=" py-3 px-1  ">

                                    </th>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800">
                                        Lun
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800">
                                        Mar
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800">
                                        Mer
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800 ">
                                        Jeu
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800">
                                        Ven
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800">
                                        Sam
                                    </th>

                                    <th scope="col" className=" py-3 px-1 border border-stone-800">
                                        Total recettes
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="col" className=" py-4 px-2 border uppercase border-stone-800 ">
                                        Recettes
                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">

                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800 ">

                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">

                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">

                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">

                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">

                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">

                                    </th>
                                </tr>
                                <tr>
                                    <th scope="col" className=" py-4 px-2 border uppercase border-stone-800 ">
                                        Retenues
                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">

                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800 ">

                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">

                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">

                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">

                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">

                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">

                                    </th>
                                </tr>
                                <tr >
                                    <th colSpan={8} className=" py-4 px-2 border border-stone-800"></th>
                                </tr>
                                <tr>
                                    <th scope="col" className=" py-4 px-2 border uppercase border-stone-800 ">
                                        Depenses
                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">

                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800 ">

                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">

                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">

                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">

                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">

                                    </th>
                                    <th scope="col" className=" py-4 px-2 border border-stone-800">

                                    </th>
                                </tr>
                            </thead>
                            <tbody >
                                <th className="py-4 px-2 border border-stone-800">
                                    HB
                                </th>
                                <th scope="col" className="border p-0 text-right">
                                    {
                                        this.props.semaine.lundi.map((i: any, index: number) => {
                                            return (
                                                (
                                                    <div key={index + 1} className={`${index % 2 == 0 ? 'bg-stone-300' : 'bg-white'} " grid grid-cols-2 "`}>
                                                        <div className="border py-3 px-1 border-stone-900  ">
                                                            {i?.description}
                                                        </div>
                                                        <div className="border py-3 px-1  border-stone-900 ">
                                                            {parseInt(i?.montant).toString() == "NaN" ? 0 : parseInt(i?.montant).toString()}
                                                        </div>
                                                    </div>
                                                ))
                                        })
                                    }
                                </th>
                                <th scope="col" className=" p-0 ">
                                    {
                                        this.props.semaine.mardi.map((i: any, index: number) => {
                                            return (
                                                (
                                                    <div key={index + 1} className={`grid text-right grid-cols-2 ${index % 2 == 0 ? 'bg-stone-300' : 'bg-white'}`}>
                                                        <div className="border py-3 px-1  border-stone-900  ">
                                                            {i?.description}
                                                        </div>
                                                        <div className="border py-3 px-1  border-stone-900 ">
                                                            {parseInt(i?.montant).toString() == "NaN" ? 0 : parseInt(i?.montant).toString()}
                                                        </div>
                                                    </div>
                                                ))
                                        })
                                    }
                                </th>
                                <th scope="col" className="  p-0">
                                    {
                                        this.props.semaine.mercredi.map((i: any, index: number) => {
                                            return (
                                                (
                                                    <div key={index + 1} className={`grid text-right grid-cols-2 ${index % 2 == 0 ? 'bg-stone-300' : 'bg-white'}`}>
                                                        <div className="border py-3 px-1  border-stone-900  ">
                                                            {i?.description}
                                                        </div>
                                                        <div className="border py-3 px-1  border-stone-900 ">
                                                            {parseInt(i?.montant).toString() == "NaN" ? 0 : parseInt(i?.montant).toString()}
                                                        </div>
                                                    </div>
                                                ))
                                        })
                                    }
                                </th>
                                <th scope="col" className="  p-0">
                                    {
                                        this.props.semaine.jeudi.map((i: any, index: number) => {
                                            return (
                                                (
                                                    <div key={index + 1} className={`grid text-right grid-cols-2 ${index % 2 == 0 ? 'bg-stone-300' : 'bg-white'}`}>
                                                        <div className="border py-3 px-1  border-stone-900  ">
                                                            {i?.description}
                                                        </div>
                                                        <div className="border py-3 px-1  border-stone-900 ">
                                                            {parseInt(i?.montant).toString() == "NaN" ? 0 : parseInt(i?.montant).toString()} Fcfa
                                                        </div>
                                                    </div>
                                                ))
                                        })
                                    }
                                </th>
                                <th scope="col" className="  p-0">
                                    {
                                        this.props.semaine.vendredi.map((i: any, index: number) => {
                                            return (
                                                (
                                                    <div key={index + 1} className={`grid text-right grid-cols-2 ${index % 2 == 0 ? 'bg-stone-300' : 'bg-white'}`}>
                                                        <div className="border py-3 px-1  border-stone-900  ">
                                                            {i?.description}
                                                        </div>
                                                        <div className="border py-3 px-1  border-stone-900 ">
                                                            {parseInt(i?.montant).toString() == "NaN" ? 0 : parseInt(i?.montant).toString()}
                                                        </div>
                                                    </div>
                                                ))
                                        })
                                    }
                                </th>
                                <th scope="col" className="  p-0">
                                    {
                                        this.props.semaine.samedi.map((i: any, index: number) => {
                                            return (
                                                (
                                                    <div key={index + 1} className={`grid text-right grid-cols-2 ${index % 2 == 0 ? 'bg-stone-300' : 'bg-white'}`}>
                                                        <div className="border py-3 px-1  border-stone-900  ">
                                                            {i?.description}
                                                        </div>
                                                        <div className="border py-3 px-1  border-stone-900 ">
                                                            {parseInt(i?.montant).toString() == "NaN" ? 0 : parseInt(i?.montant).toString()}
                                                        </div>
                                                    </div>
                                                ))
                                        })
                                    }
                                </th>
                                    <th>

                                    </th>
                            </tbody>
                            <tfoot>
                                <tr className="font-normal" >
                                    <th className="px-3 py-4 border border-stone-800 uppercase">
                                        Totaux
                                    </th>
                                    <th className="border  px-3 py-4 border-stone-800">
                                        {totalBrut}
                                    </th>
                                    <th className="border px-3 py-4 border-stone-800">
                                        {totalDepense}
                                    </th>
                                    <th className="border border-stone-800">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
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
                        {/* <div className="mt-5">
                            <table className="w-1/2 text-sm text-left rtl:text-right text-gray-800 ">
                                <tr>
                                    <th className="py-4 px-2 border border-stone-800">Banque</th>
                                    <th className="py-4 px-2 border border-stone-800"></th>
                                </tr>
                                <tr>
                                    <th className="py-4 px-2 border border-stone-800">Autres dépenses</th>
                                    <th className="py-4 px-2 border border-stone-800"></th>
                                </tr>
                                <tr>
                                    <th className="py-4 px-2 border border-stone-800"></th>
                                    <th className="py-4 px-2 border border-stone-800"></th>
                                </tr>
                            </table>
                        </div> */}
                        <div className="mt-5 flex justify-between">
                            <div>
                                <label className="font-bold">Chef d&apos;agence: </label>
                                <input type="text" className="  p-2 border-stone-800 border focus-within:outline-none bg-stone-50" />
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="font-bold">Solde</span>
                                <div className="border  w-52">
                                    <input type="text" className="w-full h-full p-2 focus-within:outline-none bg-stone-50" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}