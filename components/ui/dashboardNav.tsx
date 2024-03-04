"use client"
import Link from "next/link";
import DashboardLink from "@/components/ui/dashboardLink";
import { usePathname } from "next/navigation";
import Image from 'next/image'
import menuSvg from '@/public/images/logo.jpeg'
export default function DashboardNav(props: { items: { label: string, selected: boolean, icon: string, link: string }[], label: string }) {

    const pathname = usePathname()

    // const className = "transition ease-linear p-2 flex items-center justify-start gap-4 font-bold "
    return (
        <div className="relative w-80 z-10 ">
            <aside className=" w-full bg-stone-100 overflow-hidden h-full z-40  pb-6 justify-between  ">
                <div className="  flex items-center justify-starts gap-2 px-4 md:px-2">
                    <Image width={50} height={50} src={menuSvg} alt="logo.jpeg" />
                    <span className="block text-center  text-2xl font-semibold my-3 text-blue-500 ">
                        Charter Express
                    </span>
                    {/* <button className=" p-2 rounded-full overflow-hidden" >
                        <Image src={menuSvg.src} width={24} alt="Link" height={24} />
                    </button> */}
                </div>
                <h4 className="text-stone-900 text-sm font-bold border-r-8 border-b-8 border-t-8 uppercase px-4 md:px-2 py-2 ">{props.label}</h4>
                <nav className="py-1 px-4 md:px-2 border-r-8 h-full">
                    {props.items.map((item, i) => (
                        <Link href={item.link} key={i} >
                            <DashboardLink label={item.label} icon={item.icon} selected={pathname === `${item.link}`} />
                        </Link>
                    ))}
                </nav>
                <div> </div>
            </aside>
        </div>
    )

}