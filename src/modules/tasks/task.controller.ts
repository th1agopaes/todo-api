import type { Request, Response } from "express";
import {
  createTaskSchema,
  listTasksQuerySchema,
  taskIdSchema,
} from "./task.schemas.ts";
import { taskService } from "./task.service.ts";

export const taskController = {
  async create(req: Request, res: Response) {
    const input = createTaskSchema.parse(req.body);
    const task = await taskService.create(input);
    res.status(201).location(`${req.baseUrl}/${task.id}`).json(task);
  },

  async list(req: Request, res: Response) {
    const filter = listTasksQuerySchema.parse(req.query);
    res.json(await taskService.list(filter));
  },

  async getById(req: Request, res: Response) {
    const id = taskIdSchema.parse(req.params.id);
    res.json(await taskService.getById(id));
  },
};
