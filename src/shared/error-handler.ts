import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "./errors.ts";

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const problem = { type: "about:blank", instance: req.originalUrl };

  if (err instanceof ZodError) {
    res
      .status(400)
      .type("application/problem+json")
      .json({
        ...problem,
        title: "Bad Request",
        status: 400,
        detail: "Os dados enviados são inválidos",
        errors: err.issues.map((issue) => ({
          path: issue.path.map(String).join("."),
          message: issue.message,
        })),
      });
    return;
  }

  if (err instanceof AppError) {
    res
      .status(err.status)
      .type("application/problem+json")
      .json({
        ...problem,
        title: err.title,
        status: err.status,
        detail: err.message,
      });
    return;
  }

  console.error(err);
  res
    .status(500)
    .type("application/problem+json")
    .json({
      ...problem,
      title: "Internal Server Error",
      status: 500,
      detail: "Ocorreu um erro inesperado",
    });
};
