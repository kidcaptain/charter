import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/utils/connect";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const dateDepart = searchParams.get("dateDepart");
  const busId = searchParams.get("busId");
  const trajetId = searchParams.get("trajetId");

  try {
    if (busId && trajetId) {
      const voyage = await prisma.voyage.findMany({ where: { busId: busId, trajetId: parseInt(trajetId) } });
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
  const { chauffeurId, numVoyage, heureDepart, heureArrivee, agenceId, dateDepart, placeDisponible, placesOccupees, prixVoyage, busId, trajetId } = body;
  const voyages = await prisma.voyage.create({
    data: {
      agenceId: parseInt(agenceId),
      dateDepart: `${dateDepart}T00:00:00.000Z`,
      placeDisponible: parseInt(placeDisponible),
      placesOccupees: parseInt(placesOccupees),
      prixVoyage: parseInt(prixVoyage),
      busId: busId,
      trajetId: parseInt(trajetId),
      chauffeurId: parseInt(chauffeurId),
      heureDepart: heureDepart,
      numVoyage: numVoyage,
      heureArrivee: heureArrivee,
    }
  });
  return NextResponse.json(voyages)
}

export const PUT = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const body = await req.json();

  const { chauffeurId, heureArrivee, numVoyage, heureDepart, agenceId, dateDepart, placeDisponible, placesOccupees, prixVoyage, busId, trajetId, ready, employeId } = body;
  try {
    const voyages = await prisma.voyage.update({
      where: { id: parseInt(`${id}`) },
      data: {
        agenceId: agenceId,
        dateDepart: `${dateDepart}T00:00:00.000Z`,
        heureArrivee: heureArrivee,
        placeDisponible: parseInt(placeDisponible),
        placesOccupees: parseInt(placesOccupees),
        prixVoyage: parseInt(prixVoyage),
        busId: busId,
        trajetId: parseInt(trajetId),
        ready: ready,
        employeId: parseInt(employeId),
        chauffeurId: parseInt(chauffeurId),
        heureDepart: heureDepart,
        numVoyage: numVoyage
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


