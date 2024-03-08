import { NextResponse } from "next/server"
import { prisma } from "@/utils/connect";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  try {
      const droitsAcces = await prisma.droitsAcces.findUnique({ where: { id: parseInt(id) } });
      return new NextResponse(JSON.stringify(droitsAcces), { status: 200 });
  } catch (error: any) {
      return new NextResponse(
          JSON.stringify({ message: error }), { status: 500 }
      )
  }
}