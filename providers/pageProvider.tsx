"use client";
import PageContext from "@/contexts/pageContext";
import { fetchAuthSession } from "aws-amplify/auth";
import React, { useEffect, useState } from "react";

function PageProvider({ children }: { children: React.ReactNode }) {
  const [pageTitle, setPageTitle] = useState("");
  const [pageBg, setPageBg] = useState("");

  const [groups, setGroups] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try {
        const res = await fetchAuthSession();
        if (res.tokens?.idToken?.payload) {
          setUsername(res.tokens.idToken.payload.preferred_username as string);
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
      }}
    >
      {children}
    </PageContext.Provider>
  );
}

export default PageProvider;
