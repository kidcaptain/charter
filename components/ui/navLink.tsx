"use client"
import Link from "next/link";
import DashboardLink from "@/components/ui/dashboardLink";
import { usePathname } from "next/navigation";

export default function NavLink(props: { items: { label: string, selected: boolean, link: string }[] }) {

    const pathname = usePathname()

    // const className = "transition ease-linear p-2 flex items-center justify-start gap-4 font-bold "
    return (
        <div className="flex items-center" >
            {props.items.map((item, i) => (
                <span className="flex items-center">
                    <Link href={item.link} key={i} >
                        <DashboardLink label={item.label} selected={pathname === `${item.link}`} />
                    </Link>/
                </span>
            ))}

        </div>
    )

}