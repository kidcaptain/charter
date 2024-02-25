import { NextResponse } from "next/server"
import { prisma } from "@/utils/connect";


export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    await prisma.poste.delete({ where: { id: parseInt(id) } });
    return new NextResponse("Poste supprimé", { status: 200 });
}

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;

    const body = await req.json();
    const { titre, salaire, datePaiement } = body;
    try {
        const poste = await prisma.poste.update({
            where: { id: parseInt(id) },
            data: {
                titre: titre,
                salaire: parseInt(salaire),
                datePaiement: `${datePaiement}T00:00:00.000Z`,
            }
        });
        return NextResponse.json(poste)
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: error }), { status: 500 }
        )
    }
}


