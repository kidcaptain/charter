
import { getServerSession } from "next-auth"
import { authOptions } from " @/app/lib/authOptions"
import GridDataComponent from "@/components/gridDataComponent";
import GridDoughnut from "@/components/gridDoughnut";
export default async function HomeDashboard() {
    const session = await getServerSession(authOptions);
    if (session?.user) {
        return (
            <div className="p-10">
                <h2 className="text-2xl text-left text-gray-700 m-auto my-10 ">Administration - Bienvenue {session?.user?.name}!</h2>
                <GridDoughnut />
                <div className="mt-8">
                    <GridDataComponent />
                </div>
            </div>
        )
    }
    return <h2>Please login to see this admin page</h2>
};  