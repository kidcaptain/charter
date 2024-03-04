import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/utils/connect";

export const POST = async (req: Request) => {
  const body = await req.json();
  const { passagerId, voyageId, agenceId, dateReservation, statutReservation, avance, dateConfirmation } = body;
  const reservations = await prisma.reservation.create({
    data: {
      passagerId: parseInt(passagerId),
      voyageId: parseInt(voyageId),
      dateReservation: `${dateReservation}T00:00:00.000Z`,
      statutReservation: statutReservation,
      agenceId: parseInt(agenceId),
      avance: parseInt(avance),
      dateConfirmation: dateConfirmation
    }
  });
  return NextResponse.json(reservations)
}

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const agenceId = searchParams.get("agenceId");

  try {
    if (agenceId) {
      const reservations = await prisma.reservation.findMany({ where: { agenceId: parseInt(agenceId) } });
      return new NextResponse(JSON.stringify(reservations), { status: 200 });
    } else {
      const reservations = await prisma.reservation.findMany();
      return new NextResponse(JSON.stringify(reservations), { status: 200 });
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

  const { passagerId, voyageId, agenceId, dateReservation, statutReservation, avance, dateConfirmation  } = body;
  try {
    const reservations = await prisma.reservation.update({
      where: { Id: parseInt(`${id}`) },
      data: {
        passagerId: parseInt(passagerId),
        voyageId: parseInt(voyageId),
        dateReservation: `${dateReservation}T00:00:00.000Z`,
        statutReservation: statutReservation,
        agenceId: parseInt(agenceId),
        avance: parseInt(avance),
        dateConfirmation: dateConfirmation
      }
    });
    return NextResponse.json(reservations)
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Err" }), { status: 500 }
    )
  }
}
