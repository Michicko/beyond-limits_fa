import { NextRequest, NextResponse } from "next/server";
import { runWithAmplifyServerContext } from "@/utils/amplify-utils";
import { isInAuthorizedGroup } from "@/lib/helpers";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

interface CognitoJwtPayload {
  sub: string;
  exp: number;
  iat: number;
  "cognito:groups"?: string[];
  [key: string]: any;
}

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
  const allCookies = cookies(); // ← this is a function that returns ReadonlyRequestCookies

  console.log("🔍 All cookies in middleware:", allCookies);

  const response = NextResponse.next();
  const url = request.nextUrl.clone();

  const isCpRoute = request.nextUrl.pathname.startsWith("/cp");
  const isUnAuthenticatedRoute = unAuthenticatedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  const isProtectedRoute = isCpRoute && !isUnAuthenticatedRoute;

  if (!isProtectedRoute) {
    return response;
  }

  const { isAuthenticated, userGroups } = await runWithAmplifyServerContext({
    nextServerContext: { cookies: () => cookies() },
    operation: async (contextSpec) => {
      const rawToken = contextSpec.token?.value;

      if (!rawToken || typeof rawToken !== "string") {
        return { isAuthenticated: false, userGroups: [] };
      }

      try {
        const decoded = jwtDecode<CognitoJwtPayload>(rawToken);
        const groups = decoded["cognito:groups"] || [];
        return {
          isAuthenticated: true,
          userGroups: groups,
        };
      } catch (error) {
        console.error("JWT decode failed", error);
        return {
          isAuthenticated: false,
          userGroups: [],
        };
      }
    },
  });

  if (isAuthenticated) {
    if (isInAuthorizedGroup(userGroups, authorizedGroups)) {
      return response;
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (url.pathname !== "/cp/login") {
    url.pathname = "/cp/login";
    url.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return response;
}
