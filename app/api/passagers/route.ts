import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/utils/connect";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const tel = searchParams.get("tel");
  const agenceId = searchParams.get("agenceId");
  try {
    if (agenceId) {
      const passager = await prisma.passager.findMany({ where: { agenceId: parseInt(agenceId) } });
      return new NextResponse(JSON.stringify(passager), { status: 200 });
    } else if (tel) {
      const passager = await prisma.passager.findUnique({ where: { numCNI: tel } });
      return new NextResponse(JSON.stringify(passager), { status: 200 });
    } else {
      const passagers = await prisma.passager.findMany();
      return new NextResponse(JSON.stringify(passagers), { status: 200 });
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
  const { numCNI, agenceId, nom, prenom, adresse, dateNaissance, genre, telephone } = body;

  const existingPassager = await prisma.passager.findUnique({ where: { numCNI: numCNI } })

  if (existingPassager) {
    return NextResponse.json(existingPassager);
  }

  const existingPassager2 = await prisma.passager.findMany({ where: { telephone: telephone } })

  if (existingPassager2[0]) {
    return NextResponse.json(existingPassager2[0]);
  }


  const passager = await prisma.passager.create({
    data: {
      nom: nom,
      prenom: prenom,
      adresse: adresse,
      dateNaissance: `${dateNaissance}T00:00:00.000Z`,
      genre: genre,
      telephone: telephone,
      email: "",
      numCNI: numCNI,
      agenceId: parseInt(agenceId)
    }
  });
  return NextResponse.json(passager)
}

export const PUT = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const body = await req.json();

  const { numCNI, agenceId, nom, prenom, adresse, dateNaissance, genre, telephone } = body;
  try {
    const passagers = await prisma.passager.update({
      where: { id: parseInt(`${id}`) },
      data: {
        agenceId: parseInt(agenceId),
        nom: nom,
        prenom: prenom,
        adresse: adresse,
        dateNaissance: `${dateNaissance}T00:00:00.000Z`,
        genre: genre,
        telephone: telephone,
        email: "",
        numCNI: numCNI
      }
    });
    return NextResponse.json({ message: passagers })
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Err" }), { status: 500 }
    )
  }
}


