import Planning from "@/components/ui/planning";

import Link from "next/link";
interface IPrams {
    vehiculeId?: string
}

export default function Page({ params }: { params: IPrams }) {
    return (
        <div className=" h-full">
            <div className=" py-4 p-10 flex lowercase text-sm justify-between items-start mb-2">
                <h1 className=" text-gray-900"><Link className="hover:text-blue-600" href={"/dashboard/admin/vehicles"}>Vehicules</Link> / <Link className="hover:text-blue-600 font-semibold" href="">Planning du véhicule</Link></h1>
            </div>
            <h2 className="text-xl px-10 uppercase">Planning de voyage sur le mois </h2>
            <div className="p-10">
                <Planning id={params.vehiculeId} />
            </div>
        </div>
    )
}