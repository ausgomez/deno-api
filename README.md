# 🦕 Deno API

This repo is just for testing how an API server would look like using
[Deno](https://deno.land/), [Oak](https://deno.land/x/oak@v9.0.0),
[DenoDB](https://eveningkid.com/denodb-docs/),
[JWT](https://github.com/timonson/djwt) tokens for auth, and
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

#### `GET /api/v1/users`

body:

```json
{
  "jwt": "YOUR_JWT_TOKEN"
}
```

### If you put an ivalid JWT token, it will return a `403`

# Issues

For any bug reports or feature requests, please create an issue on
[GitHub](https://github.com/Anstroy/deno-api/issues).
