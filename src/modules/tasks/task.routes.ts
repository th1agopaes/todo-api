import { Router } from "express";
import { taskController } from "./task.controller.ts";

export const taskRouter = Router();

taskRouter.post("/", taskController.create);
taskRouter.get("/", taskController.list);
taskRouter.get("/:id", taskController.getById);
