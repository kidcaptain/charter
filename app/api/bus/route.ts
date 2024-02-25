import { prisma } from "@/utils/connect";
import { NextResponse, NextRequest } from "next/server"

export const GET = async (req: NextRequest) => {
  try {
    const bus = await prisma.bus.findMany();
    return new NextResponse(JSON.stringify(bus), { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: error.message }), { status: 500 }
    )
  }
}


export const POST = async (req: Request) => {
  const body = await req.json();
  const { marque, modele, typeBus, anneeFabrication, capacite, placesDisponible, placesTotal, panneVehicule, employeId } = body;
  try {
    const bus = await prisma.bus.create({
      data: {
        marque: marque,
        modele: modele,
        typeBus: typeBus,
        anneeFabrication: anneeFabrication,
        capacite: parseInt(capacite),
        placesDisponible: parseInt(placesDisponible),
        placesTotal: parseInt(placesTotal),
        panneVehicule: panneVehicule,
        employeId: parseInt(employeId),
    }
    });
    return NextResponse.json(bus)
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: error }), { status: 500 }
    )
  }
}

