import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

function getTaskId(
  url: string
) {

  const parts =
    url.split("/")

  return parts[
    parts.length - 1
  ]
}

export async function GET(
  request: Request
) {

  try {

    const id =
      getTaskId(
        request.url
      )

    const task =
      await prisma.task.findUnique({

        where: {
          id
        },

        include: {
          subtasks: true
        }
      })

    if (!task) {

      return NextResponse.json(
        {
          error:
            "Task not found"
        },
        {
          status: 404
        }
      )
    }

    return NextResponse.json(
      task
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

export async function PATCH(
  request: Request
) {

  try {

    const id =
      getTaskId(
        request.url
      )

    const body =
      await request.json()

    const existingTask =
      await prisma.task.findUnique({

        where: {
          id
        },

        include: {
          subtasks: true
        }
      })

    if (!existingTask) {

      return NextResponse.json(
        {
          error:
            "Task not found"
        },
        {
          status: 404
        }
      )
    }

    /*
      SAVE OLD STATUS
    */

    const oldStatus =
      existingTask.status

    /*
      BLOCKING DEPENDENCY VALIDATION
    */

    if (
      body.status ===
        "IN_PROGRESS" ||
      body.status ===
        "DONE"
    ) {

      const blockingTasks =
        await prisma.task.findMany({

          where: {

            id: {

              in:
                existingTask.blockedByIds
            }
          }
        })

      const incompleteDependencies =
        blockingTasks.filter(
          task =>
            task.status !==
            "DONE"
        )

      if (
        incompleteDependencies.length >
        0
      ) {

        return NextResponse.json(
          {
            error:
              "Complete blocking tasks first"
          },
          {
            status: 400
          }
        )
      }
    }

    /*
      SUBTASK VALIDATION
    */

    if (
      body.status ===
      "DONE"
    ) {

      const incompleteSubtasks =
        existingTask.subtasks.filter(
          subtask =>
            subtask.status !==
            "DONE"
        )

      if (
        incompleteSubtasks.length >
        0
      ) {

        return NextResponse.json(
          {
            error:
              "Complete all subtasks first"
          },
          {
            status: 400
          }
        )
      }
    }

    /*
      UPDATE TASK
    */

    const { userId, ...updateData } = body

    const updatedTask =
      await prisma.task.update({

        where: {
          id
        },

        data: updateData
      })

    /*
      CREATE ACTIVITY
    */

    await prisma.activity.create({

      data: {
        message:
          `🔄 Updated task "${updatedTask.title}" to ${updatedTask.status}`,
        userId: body.userId || undefined,
      }
    })

    /*
      CREATE NOTIFICATION
      ONLY FIRST TIME TASK BECOMES DONE
    */

    if (

      oldStatus !==
        "DONE" &&

      body.status ===
        "DONE"

    ) {

      const totalCompletedTasks =
        await prisma.task.count({

          where: {
            status: "DONE"
          }
        })

      const recipientIds = new Set<string>()

      if (updatedTask.assigneeId) {
        recipientIds.add(updatedTask.assigneeId)
      }

      if (updatedTask.userId) {
        recipientIds.add(updatedTask.userId)
      }

      for (const recipientId of recipientIds) {
        await prisma.notification.create({
          data: {
            userId: recipientId,
            message:
              `✅ Task "${updatedTask.title}" is completed (#${totalCompletedTasks})`,
            read: false,
          },
        })
      }
    }

    return NextResponse.json(
      updatedTask
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

export async function DELETE(
  request: Request
) {

  try {

    const id =
      getTaskId(
        request.url
      )

    const body =
      (await request.json().catch(() => null)) as
        | { userId?: string }
        | null

    /*
      FIND TASK
    */

    const task =
      await prisma.task.findUnique({

        where: {
          id
        }
      })

    /*
      DELETE SUBTASKS
    */

    await prisma.task.deleteMany({

      where: {
        parentTaskId:
          id
      }
    })

    /*
      DELETE TASK
    */

    await prisma.task.delete({

      where: {
        id
      }
    })

    /*
      CREATE ACTIVITY
    */

    await prisma.activity.create({

      data: {
        message:
          `🗑 Deleted task "${task?.title}"`,
        userId: body?.userId || undefined,
      }
    })

    return NextResponse.json(
      {
        success: true
      }
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