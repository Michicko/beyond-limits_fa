"use client";
import { useAuthenticator, withAuthenticator } from "@aws-amplify/ui-react";
import { AuthUser } from "aws-amplify/auth";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function Login({ user }: { user?: AuthUser }) {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirectTo") || "/cp/dashboard";
  const { authStatus } = useAuthenticator();

  console.log(authStatus);

  useEffect(() => {
    if (authStatus === "authenticated" && user) {
      setTimeout(() => {
        redirect(redirectPath);
      }, 1000);
    }
  }, [authStatus, user, redirectPath]);

  return null;
}

export default withAuthenticator(Login);
