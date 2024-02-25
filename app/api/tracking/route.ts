import { NextResponse,  } from "next/server"
 
export const GET = (
  req: Request,
) => {
  return new NextResponse ('Tracking')
}
