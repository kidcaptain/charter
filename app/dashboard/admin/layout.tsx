
import Header from "@/components/ui/header"
import DashboardNav from "@/components/ui/dashboardNav";
import { LinksAdmin } from "@/datas/links";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex">
      <DashboardNav items={LinksAdmin} label="Administrateur" />
      <section className=" w-full min-h-screen h-full bg-white overflow-hidden" >
        <Header></Header>
        <div className=" w-full h-full relative  justify-center">
            {children}
        </div>
      </section>
    </main>
  )
}