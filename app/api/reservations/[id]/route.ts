import { NextResponse } from "next/server"
import { prisma } from "@/utils/connect";


export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    try {
        const reservation = await prisma.reservation.findUnique({ where: { Id: parseInt(id) } });
        return new NextResponse(JSON.stringify(reservation), { status: 200 });
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({ message: error }), { status: 500 }
        )
    }
}


export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    await prisma.reservation.delete({ where: { Id: parseInt(id) } });
    return new NextResponse("reservation supprimé", { status: 200 });
}


export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    const body = await req.json();
    const { passagerId, voyageId, dateReservation, agenceId, statutReservation } = body;
    try {
        const reservation = await prisma.reservation.update({
            where: { Id: parseInt(id) },
            data: {
                passagerId: parseInt(passagerId),
                voyageId: parseInt(voyageId),
                dateReservation: `${dateReservation}T00:00:00.000Z`,
                statutReservation: statutReservation,
                agenceId: parseInt(agenceId)
            }
        });
        return NextResponse.json({ message: reservation })
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: "Err" }), { status: 500 }
        )
    }
}

