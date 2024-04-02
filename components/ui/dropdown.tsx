import Image from 'next/image';
import { useState } from 'react';
import closeSvg from '@/public/images/close.svg'

export default function DropDown(props: { onEmit: Function, array: { text: string, action: string }[], left: string }) {


    const [isClose, setIsClose] = useState<boolean>(false)

    return (
        <>


            <button onClick={() => setIsClose(true)} className="text-white text-sm w-full hover:bg-blue-700 rounded-sm bg-blue-500 p-2">Action</button>
            {
                isClose ?
                    <>

                        < div className={"shadow-2xl min-w-48 z-20 top-8 absolute rounded-md overflow-hidden -left-20 "+ props.left } >
                            <div className='overflow-hidden overflow-y-auto max-h-96'>
                                {
                                    props.array.map((e: { text: string, action: string }, index: number) =>
                                        e.action == "delete" ? (
                                            <button key={index} type="button" onClick={() => props.onEmit(e.action)} className="bg-white hover:text-red-500  text-red-400  text-sm p-2 px-3 text-left hover:bg-red-50 block w-full border-b ">{e.text}</button>
                                        ) : (
                                            <button key={index} type="button" onClick={() => props.onEmit(e.action)} className="bg-white hover:text-blue-500  text-blue-400  text-sm p-2 px-3 text-left hover:bg-gray-100 block w-full border-b ">{e.text}</button>
                                        ))
                                }
                            </div>
                        </div >
                        <div className='fixed w-full h-full z-10 top-0 left-0' onClick={() => setIsClose(false)}>

                        </div>
                    </> : null
            }

        </>
    )



}