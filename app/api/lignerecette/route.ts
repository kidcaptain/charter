import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/utils/connect";

export const POST = async (req: Request) => {
    const body = await req.json();
    const { busId, voyageId, montant, signature, date, agenceId } = body;
    const ligneFicheRecettes = await prisma.ligneFicheRecette.create({
        data: {
            busId: parseInt(busId),
            voyageId: parseInt(voyageId),
            montant: parseInt(montant),
            signature: signature,
            date: `${date}`,
            agenceId: parseInt(agenceId)
        }
    });
    return NextResponse.json(ligneFicheRecettes)
}

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    const voyageId = searchParams.get("voyageId");
    const busId = searchParams.get("busId");
    try {
        if (date && voyageId && busId) {
            const existingLigne = await prisma.ligneFicheRecette.findMany({ where: { date: date, voyageId: parseInt(voyageId), busId: parseInt(busId) } })
            if (existingLigne) {
                return new NextResponse(JSON.stringify(existingLigne), { status: 200 });
            }
        } else if (date && busId) {
            const ligneFicheRecettes = await prisma.ligneFicheRecette.findMany({ where: { date: `${date}T00:00:00.000Z`, busId: parseInt(busId) } });
            return new NextResponse(JSON.stringify(ligneFicheRecettes), { status: 200 });
        } else if (date) {
            const ligneFicheRecettes = await prisma.ligneFicheRecette.findMany({ where: { date: date } });
            return new NextResponse(JSON.stringify(ligneFicheRecettes), { status: 200 });
        } else {
            const ligneFicheRecettes = await prisma.ligneFicheRecette.findMany();
            return new NextResponse(JSON.stringify(ligneFicheRecettes), { status: 200 });
        }
    } catch (error: any) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: error.message }), { status: 500 }
        )
    }
}
