
import { useEffect, useState } from "react"
import "./helpPopup.css";

const HelpPopup = (props: { message?: string}) => {

    return (
        <>
        <div id="help"  className=" relative text-xs text-black ">
            <div className="w-2  border flex justify-center items-center p-2 h-2 rounded-full border-blue-400"> !</div>
            <div id="help-message" className="px-4 py-2 font-semibold z-40 min-w-40  bg-blue-500 text-white absolute mt-2 left-2 -translate-x-2 rounded-md text-xs ">
                {props.message}
            </div>
        </div>
        </>
    )
}

export default HelpPopup