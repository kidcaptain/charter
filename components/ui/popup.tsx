import { useEffect, useState } from "react"

const Popup = (props: { message?: string, onShow: Function, title?: string, color?: string }) => {

    return (
        <div style={{maxWidth: 800, width: 300}} className={`fixed opacity-90 z-40 top-2  shadow-2xl  rounded-sm overflow-hidden right-10  bg-${props.color}-500`}>
            <div className={`p-1 flex justify-between items-center text-white  bg-${props.color}-700`}>
                <button onClick={() => props.onShow(false)} className={`text-xs   p-1`}>Fermer</button>
            </div>
            <p className="p-4 text-white text-sm ">{props.message}</p>
        </div>
    )
}

export default Popup