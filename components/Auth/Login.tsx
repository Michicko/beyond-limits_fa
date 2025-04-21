"use client";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthUser } from "aws-amplify/auth";
import AuthClient from "./AuthClient";

function Login({ user }: { user?: AuthUser }) {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirectTo") || "/cp/dashboard";
  const currentPath = window.location.href;

  console.log(redirectPath, currentPath, user);

  useEffect(() => {
    if (user) {
      if (currentPath === redirectPath) return;
      redirect(redirectPath);
    }
  }, [user, redirectPath]);

  return <AuthClient />;
}

export default withAuthenticator(Login);
