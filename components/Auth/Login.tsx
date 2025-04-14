"use client";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { AuthUser } from "aws-amplify/auth";
import AuthClient from "./AuthClient";

function Login({ user }: { user?: AuthUser }) {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirectTo") || "/cp/dashboard";

  useEffect(() => {
    if (user) {
      redirect(redirectPath);
    }
  }, [user]);

  return <AuthClient />;
}

export default withAuthenticator(Login);
