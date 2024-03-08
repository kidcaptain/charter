
import React, { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";

export default function FicheProduction(props: { item: DataFicheProduction }) {
    let componentRef: any = useRef();
    const [itemProp, setItemProp] = useState<DataFicheProduction>()
    useEffect(() => {
        setItemProp(props.item)
    }, [itemProp])
    return (
        <>
            <div>
                {/* button to trigger printing of target component */}
                <ReactToPrint
                    trigger={() => <button className="p-2 bg-blue-500 text-white">Imprimer</button>}
                    content={() => componentRef}
                />

                {/* component to be printed */}
                {
                    itemProp ? (
                        <ComponentToPrint depense={props.item.depense} totalRecette={props.item.totalRecette} production={props.item.production} date1={props.item.date1} date2={props.item.date2} ref={(el) => (componentRef = el)} />
                    ) : null
                }
            </div>
        </>
    );
}
interface Production {
    bus: any;
    data: {
        typeVoyage: string,
        montant: string,
        jour: string
    }[]
}
export interface DataFicheProduction {
    depense: any[],
    production: Production[],
    date1: string,
    date2: string,
    totalRecette: number[]
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
        const dayks: any[] = [{jour:"Lundi", montant: this.props.totalRecette[0] + this.props.totalRecette[1] },
         {jour:"Mardi", montant: this.props.totalRecette[2] + this.props.totalRecette[3]},
          {jour:"Mecredi", montant: this.props.totalRecette[4] + this.props.totalRecette[5]}, 
          {jour:"Jeudi", montant: this.props.totalRecette[6] + this.props.totalRecette[7]},
           {jour:"Vendredi", montant: this.props.totalRecette[8] + this.props.totalRecette[9]},
            {jour:"Samedi", montant: this.props.totalRecette[10] + this.props.totalRecette[11]},
             {jour:"Dimanche", montant: this.props.totalRecette[12] + this.props.totalRecette[13]}];
        let totalBrut: number = 0;
        let totalDepense: number = 0;
        this.props.depense.map((l) => {
            totalDepense+=parseInt(l.montant)
        })
        dayks.map((l) => {
            totalBrut+=l.montant
        })



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
                                                            i.data ? (
                                                                <th key={idn} scope="col" className=" py-3 px-1  border  border-stone-800  text-right">
                                                                    {i.data[idn]?.montant} fcfa
                                                                </th>
                                                            ) : null
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
                                    {
                                        this.props.totalRecette.map((i: number, index: number) => (
                                            <th key={index} scope="col" className=" py-3 px-1  border  border-stone-800  text-right">
                                                {i}
                                            </th>
                                        ))
                                    }
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right" >   {this.props.totalRecette[0] + this.props.totalRecette[1] + this.props.totalRecette[2] + this.props.totalRecette[3] + this.props.totalRecette[4] + this.props.totalRecette[5] + this.props.totalRecette[6] + this.props.totalRecette[7] + this.props.totalRecette[8] + this.props.totalRecette[9] + this.props.totalRecette[10] + this.props.totalRecette[11] + this.props.totalRecette[12] + this.props.totalRecette[13]} fcfa</th>

                                </tr>
                                <tr className="bg-green-400">
                                    <th className="text-xs uppercase border border-stone-800 py-2 px-1 text-black" >Total brut</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{this.props.totalRecette[0] + this.props.totalRecette[1]} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{this.props.totalRecette[2] + this.props.totalRecette[3]} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{this.props.totalRecette[4] + this.props.totalRecette[5]} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{this.props.totalRecette[6] + this.props.totalRecette[7]} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{this.props.totalRecette[8] + this.props.totalRecette[9]} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{this.props.totalRecette[10] + this.props.totalRecette[11]} fcfa</th>
                                    <th colSpan={2} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{this.props.totalRecette[12] + this.props.totalRecette[13]} fcfa</th>

                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right" >  {this.props.totalRecette[0] + this.props.totalRecette[1] + this.props.totalRecette[2] + this.props.totalRecette[3] + this.props.totalRecette[4] + this.props.totalRecette[5] + this.props.totalRecette[6] + this.props.totalRecette[7] + this.props.totalRecette[8] + this.props.totalRecette[9] + this.props.totalRecette[10] + this.props.totalRecette[11] + this.props.totalRecette[12] + this.props.totalRecette[13]} fcfa</th>
                                </tr>
                                <tr className="bg-yellow-400">
                                    <th className="text-xs uppercase border border-stone-800 py-2 px-1 text-black" >Depenses</th>
                                    {
                                        this.props.depense.map((i: any, index: number) => (
                                            <th colSpan={2} key={index+1} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{this.props.depense[index].montant} fcfa</th>
                        
                                        ))
                                    }

                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right" >  {totalDepense} fcfa</th>
                                </tr>
                                <tr className="bg-blue-700 ">
                                    <th className="text-xs uppercase border border-stone-800 py-2 px-1 text-black" >Net</th>
                                    {
                                        dayks.map((i: any, index: number) => (
                                            <th colSpan={2} key={index+1} className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " > { dayks[index].montant - (this.props.depense[index]?.montant ?? 0) } fcfa</th>
                        
                                        ))
                                    }

                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right" >  {totalBrut - totalDepense} fcfa</th>

                                </tr>
                            </tfoot>
                        </table>

                        {/* <table className="w-full mt-10 text-xs font-mono text-center uppercase text-gray-800 ">
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
                        </table> */}
                    </div>

                </div>
            </div >
        )
    }

}