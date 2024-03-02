
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

export default function FicheProduction(props: { item: DataFicheProduction }) {
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
                <ComponentToPrint depense={props.item.depense} semaine={props.item.semaine} production={props.item.production} date1={props.item.date1} date2={props.item.date2} ref={(el) => (componentRef = el)} />
            </div>
        </>
    );
}
interface Production {
    bus: any;
    data: {
        typeVoyage: string,
        montant: string
    }[]
}
export interface DataFicheProduction {
    depense: any[],
    production: Production[],
    date1: string,
    date2: string,
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

class ComponentToPrint extends React.Component<DataFicheProduction> {

    render() {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        const hours = (date.getHours()) < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
        const minutes = (date.getMinutes()) < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
        const days: any[] = [{ jour: "Lundi", type: "aller" }
            , { jour: "Lundi", type: "retour" },
        { jour: "Mardi", type: "aller" },
        { jour: "Mardi", type: "retour" },
        { jour: "Mercredi", type: "aller" },
        { jour: "Mercredi", type: "retour" },
        { jour: "Jeudi", type: "aller" },
        { jour: "Jeudi", type: "retour" },
        { jour: "Vendredi", type: "aller" },
        { jour: "Vendredi", type: "retour" },
        { jour: "Samedi", type: "retour" },
        { jour: "Samedi", type: "aller" },
        { jour: "Dimanche", type: "retour" },
        { jour: "Dimanche", type: "aller" }
        ];
        let Tlundi: number = 0;
        let Tmardi: number = 0;
        let Tmercredi: number = 0;
        let Tjeudi: number = 0;
        let Tvendredi: number = 0;
        let Tsamedi: number = 0;
        let Tdimanche: number = 0;
        let TlundiR: number = 0;
        let TmardiR: number = 0;
        let TmercrediR: number = 0;
        let TjeudiR: number = 0;
        let TvendrediR: number = 0;
        let TsamediR: number = 0;
        let TdimancheR: number = 0;

        this.props.semaine.lundi.map((i) => {
            Tlundi = Tlundi + parseInt(i.montant)
        })
        this.props.semaine.mardi.map((i) => {
            Tmardi = Tmardi + parseInt(i.montant)
        })
        this.props.semaine.mercredi.map((i) => {
            Tmercredi = Tmercredi + parseInt(i.montant)
        })
        this.props.semaine.jeudi.map((i) => {
            Tjeudi = Tjeudi + parseInt(i.montant)
        })
        this.props.semaine.vendredi.map((i) => {
            Tvendredi = Tvendredi + parseInt(i.montant)
        })
        this.props.semaine.samedi.map((i) => {
            Tsamedi = Tsamedi + parseInt(i.montant)
        })
        this.props.semaine.dimanche.map((i) => {
            Tdimanche = Tdimanche + parseInt(i.montant)
        })

        let totalBrut: number = 0;
        // this.props.production.map((i) => {
        //     totalBrut = totalBrut + parseInt(i.montant)
        // })
        // days.map((i: string, index: number) => {
        //     switch (i) {
        //         case "Lundi":
        //             TlundiR = this.props?.production[index]?.montant - Tlundi
        //             break;
        //         case "Mardi":
        //             TmardiR = this.props?.production[index]?.montant - Tmardi
        //             break;
        //         case "Mecredi":
        //             TmercrediR = this.props?.production[index]?.montant - Tmercredi
        //             break;
        //         case "Jeudi":
        //             TjeudiR = this.props?.production[index]?.montant - Tjeudi
        //             break;
        //         case "Vendredi":
        //             TvendrediR = this.props?.production[index]?.montant - Tvendredi
        //             break;
        //         case "Samedi":
        //             TsamediR = this.props?.production[index]?.montant - Tsamedi
        //             break;
        //         case "Dimanche":
        //             TdimancheR = this.props?.production[index]?.montant - Tdimanche
        //             break;
        //         default:
        //             break;
        //     }
        // }
        // )
        return (
            <div>
                <div className="h-full w-full">
                    <div className="text-center font-bold my-8">
                        <h2>CHARTER EXPRESS VOYAGES</h2>
                        <ul>
                            <li>  ENTREPRISE DE TRANSPORT INTER-URBAIN</li>
                            <li> BP: 5029 YAOUNDE</li>
                            <li className="my-4">FICHE DE PRODUCTION</li>
                        </ul>
                    </div>
                    <div>
                        <div>

                        </div>
                        <table className="w-full text-xs font-mono text-center uppercase text-gray-800 ">
                            <thead className="text-xs uppercase bg-white text-gray-900 border border-stone-800 ">
                                <tr className="bg-stone-400">
                                    <th scope="col" colSpan={7} className=" py-3 px-1 ">
                                        Semaine du
                                    </th>
                                    <th scope="col" className=" py-3 px-1  bg-yellow-300">
                                        {this.props.date1}
                                    </th>
                                    <th scope="col" colSpan={3} className=" py-3 px-1  bg-stone-300">
                                        au
                                    </th>
                                    <th scope="col" colSpan={5} className=" py-3 px-1  bg-stone-300">
                                        {this.props.date2}
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="col" className=" p-0 bg-blue-400">
                                        <div className="py-3 px-1 border border-stone-800">
                                            Date
                                        </div>
                                        <div className="py-3 px-1 border border-stone-800">
                                            Immat
                                        </div>
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800">
                                        Aller
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800 bg-stone-300">
                                        Retour
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800">
                                        aller
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800 bg-stone-300">
                                        retour
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800">
                                        aller
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800 bg-stone-300">
                                        retour
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800">
                                        aller
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800 bg-stone-300">
                                        retour
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800">
                                        aller
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800 bg-stone-300">
                                        retour
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800">
                                        aller
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800 bg-stone-300">
                                        retour
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800">
                                        aller
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800 bg-stone-300" >
                                        retour
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800">
                                        Total
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="col" className=" py-3 px-1 border bg-blue-400 border-stone-800 ">

                                    </th>
                                    <th scope="col" className="py-3 px-1 border border-stone-800 " >
                                        Lun
                                    </th>
                                    <th scope="col" className="py-3 px-1 border border-stone-800 bg-stone-300"  >
                                        Lun
                                    </th>
                                    <th scope="col" className="py-3 px-1 border border-stone-800 "  >
                                        Mar
                                    </th>
                                    <th scope="col" className="py-3 px-1 border border-stone-800 bg-stone-300" >
                                        Mar
                                    </th>
                                    <th scope="col" className="py-3 px-1 border border-stone-800 " >
                                        Mer
                                    </th>
                                    <th scope="col" className="py-3 px-1 border border-stone-800 bg-stone-300" >
                                        Mer
                                    </th>
                                    <th scope="col" className="py-3 px-1 border border-stone-800 " >
                                        Jeu
                                    </th>
                                    <th scope="col" className="py-3 px-1 border border-stone-800 bg-stone-300" >
                                        Jeu
                                    </th>
                                    <th scope="col" className="py-3 px-1 border border-stone-800 " >
                                        Ven
                                    </th>
                                    <th scope="col" className="py-3 px-1 border border-stone-800 bg-stone-300" >
                                        Ven
                                    </th>
                                    <th scope="col" className="py-3 px-1 border border-stone-800 " >
                                        Sam
                                    </th>
                                    <th scope="col" className="py-3 px-1 border border-stone-800 bg-stone-300" >
                                        Sam
                                    </th>
                                    <th scope="col" className="py-3 px-1 border border-stone-800 " >
                                        Dim
                                    </th>
                                    <th scope="col" className="py-3 px-1 border border-stone-800 bg-stone-300" >
                                        Dim
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border     border-stone-800">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    this.props.production.map((i: Production, index: number) => {
                                        return (
                                            (
                                                <tr key={index}>
                                                    <th scope="col" className=" py-3 px-1  border  border-stone-800 bg-blue-400 text-right">
                                                        {i.bus?.id}
                                                    </th>
                                                    {
                                                        days.map((r: any, idn: number) => (
                                                            <th key={idn} scope="col" className=" py-3 px-1  border  border-stone-800  text-right">
                                                                {i.data[idn]?.typeVoyage == r.type ? i.data[idn]?.montant : 0} fcfa
                                                            </th>
                                                        ))
                                                    }
                                                    <th scope="col" className=" py-3 px-1  border  border-stone-800  text-right">

                                                    </th>
                                                </tr>
                                            ))
                                    })
                                }



