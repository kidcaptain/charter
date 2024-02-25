"use client"

import DoughnutChart from "./doughnutChart"

export default function CardDoughnut(props: { val: number, val2: number, back1: string, back2: string, label1: string, label2: string, title: string, color: string, id: string    }) {


    return (
        <div className="p-4 border rounded-md bg-white shadow-2xl ">
            <h3 className="text-xl font-bold">{props.title}</h3>
            <DoughnutChart val={props.val} id={props.id} val2={props.val2} back1={props.back1} back2={props.back2} label1={props.label1} label2={props.label2}  />
        </div>
    )

}