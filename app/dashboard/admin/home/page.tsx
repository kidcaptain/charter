
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/lib/authOptions";
import GridDataComponent from "@/components/gridDataComponent";
import GridDoughnut from "@/components/gridDoughnut";
import TableUserOnline from "@/components/director/TableUserOnline";
import Image from "next/image";
import roadmountain from "@/public/images/roadmountain.jpg"

export default async function HomeDashboard() {
    const session = await getServerSession(authOptions);
    if (session?.user) {
        return (
            <div className="p-10">
                <h2 className="text-2xl text-left text-gray-700 m-auto my-10 ">Bienvenue {session?.user?.name}!</h2>
                <GridDoughnut />
                <div className="mt-20 grid gap-4 grid-cols-3">
                    <div className=" col-span-2">
                        <GridDataComponent />
                    </div>
                    <div className="overflow-hidden p-4 bg-green-400 rounded-md shadow-2xl from-lime-500 relative bg-gradient-to-b">
                        <Image className="absolute bottom-0 right-0 w-full blur h-full z-0 opacity-45" width={300} height={300} src={roadmountain} alt="roadmountain" />
                        <div className="relative z-10">
                            <h2 className="my-2 font-semibold text-xl text-gray-800">Utilisateurs connectés</h2>
                            <TableUserOnline />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return <h2>Please login to see this admin page</h2>
};  