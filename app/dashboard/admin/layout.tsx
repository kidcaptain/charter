
import Header from "@/components/ui/header"
import DashboardNav from "@/components/ui/dashboardNav";
import { LinksAdmin } from "@/datas/links";
import { metadata } from "@/app/layout";
metadata.title = "Administration Charter Express Voyages / Ventes"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex bg-white">
      <DashboardNav items={LinksAdmin} label="Administrateur" />
      <section className=" w-full min-h-screen h-full overflow-y-auto overflow-hidden" >
        <Header></Header>
          <div className=" w-full h-full relative">
            {children}
        </div>
      </section>
    </main>
  )
}