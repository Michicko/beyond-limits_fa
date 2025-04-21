import { cookies } from "next/headers";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth/server";

import { type Schema } from "@/amplify/data/resource";
import outputs from "@/amplify_outputs.json";
import { NextApiRequest } from "next";

export const { runWithAmplifyServerContext } = createServerRunner({
  config: outputs,
});

export const cookiesClient = generateServerClientUsingCookies<Schema>({
  config: outputs,
  cookies,
  authMode: "userPool",
});

export async function getCurrentAuthUser() {
  try {
    const currentUser = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });
    return currentUser;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const getRole = async () => {
  return await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    async operation(contextSpec) {
      let tokens;
      let groups;
      try {
        const session = await fetchAuthSession(contextSpec);
        tokens = session.tokens;

        if (tokens && Object.keys(tokens).length > 0) {
          groups = tokens.accessToken.payload["cognito:groups"];
        }

        console.log("Tokens:", tokens);
        console.log("Groups:", groups);

        return {
          tokens,
          groups,
        };
      } catch (error) {
        console.error("Error fetching session:", error);
        return {
          tokens,
          groups,
        };
      }
    },
  });
};

export async function isAuthenticated() {
  const { tokens } = await getRole();
  console.log("Is Authenticated? Tokens:", tokens);
  return tokens && tokens.accessToken ? true : false;
}
