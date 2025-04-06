import { NextRequest, NextResponse } from "next/server";
import { fetchAuthSession } from "aws-amplify/auth/server";

import { runWithAmplifyServerContext } from "@/utils/amplify-utils";
import { isInAuthorizedGroup } from "./lib/helpers";

const unAuthenticatedRoutes = ["/cp/login"];
const authorizedGroups = ["Admin", "Editor"];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  let url = request.nextUrl.clone();

  const authenticationSesion = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec, {});
        return {
          isAuthenticated:
            session.tokens?.accessToken !== undefined &&
            session.tokens?.idToken !== undefined,
          session,
        };
      } catch (error) {
        console.log(error);
        return {
          isAuthenticated: false,
          session: null,
        };
      }
    },
  });

  if (
    request.nextUrl.pathname.startsWith("/cp") &&
    !unAuthenticatedRoutes.includes(request.nextUrl.pathname)
  ) {
    if (authenticationSesion.isAuthenticated) {
      const tokens = authenticationSesion.session?.tokens;
      const userGroups =
        (tokens && tokens.accessToken.payload["cognito:groups"]) || [];

      // if user is in authorized group
      if (isInAuthorizedGroup(userGroups, authorizedGroups)) {
        return response;
      }

      return NextResponse.redirect(new URL("/", request.url));
    }

    url.pathname = "/cp/login";
    url.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(new URL(url, request.url));
  }
}
