import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.url(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    `❌ Variáveis de ambiente inválidas:\n${z.prettifyError(parsed.error)}`,
  );
  process.exit(1);
}

export const env = parsed.data;
