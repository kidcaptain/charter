
import Image from "next/image";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

export default function ComponentTicketPrint(props: { item: DataTableProps }) {
  let componentRef: any = useRef();

  return (
    <>
      <div>
        {/* button to trigger printing of target component */}
        <ReactToPrint
          trigger={() => <button type="button" className="p-2 text-sm bg-blue-500 text-white">Imprimer</button>}
          content={() => componentRef}
        />

        {/* component to be printed */}
        <ComponentToPrint
          client={props.item.client}
          tel={props.item.tel}
          depart={props.item.depart}
          voyage={props.item.voyage}
          montant={props.item.montant}
          remboursement={props.item.remboursement}
          caisse={props.item.caisse}
          numticket={props.item.numticket}
          type={props.item.type}
          trajet={props.item.trajet}
          siege={props.item.siege} ref={(el) => (componentRef = el)} />
      </div>
    </>
  );
}
export interface DataTableProps {
  client: string;
  tel: string;
  depart: string;
  voyage: string;
  montant: number;
  remboursement: number;
  caisse: string;
  numticket: string;
  type: string;
  trajet: string;
  siege: number
}
class ComponentToPrint extends React.Component<DataTableProps> {

  render() {
    const date = new Date();

    const year = date.getFullYear();
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    const hours = (date.getHours()) < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
    const minutes = (date.getMinutes()) < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
    return (
      <div>

        <div className=" max-w-md bg-white  relative p-4 m-auto">
          <Image src={'/images/logo.jpeg'} width={500} height={10} alt="" className="w-2/4 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-20 m-auto h-2/4" />
          <div className="relative font-semibold">
            <h4 className="p-4 uppercase text-2xl text-blue-600 italic font-medium text-center border-b ">Charter Express</h4>
            <hr className="border-yellow-400 border-2" />
            <hr className="border-red-500 border-2" />
            <h5 className="text-green-600 text-center font-serif italic underline">Réservation:</h5>
            <h6 className="text-green-600 text-center font-serif italic">Yaoundé: 6 74 66 20 88 - Douala: 6 74 66 20 88</h6>
            <h2 className="text-center text-xl font-medium font-sans">TICKET {this.props.type}</h2>
            <h2 className="text-center text-xl font-medium font-sans">N° {this.props.numticket}</h2>
            <h2 className="uppercase text-center"> <span className=" text-xl font-medium font-sans">CLT</span>: {this.props.client} </h2>
            <h2 className="uppercase text-center"> <span className=" text-xl font-medium font-sans">TEL</span>: {this.props.tel}</h2>
            <h2 className="uppercase text-center"> <span className=" text-xl font-medium font-sans">TRAJET</span>: {this.props.trajet}</h2>
            <h2 className="uppercase text-center"> <span className=" text-xl font-medium font-sans">DEPART</span>: {this.props.depart}</h2>
            <h2 className="uppercase text-center"> <span className=" text-xl font-medium font-sans">VOY</span>: {this.props.voyage}      <span className=" text-xl font-medium font-sans">SIEGE</span>: {this.props.siege}</h2>
            <h2 className="uppercase text-center"> <span className=" text-xl font-medium font-sans">MONTANT</span>: {this.props.montant}</h2>
            <h2 className="uppercase text-center"> <span className=" text-xl font-medium font-sans">REMBOURSEMENT</span>: {this.props.remboursement}</h2>
            <h2 className="uppercase text-center"> <span className=" text-xl font-medium font-sans">CAISSE</span>: {this.props.caisse}</h2>
          </div>
        </div>
      </div>

    )
  }

}