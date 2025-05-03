"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchAuthSession, signOut } from "aws-amplify/auth";
import toast from "react-hot-toast";
import AuthClient from "./AuthClient";
import { Hub } from "aws-amplify/utils";
import styles from "./Auth.module.css";
import clsx from "clsx";

const Login = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<
    "idle" | "loading" | "authenticated" | "unauthenticated"
  >("idle");

  console.log("status => ", status);

  useEffect(() => {
    const checkAuth = async () => {
      setStatus("loading");

      try {
        const { tokens } = await fetchAuthSession();

        if (tokens) {
          setStatus("authenticated");
        } else {
          setStatus("unauthenticated");
        }
      } catch (error: any) {
        console.error("Authentication error:", error);

        const isNetworkError =
          error?.name === "NetworkError" ||
          error?.toString().includes("NetworkError") ||
          error?.underlyingError?.toString().includes("fetch failed");

        if (isNetworkError) {
          try {
            await signOut({ global: true }); // Clean up Amplify session
          } catch (signOutError) {
            console.error("Error during sign out:", signOutError);
          }

          // Clear all cookies manually (if needed)
          document.cookie.split(";").forEach((cookie) => {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
          });
        }
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
      const timeout = setTimeout(() => {
        const redirectTo = searchParams.get("redirectTo") || "/cp/dashboard";
        router.replace(redirectTo);
      }, 100); // 100ms delay

      return () => clearTimeout(timeout);
    }
  }, [status, router, searchParams]);

  if (status === "loading" || status === "idle") {
    return (
      <div className={clsx(styles["loading-container"])}>
        <div className={clsx(styles.loading)}></div>
      </div>
    );
  }

  // Unauthenticated case: show login form
  return <AuthClient />;
};

export default Login;
