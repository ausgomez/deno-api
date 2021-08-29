import { User } from "../models/User.ts";
import { UserType } from "../types.ts";
import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import {
  create,
  getNumericDate,
  verify,
} from "https://deno.land/x/djwt/mod.ts";

const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);

export const get_all_users = (ctx: RouterContext) => {
  ctx.response.body = "Got all users";
};

export const register_user = async ({ request, response }: RouterContext) => {
  const user: UserType = await request.body().value;

  // Hash password
  const hash = await bcrypt.hash(user.password);

  try {
    const val = await User.create({ ...user, password: hash });

    // return session and token
    response.body = await generateToken(val);
  } catch (error) {
    console.log(error);
    response.body = {
      error,
    };

    response.status = 500;
  }
};

export const login_user = async ({ request, response }: RouterContext) => {
  const json: UserType = await request.body().value;

  try {
    // Find username on database
    const val: User = await User.where({
      username: json.username,
    }).first();

    // Check if user has that password
    const validPass: Boolean = await checkPassword(
      json.password,
      val?.password?.toString() ?? "",
    );

    if (!val || !validPass) {
      throw { error: "Auth Error" };
    } else {
      console.log("valid user");
    }

    // return session and token
    response.body = await generateToken(val);
  } catch (error) {
    console.error(error);
    response.body = error;
    response.status = 500;
  }
};

const checkPassword = async (password: string, hash: string) => {
  return await bcrypt.compare(
    password,
    hash,
  );
};

export const validateJWT = async ({ request, response }: RouterContext) => {
  const body = await request.body().value;
  const jwt = body.jwt;

  try {
    await verify(jwt, key)
      .then(() => {
        console.log("valid");
        response.body = "valid JWT";
      })
      .catch((e) => {
        console.log(e);
        response.body = { error: e.toString() };
        response.status = 401;
      });
  } catch (error) {
    console.error(error);
    response.body = error;
    response.status = 500;
  }
};

const generateToken = async (user: User) => {
  console.log(key);

  const jwt = await create(
    { alg: "HS512", typ: "JWT" },
    {
      username: user.username,
      exp: getNumericDate(10),
    },
    key,
  );

  return (jwt);
};
