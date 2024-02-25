"use client"
import Image from 'next/image'
import { useState } from 'react'

export default function ToggleInput(props: { firstLabel: string, secondLabel: string, icon?: string, onEmit: Function }) {

    const [value, setValue] = useState<string>(props.secondLabel)
    const [selected, setSelected] = useState<boolean>(false)
    

    return (
        <div className='relative text-xs rounded-sm border p-2 drop-shadow-2xl'>
            <div className='flex flex-row gap-2'>
                <button type='button' className='min-w-20' onClick={() => {setValue(props.firstLabel); setSelected(true); props.onEmit(props.firstLabel)}}>{props.firstLabel}</button>
                <button type='button' className='min-w-20' onClick={() => {setValue(props.secondLabel);  setSelected(false); props.onEmit(props.secondLabel)}}>{props.secondLabel}</button>
            </div>
            <div className={`bg-green-600 transition-all ease-linear flex items-center justify-center absolute w-1/2 h-full top-0 ${selected ? 'left-0' : 'right-0'} rounded-sm`}>
                <button type='button' className='text-white'>{value}</button >
            </div>
        </div>
    )

}