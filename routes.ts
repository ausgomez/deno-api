import { Router } from "./deps/oak.ts";
import {
  get_all_users,
  login_user,
  register_user,
  validateJWT,
} from "./controllers/user.controller.ts";

const router = new Router();

router
  .get("/api/v1/users", validateJWT, get_all_users) // this is a protected route, you need a valid JWT token
  .post("/api/v1/register", register_user)
  .post("/api/v1/login", login_user);

export default router;
