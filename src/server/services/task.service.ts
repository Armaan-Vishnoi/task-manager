import { prisma } from "@/lib/prisma"

export class TaskService {

  static async createTask(data: any) {

    if (data.parentTaskId) {

      const parentTask =
        await prisma.task.findUnique({
          where: {
            id: data.parentTaskId
          }
        })

      if (!parentTask) {
        throw new Error(
          "Parent task not found"
        )
      }

      data.projectId =
        parentTask.projectId

      data.sprintId =
        parentTask.sprintId
    }

    return prisma.task.create({
      data
    })
  }

}