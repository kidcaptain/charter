
import { Jour } from "@/app/dashboard/admin/journal/page";
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
                <ComponentToPrint depenses={props.item.depenses} semaineD={props.item.semaineD} semaine={props.item.semaine} date1={props.item.date1} date2={props.item.date2} totalRecette={props.item.totalRecette} totalRecette2={props.item.totalRecette2} recettes={props.item.recettes} ref={(el) => (componentRef = el)} />
            </div>
        </>
    );
}
interface DataFicheJournal {
    depenses: {
        lundi: Jour[],
        mardi: Jour[],
        mercredi: Jour[],
        jeudi: Jour[],
        vendredi: Jour[],
        samedi: Jour[],
        dimanche: Jour[],
    },
    recettes: any[],
    date1: string,
    date2: string,
    totalRecette: number,
    totalRecette2: number
    semaine: string[],
    semaineD: {
        lundi: Jour[],
        mardi: Jour[],
        mercredi: Jour[],
        jeudi: Jour[],
        vendredi: Jour[],
        samedi: Jour[],
        dimanche: Jour[],
    }
}
class ComponentToPrint extends React.Component<DataFicheJournal> {

    render() {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        const days: string[] = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
        let lundiS: number = 0;
        this.props.depenses.lundi.map((i) => {
            lundiS = lundiS + parseInt(i.montant.toString())
        })
        let MardiS: number = 0;
        this.props.depenses.mardi.map((i) => {
            MardiS += parseInt(i.montant.toString())
        })
        let MecrediS: number = 0;
        this.props.depenses.mercredi.map((i) => {
            MecrediS += parseInt(i.montant.toString())
        })
        let JeudiS: number = 0;
        this.props.depenses.jeudi.map((i) => {
            JeudiS += parseInt(i.montant.toString())
        })
        let vendrediS: number = 0;
        this.props.depenses.vendredi.map((i) => {
            vendrediS += parseInt(i.montant.toString())
        })
        let samediS: number = 0;
        this.props.depenses.samedi.map((i) => {
            samediS += parseInt(i.montant.toString())
        })
        let dimancheS: number = 0;
        this.props.depenses.dimanche.map((i) => {
            dimancheS += parseInt(i.montant.toString())
        })
        let lundi: number = 0;
        this.props.semaineD.lundi.map((i) => {
            lundi += parseInt(i.montant.toString())
        })
        let Mardi: number = 0;
        this.props.semaineD.mardi.map((i) => {
            Mardi += parseInt(i.montant.toString())
        })
        let Mecredi: number = 0;
        this.props.semaineD.mercredi.map((i) => {
            Mecredi += parseInt(i.montant.toString())
        })
        let Jeudi: number = 0;
        this.props.semaineD.jeudi.map((i) => {
            Jeudi += parseInt(i.montant.toString())
        })
        let vendredi: number = 0;
        this.props.semaineD.vendredi.map((i) => {
            vendredi = vendredi + parseInt(i.montant.toString())
        })
        let samedi: number = 0;
        this.props.semaineD.samedi.map((i) => {
            samedi += parseInt(i.montant.toString())
        })
        let dimanche: number = 0;
        this.props.semaineD.dimanche.map((i) => {
            dimanche += parseInt(i.montant.toString())
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
                        <span>Semaine du </span> {this.props.date1} <span>au {this.props.date2}</span>
                    </div>
                    <div className="p-4">
                        {this.props.depenses.lundi.length > 0 || this.props.semaineD.lundi.length > 0 ? (
                            <>
                                <table className="w-full text-sm font-mono text-left rtl:text-right text-black">
                                    <thead className="text-sm uppercase">
                                        <tr className="bg-stone-400">
                                            <th scope="col" colSpan={5} className=" py-3 px-1 ">
                                                Semaine du
                                            </th>
                                            <th scope="col" className=" py-3 px-1  ">
                                                {this.props.date1}
                                            </th>
                                            <th scope="col" colSpan={5} className=" py-3 px-1  ">
                                                au
                                            </th>
                                            <th scope="col" colSpan={5} className=" py-3 px-1  ">
                                                {this.props.date2}
                                            </th>
                                        </tr>
                                        <tr><th colSpan={15} className="bg-violet-500 text-white text-center p-3">Dépenses Mécaniques</th></tr>
                                        <tr>
                                            <th></th>
                                            {
                                                days.map((r: any, index: number) => (
                                                    <th key={index} colSpan={2} scope="col" className=" py-3 px-1 border border-black  bg-stone-200">
                                                        {r} {this.props.semaine[index]}
                                                    </th>
                                                ))
                                            }
                                            <th></th>
                                        </tr>
                                        <tr>
                                            <th scope="col" className="px-3 py-2 border  border-stone-500">
                                                Dépenses
                                            </th>

                                            {
                                                days.map(() => (
                                                    <th colSpan={2}>
                                                        <div className="grid grid-cols-2">
                                                            <div className="px-3 py-2 border  border-stone-500">
                                                                INTITULE
                                                            </div>
                                                            <div className="px-3 py-2 border  border-stone-500">
                                                                MONTANT
                                                            </div>
                                                        </div>
                                                    </th>
                                                ))
                                            }

                                            <th className="px-3 py-2 border  border-stone-500">
                                                Totals
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody className="font-thin uppercase ">
                                        <tr>
                                            <th className="px-3 py-2 border border-stone-400">

                                            </th>
                                            <th colSpan={2} className=" p-0 ">
                                                {

                                                    this.props.semaineD.lundi.map((e: Jour) => (
                                                        e.montant > 0 ?
                                                            <div className="grid grid-cols-2 items-start">
                                                                <div className="px-3 py-2 border  border-stone-500">
                                                                    {e.intitule}
                                                                </div>
                                                                <div className="px-3 py-2 border text-right border-stone-500">
                                                                    {e.montant == 0 ? "" : e.montant + " fcfa"}
                                                                </div>
                                                            </div> : null
                                                    ))
                                                }
                                            </th>
                                            <th colSpan={2} className=" p-0 ">
                                                {
                                                    this.props.semaineD.mardi.map((e: Jour) => (
                                                        e.montant > 0 ?
                                                            <div className="grid grid-cols-2 items-start">
                                                                <div className="px-3 py-2 border  border-stone-500">
                                                                    {e.intitule}
                                                                </div>
                                                                <div className="px-3 py-2 border text-right border-stone-500">
                                                                    {e.montant == 0 ? " " : e.montant + " fcfa"}
                                                                </div>
                                                            </div>
                                                            : null
                                                    ))
                                                }
                                            </th>
                                            <th colSpan={2}>
                                                {
                                                    this.props.semaineD.mercredi.map((e: Jour) => (
                                                        e.montant > 0 ?
                                                            <div className="grid grid-cols-2">
                                                                <div className="px-3 py-2 border  border-stone-500">
                                                                    {e.intitule}
                                                                </div>
                                                                <div className="px-3 py-2 border text-right border-stone-500">
                                                                    {e.montant == 0 ? " " : e.montant + " fcfa"}
                                                                </div>
                                                            </div>
                                                            : null
                                                    ))
                                                }
                                            </th>
                                            <th colSpan={2}>
                                                {
                                                    this.props.semaineD.jeudi.map((e: Jour) => (
                                                        e.montant > 0 ?
                                                            <div className="grid grid-cols-2">
                                                                <div className="px-3 py-2 border  border-stone-500">
                                                                    {e.intitule}
                                                                </div>
                                                                <div className="px-3 py-2 border text-right border-stone-500">
                                                                    {e.montant == 0 ? " " : e.montant + " fcfa"}
                                                                </div>
                                                            </div>
                                                            : null
                                                    ))
                                                }
                                            </th>
                                            <th colSpan={2}>
                                                {
                                                    this.props.semaineD.vendredi.map((e: Jour) => (
                                                        e.montant > 0 ?
                                                            <div className="grid grid-cols-2">
                                                                <div className="px-3 py-2 border  border-stone-500">
                                                                    {e.intitule}
                                                                </div>
                                                                <div className="px-3 py-2 border text-right border-stone-500">
                                                                    {e.montant == 0 ? " " : e.montant + " fcfa"}
                                                                </div>
                                                            </div>
                                                            : null
                                                    ))
                                                }
                                            </th>
                                            <th colSpan={2}>
                                                {
                                                    this.props.semaineD.samedi.map((e: Jour) => (
                                                        e.montant > 0 ?
                                                            <div className="grid grid-cols-2">
                                                                <div className="px-3 py-2 border  border-stone-500">
                                                                    {e.intitule}
                                                                </div>
                                                                <div className="px-3 py-2 border text-right border-stone-500">
                                                                    {e.montant == 0 ? " " : e.montant + " fcfa"}
                                                                </div>
                                                            </div>
                                                            : null
                                                    ))
                                                }

                                            </th>
                                            <th colSpan={2}>
                                                {
                                                    this.props.semaineD.dimanche.map((e: Jour) => (
                                                        e.montant > 0 ?
                                                            <div className="grid grid-cols-2">
                                                                <div className="px-3 py-2 border  border-stone-500">
                                                                    {e.intitule}
                                                                </div>
                                                                <div className="px-3 py-2 border text-right border-stone-500">
                                                                    {e.montant == 0 ? " " : e.montant + " fcfa"}
                                                                </div>
                                                            </div>
                                                            : null
                                                    ))
                                                }

                                            </th>
                                            <th></th>
                                        </tr>
                                        <tr>
                                            <th className="px-3 py-2 border text-right border-stone-500">
                                                MONTANT DEPENSES
                                            </th>
                                            <th colSpan={2} className="px-3 py-2 border  border-stone-500">
                                                {lundi} fcfa
                                            </th>
                                            <th colSpan={2} className="px-3 py-2 border  border-stone-500">
                                                {Mardi} fcfa
                                            </th>
                                            <th colSpan={2} className="px-3 py-2 border  border-stone-500">
                                                {Mecredi} fcfa
                                            </th>
                                            <th colSpan={2} className="px-3 py-2 border  border-stone-500">
                                                {Jeudi} fcfa
                                            </th>
                                            <th colSpan={2} className="px-3 py-2 border  border-stone-500">
                                                {vendredi} fcfa
                                            </th>
                                            <th colSpan={2} className="px-3 py-2 border  border-stone-500">
                                                {samedi} fcfa
                                            </th>
                                            <th colSpan={2} className="px-3 py-2 border  border-stone-500">
                                                {dimanche} fcfa
                                            </th>
                                            <th className="px-3 py-2 border border-stone-400 text-right">
                                                {lundi + Mardi + Mecredi + Jeudi + vendredi + samedi + dimanche} FCFA
                                            </th>
                                        </tr>

                                    </tbody>
                                </table>

                                <table className="w-full mt-5 text-sm font-mono text-left rtl:text-right text-black">
                                    <thead className="text-sm uppercase">

                                        <tr><th colSpan={15} className="bg-red-500 text-white text-center p-3">Autres dépenses hors mécaniques</th></tr>
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
                                                    <th colSpan={2}>
                                                        <div className="grid grid-cols-2">
                                                            <div className="px-3 py-2 border  border-stone-500">
                                                                INTITULE
                                                            </div>
                                                            <div className="px-3 py-2 border  border-stone-500">
                                                                MONTANT
                                                            </div>
                                                        </div>
                                                    </th>
                                                ))
                                            }
                                            <th></th>


                                        </tr>
                                    </thead>
                                    <tbody className="font-thin uppercase ">
                                        <tr>
                                            <th className="px-3 py-2 border border-stone-400">

                                            </th>
                                            <th colSpan={2} className=" p-0 ">
                                                {

                                                    this.props.depenses.lundi.map((e: Jour) => (
                                                        e.montant > 0 ?
                                                            <div className="grid grid-cols-2 items-start">
                                                                <div className="px-3 py-2 border  border-stone-500">
                                                                    {e.intitule}
                                                                </div>
                                                                <div className="px-3 py-2 border text-right  border-stone-500">
                                                                    {e.montant == 0 ? "" : e.montant + " fcfa"}
                                                                </div>
                                                            </div> : null
                                                    ))
                                                }
                                            </th>
                                            <th colSpan={2} className=" p-0 ">
                                                {
                                                    this.props.depenses.mardi.map((e: Jour) => (
                                                        e.montant > 0 ?
                                                            <div className="grid grid-cols-2 items-start">
                                                                <div className="px-3 py-2 border  border-stone-500">
                                                                    {e.intitule}
                                                                </div>
                                                                <div className="px-3 py-2 border text-right border-stone-500">
                                                                    {e.montant == 0 ? " " : e.montant + " fcfa"}
                                                                </div>
                                                            </div>
                                                            : null
                                                    ))
                                                }
                                            </th>
                                            <th colSpan={2}>
                                                {
                                                    this.props.depenses.mercredi.map((e: Jour) => (
                                                        e.montant > 0 ?
                                                            <div className="grid grid-cols-2">
                                                                <div className="px-3 py-2 border  border-stone-500">
                                                                    {e.intitule}
                                                                </div>
                                                                <div className="px-3 py-2 border text-right border-stone-500">
                                                                    {e.montant == 0 ? " " : e.montant + " fcfa"}
                                                                </div>
                                                            </div>
                                                            : null
                                                    ))
                                                }
                                            </th>
                                            <th colSpan={2}>
                                                {
                                                    this.props.depenses.jeudi.map((e: Jour) => (
                                                        e.montant > 0 ?
                                                            <div className="grid grid-cols-2">
                                                                <div className="px-3 py-2 border  border-stone-500">
                                                                    {e.intitule}
                                                                </div>
                                                                <div className="px-3 py-2 border text-right border-stone-500">
                                                                    {e.montant == 0 ? " " : e.montant + " fcfa"}
                                                                </div>
                                                            </div>
                                                            : null
                                                    ))
                                                }
                                            </th>
                                            <th colSpan={2}>
                                                {
                                                    this.props.depenses.vendredi.map((e: Jour) => (
                                                        e.montant > 0 ?
                                                            <div className="grid grid-cols-2">
                                                                <div className="px-3 py-2 border  border-stone-500">
                                                                    {e.intitule}
                                                                </div>
                                                                <div className="px-3 py-2 border text-right border-stone-500">
                                                                    {e.montant == 0 ? " " : e.montant + " fcfa"}
                                                                </div>
                                                            </div>
                                                            : null
                                                    ))
                                                }
                                            </th>
                                            <th colSpan={2}>
                                                {
                                                    this.props.depenses.samedi.map((e: Jour) => (
                                                        e.montant > 0 ?
                                                            <div className="grid grid-cols-2">
                                                                <div className="px-3 py-2 border  border-stone-500">
                                                                    {e.intitule}
                                                                </div>
                                                                <div className="px-3 py-2 border text-right border-stone-500">
                                                                    {e.montant == 0 ? " " : e.montant + " fcfa"}
                                                                </div>
                                                            </div>
                                                            : null
                                                    ))
                                                }

                                            </th>

                                            <th colSpan={2}>
                                                {
                                                    this.props.depenses.dimanche.map((e: Jour) => (
                                                        e.montant > 0 ?
                                                            <div className="grid grid-cols-2">
                                                                <div className="px-3 py-2 border  border-stone-500">
                                                                    {e.intitule}
                                                                </div>
                                                                <div className="px-3 py-2 border text-right border-stone-500">
                                                                    {e.montant == 0 ? " " : e.montant + " fcfa"}
                                                                </div>
                                                            </div>
                                                            : null
                                                    ))
                                                }

                                            </th>
                                            <th></th>
                                        </tr>
                                        <tr className="text-right">
                                            <th className="px-3 py-2 border  border-stone-500">
                                                MONTANT DEPENSES
                                            </th>
                                            <th colSpan={2} className="px-3 py-2 border  border-stone-500">
                                                {lundiS} fcfa
                                            </th>
                                            <th colSpan={2} className="px-3 py-2 border  border-stone-500">
                                                {MardiS} fcfa
                                            </th>
                                            <th colSpan={2} className="px-3 py-2 border  border-stone-500">
                                                {MecrediS} fcfa
                                            </th>
                                            <th colSpan={2} className="px-3 py-2 border  border-stone-500">
                                                {JeudiS} fcfa
                                            </th>
                                            <th colSpan={2} className="px-3 py-2 border  border-stone-500">
                                                {vendrediS} fcfa
                                            </th>
                                            <th colSpan={2} className="px-3 py-2 border  border-stone-500">
                                                {samediS} fcfa
                                            </th>
                                            <th colSpan={2} className="px-3 py-2 border  border-stone-500">
                                                {dimancheS} fcfa
                                            </th>
                                            <th className="px-3 py-2 border border-stone-400 ">
                                                {lundiS + MardiS + MecrediS + JeudiS + vendrediS + samediS + dimancheS} FCFA
                                            </th>
                                        </tr>

                                    </tbody>

                                </table>
                            </>
                        ) : null}
                        <table className="w-full text-sm font-mono text-left rtl:text-right text-black">
                            <thead>
                                <tr>
                                    <th colSpan={16}></th>

