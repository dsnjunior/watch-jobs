import type { APIRoute } from "astro";

import { githubAuth } from "@/lib/auth";

export const GET: APIRoute = async (context) => {
  const [url, state] = await githubAuth.getAuthorizationUrl();

  context.cookies.set("github_oauth_state", state, {
    httpOnly: true,
    secure: !import.meta.env.DEV,
    path: "/",
    maxAge: 60 * 60,
  });

  return context.redirect(url.toString(), 302);
};
