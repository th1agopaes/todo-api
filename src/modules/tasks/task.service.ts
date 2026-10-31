import { NotFoundError } from "../../shared/errors.ts";
import { taskRepository } from "./task.repository.ts";
import type { CreateTaskInput } from "./task.schemas.ts";

export const taskService = {
  create(input: CreateTaskInput) {
    return taskRepository.create(input);
  },

  list(filter: { completed?: boolean }) {
    return taskRepository.findAll(filter);
  },

  async getById(id: string) {
    const task = await taskRepository.findById(id);
    if (!task) {
      throw new NotFoundError("Tarefa não encontrada");
    }
    return task;
  },
};
