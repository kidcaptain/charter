
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

export default function BulletinPaie(props: { item: DataBulletinSalaire }) {
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
                    agence={props.item.agence}
                    poste={props.item.poste}
                    employe={props.item.employe}
                    salaire={props.item.salaire} ref={(el) => (componentRef = el)} />
            </div>
        </>
    );
}
export interface DataBulletinSalaire {
    salaire: number;
    employe: any;
    poste: string;
    agence: string;
    date: string

}
class ComponentToPrint extends React.Component<DataBulletinSalaire> {

    render() {
        const date = new Date();

        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        const hours = (date.getHours()) < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
        const minutes = (date.getMinutes()) < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
        return (
            <div className="p-4 w-full h-full min-h-full">
                <div className="max-w-5xl m-auto p-4 bg-white h-full w-full">
                    <div className="text-center font-bold my-8">
                        <h2>CHARTER EXPRESS VOYAGES</h2>
                        <ul>
                            <li>  ENTREPRISE DE TRANSPORT INTER-URBAIN</li>
                            <li> BP: 5029 YAOUNDE</li>
                            <li> N° Contribuable:M09020001474P</li>
                            <li>  RRCCM N°: 2002U04 du 15/10/2002</li>
                        </ul>

                    </div>
                    <div className="grid grid-cols-4 gap-4 p-4 text-sm">
                        <ul className="font-bold">
                            <li className="my-2">Mois</li>
                            <li className="my-2">Période</li>
                            <li className="my-2">Matricule</li>
                            <li className="my-2">Ancienneté</li>
                            <li className="my-2">Nature du contrat</li>
                            <li className="my-2">Catégorie</li>
                        </ul>
                        <ul className="text-right">
                            <li className="my-2"> {(new Date().getMonth() + 1) < 10 ? (`0${new Date().getMonth() + 1}`) : (new Date().getMonth() + 1)} / {new Date().getFullYear()}</li>
                            <li className="my-2">{this.props.date}</li>
                            <li className="my-2">{this.props.employe.matricule}</li>
                            <li className="my-2">{this.props.employe.anciennete == 1 ? "oui" : "non"}</li>
                            <li className="my-2">{this.props.employe.natureContrat}</li>
                        </ul>
                        <ul className="font-bold">
                            <li className="my-2">Nom</li>
                            <li className="my-2">Téléphone</li>
                            <li className="my-2">Agence</li>
                            <li className="my-2">Poste</li>

                        </ul>
                        <ul className="text-right">
                            <li className="my-2">{this.props.employe.nom} {this.props.employe.prenom}</li>
                            <li className="my-2">{this.props.employe.telephone}</li>
                            <li className="my-2">{this.props.agence}</li>
                            <li className="my-2">{this.props.poste}</li>
                        </ul>
                    </div>
                    <div className="p-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-800 ">
                            <thead className="text-sm bg-gray-500 text-gray-900 border ">
                                <tr className="uppercase">
                                    <th scope="col" style={{ width: 350 }} className=" py-3 px-1 border border-stone-800 ">
                                        Libellé
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800">
                                        Base (Fcfa)
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800 ">
                                        Taux (%)
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800">
                                        Gains (Fcfa)
                                    </th>
                                    <th scope="col" className=" py-3 px-1 border border-stone-800">
                                        Retenue (Fcfa)
                                    </th>
                                </tr>
                            </thead>
                            <tbody >
                                <tr className="font-normal" >
                                    <th className="px-3 py-4 border border-stone-800 border-y-0">
                                        Salaire de base
                                    </th>
                                    <th className=" border border-stone-800 border-y-0">
                                        <input type="text" value={this.props.salaire} className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className=" border border-stone-800 border-y-0 ">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className=" border border-stone-800 border-y-0 ">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className=" border border-stone-800 border-y-0 ">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                </tr>
                                <tr className="font-normal" >
                                    <th className="px-3 py-4 border border-stone-800 border-y-0">
                                        Prime d&apos;ancienneté
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                </tr>
                                <tr className="font-normal" >
                                    <th className="px-3 py-4 border border-stone-800 border-y-0">
                                        IND. Transport
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                </tr>
                                <tr className="font-normal" >
                                    <th className="px-3 py-4 border border-stone-800 border-y-0">
                                        Forfait hrs suppl
                                    </th>
                                    <th className=" border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className=" border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className=" border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className=" border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                </tr>

                                <tr className="font-normal "   >
                                    <th className="px-3 py-4 border h-96 border-stone-800 border-y-0">
                                        Hrs suppl
                                    </th>
                                    <th className=" border border-stone-800 border-y-0">
                                        <textarea className="w-full h-96 resize-none px-3 py-4 focus-within:outline-none bg-stone-50" ></textarea>
                                    </th>
                                    <th className=" border border-stone-800 border-y-0">
                                        <textarea className="w-full h-96 resize-none px-3 py-4 focus-within:outline-none bg-stone-50" ></textarea>
                                    </th>
                                    <th className=" border border-stone-800 border-y-0">
                                        <textarea className="w-full h-96 resize-none px-3 py-4 focus-within:outline-none bg-stone-50" ></textarea>
                                    </th>
                                    <th className=" border border-stone-800 border-y-0">
                                        <textarea className="w-full h-96 resize-none px-3 py-4 focus-within:outline-none bg-stone-50" ></textarea>
                                    </th>
                                </tr>


                                <tr className="font-normal" >
                                    <th className="px-3 py-4 border border-stone-800 border-y-0">
                                        Cotisation CNPS
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                </tr>
                                <tr className="font-normal" >
                                    <th className="px-3 py-4 border border-stone-800 border-y-0">
                                        Retenue credit foncier
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                </tr>
                                <tr className="font-normal" >
                                    <th className="px-3 py-4 border border-stone-800 border-y-0">
                                        Retenue assurance sante
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                </tr>
                                <tr className="font-normal" >
                                    <th className="px-3 py-4 border border-stone-800 border-y-0">
                                        redevance audio visuelle
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                </tr>
                                <tr className="font-normal" >
                                    <th className="px-3 py-4 border border-stone-800 border-y-0">
                                        Taxe communale
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                </tr>
                                <tr className="font-normal" >
                                    <th className="px-3 py-4 border border-stone-800 border-y-0">
                                        ** Base imp. brut norma-30%
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                </tr>
                                <tr className="font-normal" >
                                    <th className="px-3 py-4 border border-stone-800 border-y-0">
                                        ** Base imp. brut excep-30%
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                </tr>
                                <tr className="font-normal" >
                                    <th className="px-3 py-4 border border-stone-800 border-y-0">
                                        Impot sur revenu
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                </tr>

                                <tr className="font-normal" >
                                    <th className="px-3 py-4 border border-stone-800 border-y-0">
                                        regul impot sur revenu
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                </tr>
                                <tr className="font-normal" >
                                    <th className="px-3 py-4 border border-stone-800 border-y-0">
                                        centimes comminaux (C.A.C)
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                </tr>

                                <tr className="font-normal" >
                                    <th className="px-3 py-4 border border-stone-800 border-y-0">
                                        COT. SDTMPAW
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                </tr>
                                <tr className="font-normal" >
                                    <th className="px-3 py-4 border border-stone-800 border-y-0">
                                        ARRONDI MOIS PRECEDENT

                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                </tr>
                                <tr className="font-normal" >
                                    <th className="px-3 py-4 border border-stone-800 border-y-0">
                                        ARRONDI DU MOIS

                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                </tr>
                                <tr className="font-normal" >
                                    <th className="px-3 py-4 border border-stone-800 border-y-0">
                                        AVANCE SUR SALAIRE
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                    <th className="border border-stone-800 border-y-0">
                                        <input type="text" className="w-full h-full px-3 py-4 focus-within:outline-none bg-stone-50" />
                                    </th>
                                </tr>
                                <tr className="font-normal" >
                                    <th className="px-3 py-4 border border-stone-800 ">
                                        TOTAUX 
                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                    <th className="px-3 py-4 border border-stone-800">

                                    </th>
                                </tr>
                            </tbody>
                        </table>
                        <div className="flex gap-4 items-center text-sm my-4">
                            <p>Virement bancaire / Especes / Cheque</p>
                            <h4 className="font-bold uppercase">Net a payer (Fcfa)</h4>
                            <div className="bg-lime-400 px-5 font-bold"><input type="number" className="w-full h-full px-3 py-4 focus-within:outline-none bg-inherit" /></div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}