import Image from 'next/image'

export default function DashboardLink(props: { label: string, selected: boolean, icon?: string }) {

    const className = "transition ease-linear p-2 flex items-center justify-start gap-4"
    return (
        <span className={` text-sm flex items-center ${className} ${props.selected ? 'text-white border-l-8 border-blue-600 bg-blue-500 font-bold rounded-s-2xl mb-4 fill-blue-500 hover:fill-blue-500    stroke-blue-500 hover:stroke-blue-600' : 'text-stone-900 mb-4 font-medium fill-slate-500 hover:fill-blue-500 hover:text-blue-500 stroke-slate-500 hover:stroke-blue-500'}`}>
            <div className='w-9 h-9 flex shadow-md shadow-blue-500/30 justify-center items-center bg-white rounded-full'>
                {props.icon ? (<Image src={props.icon} width={24} alt="Link" height={24} />) : null}
            </div>
            {props.label}
        </span>
    )

}