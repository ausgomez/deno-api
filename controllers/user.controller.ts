import { User } from "../models/User.ts";
import { UserType } from "../types.ts";
import type { RouterContext } from "../deps/oak.ts";
import * as bcrypt from "../deps/bcrypt.ts";
import { create, getNumericDate, verify } from "../deps/djwt.ts";

const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);

export const get_all_users = async (ctx: RouterContext) => {
  ctx.response.body = await User.select("username").get();
};

export const register_user = async ({ request, response }: RouterContext) => {
  try {
    const json: UserType = await request.body().value;
    json.username = json.username.trim();
    json.password = json.password.trim();

    // Check if username is unique
    const user: User[] = await User.where({
      username: json.username,
    }).all();

    if (user.length >= 0) {
      throw { error: "Username Already taken" };
    }

    // Hash password
    const hash = await bcrypt.hash(json.password);
    const val = await User.create({ ...json, password: hash });

    // return session and token
    response.body = await generateToken(val);
  } catch (error) {
    console.log(error);
    response.body = error;

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

/**
 * This will validate a JWT living inside the req.body.jwt
 * @param  {Number} num1 The first number
 * @param  {Number} num2 The second number
 * @return 403 status if jwt is invalid
 */
export const validateJWT = async (
  { request, response }: RouterContext,
  next: VoidFunction,
) => {
  const body = await request.body().value;
  const jwt = body?.jwt;

  try {
    if (!jwt) {
      throw { error: "Missing JWT Token 😨" };
    }

    await verify(jwt, key)
      .then(async () => {
        console.log("Valid JWT Token! 😎");
        await next(); // The next() will continue with the excecution
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
      exp: getNumericDate(3600),
    },
    key,
  );

  return (jwt);
};
