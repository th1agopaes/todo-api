import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(1000).optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;

export const taskIdSchema = z.uuid();

export const listTasksQuerySchema = z.object({
  completed: z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .optional(),
});
