import { author, description, license, version } from "package.json";

export const AppInfo = {
  name: "hello from bun!",
  version,
  description,
  author: {
    name: author,
    url: "https://cdleveille.net",
  },
  license,
  url: "https://fullstack-bun.fly.dev",
  themeColor: "#14151a",
};

export enum Env {
  Production = "production",
  Development = "development",
}

export enum Path {
  Public = "public",
  Client = "src/client",
}

export enum ErrorMessage {
  InternalServerError = "Internal Server Error",
}

export const STORED_STATE_PREFIX = "state";

export const HASH_PREFIX = "~";

export const HASH_REGEX = new RegExp(`${HASH_PREFIX}.{8}\\.[a-zA-Z0-9]+$`);
