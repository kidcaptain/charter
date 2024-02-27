import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/utils/connect";

export const POST = async (req: Request) => {
  const body = await req.json();
  const { src, agenceId, montant, nom, ext } = body;
  const factures = await prisma.facture.create({
    data: {
      src: src,
      agenceId: parseInt(agenceId),
      montant: parseInt(montant),
      nom: nom,
      ext: ext
    }
  });
  return NextResponse.json(factures)
}

export const GET = async (req: NextRequest) => {
  try {
    const factures = await prisma.facture.findMany();
    return new NextResponse(JSON.stringify(factures), { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: error.message }), { status: 500 }
    )
  }
}
