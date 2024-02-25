
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/lib/authOptions"
import CardLineChart from "@/components/cardLineChart";
import CardDoughnut from "@/components/cardDoughnut";
import CardEmploye from "@/components/director/cardEmploye";
import GridDataComponent from "@/components/gridDataComponent";
export default async function HomeDashboard() {
    const session = await getServerSession(authOptions);
    if (session?.user) {
        return (
            <div className="p-10">
                <h2 className="text-2xl text-left text-gray-700 m-auto my-10 ">Administration - Bienvenue {session?.user?.name}!</h2>
                <div className="grid-cols-4 gap-4 grid ">
                    <CardDoughnut id="ticket" val={60} val2={2} color="blue" back1="#0e7490" back2="#15803d" label1="Simple" label2="VIP" title="Ventes de tickets" />
                    <CardDoughnut id="bus" val={20} val2={28} color="blue" back1="#ff6384" back2="#36a2eb" label1="Dépenses" label2="Recettes" title="Dépenses et recettes" />
                    <CardDoughnut id="passager" val={10} val2={2} color="blue" back1="#da3200" back2="#5fd85c" label1="Réservation annulée" label2="Réservation confirmée" title="Réservations" />
                    <CardDoughnut id="s" val={60} val2={21} color="blue" back1="#545ef0" back2="" label1="Voyages" label2="" title="Voyages effecutés" />
                </div>
                <div className="mt-8">
                   <GridDataComponent />
                </div>
            </div>
        )
    }
    return <h2>Please login to see this admin page</h2>
};  