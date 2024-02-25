
import React, { useState } from "react";
import Chart from "chart.js";

export default function CardLineChart(props: { moisDepense: number[], moisRecette: number[] }) {
    React.useEffect(() => {
        var config : any = {
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
                        label: "Dépenses",
                        backgroundColor: "#3182ce",
                        borderColor: "#3182ce",
                        data: props.moisDepense,
                        fill: false,
                    },
                    {
                        label: "Recettes",
                        fill: false,
                        backgroundColor: "#edf2f7",
                        borderColor: "#edf2f7",
                        data: props.moisRecette,
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: false,
                    text: "Sales Charts",
                    fontColor: "white",
                },
                legend: {
                    labels: {
                        fontColor: "white",
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
                                fontColor: "rgba(255,255,255,.7)",
                            },
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: "Month",
                                fontColor: "white",
                            },
                            gridLines: {
                                display: false,
                                borderDash: [2],
                                borderDashOffset: [2],
                                color: "rgba(33, 37, 41, 0.3)",
                                zeroLineColor: "rgba(0, 0, 0, 0)",
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                fontColor: "rgba(255,255,255,.7)",
                            },
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: "Value",
                                fontColor: "white",
                            },
                            gridLines: {
                                borderDash: [3],
                                borderDashOffset: [3],
                                drawBorder: false,
                                color: "rgba(255, 255, 255, 0.15)",
                                zeroLineColor: "rgba(33, 37, 41, 0)",
                                zeroLineBorderDash: [2],
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
            window.myLine = new Chart(ctx, config);

        }


    }, [props.moisDepense]);
    return (
        <>
            <div className="relative h-full flex flex-col min-w-0 break-words w-full shadow-lg rounded bg-red-500 from-orange-700 bg-gradient-to-t ">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h6 className="uppercase text-white mb-1 text-xs font-semibold">
                                Dépenses et Recettes sur l&apos;année
                            </h6>

                        </div>
                    </div>
                </div>
                <div className="p-4 flex-auto">
                    {/* Chart */}
                    <div className="relative h-350-px" style={{ height: 400 }}>
                        <canvas id="line-chart"></canvas>
                    </div>
                </div>
            </div>
        </>
    );
}