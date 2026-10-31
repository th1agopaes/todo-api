import { defineConfig } from "vitest/config";

process.env.DATABASE_URL =
  process.env.DATABASE_URL_TEST ??
  "postgres://todo:todo@localhost:5432/todo_test";

export default defineConfig({
  test: {
    globalSetup: ["./tests/global-setup.ts"],
    fileParallelism: false,
  },
});
