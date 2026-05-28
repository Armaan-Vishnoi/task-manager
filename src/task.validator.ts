import { z } from "zod"

export const createTaskSchema = z.object({
  title: z.string().min(3),

  description: z.string().optional(),

  projectId: z.string(),

  sprintId: z.string().optional(),

  priority: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH"
  ]),

  assigneeId: z.string().optional(),

  parentTaskId: z.string().optional()
})