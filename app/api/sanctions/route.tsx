import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/utils/connect";


export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
      const employeId = searchParams.get("employeId");
    try {
      if (employeId) {
        const sanctions = await prisma.sanction.findMany({where: {employeId: parseInt(employeId)}});
        return new NextResponse(JSON.stringify(sanctions), { status: 200 });
      }else{
        const sanctions = await prisma.sanction.findMany();
        return new NextResponse(JSON.stringify(sanctions), { status: 200 });
      }
    } catch (error: any) {
      return new NextResponse(
        JSON.stringify({ message: error }), { status: 500 }
      )
    }
  }

  
export const POST = async (req: Request) => {
    const body = await req.json();
    const { label, description, employeId, dateUpdate, montant } = body;
    try {
      const employe = await prisma.sanction.create({
        data: {
          label: label,
          description: description,
          dateUpdate: `${dateUpdate}T00:00:00.000Z`,
          employeId: parseInt(employeId),
          montant: parseInt(montant)
        }
      });
      return NextResponse.json(employe)
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ message: error }), { status: 500 }
      )
    }
  }
  
  