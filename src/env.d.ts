/// <reference types="astro/client" />

/// <reference types="lucia" />
declare namespace App {
  interface Locals {
    auth: import("lucia").AuthRequest;
  }
}

declare namespace Lucia {
  type Auth = import("./lib/lucia").Auth;
  type DatabaseUserAttributes = {
    github_username: string;
  };
  type DatabaseSessionAttributes = {};
}

interface ImportMetaEnv {
  readonly DATABASE_URL: string;
  readonly DATABASE_AUTH_TOKEN: string | undefined;

  readonly GITHUB_CLIENT_ID: string;
  readonly GITHUB_CLIENT_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
