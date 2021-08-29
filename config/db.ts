import {
  Database,
  PostgresConnector,
  SQLite3Connector,
} from "https://deno.land/x/denodb/mod.ts";

// Models
import { User } from "../models/User.ts";

// Uses SQLite
const connector = new SQLite3Connector({
  filepath: "./database.sqlite",
});

// For PGSQL
// const connector = new PostgresConnector({
//   host: '...',
//   username: 'user',
//   password: 'password',
//   database: 'airlines',
// });

export const db = new Database(connector).link(
  [User],
);