                                </tr>
                            </thead>
                            <tbody className="mt-4  text-right">
                                <tr>
                                    <th className="p-4" colSpan={16}></th>
                                </tr>
                                <tr>
                                    <th className=" border bg-violet-400 text-center border-stone-500">
                                        SOMMES DES DEPENSES
                                    </th>
                                    <th colSpan={2} className=" border bg-violet-400 border-stone-500">
                                        {lundiS + lundi} fcfa
                                    </th>
                                    <th colSpan={2} className=" border bg-violet-400  border-stone-500">
                                        {MardiS + Mardi} fcfa
                                    </th>
                                    <th colSpan={2} className=" border bg-violet-400  border-stone-500">
                                        {MecrediS + Mecredi} fcfa
                                    </th>
                                    <th colSpan={2} className=" border bg-violet-400  border-stone-500">
                                        {JeudiS + Jeudi} fcfa
                                    </th>
                                    <th colSpan={2} className=" border bg-violet-400  border-stone-500">
                                        {vendrediS + vendredi} fcfa
                                    </th>
                                    <th colSpan={2} className=" border bg-violet-400  border-stone-500">
                                        {samediS + samedi} fcfa
                                    </th>
                                    <th colSpan={2} className=" border  bg-violet-400 border-stone-500">
                                        {dimancheS + dimanche} fcfa
                                    </th>
                                    <th></th>
                                </tr>
                                <tr>
                                    <th className=" border  text-center border-stone-500">
                                        DEPENSES ANNONCEES
                                    </th>
                                    <th colSpan={2} contentEditable  id="lun" className=" border  border-stone-500">
                                       
