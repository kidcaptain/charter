
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

export default function FicheSuivie(props: { item: DataFicheSuivie }) {
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
                <ComponentToPrint depense={props.item.depense} semaine={props.item.semaine} production={props.item.production} date={props.item.date} ref={(el) => (componentRef = el)} />
            </div>
        </>
    );
}

export interface DataFicheSuivie {
    depense: any[],
    production: any[],
    date: string,
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

class ComponentToPrint extends React.Component<DataFicheSuivie> {

    render() {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        const hours = (date.getHours()) < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
        const minutes = (date.getMinutes()) < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
        const days: string[] = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
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
        this.props.production.map((i) => {
            totalBrut = totalBrut + parseInt(i.montant)
        })
        days.map((i: string, index: number) => {
            switch (i) {
                case "Lundi":
                    TlundiR = this.props?.production[index]?.montant - Tlundi
                    break;
                case "Mardi":
                    TmardiR = this.props?.production[index]?.montant - Tmardi
                    break;
                case "Mecredi":
                    TmercrediR = this.props?.production[index]?.montant - Tmercredi
                    break;
                case "Jeudi":
                    TjeudiR = this.props?.production[index]?.montant - Tjeudi
                    break;
                case "Vendredi":
                    TvendrediR = this.props?.production[index]?.montant - Tvendredi
                    break;
                case "Samedi":
                    TsamediR = this.props?.production[index]?.montant - Tsamedi
                    break;
                case "Dimanche":
                    TdimancheR = this.props?.production[index]?.montant - Tdimanche
                    break;
                default:
                    break;
            }
        }
        )
        return (
            <div>
                <div className="h-full w-full">
                    <div className="text-center font-bold my-8">
                        <h2>CHARTER EXPRESS VOYAGES</h2>
                        <ul>
                            <li>  ENTREPRISE DE TRANSPORT INTER-URBAIN</li>
                            <li> BP: 5029 YAOUNDE</li>
                            <li className="my-4">FICHE SUIVIE</li>
                        </ul>
                    </div>
                    <div>
                        <table className="w-full text-xs font-mono text-center uppercase text-gray-800 ">
                            <thead className="text-xs uppercase bg-white text-gray-900 border border-stone-800 ">
                                <tr>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800 ">
                                        Date
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
                                        Dim
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800">
                                        Total
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800 ">
                                        Dépense
                                    </th>
                                    <th scope="col" className=" p-0 my-0" >
                                        <div className=" grid grid-cols-2">
                                            <div className="border py-3 px-1  border-stone-800">
                                                Intitulé
                                            </div>
                                            <div className="border py-3 px-1  border-stone-800">
                                                Montant
                                            </div>
                                        </div>
                                    </th>
                                    <th scope="col" className=" p-0"  >
                                        <div className=" grid grid-cols-2 ">
                                            <div className="border py-3 px-1  border-stone-800">
                                                Intitulé
                                            </div>
                                            <div className="border py-3 px-1  border-stone-800">
                                                Montant
                                            </div>
                                        </div>
                                    </th>
                                    <th scope="col" className=" p-0"  >
                                        <div className=" grid grid-cols-2 ">
                                            <div className="border py-3 px-1  border-stone-800">
                                                Intitulé
                                            </div>
                                            <div className="border py-3 px-1  border-stone-800">
                                                Montant
                                            </div>
                                        </div>
                                    </th>
                                    <th scope="col" className=" p-0" >
                                        <div className=" grid grid-cols-2 ">
                                            <div className="border py-3 px-1  border-stone-800">
                                                Intitulé
                                            </div>
                                            <div className="border py-3 px-1  border-stone-800">
                                                Montant
                                            </div>
                                        </div>
                                    </th>
                                    <th scope="col" className=" p-0" >
                                        <div className=" grid grid-cols-2 ">
                                            <div className="border py-3 px-1  border-stone-800">
                                                Intitulé
                                            </div>
                                            <div className="border py-3 px-1  border-stone-800">
                                                Montant
                                            </div>
                                        </div>
                                    </th>
                                    <th scope="col" className=" p-0" >
                                        <div className=" grid grid-cols-2 ">
                                            <div className="border py-3 px-1  border-stone-800">
                                                Intitulé
                                            </div>
                                            <div className="border py-3 px-1  border-stone-800">
                                                Montant
                                            </div>
                                        </div>
                                    </th>
                                    <th scope="col" className=" p-0" >
                                        <div className=" grid grid-cols-2 ">
                                            <div className="border py-3 px-1  border-stone-800">
                                                Intitulé
                                            </div>
                                            <div className="border py-3 px-1  border-stone-800">
                                                Montant
                                            </div>
                                        </div>
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border     border-stone-800">

                                    </th>
                                </tr>
                            </thead>
                            <tbody >

                                <tr>
                                    <th className="border p-0 border-stone-800">

                                    </th>
                                    <th scope="col" className=" p-0 text-right">
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
                                    <th scope="col" className="  p-0">
                                        {
                                            this.props.semaine.dimanche.map((i: any, index: number) => {
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
                                    <th scope="col">

                                    </th>
                                </tr>

                            </tbody>
                            <tfoot>
                                <tr className="bg-violet-400">
                                    <th className="text-xs uppercase border border-stone-800 py-2 px-1 text-black" >Montant depenses</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tlundi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tmardi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tmercredi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tjeudi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{Tvendredi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right"  >{Tsamedi} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right" >{Tdimanche} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right" >   {Tlundi + Tmardi + Tmercredi + Tjeudi + Tvendredi + Tsamedi + Tdimanche} fcfa</th>

                                </tr>
                                <tr className="bg-red-400">
                                    <th className="text-xs uppercase border border-stone-800 py-2 px-1 text-black" >Production du véhicule</th>
                                    {
                                        days.map((i: string, index: number) => {
                                            return (
                                                (

                                                    <th key={index} className="text-xs uppercase border border-stone-800 text-black text-right py-2 px-1 " >
                                                        {parseInt(this.props?.production[index]?.montant).toString() == "NaN" ? 0 : parseInt(this.props?.production[index]?.montant).toString()} fcfa
                                                    </th>

                                                )

                                            )
                                        })
                                    }

                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right" >  {totalBrut} fcfa</th>
                                </tr>
                                <tr className="bg-green-500 ">
                                    <th className="text-xs uppercase border border-stone-800 py-2 px-1 text-black" >Rentabilité</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{TlundiR} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{TmardiR} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{TmercrediR} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{TjeudiR} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right " >{TvendrediR} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right"  >{TsamediR} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right" >{TdimancheR} fcfa</th>
                                    <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 text-right" >   {TlundiR + TmardiR + TmercrediR + TjeudiR + TvendrediR + TsamediR + TdimancheR} fcfa</th>

                                </tr>
                            </tfoot>
                        </table>
                    </div>

                </div>
            </div>
        )
    }

}