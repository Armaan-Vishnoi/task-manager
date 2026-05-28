import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET(
  request: Request
) {

  try {

    const { searchParams } =
      new URL(request.url)

    const userId =
      searchParams.get(
        "userId"
      )

    if (!userId) {

      return NextResponse.json(
        [],
        {
          status: 200,
        }
      )
    }

    const notifications =
      await prisma.notification.findMany({

        where: {
          userId,
        },

        orderBy: {
          createdAt: "desc",
        },
      })

    return NextResponse.json(
      notifications
    )

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      [],
      {
        status: 200,
      }
    )
  }
}