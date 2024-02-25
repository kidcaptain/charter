import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/utils/connect";

export const POST = async (req: Request) => {
  const body = await req.json();
  const { titre, salaire, datePaiement } = body;
  const postes = await prisma.poste.create({
    data: {
      titre: titre,
      salaire: parseInt(salaire),
      datePaiement: `${datePaiement}T00:00:00.000Z`,
    }
  });
  return NextResponse.json(postes)
}

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const titre = searchParams.get("titre");

  try {
    if (titre) {
      const postes = await prisma.poste.findMany({ where: {OR: [{titre: {endsWith: titre}}, {titre: {startsWith: titre}}]} });
      return new NextResponse(JSON.stringify(postes), { status: 200 });
    } else {
      const postes = await prisma.poste.findMany();
      return new NextResponse(JSON.stringify(postes), { status: 200 });
    }
   
  } catch (error: any) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: error.message }), { status: 500 }
    )
  }
}

export const PUT = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const body = await req.json();

  const { titre, salaire, datePaiement } = body;
  try {
    const postes = await prisma.poste.update({
      where: { id: parseInt(`${id}`) },
      data: {
        titre: titre,
        salaire: parseInt(salaire),
        datePaiement: `${datePaiement}T00:00:00.000Z`,
      }
    });
    return NextResponse.json(postes)
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Err" }), { status: 500 }
    )
  }
}
