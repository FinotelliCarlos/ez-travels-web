import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params: { userId } }: { params: { userId: string } }) {
  if (!userId) {
    return {
      status: 400,
      body: {
        message: 'Missing userId!'
      }
    }
  }

  const reservations = await prisma.travelReservation.findMany({
    where: { userId }, include: { travel: true }
  })

  return new NextResponse(JSON.stringify(reservations), { status: 200 })
}