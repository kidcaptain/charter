import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/utils/connect";


export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const agenceId = searchParams.get("agenceId");
    const date = searchParams.get("date");
    const idTypeDepense = searchParams.get("idTypeDepense");
    const typeDepense = searchParams.get("typeDepense");
   
    try {
        if(idTypeDepense && date && typeDepense) {
            
            const depenses = await prisma.depense.findMany({ where: { date: `${date}T00:00:00.000Z`, idTypeDepense: idTypeDepense, typeDepense: typeDepense} });
            return new NextResponse(JSON.stringify(depenses), { status: 200 });
            
        } else if (agenceId && date) {
            const depenses = await prisma.depense.findMany({ where: { date: `${date}T00:00:00.000Z`, agenceId: parseInt(agenceId)} });
            return new NextResponse(JSON.stringify(depenses), { status: 200 });
        } else if (agenceId) {
            const depenses = await prisma.depense.findMany({ where: { agenceId: parseInt(agenceId) } });
            return new NextResponse(JSON.stringify(depenses), { status: 200 });
        }else if(date) {
            const depenses = await prisma.depense.findMany({ where: { date: `${date}T00:00:00.000Z`} });
            return new NextResponse(JSON.stringify(depenses), { status: 200 });
        } else {
          const depenses = await prisma.depense.findMany();
            return new NextResponse(JSON.stringify(depenses), { status: 200 });
        }
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({ message: error }), { status: 500 }
        )
    }
}

export const POST = async (req: Request) => {
    const body = await req.json();
    const { agenceId, description, montant, date, typeDepense, idTypeDepense } = body;
    try {
        const employe = await prisma.depense.create({
            data: {
                agenceId: parseInt(agenceId),
                description: description,
                montant: parseInt(montant),
                date: `${date}`,
                typeDepense: typeDepense,
                idTypeDepense: idTypeDepense
            }
        });
        return NextResponse.json(employe)
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: error }), { status: 500 }
        )
    }
}

