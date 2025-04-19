import { NextRequest, NextResponse } from "next/server";
import { getRole } from "@/utils/amplify-utils";
import { isInAuthorizedGroup } from "./lib/helpers";
import { months } from "./lib/placeholder-data";

const unAuthenticatedRoutes = [
  "/login",
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

  // navigate /competitions/id to /competitions/id/fixture
  if (
    url.pathname.match(/^\/competitions\/[^/]+$/) &&
    request.method === "GET"
  ) {
    const month = months[new Date().getUTCMonth()];
    const segments = url.pathname.split("/");
    const competitionId = segments[2];

    url.pathname = `/competitions/${competitionId}/fixtures`;
    url.searchParams.set("month", `${month}`);

    return NextResponse.redirect(url);
  }

  const isCpRoute = request.nextUrl.pathname.startsWith("/cp");

  const isUnAuthenticatedRoute = unAuthenticatedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  const isProtectedRoute = isCpRoute && !isUnAuthenticatedRoute;

  if (!isProtectedRoute) {
    return response;
  }

  const { groups, tokens } = await getRole();

  // if user is in authorized group
  if (isInAuthorizedGroup(groups, authorizedGroups)) {
    return response;
  }

  // User is authenticated but not authorized
  if (tokens) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // User not authenticated → redirect to login if not already there
  if (url.pathname !== "/login") {
    url.pathname = "/login";
    url.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(new URL(url, request.url));
  }

  return response;
}
