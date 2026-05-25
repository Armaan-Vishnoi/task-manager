import { NextResponse }
from "next/server"

import {
  createTaskSchema
} from "@/validators/task.validator"

import {
  TaskService
} from "@/server/services/task.service"

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json()

    const validated =
      createTaskSchema.parse(body)

    const task =
      await TaskService.createTask(
        validated
      )

    return NextResponse.json(task)

  } catch (error: any) {

    return NextResponse.json(
      {
        error: error.message
      },
      {
        status: 400
      }
    )
  }
}