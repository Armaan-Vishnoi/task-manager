import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET(
  request: Request,
) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json([], {
        status: 200,
      })
    }

    const activities = await prisma.activity.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
    })

    return NextResponse.json(activities)
  } catch (error: any) {
    console.error(error)
    return NextResponse.json([], {
      status: 200,
    })
  }
}
