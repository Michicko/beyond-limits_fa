// middleware.ts
import { NextRequest, NextResponse } from "next/server";

import { fetchAuthSession } from "aws-amplify/auth/server";

import { runWithAmplifyServerContext } from "@/utils/amplify-utils";

const unAuthenticatedRoutes = ["/cp/login"];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec, {});
        return session.tokens !== undefined;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  });

  if (
    request.nextUrl.pathname.startsWith("/cp") &&
    !unAuthenticatedRoutes.includes(request.nextUrl.pathname)
  ) {
    if (authenticated) {
      return response;
    }

    return NextResponse.redirect(new URL("/cp/login", request.url));
  }
}
