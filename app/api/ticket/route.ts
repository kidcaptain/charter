import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/utils/connect";

export const POST = async (req: Request) => {
  const body = await req.json();
  const { numeroSiege, prixTicket, typeTicket,destination, statusTicket, dateCreation, voyageId, passagerId, employeId } = body;
  const tickets = await prisma.ticket.create({
    data: {
      numeroSiege: parseInt(numeroSiege),
      prixTicket: parseInt(prixTicket),
      voyageId: parseInt(voyageId),
      typeTicket: typeTicket,
      statusTicket: statusTicket,
      dateCreation: `${dateCreation}:00.000Z`,
      passagerId: parseInt(passagerId),
      employeId: parseInt(employeId),
      destination: destination
    }
  });
  return NextResponse.json(tickets)
}

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const voyageId = searchParams.get("voyageId");
  const busId = searchParams.get("busId");
  try {
    if (voyageId) {
      const tickets = await prisma.ticket.findMany({where: {voyageId: parseInt(voyageId)}});
      return new NextResponse(JSON.stringify(tickets), { status: 200 });
    }else{
      const tickets = await prisma.ticket.findMany();
      return new NextResponse(JSON.stringify(tickets), { status: 200 });
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

  const { numeroSiege, prixTicket, typeTicket,employeId, statusTicket, dateCreation, voyageId, passagerId } = body;
  try {
    const tickets = await prisma.ticket.update({
      where: { id: parseInt(`${id}`) },
      data: {
        numeroSiege: parseInt(numeroSiege),
        prixTicket: parseInt(prixTicket),
        voyageId: parseInt(voyageId),
        typeTicket: typeTicket,
        statusTicket: statusTicket,
        dateCreation: `${dateCreation}:00.000Z`,
        passagerId: parseInt(passagerId),
        employeId: parseInt(employeId),
        
      }
    });
    return NextResponse.json(tickets)
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Err" }), { status: 500 }
    )
  }
}
