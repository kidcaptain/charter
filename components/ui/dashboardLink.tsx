
import Image from 'next/image'

export default function DashboardLink(props: { label: string, selected: boolean, icon?: string }) {

    const className = "transition ease-linear p-2 flex items-center justify-start gap-4  "
    return (
        <span className={` ${className} ${props.selected ? 'text-stone-900 border-l-8 border-blue-500 font-bold bg-stone-200 rounded-md mb-4 fill-blue-500 hover:fill-blue-500  hover:text-blue-600  stroke-blue-500 hover:stroke-blue-600' :  'text-stone-900 mb-4 font-medium fill-slate-500 hover:fill-blue-500 hover:text-blue-500 stroke-slate-500 hover:stroke-blue-500'}`}>
           {props.icon ? ( <Image src={props.icon} width={24} alt="Link" height={24} /> ) : null}
            {props.label}
        </span>
    )

}