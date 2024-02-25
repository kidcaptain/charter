import { NextResponse } from "next/server"
import { prisma } from "@/utils/connect";


export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    try {
        const utilisateur = await prisma.utilisateur.findUnique({ where: { id: parseInt(id) } });
        return new NextResponse(JSON.stringify(utilisateur), { status: 200 });
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({ message: error }), { status: 500 }
        )
    }
}


export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    await prisma.utilisateur.delete({ where: { id: parseInt(id) } });
    return new NextResponse("utilisateur supprimé", { status: 200 });
}


export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    const body = await req.json();
    const { nomUtilisateur, motDePasse, dateCreationCompte, dateDerniereConnexion, blocke, numCNI, employeId, isConnected, droitsAccesId } = body;
    try {
        const utilisateur = await prisma.utilisateur.update({
            where: { id: parseInt(id) },
            data: {
                nomUtilisateur: nomUtilisateur,
                motDePasse: motDePasse,
                dateCreationCompte: `${dateCreationCompte}`,
                dateDerniereConnexion: `${dateDerniereConnexion}`,
                blocke: blocke,
                numCNI: numCNI,
                employeId: parseInt(employeId),
                isConnected: isConnected,
                droitsAccesId: parseInt(droitsAccesId)
              }
        });
        return NextResponse.json({ message: utilisateur })
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: "Error" }), { status: 500 }
        )
    }
}

