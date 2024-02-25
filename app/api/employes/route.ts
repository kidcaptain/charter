import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/utils/connect";


export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const nom = searchParams.get("nom");
  const posteId = searchParams.get("posteId");
  const agenceId = searchParams.get("agenceId");
  try {
    if (nom) {
      const employes = await prisma.employe.findMany({ where: { nom: nom } });
      return new NextResponse(JSON.stringify(employes), { status: 200 });
    }
    else if (posteId) {
      const employes = await prisma.employe.findMany({ where: { posteId: parseInt(posteId) } });
      return new NextResponse(JSON.stringify(employes), { status: 200 });
    }
    else if (agenceId) {
      const employes = await prisma.employe.findMany({ where: { agenceId: parseInt(agenceId) } });
      return new NextResponse(JSON.stringify(employes), { status: 200 });
    }
    else {
      const employes = await prisma.employe.findMany();
      return new NextResponse(JSON.stringify(employes), { status: 200 });
    }
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ message: error }), { status: 500 }
    )
  }
}

// export const DELETE = async (req: Request) => {
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");
//   if (id) {
//     await prisma.employe.delete({ where: { id: parseInt(id) } });
//     return new NextResponse("Employé supprimé", { status: 200 });
//   }else{
//     return new NextResponse(
//           JSON.stringify({ message: "Error" }), { status: 500 }
//         )
//   }
// try {
//   if (id) {

//   } else {
//     return new NextResponse(
//       JSON.stringify({ message: "Erreur" }), { status: 500 }
//     )
//   }
// } catch (error: any) {
//   return new NextResponse(
//     JSON.stringify({ message: error }), { status: 500 }
//   )
// }

// }


export const POST = async (req: Request) => {
  const body = await req.json();
  const { nom, prenom, adresse, dateNaissance, genre, email, telephone, numCNI, dateEmbauche, agenceId, posteId } = body;
  try {
    const employe = await prisma.employe.create({
      data: {
        nom: nom,
        prenom: prenom,
        adresse: adresse,
        dateNaissance: `${dateNaissance}T00:00:00.000Z`,
        genre: genre,
        telephone: telephone,
        email: email,
        numCNI: numCNI,
        dateEmbauche: `${dateEmbauche}T00:00:00.000Z`,
        agenceId: parseInt(agenceId),
        posteId: parseInt(posteId)
      }
    });
    return NextResponse.json(employe)
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: error }), { status: 500 }
    )
  }
}

