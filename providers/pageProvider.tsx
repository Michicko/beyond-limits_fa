"use client";
import PageContext from "@/contexts/pageContext";
import { fetchAuthSession } from "aws-amplify/auth";
import React, { useEffect, useState } from "react";

function PageProvider({ children }: { children: React.ReactNode }) {
  const [pageTitle, setPageTitle] = useState("");
  const [pageBg, setPageBg] = useState("");

  const [userGroup, setUserGroup] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [authenticatedUserId, setAuthenticatedUserId] = useState("");

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try {
        const res = await fetchAuthSession();
        if (res.tokens?.idToken?.payload && res.tokens?.idToken?.payload.sub) {
          setUsername(res.tokens.idToken.payload.preferred_username as string);
          setAuthenticatedUserId(res.tokens.idToken.payload?.sub);
          const groups = Array.isArray(
            res.tokens?.accessToken?.payload["cognito:groups"]
          )
            ? res.tokens.accessToken.payload["cognito:groups"]
            : []; // Default to an empty array if it's not an array

          const group = groups[0] as string;
          setUserGroup(group);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error getting user groups:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  return (
    <PageContext.Provider
      value={{
        pageTitle,
        setPageTitle,
        pageBg,
        setPageBg,
        username,
        setUsername,
        loading,
        authenticatedUserId,
        setAuthenticatedUserId,
        userGroup,
        setUserGroup,
      }}
    >
      {children}
    </PageContext.Provider>
  );
}

export default PageProvider;
