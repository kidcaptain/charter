
import React from "react";
import Chart from "chart.js";
import { title } from "process";

export default function DoughnutChart(props: { val: number,back1: string, back2: string, label1: string, label2: string, val2: number, id: string}) {
    React.useEffect(() => {
        var config = {
            type: "doughnut",
            data: {
                labels: [
                    props.label1,
                    props.label2,
                ],
                datasets: [
                    {
                        label: new Date().getFullYear(),
                        backgroundColor: [
                            props.back1,
                            props.back2
                        ],
                        hoverOffset: 4,
                        borderColor: "#3182ce",
                        data: [props.val, props.val2],
                        fill: false,
                    }
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
                                zeroLineColor: "rgba(8, 0, 0, 0)",
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                },
            },
        };
        var doc: any = document.getElementById(`line-chart-${props.id}`);
        if (doc) {
            var ctx = doc.getContext("2d");
        }
        window.myLine = new Chart(ctx, config);
    }, [props.val, props.val2]);
    return (
        <>
            <div className="relative h-full text-gray-800 flex flex-col min-w-0 break-words w-full">
                <div className="">
                    {/* Chart */}
                    <div className="relative h-350-px m-auto    " style={{ height: 300 }}>
                        <canvas id={`line-chart-${props.id}`}></canvas>
                    </div>
                </div>
            </div>
        </>
    );
}