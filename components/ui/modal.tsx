import { Component } from "react";

export default function Modal(props: string) {
    return (
        <section className="bg-black/50 w-full h-full top-0 left-0 absolute z-20">
            <div className="max-w-3xl mx-auto my-auto mt-4">
                {props}
            </div>
        </section>
    )
} 