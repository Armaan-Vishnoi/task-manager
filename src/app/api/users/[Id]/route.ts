import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: any
) {
  try {
    const userId = params.id ?? params.Id;

    const body =
      await request.json();

    const {
      name,
      email,
      password,
      image,
    } = body;

    const updateData: any = {};

    // NAME

    if (name) {
      updateData.name = name;
    }

    // EMAIL

    if (email) {
      updateData.email = email;
    }

    // IMAGE

    if (image) {
      updateData.image = image;
    }

    // PASSWORD

    if (password) {
      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      updateData.password =
        hashedPassword;
    }

    const updatedUser =
      await prisma.user.update({
        where: {
          id: userId,
        },

        data: updateData,
      });

    return NextResponse.json(
      updatedUser
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error:
          error.message,
      },
      {
        status: 500,
      }
    );
  }
}