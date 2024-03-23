import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/utils/connect";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const trajet = await prisma.trajet.findUnique({ where: { id: parseInt(id) } });
      return new NextResponse(JSON.stringify(trajet), { status: 200 });
    } else {
      const trajets = await prisma.trajet.findMany();
      return new NextResponse(JSON.stringify(trajets), { status: 200 });
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
  const { lieudepart, lieuarrivee, distance, prix, arrets } = body;
  const trajets = await prisma.trajet.create({
    data: {
      lieuArrivee: lieuarrivee,
      lieuDepart: lieudepart,
      distance: parseInt(distance),
      prix:   parseInt(prix),
      arrets: arrets
    }
  });
  return NextResponse.json(trajets)
}

export const PUT = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const body = await req.json();

  const { lieuDepart, lieuArrivee, distance, prix, arrets } = body;
  try {
    const trajets = await prisma.trajet.update({
      where: { id: parseInt(`${id}`)  },
      data: {
        lieuArrivee: lieuArrivee,
        lieuDepart: lieuDepart,
        distance: parseInt(distance),
        prix:   parseInt(prix),
        arrets: arrets
      }
    });
    return NextResponse.json(trajets)
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Err" }), { status: 500 }
    )
  }
}


