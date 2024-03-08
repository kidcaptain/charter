import { NextResponse } from "next/server"
import { prisma } from "@/utils/connect";


export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    await prisma.piece.delete({ where: { id: parseInt(id) } });
    return new NextResponse("piece supprimé", { status: 200 });
}

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;

    const body = await req.json();
    const { nom, dateUpdate, datePeremption, busId } = body;
    try {
        const piece = await prisma.piece.update({
            where: { id: parseInt(id) },
            data: {
                nom: nom,
                datePeremption: `${datePeremption}`,
                dateUpdate: `${dateUpdate}`,
                busId: parseInt(busId)
            }
        });
        return NextResponse.json(piece)
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: error }), { status: 500 }
        )
    }
}


