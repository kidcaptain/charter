import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

 
export const GET = (
  req: Request,
) => {
  return new NextResponse ('Salaire')
}

export const POST = async (req: NextRequest) => {
    const data = await req.formData();
    console.log(data.get("file"))
    const file: File | null = data.get("files") as unknown as File;

    if (!file) {
        return NextResponse.json({ success: false });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const relativeUploadDir = `/uploads/${Date.now()}`;
  
    const path = join(process.cwd(), "public", relativeUploadDir);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    await writeFile(`${path}`, buffer);
    // await writeFile(path, buffer);
    console.log(`Open ${path} to see the uploaded file`);

    return NextResponse.json({fileUrl: `${relativeUploadDir}`})
}