import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/utils/connect";

export const POST = async (req: Request) => {
  const body = await req.json();
  const { nom, adresse, numeroTelephone } = body;
  const agences = await prisma.agence.create({
    data: {
      nom: nom,
      adresse: adresse,
      numeroTelephone: numeroTelephone,
    }
  });
  return NextResponse.json(agences)
}

export const GET = async (req: NextRequest) => {

  try {
    const agences = await prisma.agence.findMany();
    return new NextResponse(JSON.stringify(agences), { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: error.message }), { status: 500 }
    )
  }
}