                                    </th>
                                    <th colSpan={2} contentEditable id="mar" className=" border   border-stone-500">
                                       
                                    </th>
                                    <th colSpan={2} contentEditable id="mer" className=" border   border-stone-500">
                                       
                                    </th>
                                    <th colSpan={2} contentEditable id="jeu" className=" border   border-stone-500">
                                       
                                    </th>
                                    <th colSpan={2} contentEditable id="ven" className=" border   border-stone-500">
                                       
                                    </th>
                                    <th colSpan={2} contentEditable id="sam" className=" border   border-stone-500">
                                      
                                    </th>
                                    <th colSpan={2} contentEditable id="dim" className=" border   border-stone-500">
                                       
                                    </th>
                                    <th></th>
                                </tr>
                                <tr>
                                    <th className=" border bg-red-500 text-center border-stone-500">
                                        ECART
                                    </th>
                                    <th colSpan={2} contentEditable className=" border bg-red-500 border-stone-500">
                                        {(lundi + lundiS) - parseInt(`${document.querySelector('th#lun')?.innerHTML}`)} fcfa
                                    </th>
                                    <th colSpan={2} contentEditable className=" border  bg-red-500 border-stone-500">
                                        {(MardiS + Mardi) - parseInt(`${document.querySelector('th#mar')?.innerHTML}`)} fcfa
                                    </th>
                                    <th colSpan={2} contentEditable className=" border bg-red-500  border-stone-500">
                                        {(MecrediS + Mecredi) - parseInt(`${document.querySelector('th#mer')?.innerHTML}`)} fcfa
                                    </th>
                                    <th colSpan={2} contentEditable className=" border bg-red-500  border-stone-500">
                                        {(JeudiS + Jeudi) - parseInt(`${document.querySelector('th#jeu')?.innerHTML}`)} fcfa
                                    </th>
                                    <th colSpan={2} contentEditable className=" border bg-red-500  border-stone-500">
                                        {(vendredi + vendrediS) - parseInt(`${document.querySelector('#ven')?.innerHTML}`)} fcfa
                                    </th>
                                    <th colSpan={2} contentEditable className=" border bg-red-500  border-stone-500">
                                        {(samediS + samedi) - parseInt(`${document.querySelector('th#sam')?.innerHTML}`)} fcfa
                                    </th>
                                    <th colSpan={2} contentEditable className=" border bg-red-500  border-stone-500">
                                        {(dimancheS + dimanche) - parseInt(`${document.querySelector('th#dim')?.innerHTML}`)} fcfa
                                    </th>
                                    <th></th>
                                </tr>
                                <tr>
                                    <th></th>
                                    <th colSpan={2} >
                                        {(lundi + lundiS) - parseInt(`${document.querySelector('th#lun')?.innerHTML}`) < 0 ? "Pas Bon" : "Bon"}
                                    </th>
                                    <th colSpan={2}>
                                        {(MardiS + Mardi) - parseInt(`${document.querySelector('th#mar')?.innerHTML}`) < 0 ? "Pas Bon" : "Bon"}
                                    </th>
                                    <th colSpan={2}>
                                        {(MecrediS + Mecredi) - parseInt(`${document.querySelector('th#mer')?.innerHTML}`) < 0 ? "Pas Bon" : "Bon"}
                                    </th>
                                    <th colSpan={2}>
                                        {(JeudiS + Jeudi) - parseInt(`${document.querySelector('th#jeu')?.innerHTML}`) < 0 ? "Pas Bon" : "Bon"}
                                    </th>
                                    <th colSpan={2}>
                                        {(vendredi + vendrediS) - parseInt(`${document.querySelector('#ven')?.innerHTML}`) < 0 ? "Pas Bon" : "Bon"}
                                    </th>
                                    <th colSpan={2}>
                                        {(samediS + samedi) - parseInt(`${document.querySelector('th#sam')?.innerHTML}`) < 0 ? "Pas Bon" : "Bon"}
                                    </th>
                                    <th colSpan={2}>
                                        {(dimancheS + dimanche) - parseInt(`${document.querySelector('th#dim')?.innerHTML}`) < 0 ? "Pas Bon" : "Bon"}
                                    </th>
                                    <th colSpan={1}></th>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div >
        )
    }

}