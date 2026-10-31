import { desc, eq } from "drizzle-orm";
import { db } from "../../db/client.ts";
import { type NewTask, type Task, tasks } from "../../db/schema.ts";

export const taskRepository = {
  async create(data: NewTask): Promise<Task> {
    const [task] = await db.insert(tasks).values(data).returning();
    if (!task) {
      throw new Error("Falha ao inserir a tarefa");
    }
    return task;
  },

  findAll(filter: { completed?: boolean }): Promise<Task[]> {
    return db
      .select()
      .from(tasks)
      .where(
        filter.completed === undefined
          ? undefined
          : eq(tasks.completed, filter.completed),
      )
      .orderBy(desc(tasks.createdAt), desc(tasks.id));
  },

  async findById(id: string): Promise<Task | null> {
    const [task] = await db
      .select()
      .from(tasks)
      .where(eq(tasks.id, id))
      .limit(1);
    return task ?? null;
  },
};
