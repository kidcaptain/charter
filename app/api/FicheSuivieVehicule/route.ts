import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/utils/connect";

export const POST = async (req: Request) => {

    const body = await req.json();
    const { id, busId, immatriculation, vandalisme, accident, contratEntretien, garanties, assurance, pannes, vidange, reperationEffectuees, anomalies, carburant, typeVehicule, kilometrageInitial, dateAchat, detailRevision, dateMiseService, dateRevision } = body;
    const existingSuivie = await prisma.ficheSuivieVehicule.findMany({ where: { busId: parseInt(busId) } })
    
    if (!existingSuivie[0]) {
        const ficheSuivieVehicule = await prisma.ficheSuivieVehicule.create({
            data: {
                busId: parseInt(busId),
                immatriculation: immatriculation,
                typeVehicule: typeVehicule,
                kilometrageInitial: parseInt(kilometrageInitial),
                dateAchat: `${dateAchat}`,
                dateMiseService: `${dateMiseService}`,
                dateRevision: `${dateRevision}`,
                detailRevision: detailRevision,
                vidange: vidange,
                reperationEffectuees: reperationEffectuees,
                anomalies: anomalies,
                carburant: carburant,
                pannes: pannes,
                vandalisme: vandalisme,
                accident: accident,
                assurance: assurance,
                contratEntretien: contratEntretien,
                garanties: garanties,
            }
        });
        return NextResponse.json(ficheSuivieVehicule)
    }else{
        const ficheSuivieVehicule = await prisma.ficheSuivieVehicule.update({ 
            where: {id: parseInt(id)}, 
            data: {
                immatriculation: immatriculation,
                typeVehicule: typeVehicule,
                kilometrageInitial: parseInt(kilometrageInitial),
                dateAchat: `${dateAchat}`,
                dateMiseService: `${dateMiseService}`,
                dateRevision: `${dateRevision}`,
                detailRevision: detailRevision,
                vidange : vidange,
                reperationEffectuees: reperationEffectuees,
                anomalies: anomalies,
                carburant: carburant,
                pannes: pannes,
                vandalisme : vandalisme,
                accident: accident,
                assurance :assurance,
                contratEntretien: contratEntretien,
                garanties : garanties,
            }
        });
        return NextResponse.json(ficheSuivieVehicule)
    }
   
}

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const busId = searchParams.get("busId");
    try {
        if (busId) {
            const ficheSuivieVehicule = await prisma.ficheSuivieVehicule.findMany({ where: { busId: parseInt(busId) } });
            return new NextResponse(JSON.stringify(ficheSuivieVehicule), { status: 200 });
        } else {
            const ficheSuivieVehicule = await prisma.ficheSuivieVehicule.findMany();
            return new NextResponse(JSON.stringify(ficheSuivieVehicule), { status: 200 });
        }
    } catch (error: any) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: error.message }), { status: 500 }
        )
    }
}
