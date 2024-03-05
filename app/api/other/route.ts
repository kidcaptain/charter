// import { writeFile } from "fs/promises";
// import { NextRequest, NextResponse } from "next/server";
// import { join } from "path";


// export const GET = (
//   req: Request,
// ) => {
//   return new NextResponse ('Salaire')
// }

// export const POST = async (req: NextRequest) => {
//     const data = await req.formData();
//     console.log(data.get("file"))
//     const file: File | null = data.get("files") as unknown as File;

//     if (!file) {
//         return NextResponse.json({ success: false });
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     const relativeUploadDir = `/uploads/${Date.now()}`;

//     const path = join(process.cwd(), "public", relativeUploadDir);
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

//     await writeFile(`${path}`, buffer);
//     // await writeFile(path, buffer);
//     console.log(`Open ${path} to see the uploaded file`);

//     return NextResponse.json({fileUrl: `${relativeUploadDir}`})
// }

import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  // ⚠️ The below code is for App Router Route Handlers only
  if (filename && request.body) {
    const blob = await put(filename, request.body, {
      access: 'public',
    });
    return NextResponse.json(blob);
  } else {
    return NextResponse.json("");
  }
  // Here's the code for Pages API Routes:
  // const blob = await put(filename, request, {
  //   access: 'public',
  // });


}