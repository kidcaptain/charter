import { hash } from "bcrypt"
import { prisma } from '@/utils/connect';
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {

  try {
    const utilisateurs = await prisma.utilisateur.findMany();
    return new NextResponse(JSON.stringify(utilisateurs), { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: error.message }), { status: 500 }
    )
  }
}

export const POST = async (req: Request) => {
  const body = await req.json();
  const { nomUtilisateur, motDePasse, dateCreationCompte, dateDerniereConnexion, blocke, numCNI, employeId, isConnected, droitsAccesId } = body;
  try {
    const existingUserByEmail = await prisma.utilisateur.findUnique({ where: { employeId: parseInt(employeId) } });
    if (existingUserByEmail) {
      return NextResponse.json({ user: null, message: "Cette utilisateur est présent dans notre base de donnée" })
    }
    const hashedPassword = await hash(motDePasse, 10);
    const utilisateur = await prisma.utilisateur.create({
      data: {
        nomUtilisateur: nomUtilisateur,
        motDePasse: hashedPassword,
        dateCreationCompte: `${dateCreationCompte}:00.000Z`,
        dateDerniereConnexion: `${dateDerniereConnexion}:00.000Z`,
        blocke: blocke,
        numCNI: numCNI,
        employeId: parseInt(employeId),
        isConnected: isConnected,
        droitsAccesId: parseInt(droitsAccesId),
      }

    })
    
    return NextResponse.json(utilisateur)

  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: error }), { status: 500 }
    )
  }
}

