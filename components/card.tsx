import { useState } from "react"
import Image from 'next/image'

export default function Card(props: { text: string, number: number, color: string, img?: string }) {
    const className: string = `bg-white text-gray-800 rounded-sm  p-4 shadow-lg overflow-hidden `
    return (
        <div className={className}>
            <div className="items-center flex justify-start flex-row">
                {(props.img) ? (
                    <div>
                        <div className="bg-blue-50 p-2 rounded-full">
                            <Image src={props.img} alt="svg" width={48} height={48} />
                        </div>
                    </div>
                ) : null}
                <div>
                    <h4 className=" text-lg text-gray-600 font-thin">{props.text}</h4>
                    <h2 className=" font-bold text-xl">{props.number}</h2>
                </div>
            </div>
        </div>
    )
}