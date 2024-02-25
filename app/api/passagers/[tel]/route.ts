import { NextResponse } from "next/server"
import { prisma } from "@/utils/connect";


export const GET = async (req: Request, { params }: { params: { tel: string } }) => {
    const { tel } = params;
    try {
        const passager = await prisma.passager.findUnique({ where: { id: parseInt(tel) } });
        return new NextResponse(JSON.stringify(passager), { status: 200 });
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({ message: error }), { status: 500 }
        )
    }
}


export const DELETE = async (req: Request, { params }: { params: { tel: string } }) => {
    const { tel } = params;
    await prisma.passager.delete({ where: { id: parseInt(tel) } });
    return new NextResponse("passager supprimé", { status: 200 });
}


