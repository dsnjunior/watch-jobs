import type { APIRoute } from "astro";
import { OAuthRequestError } from "@lucia-auth/oauth";

import { auth, githubAuth } from "@/lib/auth";

export const GET: APIRoute = async (context) => {
  const storedState = context.cookies.get("github_oauth_state")?.value;
  const state = context.url.searchParams.get("state");
  const code = context.url.searchParams.get("code");
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    });
  }
  try {
    const { getExistingUser, githubUser, createUser } =
      await githubAuth.validateCallback(code);

    const getUser = async () => {
      const existingUser = await getExistingUser();
      if (existingUser) return existingUser;
      const user = await createUser({
        attributes: {
          github_username: githubUser.login,
        },
      });
      return user;
    };

    const user = await getUser();
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });
    context.locals.auth.setSession(session);
    return context.redirect("/", 302);
  } catch (e) {
    if (e instanceof OAuthRequestError) {
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
};
