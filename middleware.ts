import { NextRequest, NextResponse } from "next/server";
import { fetchAuthSession } from "aws-amplify/auth/server";
import { runWithAmplifyServerContext } from "@/utils/amplify-utils";
import { isInAuthorizedGroup } from "./lib/helpers";
import { cookies } from "next/headers";

const unAuthenticatedRoutes = [
  "/cp/login",
  "/favicon.ico",
  "/robots.txt",
  "_next/static",
  "_next/image",
  "api",
];
const authorizedGroups = ["Admin", "Editor"];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  let url = request.nextUrl.clone();

  const isCpRoute = request.nextUrl.pathname.startsWith("/cp");
  const isUnAuthenticatedRoute = unAuthenticatedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  const isProtectedRoute = isCpRoute && !isUnAuthenticatedRoute;

  if (!isProtectedRoute) {
    return response;
  }

  const { isAuthenticated, session } = await runWithAmplifyServerContext({
    // nextServerContext: { request, response },
    nextServerContext: { cookies: () => cookies() },
    operation: async (contextSpec) => {
      try {
        console.log("Cookies in middleware:", request.cookies.getAll());
        console.log("===============================================");
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

  if (isAuthenticated) {
    const tokens = session?.tokens;
    const userGroups =
      (tokens && tokens.accessToken.payload["cognito:groups"]) || [];

    // if user is in authorized group
    if (isInAuthorizedGroup(userGroups, authorizedGroups)) {
      return response;
    }

    // User is authenticated but not authorized
    return NextResponse.redirect(new URL("/", request.url));
  }

  // User not authenticated → redirect to login if not already there
  if (url.pathname !== "/cp/login") {
    url.pathname = "/cp/login";
    url.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(new URL(url, request.url));
  }

  return response;
}
