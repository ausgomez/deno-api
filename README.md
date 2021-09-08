# 🦕 Deno API

This repo is just for testing how an API server would look like using
[Deno](https://deno.land/), [Oak](https://deno.land/x/oak@v9.0.0),
[DenoDB](https://eveningkid.com/denodb-docs/),
[DJWT](https://github.com/timonson/djwt) tokens for auth, and
[BCrypt](https://github.com/JamesBroadberry/deno-bcrypt) for hashing.

# What this repo does?

- It allows you to spin-up a very basic auth system using deno
- It comes with Sigin/Signup methods
- It hashes the password before storing into the database
- It uses hashing for checking if the password matches on the login part

# Getting Started

## Database

By default, it uses
[SQLite](https://eveningkid.com/denodb-docs/docs/guides/using-sqlite), but you
can setup your own connector by modifying this file located at `./confid/db.ts`

> The documentation is [here](https://github.com/eveningkid/denodb)

## Run Server

The script to run the deno server is localed at **./run.sh**

```sh
$ sh run.sh
```

# Routes

### Signup

#### `POST /api/v1/register`

body:

```json
{
  "username": "DESIRED_USERNAME",
  "password": "DESIRED_PASSWORD"
}
```

---

### Login

#### `POST /api/v1/login`

body:

```json
{
  "username": "DESIRED_USERNAME",
  "password": "DESIRED_PASSWORD"
}
```

---

### Protected Routes
This will ensure that you can access certain routes by putting in the `req.body.jwt` your JWT token

##### Example of a protected route:
#### `GET /api/v1/users`


Try to access this rute wthout a JWT on the body and see what happens, and then try again but now adding a valid JWT on the body like so:

body:

```json
{
  "jwt": "YOUR_JWT_TOKEN"
}
```

### If you put an invalid JWT token, it will return a `403`

### Adding more protected routes
- On the file `./routes.ts` you will find all the routes defined for this prject
- If you want to add a new route just add it like:
  - `router.get("/whatever/you/want", controller_name`)
- If you want it protected, just add the middleware in between like:
  - `router.get("/whatever/you/want", validateJWT, controller_name`)

# Issues

For any bug reports or feature requests, please create an issue on
[GitHub](https://github.com/Anstroy/deno-api/issues).
