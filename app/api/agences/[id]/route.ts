import { NextResponse } from "next/server"
import { prisma } from "@/utils/connect";


export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    await prisma.agence.delete({ where: { id: parseInt(id) } });
    return new NextResponse("agence supprimé", { status: 200 });
}
export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    try {
        const agence = await prisma.agence.findUnique({ where: { id: parseInt(id) } });
        return new NextResponse(JSON.stringify(agence), { status: 200 });
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({ message: error }), { status: 500 }
        )
    }
}

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;

    const body = await req.json();
    const { nom, adresse, numeroTelephone } = body;
    try {
        const agence = await prisma.agence.update({
            where: { id: parseInt(id) },
            data: {
                nom: nom,
                adresse: adresse,
                numeroTelephone: numeroTelephone,
            }
        });
        return NextResponse.json(agence)
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: error }), { status: 500 }
        )
    }
}


