import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.ts";
import { db, pool } from "../src/db/client.ts";
import { tasks } from "../src/db/schema.ts";

const app = createApp();
const url = "/api/v1/tasks";

beforeEach(async () => {
  await db.delete(tasks); // cada teste começa com a tabela vazia
});

afterAll(async () => {
  await pool.end();
});

describe("POST /api/v1/tasks", () => {
  it("cria uma tarefa e responde 201 com Location", async () => {
    const res = await request(app).post(url).send({ title: "Estudar Drizzle" });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      title: "Estudar Drizzle",
      description: null,
      completed: false,
    });
    expect(res.headers.location).toBe(`${url}/${res.body.id}`);
  });

  it("responde 400 em formato Problem Details quando o título é vazio", async () => {
    const res = await request(app).post(url).send({ title: "  " });

    expect(res.status).toBe(400);
    expect(res.headers["content-type"]).toContain("application/problem+json");
    expect(res.body.errors[0].path).toBe("title");
  });

  it("ignora campos fora do contrato (mass assingment)", async () => {
    const res = await request(app)
      .post(url)
      .send({ title: "Tarefa", completed: true });

    expect(res.status).toBe(201);
    expect(res.body.completed).toBe(false);
  });
});

describe("GET /api/v1/tasks", () => {
  it("lista as tarefas da mais nova para a mais antiga", async () => {
    await request(app).post(url).send({ title: "Primeira" });
    await request(app).post(url).send({ title: "Segunda" });

    const res = await request(app).get(url);

    expect(res.status).toBe(200);
    expect(res.body.map((task: { title: string }) => task.title)).toEqual([
      "Segunda",
      "Primeira",
    ]);
  });

  it("filtra por completed", async () => {
    await db
      .insert(tasks)
      .values([{ title: "Feita", completed: true }, { title: "Pendente" }]);

    const res = await request(app).get(`${url}?completed=true`);

    expect(res.body).toHaveLength(1);
    expect(res.body[0].title).toBe("Feita");
  });
});

describe("GET /api/v1/tasks/:id", () => {
  it("retorna a tarefa pelo id", async () => {
    const created = await request(app).post(url).send({ title: "Buscar" });

    const res = await request(app).get(`${url}/${created.body.id}`);

    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Buscar");
  });

  it("responde 404 quando a tarefa não existe", async () => {
    const res = await request(app).get(`${url}/${crypto.randomUUID()}`);

    expect(res.status).toBe(404);
    expect(res.body.detail).toBe("Tarefa não encontrada");
  });

  it("responde 400 quando o id não é um UUID", async () => {
    const res = await request(app).get(`${url}/abc`);

    expect(res.status).toBe(400);
  });
});
