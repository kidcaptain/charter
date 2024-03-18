import { NextResponse } from "next/server"
import { prisma } from "@/utils/connect";


export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    try {
        const trajet = await prisma.trajet.findUnique({ where: { id: parseInt(id) } });
        return new NextResponse(JSON.stringify(trajet), { status: 200 });
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({ message: error }), { status: 500 }
        )
    }
}


export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    await prisma.trajet.delete({ where: { id: parseInt(id) } });
    return new NextResponse("trajet supprimé", { status: 200 });
}


export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    const body = await req.json();
  
    const { lieuDepart, lieuArrivee, prix, arrets, distance } = body;
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
        JSON.stringify({ message: "Erreur" }), { status: 500 }
      )
    }
  }
  
