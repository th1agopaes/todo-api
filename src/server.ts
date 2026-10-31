import { createApp } from "./app.ts";
import { env } from "./config/env.ts";

createApp().listen(env.PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${env.PORT}`);
});
