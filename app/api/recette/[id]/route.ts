import { NextResponse } from "next/server"
import { prisma } from "@/utils/connect";


export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    try {
        const recette = await prisma.recette.findUnique({ where: { id: parseInt(id) } });
        return new NextResponse(JSON.stringify(recette), { status: 200 });
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({ message: error }), { status: 500 }
        )
    }
}


export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    await prisma.recette.delete({ where: { id: parseInt(id) } });
    return new NextResponse("recette supprimé", { status: 200 });
}


export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    const body = await req.json();
    const { nom, typeService, agenceId, typePaiement, voyageId, montant , passagerId, dateTransaction, note } = body;
    try {
        const recette = await prisma.recette.update({
            where: { id: parseInt(id) },
            data: {
                nom: nom,
                typeService: typeService,
                typePaiement: typePaiement,
                montant: parseInt(montant),
                dateTransaction: dateTransaction,
                note: note,
                agenceId: parseInt(agenceId),
                passagerId: parseInt(passagerId),
                voyageId: parseInt(voyageId),
            }
        });
        return NextResponse.json({ message: recette })
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: "Err" }), { status: 500 }
        )
    }
}

