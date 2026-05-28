import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET(
  request: Request
) {

  try {

    const {
      searchParams
    } = new URL(
      request.url
    )

    const userId =
      searchParams.get(
        "userId"
      )

    if (!userId) {

      return NextResponse.json([])
    }

    const projects =
      await prisma.project.findMany({

        where: {
          userId
        },

        orderBy: {
          createdAt: "desc"
        }
      })

    return NextResponse.json(
      projects
    )

  } catch (error: any) {

    return NextResponse.json(
      {
        error:
          error.message
      },
      {
        status: 500
      }
    )
  }
}

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json()

    const project =
      await prisma.project.create({

        data: {

          name:
            body.name,

          description:
            body.description,

          userId:
            body.userId,
        }
      })

    return NextResponse.json(
      project
    )

  } catch (error: any) {

    return NextResponse.json(
      {
        error:
          error.message
      },
      {
        status: 500
      }
    )
  }
}