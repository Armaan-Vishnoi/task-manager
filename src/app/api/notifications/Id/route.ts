import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      id: string
    }
  }
) {

  try {

    await prisma.notification.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json({
      success: true
    })

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

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      id: string
    }
  }
) {

  try {

    await prisma.notification.update({
      where: {
        id: params.id
      },

      data: {
        read: true
      }
    })

    return NextResponse.json({
      success: true
    })

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