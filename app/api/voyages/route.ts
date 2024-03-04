import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/utils/connect";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const dateDepart = searchParams.get("dateDepart");
  const typeVoyage = searchParams.get("typeVoyage");
  const busId = searchParams.get("busId");
  const trajetId = searchParams.get("trajetId");

  try {
    if (typeVoyage && busId && trajetId) {
      const voyage = await prisma.voyage.findMany({ where: { typeVoyage: typeVoyage, busId: busId, trajetId: parseInt(trajetId) } });
      return new NextResponse(JSON.stringify(voyage), { status: 200 });
    } else if (id && busId) {
      const voyage = await prisma.voyage.findMany({ where: { id: parseInt(id), busId: busId } });
      return new NextResponse(JSON.stringify(voyage), { status: 200 });
    } else if (dateDepart) {
      const voyage = await prisma.voyage.findMany({ where: { dateDepart: `${dateDepart}T00:00:00.000Z` } });
      return new NextResponse(JSON.stringify(voyage), { status: 200 });
    } else {
      const voyages = await prisma.voyage.findMany();
      return new NextResponse(JSON.stringify(voyages), { status: 200 });
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
  // const date = new Date()
  const { agenceId, dateDepart, dateArrivee, placeDisponible, typeVoyage, prixVoyage, busId, trajetId } = body;
  const voyages = await prisma.voyage.create({
    data: {
      agenceId: parseInt(agenceId),
      dateDepart: `${dateDepart}T00:00:00.000Z`,
      dateArrivee: `${dateArrivee}T00:00:00.000Z`,
      placeDisponible: parseInt(placeDisponible),
      typeVoyage: typeVoyage,
      prixVoyage: parseInt(prixVoyage),
      busId: busId,
      trajetId: parseInt(trajetId)
    }
  });
  return NextResponse.json(voyages)
}

export const PUT = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const body = await req.json();

  const { agenceId, dateDepart, lieuArrivee, placeDisponible, typeVoyage, prixVoyage, busId, trajetId } = body;
  try {
    const voyages = await prisma.voyage.update({
      where: { id: parseInt(`${id}`) },
      data: {
        dateDepart: dateDepart,
        dateArrivee: lieuArrivee,
        placeDisponible: placeDisponible,
        typeVoyage: typeVoyage,
        prixVoyage: parseInt(prixVoyage),
        busId: busId,
        trajetId: trajetId,
        agenceId: agenceId
      }
    });
    return NextResponse.json(voyages)
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Err" }), { status: 500 }
    )
  }
}


