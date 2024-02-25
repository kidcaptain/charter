import Link from "next/link";
import Header from "@/components/ui/header"
import DashboardNav from "@/components/ui/dashboardNav";
import { LinkComptable } from "@/datas/links";
export default function ComptableLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="flex">
            <DashboardNav items={LinkComptable} label="Comptable" />
            <section className=" w-full min-h-screen h-full bg-white overflow-hidden" >
                <Header></Header>
                <div className=" w-full h-full relative min-h-screen justify-center">
                    {children}
                </div>
            </section>
        </main>
    )
}