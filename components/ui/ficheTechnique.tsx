
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

export default function FicheTechnique(props: { item: DataFicheTechnique }) {
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
                    marque={props.item.marque}
                    modele={props.item.modele}
                    typeBus={props.item.typeBus}
                    anneeFabrication={props.item.anneeFabrication}
                    capacite={props.item.capacite}
                    placesDisponible={props.item.placesDisponible}
                    placesTotal={props.item.placesTotal}
                    panneVehicule={props.item.panneVehicule}
                ref={(el) => (componentRef = el)} />
            </div>
        </>
    );
}

export interface DataFicheTechnique {
    marque: string,
    modele: string,
    typeBus: string,
    anneeFabrication: string,
    capacite: number,
    placesDisponible: number,
    placesTotal: number,
    panneVehicule: string
}

class ComponentToPrint extends React.Component<DataFicheTechnique> {

    render() {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        const hours = (date.getHours()) < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
        const minutes = (date.getMinutes()) < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
        return (
            <div className="p-10 max-w-5xl m-auto mt-4 min-h-screen bg-white">
                <div>
                    <div className="text-center font-bold my-8">
                        <h2 className="text-3xl">CHARTER EXPRESS VOYAGES</h2>
                        <ul>
                            <li>  ENTREPRISE DE TRANSPORT INTER-URBAIN</li>
                            <li> BP: 5029 YAOUNDE</li>
                            <li className="my-4 text-xl underline">FICHE TECHNIQUE</li>
                        </ul>

                    </div>
                    <h3 className="p-4 border uppercase  bg-stone-800 text-white border-black">Caracteristiques</h3>
                    <table className="w-full text-xs font-bold text-gray-900">
                        <tbody>
                            <tr className="">
                                <td className="border border-stone-700 uppercase p-2">Type de véhicule</td>
                                <td className="border text-gray-600 border-stone-700 uppercase p-2">Bus</td>
                            </tr>
                            <tr className="">
                                <td className="border border-stone-700 uppercase p-2">Marque</td>
                                <td className="border text-gray-600 border-stone-700 uppercase p-2">{this.props.marque}</td>
                            </tr>
                            <tr className="border">
                                <td className="border border-stone-700 uppercase p-2">Modèle</td>
                                <td className="border text-gray-600 border-stone-700 uppercase p-2">{this.props.modele}</td>
                            </tr>
                            <tr className="border">
                                <td className="border border-stone-700 uppercase p-2">Type de Bus</td>
                                <td className="border text-gray-600 border-stone-700 uppercase p-2">Bus {this.props.typeBus}</td>
                            </tr>
                            <tr className="border">
                                <td className="border border-stone-700 uppercase p-2">Année de fabrication</td>
                                <td className="border text-gray-600 border-stone-700 uppercase p-2">{this.props.anneeFabrication}</td>
                            </tr>
                            <tr className="border">
                                <td className="border border-stone-700 uppercase p-2">Capacité</td>
                                <td className="border text-gray-600 border-stone-700 uppercase p-2">{this.props.capacite}</td>
                            </tr>
                            <tr className="border">
                                <td className="border border-stone-700 uppercase p-2">Places disponible</td>
                                <td className="border text-gray-600 border-stone-700 uppercase p-2">{this.props.placesDisponible}</td>
                            </tr>
                            <tr className="border">
                                <td className="border border-stone-700 uppercase p-2">Places total</td>
                                <td className="border text-gray-600 border-stone-700 uppercase p-2">{this.props.placesTotal}</td>
                            </tr>
                            <tr className="border">
                                <td className="border border-stone-700 uppercase p-2">Panne </td>
                                <td className="border text-gray-600 border-stone-700  p-2">{this.props.panneVehicule == "" ? "Aucune panne" : this.props.panneVehicule}</td>
                            </tr>
                        </tbody>
                    </table>


                </div>
            </div>
        )
    }

}