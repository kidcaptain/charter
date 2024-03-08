import { NextResponse } from "next/server"
import { prisma } from "@/utils/connect";


export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    try {
        const bus = await prisma.bus.findUnique({ where: { id: parseInt(id) } });
        return new NextResponse(JSON.stringify(bus), { status: 200 });
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({ message: error }), { status: 500 }
        )
    }
}


export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    await prisma.bus.delete({ where: { id: parseInt(id) } });
    return new NextResponse("Bus supprimé", { status: 200 });
}


export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    const body = await req.json();
    const { marque, modele, typeBus, capacite, panneVehicule, horsService } = body;
    try {
        const bus = await prisma.bus.update({
            where: { id: parseInt(id) },
            data: {
                marque: marque,
                modele: modele,
                typeBus: typeBus,
                capacite: parseInt(capacite),
                panneVehicule: panneVehicule,
                horsService: horsService
            }
        });
        return NextResponse.json({ message: bus })
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: "Err" }), { status: 500 }
        )
    }
}

