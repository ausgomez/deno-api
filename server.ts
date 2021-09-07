import { Application } from "https://deno.land/x/oak/mod.ts";
import { db } from "./config/db.ts";
import router from "./routes.ts";
const port = Deno.env.get("PORT") || 8000;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server up on port --> ${port}`);

await db.sync();

await app.listen({ port: +port });
