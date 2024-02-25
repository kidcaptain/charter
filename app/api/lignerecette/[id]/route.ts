import { NextResponse } from "next/server"
import { prisma } from "@/utils/connect";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    try {
        const ligneFicheRecette = await prisma.ligneFicheRecette.findUnique({ where: { id: parseInt(id) } });
        return new NextResponse(JSON.stringify(ligneFicheRecette), { status: 200 });
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({ message: error }), { status: 500 }
        )
    }
}


export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    await prisma.ligneFicheRecette.delete({ where: { id: parseInt(id) } });
    return new NextResponse("ligneFicheRecette supprimé", { status: 200 });
}

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    const body = await req.json();
    const { busId, voyageId, montant, agenceId, signature, date } = body;
    try {
        const ligneFicheRecette = await prisma.ligneFicheRecette.update({
            where: { id: parseInt(id) },
            data: {
                busId: parseInt(busId),
                voyageId: parseInt(voyageId),
                montant: parseInt(montant),
                signature: signature,
                date: date,
                agenceId: parseInt(agenceId)
            }
        });
        return NextResponse.json(ligneFicheRecette)
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: error }), { status: 500 }
        )
    }
}


