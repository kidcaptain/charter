import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/utils/connect";

export const POST = async (req: Request) => {
  const body = await req.json();
  const { nom, agenceId, typeService, typePaiement, montant, dateTransaction, note } = body;
  const recettes = await prisma.recette.create({
    data: {
        nom: nom,
        typeService: typeService,
        typePaiement: typePaiement,
        montant: parseInt(montant),
        dateTransaction: dateTransaction,
        note: note,
        agenceId: parseInt(agenceId)
    }
  });
  return NextResponse.json(recettes)
}

export const GET = async (req: NextRequest) => {

  try {
    const recettes = await prisma.recette.findMany();
    return new NextResponse(JSON.stringify(recettes), { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: error.message }), { status: 500 }
    )
  }
}