                            </tbody>
                            <tfoot>
                                <tr className="bg-red-500">
                                    <th className="text-xs uppercase border border-stone-800 py-2 px-1 text-black" >Total</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tmardi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tmardi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tmercredi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tmercredi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tjeudi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tjeudi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tvendredi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tvendredi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right"  >{Tsamedi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right"  >{Tsamedi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right" >{Tdimanche} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right" >{Tdimanche} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right" >   {Tlundi + Tmardi + Tmercredi + Tjeudi + Tvendredi + Tsamedi + Tdimanche} fcfa</th>

                                </tr>
                                <tr className="bg-green-400">
                                    <th className="text-xs uppercase border border-stone-800 py-2 px-1 text-black" >Total brut</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>

                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right" >  {totalBrut} fcfa</th>
                                </tr>
                                <tr className="bg-yellow-400">
                                    <th className="text-xs uppercase border border-stone-800 py-2 px-1 text-black" >Depenses</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>

                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right" >  {totalBrut} fcfa</th>
                                </tr>
                                <tr className="bg-blue-700 ">
                                    <th className="text-xs uppercase border border-stone-800 py-2 px-1 text-black" >Net</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>

                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right" >  {totalBrut} fcfa</th>

                                </tr>
                            </tfoot>
                        </table>

                        <table className="w-full mt-10 text-xs font-mono text-center uppercase text-gray-800 ">
                            <tbody>
                                <tr className="bg-lime-500">
                                    <th rowSpan={2} className="text-xs uppercase border border-stone-800 py-2 px-1 text-black" >Prod VIP</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tmardi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tmardi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tmercredi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tmercredi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tjeudi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tjeudi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tvendredi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tvendredi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right"  >{Tsamedi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right"  >{Tsamedi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right" >{Tdimanche} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right" >{Tdimanche} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right" >   {Tlundi + Tmardi + Tmercredi + Tjeudi + Tvendredi + Tsamedi + Tdimanche} fcfa</th>
                                </tr>
                                <tr className="bg-lime-500">
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 py-2 px-1 text-black" >Net</th>
                                </tr>
                            </tbody>
                        </table>


                        <table className="w-full mt-10 text-xs font-mono text-center uppercase text-gray-800 ">
                            <tbody>
                                <tr className="bg-blue-700">
                                    <th rowSpan={2} className="text-xs uppercase border border-stone-800 py-2 px-1 text-black" >Prod classic</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tmardi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tmardi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tmercredi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tmercredi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tjeudi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tjeudi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tvendredi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tvendredi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right"  >{Tsamedi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right"  >{Tsamedi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right" >{Tdimanche} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right" >{Tdimanche} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right" >   {Tlundi + Tmardi + Tmercredi + Tjeudi + Tvendredi + Tsamedi + Tdimanche} fcfa</th>
                                </tr>
                                <tr className="bg-blue-700">
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 py-2 px-1 text-black" >Net</th>
                                </tr>
                            </tbody>
                        </table>
                        <table className="w-full mt-10 text-xs font-mono text-center uppercase text-gray-800 ">
                            <thead>

                                <tr className="bg-blue-700">
                                    <th className="text-xs uppercase border border-stone-800 py-2 px-1 text-black" >Prod annoncée</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 py-2 px-1 text-black" >Net</th>
                                </tr>
                            </thead>
                        </table>
                    </div>

                </div>
            </div >
        )
    }

}