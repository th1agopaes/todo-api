import express from "express";
import { taskRouter } from "./modules/tasks/task.routes.ts";
import { errorHandler } from "./shared/error-handler.ts";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.use("/api/v1/tasks", taskRouter);

  app.use(errorHandler); // sempre o último middleware

  return app;
}
