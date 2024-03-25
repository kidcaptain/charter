import { NextResponse } from "next/server"
import { prisma } from "@/utils/connect";


export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    try {
        const voyage = await prisma.voyage.findUnique({ where: { id: parseInt(id) } });
        return new NextResponse(JSON.stringify(voyage), { status: 200 });
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({ message: error }), { status: 500 }
        )
    }
}


export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    await prisma.voyage.delete({ where: { id: parseInt(id) } });
    return new NextResponse("voyage supprimé", { status: 200 });
}


export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    const body = await req.json();
    const {chauffeurId, numVoyage, heureDepart, agenceId, dateDepart, heureArrivee, placeDisponible, typeVoyage, prixVoyage, busId, trajetId, ready } = body;
    try {
        const voyage = await prisma.voyage.update({
            where: { id: parseInt(id) },
            data: {
                agenceId: agenceId,
                dateDepart: `${dateDepart}T00:00:00.000Z`,
                heureArrivee: heureArrivee,
                placeDisponible: parseInt(placeDisponible),
                typeVoyage: typeVoyage,
                prixVoyage: parseInt(prixVoyage),
                busId: busId,
                trajetId: parseInt(trajetId),
                ready: ready,
                chauffeurId: parseInt(chauffeurId),
                heureDepart: heureDepart,
                numVoyage: numVoyage
            }
        });
        return NextResponse.json({ message: voyage })
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: "Err" }), { status: 500 }
        )
    }
}

