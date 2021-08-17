import { Router } from "https://deno.land/x/oak/mod.ts";
import { get_all_users, register_user, login_user } from "./controllers/user.controller.ts";

const router = new Router();

router
  .get("/api/v1/users", get_all_users)
  .post("/api/v1/register", register_user)
  .post('/api/v1/login', login_user)

export default router;
