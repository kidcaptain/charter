import { NextResponse } from "next/server"
import { prisma } from "@/utils/connect";


export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    try {
        const depense = await prisma.depense.findUnique({ where: { id: parseInt(id) } });
        return new NextResponse(JSON.stringify(depense), { status: 200 });
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({ message: error }), { status: 500 }
        )
    }
}

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    await prisma.depense.delete({ where: { id: parseInt(id) } });
    return new NextResponse("depense supprimé", { status: 200 });
}

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;

    const body = await req.json();
    const { agenceId, description, montant, motif, date, typeDepense, idTypeDepense } = body;
    try {
        const depense = await prisma.depense.update({
            where: { id: parseInt(id) },
            data: {
                agenceId: parseInt(agenceId),
                description: description,
                montant: parseInt(montant),
                date: `${date}`,
                typeDepense: typeDepense,
                idTypeDepense: idTypeDepense,
                motif: motif
            }
        });
        return NextResponse.json(depense)
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: error }), { status: 500 }
        )
    }
}


