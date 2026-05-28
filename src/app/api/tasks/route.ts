import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request
) {

  try {

    const {
      searchParams
    } = new URL(
      request.url
    );

    const projectId =
      searchParams.get(
        "projectId"
      );

    const userId =
      searchParams.get(
        "userId"
      );

    if (
      !projectId ||
      !userId
    ) {

      return NextResponse.json([]);
    }

    const tasks =
      await prisma.task.findMany({

        where: {

          projectId,

          userId,
        },

        include: {

          assignee: {

            select: {

              id: true,

              name: true,
            },
          },

          subtasks: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json(
      tasks
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

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const task =
      await prisma.task.create({

        data: {

          title:
            body.title,

          description:
            body.description || "",

          status:
            body.status || "TODO",

          priority:
            body.priority || "MEDIUM",

          dueDate:
            body.dueDate
              ? new Date(
                  body.dueDate
                )
              : null,

          blockedByIds:
            body.blockedByIds || [],

          parentTaskId:
            body.parentTaskId || null,

          sprintId:
            body.sprintId || null,

          projectId:
            body.projectId,

          userId:
            body.userId,

          assigneeId:
            body.assignedUserId || null,
        },
      });

    return NextResponse.json(
      task
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