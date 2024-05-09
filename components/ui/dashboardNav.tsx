"use client"
import Link from "next/link";
import DashboardLink from "@/components/ui/dashboardLink";
import { usePathname } from "next/navigation";
import Image from 'next/image'
import menuSvg from '@/public/images/logo.jpeg'
export default function DashboardNav(props: { items: { label: string, selected: boolean, icon: string, link: string }[], label: string }) {
    const pathname = usePathname()
    const regexPath = (str: string) => {
        return pathname.includes(str)
    } 
    return (
        <div className="relative w-80 z-10 ">
            <aside className=" w-full bg-stone-100 overflow-hidden h-full z-40  pb-6 justify-between  ">
                <div className="  flex bg-blue-500  items-center justify-starts gap-2 px-4 md:px-2">
                    <Image width={50} height={50} src={menuSvg} alt="logo.jpeg" />
                    <span className="block text-center text-2xl font-semibold my-3 text-white uppercase ">
                        Agence de voyages
                    </span>
                </div>
                <h4 className="text-white text-sm font-bold border-r-8 border-b-8 bg-blue-500 border-blue-500 border-t-8 uppercase px-6 py-2">{props.label}</h4>
                <nav className="py-1 md:pl-4 border-r-8 h-full border-blue-500 ">
                    {props.items.map((item, i) => (
                        <Link href={item.link} key={i} >
                            <DashboardLink label={item.label} icon={item.icon} selected={regexPath(`${item.link}`)}  />
                        </Link>
                    ))}
                </nav>
            </aside>
        </div>
    )

}