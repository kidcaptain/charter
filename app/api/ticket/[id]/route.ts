import { NextResponse } from "next/server"
import { prisma } from "@/utils/connect";


export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    try {
        const ticket = await prisma.ticket.findUnique({ where: { id: parseInt(id) } });
        return new NextResponse(JSON.stringify(ticket), { status: 200 });
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({ message: error }), { status: 500 }
        )
    }
}


export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    await prisma.ticket.delete({ where: { id: parseInt(id) } });
    return new NextResponse("ticket supprimé", { status: 200 });
}


export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    const body = await req.json();
    const { numeroSiege, prixTicket, typeTicket, statusTicket, dateCreation, voyageId, passagerId } = body;
    try {
        const ticket = await prisma.ticket.update({
            where: { id: parseInt(id) },
            data: {
                numeroSiege: parseInt(numeroSiege),
                prixTicket: parseInt(prixTicket),
                voyageId: parseInt(voyageId),
                typeTicket: typeTicket,
                statusTicket: statusTicket,
                dateCreation: `${dateCreation}:00.000Z`,
                passagerId: parseInt(passagerId),
                
            }
        });
        return NextResponse.json({ message: ticket })
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: "Err" }), { status: 500 }
        )
    }
}

