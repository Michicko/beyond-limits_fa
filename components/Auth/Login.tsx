"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchAuthSession } from "aws-amplify/auth";
import toast from "react-hot-toast";
import AuthClient from "./AuthClient";
import { Hub } from "aws-amplify/utils";

const Login = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<
    "idle" | "loading" | "authenticated" | "unauthenticated"
  >("idle");

  const redirectTo = searchParams.get("redirectTo") || "/cp/dashboard";

  useEffect(() => {
    const checkAuth = async () => {
      setStatus("loading");

      try {
        const { tokens } = await fetchAuthSession();
        console.log("Auth tokens =>", tokens);

        if (tokens) {
          setStatus("authenticated");
        } else {
          setStatus("unauthenticated");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        toast.dismiss();
        toast.error((error as Error).message || "Unknown error occurred", {
          duration: 8000,
        });
        setStatus("unauthenticated");
      }
    };

    checkAuth();

    const hubListenerCancel = Hub.listen("auth", ({ payload }) => {
      if (payload.event === "signedIn") {
        setStatus("authenticated");
      }
    });

    return () => {
      hubListenerCancel();
    };
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(redirectTo);
    }
  }, [status, redirectTo, router]);

  if (status === "loading" || status === "idle") {
    return <div>Loading...</div>;
  }

  // Unauthenticated case: show login form
  return <AuthClient />;
};

export default Login;
