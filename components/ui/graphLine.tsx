
import React, { useState } from "react";
import Chart from "chart.js";

export default function GraphLine(props: {production: number[]}) {
    React.useEffect(() => {
        var config = {
            type: "line",
            data: {
                labels: [
                    "JANVIER",
                    "FEVRIER",
                    "MARS",
                    "AVRIL",
                    "MAI",
                    "JUIN",
                    "JUILLET",
                    "AOUT",
                    "SEPTEMBRE",
                    "OCTOBRE",
                    "NOVEMBRE",
                    "DECEMBRE"
                ],
                datasets: [
                    {
                        label: "Production",
                        backgroundColor: "#ffffff",
                        borderColor: "#000000",
                        data: props.production,
                        fill: true,
                    },
                
                ],
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: false,
                    text: "Sales Charts",
                    fontColor: "black",
                },
                legend: {
                    labels: {
                        fontColor: "black",
                    },
                    align: "end",
                    position: "bottom",
                },
                tooltips: {
                    mode: "index",
                    intersect: false,
                },
                hover: {
                    mode: "nearest",
                    intersect: true,
                },
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                fontColor: "#000000",
                                
                            },
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: "Month",
                                fontColor: "black",
                            },
                            gridLines: {
                                display: false,
                                borderDash: [2],
                                borderDashOffset: [2],
                                color: "#000000",
                                zeroLineColor: "rgba(0, 0, 0, 0)",
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                fontColor: "#000000",
                            },
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: "Value",
                                fontColor: "black",
                            },
                            gridLines: {
                                borderDash: [3],
                                borderDashOffset: [3],
                                drawBorder: false,
                                color: "#000000",
                                zeroLineColor: "rgba(33, 37, 41, 0)",
                                zeroLineBorderDash: [3],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                },
            },
        };
        var doc: any = document.getElementById("line-chart");
        if (doc) {
            var ctx = doc.getContext("2d");
        }
      // @ts-ignore 
        window.myLine = new Chart(ctx, config);
     
    }, [props.production]);
    return (
        <>
            <div className="relative h-full flex bg-stone-100 flex-col min-w-0 break-words w-full  border p-4 ">
                <div className="absolute w-full h-full z-20 bg-black/10 top-0 left-0 ">

                </div>
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h6 className="uppercase text-black mb-1 text-xs font-semibold">
                                Dépenses et Recettes de l&apos;année en cour
                            </h6>

                        </div>
                    </div>
                </div>
                <div className=" flex-auto">
                    {/* Chart */}
                    <div className="relative h-350-px m-auto" style={{width: 1000,  height: 400 }}>
                        <canvas id="line-chart"></canvas>
                    </div>
                </div>
            </div>
        </>
    );
}