import { NextResponse } from "next/server"
import { prisma } from "@/utils/connect";


export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  try {
    const employes = await prisma.employe.findUnique({ where: { id: parseInt(id) } });
    return new NextResponse(JSON.stringify(employes), { status: 200 });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ message: error }), { status: 500 }
    )
  }
}


export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    await prisma.employe.delete({ where: { id: parseInt(id) } });
    return new NextResponse("Employé supprimé", { status: 200 });

}
  

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const body = await req.json();
  const {anciennete, nom, prenom, adresse, dateNaissance, genre, email, telephone, numCNI, dateEmbauche, agenceId, posteId, imageCNIRecto,imageCNIVerso, matricule ,natureContrat } = body;
  try {
      const employe = await prisma.employe.update({
          where: { id: parseInt(id) },
          data: {
            nom: nom,
            prenom: prenom,
            adresse: adresse,
            dateNaissance: `${dateNaissance}`,
            genre: genre,
            telephone: telephone,
            email: email,
            numCNI: numCNI,
            dateEmbauche: `${dateEmbauche}`,
            agenceId: parseInt(agenceId),
            posteId: parseInt(posteId),
            imageCNIRecto: imageCNIRecto,
            imageCNIVerso: imageCNIVerso,
            matricule: matricule,
            natureContrat: natureContrat,
            anciennete: parseInt(anciennete)
          }
      });
      return NextResponse.json({ message: employe })
  } catch (error) {
      console.log(error);
      return new NextResponse(
          JSON.stringify({ message: "Err" }), { status: 500 }
      )
  }
}

