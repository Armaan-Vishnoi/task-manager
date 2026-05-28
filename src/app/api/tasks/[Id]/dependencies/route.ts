import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

function getTaskId(url: string) {

  const parts = url.split("/")

  return parts[parts.length - 2]
}

async function hasCircularDependency(
  taskId: string,
  dependencyId: string
): Promise<boolean> {

  if (taskId === dependencyId) {
    return true
  }

  const dependencyTask =
    await prisma.task.findUnique({
      where: {
        id: dependencyId
      }
    })

  if (!dependencyTask) {
    return false
  }

  for (
    const blockedId
    of dependencyTask.blockedByIds
  ) {

    const circular =
      await hasCircularDependency(
        taskId,
        blockedId
      )

    if (circular) {
      return true
    }
  }

  return false
}

export async function POST(
  request: Request
) {

  try {

    const taskId =
      getTaskId(request.url)

    const body =
      await request.json()

    const dependencyId =
      body.dependencyId

    const task =
      await prisma.task.findUnique({
        where: {
          id: taskId
        }
      })

    if (!task) {

      return NextResponse.json(
        {
          error: "Task not found"
        },
        {
          status: 404
        }
      )
    }

    const dependencyTask =
      await prisma.task.findUnique({
        where: {
          id: dependencyId
        }
      })

    if (!dependencyTask) {

      return NextResponse.json(
        {
          error:
            "Dependency task not found"
        },
        {
          status: 404
        }
      )
    }

    const circular =
      await hasCircularDependency(
        taskId,
        dependencyId
      )

    if (circular) {

      return NextResponse.json(
        {
          error:
            "Circular dependency detected"
        },
        {
          status: 400
        }
      )
    }

    const updatedTask =
      await prisma.task.update({
        where: {
          id: taskId
        },
        data: {
          blockedByIds: {
            push: dependencyId
          }
        }
      })

    return NextResponse.json(
      updatedTask
    )

  } catch (error: any) {

    return NextResponse.json(
      {
        error: error.message
      },
      {
        status: 500
      }
    )
  }
}