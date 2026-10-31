# todo-api

[![CI](https://github.com/th1agopaes/todo-api/actions/workflows/ci.yml/badge.svg)](https://github.com/th1agopaes/todo-api/actions/workflows/ci.yml)

API REST de tarefas (to-do) com Node.js, TypeScript, Express e PostgreSQL.

> 🚧 Em construção - acompanhe o roadmap abaixo.

## Stack

Node.js 26 · TypeScript · Express 5 · PostgreSQL 18 · Drizzle ORM · Zod · Vitest · Biome · Podman · GitHub Actions

## Roadmap

- [x] Fase 0 - Escopo e planejamento
- [x] Fase 1 - Fundação do projeto
- [x] Fase 2 - CI com GitHub Actions
- [x] Fase 3 - Banco de dados
- [x] Fase 4 - Criar e listar tarefas
- [ ] Fase 5 - Atualizar e excluir tarefas
- [ ] Fase 6 - Polimento e v1.0.0

## Como rodar localmente

cp .env.example .env
podman-compose up -d
npm ci
npm run db:migrate
npm run dev

## Licença

MIT
