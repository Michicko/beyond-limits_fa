"use client";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { redirect, usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { AuthUser } from "aws-amplify/auth";
import AuthClient from "./AuthClient";
import styles from "./Auth.module.css";
import clsx from "clsx";

function Login({ user }: { user?: AuthUser }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const redirectPath = useMemo(() => {
    return searchParams.get("redirectTo") || "/cp/dashboard";
  }, [searchParams]);

  useEffect(() => {
    console.log("redirect effect => ", redirectPath, user);
    //   // Only redirect if user is authenticated and loginId exists
    if (user && redirectPath !== pathname) {
      redirect(redirectPath);
    }
  }, [user, redirectPath, pathname]);

  // if (authStatus === "configuring") {
  //   return (
  //     <div className={clsx(styles["loading-container"])}>
  //       <div className={styles.loading}></div>
  //     </div>
  //   );
  // }

  return <AuthClient />;
}

export default withAuthenticator(Login);
