import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/utils/connect";


export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const agenceId = searchParams.get("agenceId");
    const date = searchParams.get("date");
    const idTypeDepense = searchParams.get("idTypeDepense");
    const typeDepense = searchParams.get("typeDepense");
    const typeDepense1 = searchParams.get("typeDepense1");
    const typeDepense2 = searchParams.get("typeDepense");
    const typeDepense3 = searchParams.get("typeDepense3");
    const typeDepense4 = searchParams.get("typeDepense4");
   
    try {
        if(idTypeDepense && typeDepense1 && typeDepense && typeDepense2 && typeDepense3 && typeDepense4) {
            const depenses = await prisma.depense.findMany({ where: { OR :[{ idTypeDepense: idTypeDepense, typeDepense: typeDepense}, { idTypeDepense: idTypeDepense, typeDepense: typeDepense2}, { idTypeDepense: idTypeDepense, typeDepense: typeDepense3}, { idTypeDepense: idTypeDepense, typeDepense: typeDepense4}, { idTypeDepense: idTypeDepense, typeDepense: typeDepense1} ]} });{}
            return new NextResponse(JSON.stringify(depenses), { status: 200 });
        } else if(idTypeDepense && date && typeDepense) {
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
        } else if(typeDepense) {
            const depenses = await prisma.depense.findMany({ where: { typeDepense: typeDepense} });
            return new NextResponse(JSON.stringify(depenses), { status: 200 });
        } else{
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

