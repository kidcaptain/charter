
import Image from "next/image";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import logo from "@/public/images/logo.jpeg"
export default function SalaireEmploye(props: { item: DataSalaireEmploye }) {
    let componentRef: any = useRef();

    return (
        <>
            <div>
                {/* button to trigger printing of target component */}
                <ReactToPrint
                    trigger={() => <button className="p-2 bg-blue-500 text-xs text-white">Imprimer</button>}
                    content={() => componentRef}
                />

                {/* component to be printed */}
                <ComponentToPrint  employes={props.item.employes} date={props.item.date} ref={(el) => (componentRef = el)} />
            </div>
        </>
    );
}
interface DataSalaireEmploye {
    employes: any[];
    date: string
}
class ComponentToPrint extends React.Component<DataSalaireEmploye> {

    render() {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        // const days: string[] = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
        let total: number = 0;
        // this.props.depenses.map((i) => {
        //     totalDepense = totalDepense + parseInt(i.montant)
        // })
        let totalBrut: number = 0;
        let totalPrime: number = 0;
        let totalRetenue: number = 0;
        let totalChargeNet : number = 0;
        this.props.employes.map((i) => {
            totalBrut = totalBrut + parseInt(i.poste.salaire);
            if (i.prime) {
                totalPrime+= parseInt(i.prime.montant)
                total = totalBrut + total + parseInt(i.prime.montant)
            } else {
                total = totalBrut + total
            }
            if (i.retenue) {
                totalRetenue+= parseInt(i.retenue.montant)
            }
        })
        totalChargeNet = totalBrut + totalPrime - totalRetenue;
        return (
            <div className="p-4 ">
                <div className="text-center font-bold my-8">
                <Image src={logo} width={80} height={80} alt="" className="m-auto" />
                    <h2 className=" text-4xl">Agence de voyages</h2>
                    <h4>Salaire du mois de {this.props.date == "" ? `${year}-${month}`   : this.props.date }</h4>
                </div>
                
                <table className="w-full text-xs font-mono text-center uppercase text-gray-800 ">
                    <thead className="text-xs uppercase bg-green-300 text-gray-900 border border-stone-800 ">
                        <tr>
                            <th scope="col" className=" py-3 px-1 border border-stone-800 ">
                                N°
                            </th>
                            <th scope="col" className=" py-3 px-1 border border-stone-800">
                                Nom complet
                            </th>
                            <th scope="col" className=" py-3 px-1 border border-stone-800">
                                Téléphone
                            </th>
                            <th scope="col" className=" py-3 px-1 border border-stone-800">
                                N°CNI
                            </th>
                            <th scope="col" className=" py-3 px-1 border border-stone-800 ">
                                Poste
                            </th>
                            <th scope="col" className=" py-3 px-1 border border-stone-800">
                                Salaire brut
                            </th>
                            <th scope="col" className="text-center p-0 border border-stone-800">
                                <div className="py-3 px-1">
                                    Avantage/Retenue sur salaire
                                </div>
                                <div className="grid  grid-cols-3">
                                    <div className="border border-stone-800 py-3 px-1  ">Motif</div>
                                    <div className="border border-stone-800 py-3 px-1 ">Montant total</div>
                                    <div className="border border-stone-800 py-3 px-1 ">Montant Amputé</div>
                                </div>
                            </th> <th scope="col" className=" py-3 px-1 border border-stone-800">
                                Charges
                            </th>
                            <th scope="col" className=" py-3 px-1 border border-stone-800">
                                Salaire net
                            </th>
                            <th scope="col" className=" py-3 px-1 border border-stone-800">
                                rib
                            </th>

                        </tr>
                    </thead>
                    <tbody >
                        {this.props.employes.map((item: any, i: number) => (
                            <tr key={i + 1}>
                                <th className=" py-2 px-1 border border-stone-800">{i + 1}</th>
                                <th className=" py-2 px-1 border border-stone-800">{item.employe?.nom} {item.employe?.prenom}</th>
                                <th className=" py-2 px-1 border border-stone-800">{item.employe?.telephone}</th>
                                <th className=" py-2 px-1 border border-stone-800">{item.employe?.numCNI}</th>
                                <th className=" py-2 px-1 border border-stone-800">{item.poste?.titre}</th>
                                <th className=" py-2 px-1 border border-stone-800  uppercase">{item.poste.salaire}<span className="text-xs">fcfa</span></th>
                                <th className="  border border-stone-800 p-0">
                                    {item.prime ? (
                                        <div className="grid grid-cols-3">
                                            <div className="border py-2 px-1  text-left border-stone-800">
                                                <p>Avantage: {item.prime?.justificatif}</p> <br />
                                                <p>Retenue: {item.retenue?.label}</p>
                                            </div>
                                            <div className="border py-2 px-1 border-stone-800">{item.prime?.montant} FCFA</div>
                                            <div className="border py-2 px-1 border-stone-800">{item.retenue?.montant} FCFA</div>
                                        </div>
                                    ) : null}
                                   
                                </th>
                                <th className=" py-2 px-1 border border-stone-800">0</th>
                                <th className=" py-2 px-1 border border-stone-800  uppercase">{item.poste.salaire + item.prime?.montant - item.retenue?.montant} fcfa </th>
                                <th className=" py-2 px-1 border border-stone-800"></th>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className="text-xs uppercase border border-stone-800 bg-green-500 py-2 px-1 text-white" colSpan={5}>Total</th>
                            <th className="text-xs uppercase border border-stone-800 text-black py-2 px-1 " colSpan={1}>{totalBrut} fcfa</th>
                            <th className="text-xs uppercase border border-stone-800 p-0 text-black " colSpan={1} >
                                <div className="grid  grid-cols-3">
                                    <div className="border border-stone-800 py-2 px-1"></div>
                                    <div className="border border-stone-800 py-2 px-1">{totalPrime} fcfa</div>
                                    <div className="border border-stone-800 py-2 px-1">{totalRetenue} Fcfa</div>
                                </div>
                            </th>
                            <th className="text-xs uppercase border border-stone-800 text-black " colSpan={1}>0 <span className="text-xs"> fcfa</span></th>
                            <th className="text-xs uppercase border border-stone-800 text-black" colSpan={1}>{totalChargeNet}      <span className="text-xs">fcfa</span></th>
                            <th className="border border-stone-800">

                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )

    }

}