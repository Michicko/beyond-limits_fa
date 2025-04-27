"use client";
import { redirect, usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
import AuthClient from "./AuthClient";
import styles from "./Auth.module.css";
import clsx from "clsx";
import { toast } from "react-hot-toast";
import { Hub } from "aws-amplify/utils";

function Login() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const redirectPath = useMemo(() => {
    return searchParams.get("redirectTo") || "/cp/dashboard";
  }, [searchParams]);

  console.log(
    "loading",
    loading,
    "isAuthenticated: ",
    isAuthenticated,
    "link: ",
    redirectPath,
    "pathname ",
    pathname
  );

  const getAuthenticatedUser = useCallback(async () => {
    try {
      const res = await fetchAuthSession();
      console.log(res);
      if (res.tokens && res.tokens.accessToken) {
        setIsAuthenticated(true);
        setLoading(false);
      } else {
        setIsAuthenticated(false);
        setLoading(false);
        toast.error(`No auth token or token expired. Login again!`, {
          duration: 6000,
        });
      }
    } catch (error) {
      toast.error(`Something went wrong, ${(error as Error).message}`, {
        duration: 6000,
      });
      setLoading(false);
      setIsAuthenticated(false);
    }
  }, [isAuthenticated, loading]);

  useEffect(() => {
    if (isAuthenticated && pathname.startsWith("/login")) {
      redirect(redirectPath);
    } else {
      getAuthenticatedUser();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const hubListenerCancelToken = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signedIn":
          console.log("signedIn");
          setIsAuthenticated(true);
          break;
        case "signedOut":
          console.log("signedOut");
          setIsAuthenticated(false);
          break;
      }
    });

    return () => {
      hubListenerCancelToken();
    };
  }, []);

  if (loading) {
    return (
      <div className={clsx(styles["loading-container"])}>
        <div className={styles.loading}></div>
      </div>
    );
  }

  console.log("reached here!");

  return <AuthClient />;
}

export default Login;
