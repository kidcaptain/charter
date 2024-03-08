import { prisma } from "@/utils/connect";
import { NextResponse, NextRequest } from "next/server"

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  // const id = searchParams.get("id");
  const TypeDroits = searchParams.get("TypeDroits");
  try {
    if(TypeDroits){
      const droitsAcces = await prisma.droitsAcces.findUnique({ where: { TypeDroits: TypeDroits } });
      return new NextResponse(JSON.stringify(droitsAcces), { status: 200 });
    } else{
      const droitsAcces = await prisma.droitsAcces.findMany();
      return new NextResponse(JSON.stringify(droitsAcces), { status: 200 });
    }
  } catch (error: any) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: error.message }), { status: 500 }
    )
  }
}



export const POST = async (req: Request) => {
  const body = await req.json();
  const { TypeDroits } = body;
  try {
    const existDroitsAcces  = await prisma.droitsAcces.findMany({ where: { TypeDroits: TypeDroits }});
    if (existDroitsAcces.length > 0) {
      return NextResponse.json(existDroitsAcces)
    }
    const droitsAcces = await prisma.droitsAcces.create({
      data: {
        TypeDroits: TypeDroits,
    }
    });
    return NextResponse.json(droitsAcces)
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: error }), { status: 500 }
    )
  }
}

