"use client"

import Card from "@/components/card"
import CardBarChart from "@/components/cardBarChart"
import CardDepense from "@/components/cardDepense"
import CardLineChart from "@/components/cardLineChart"
import CardRecettes from "@/components/cardRecettes"
import GridDataComptable from "@/components/gridDataComptable"
import { useEffect, useRef } from "react"


export default function HomeDashboard() {

    return (
        <section className="p-10">
            <h2 className="text-center text-3xl uppercase my-5">Agences de Yaoundé</h2>
            <div className="grid grid-cols-4 gap-4 ">
                <div className="col-span-2">
                   
                </div>
                <div className="col-span-2">
                    <CardBarChart />
                </div>
            </div>
            <GridDataComptable />
            <div className="grid grid-cols-2 gap-4 mt-8">
                <div>
                    <CardDepense />
                </div>
                <div>
                    <CardRecettes />
                </div>
            </div>
        
        </section>
    )
}