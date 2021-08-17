import { Database, SQLite3Connector } from "https://deno.land/x/denodb/mod.ts";
import { User } from "../models/User.ts";

const connector = new SQLite3Connector({
  filepath: "./database.sqlite",
});

export const db = new Database(connector).link(
  [User],
);

// export db;/
