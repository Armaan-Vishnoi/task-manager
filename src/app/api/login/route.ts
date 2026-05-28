import { NextResponse } from "next/server"

import bcrypt from "bcryptjs"

import { prisma } from "@/lib/prisma"

import { createToken } from "@/lib/auth"

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json()

    const {
      email,
      password,
    } = body

    const user =
      await prisma.user.findUnique({
        where: {
          email,
        },
      })

    if (!user) {

      return NextResponse.json(
        {
          error:
            "Invalid credentials",
        },
        {
          status: 400,
        }
      )
    }

    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      )

    if (!validPassword) {

      return NextResponse.json(
        {
          error:
            "Invalid credentials",
        },
        {
          status: 400,
        }
      )
    }

    const token =
      createToken(user.id)

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })

  } catch (error: any) {

    return NextResponse.json(
      {
        error:
          error.message,
      },
      {
        status: 500,
      }
    )
  }
}