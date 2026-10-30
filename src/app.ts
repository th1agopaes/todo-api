import express from "express";

export function createApp() {
  const app = express();

  app.disable("x-powered-by"); // não revela que usa Express (segurança)
  app.use(express.json()); // permite ler JSON no corpo das requisições

  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  return app;
}
