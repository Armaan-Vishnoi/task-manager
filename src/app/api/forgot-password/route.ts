import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const {
      email,
      password,
    } = body;

    // VALIDATION

    if (
      !email ||
      !password
    ) {
      return NextResponse.json(
        {
          error:
            "Email and password are required",
        },
        {
          status: 400,
        }
      );
    }

    // CHECK USER

    const user =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (!user) {
      return NextResponse.json(
        {
          error:
            "User not found",
        },
        {
          status: 404,
        }
      );
    }

    // HASH PASSWORD

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // UPDATE PASSWORD

    await prisma.user.update({
      where: {
        email,
      },

      data: {
        password:
          hashedPassword,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Password updated successfully",
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}