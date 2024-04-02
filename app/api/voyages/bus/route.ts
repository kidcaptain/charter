import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/utils/connect";

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const busId = searchParams.get("busId");
   
    try {
        if (busId) {
            const voyage = await prisma.voyage.findMany({ where: {  busId: busId } });
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