import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/utils/connect";

export const POST = async (req: Request) => {
  const body = await req.json();
  const { nom, datePeremption, dateUpdate, busId } = body;
  const pieces = await prisma.piece.create({
    data: {
        nom: nom,
        datePeremption: `${datePeremption}`,
        dateUpdate: `${dateUpdate}`,
        busId: parseInt(busId)
    }
  });
  return NextResponse.json(pieces)
}

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const busId = searchParams.get("busId");

  try {
    if (busId) {
        const pieces = await prisma.piece.findMany({ where: { busId: parseInt(busId)}});
        return new NextResponse(JSON.stringify(pieces), { status: 200 });
    }else{
        const pieces = await prisma.piece.findMany();
        return new NextResponse(JSON.stringify(pieces), { status: 200 });
    }
   

  } catch (error: any) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: error.message }), { status: 500 }
    )
  }
}
