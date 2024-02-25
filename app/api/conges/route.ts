import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/utils/connect";


export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const employeId = searchParams.get("employeId");
    try {
        if (employeId) {
            const conges = await prisma.conge.findMany({ where: { employeId: parseInt(employeId) } });
            return new NextResponse(JSON.stringify(conges), { status: 200 });
        }
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({ message: error }), { status: 500 }
        )
    }
}

export const POST = async (req: Request) => {
    const body = await req.json();
    const { nombreJour, dateDepart, motif, employeId, dateUpdate } = body;
    try {
        const employe = await prisma.conge.create({
            data: {
                nombreJour: parseInt(nombreJour),
                dateDepart: `${dateDepart}T00:00:00.000Z`,
                motif: motif,
                dateUpdate: `${dateUpdate}T00:00:00.000Z`,
                employeId: parseInt(employeId)
            }
        });
        return NextResponse.json(employe)
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: error }), { status: 500 }
        )
    }
}

