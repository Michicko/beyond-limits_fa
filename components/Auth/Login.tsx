"use client";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { AuthUser } from "aws-amplify/auth";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function Login({ user }: { user?: AuthUser }) {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirectTo") || "/cp/dashboard";

  useEffect(() => {
    if (user) {
      redirect(redirectPath);
    }
  }, [user]);
  return null;
}

export default withAuthenticator(Login);
