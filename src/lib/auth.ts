import { lucia as luciaBuilder } from "lucia";
import { astro } from "lucia/middleware";
import { libsql } from "@lucia-auth/adapter-sqlite";
import { github } from "@lucia-auth/oauth/providers";

import { client } from "@/lib/db";

export const auth = luciaBuilder({
  env: import.meta.env.DEV ? "DEV" : "PROD",
  middleware: astro(),
  sessionCookie: {
    expires: false,
  },
  adapter: libsql(client, {
    user: "user",
    key: "user_key",
    session: "user_session",
  }),

  getUserAttributes: (data) => {
    return {
      githubUsername: data.github_username,
    };
  },
});

export const githubAuth = github(auth, {
  clientId: import.meta.env.GITHUB_CLIENT_ID,
  clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
});

export type Auth = typeof auth;
