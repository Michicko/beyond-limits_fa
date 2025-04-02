"use client";
import React from "react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import outputs from "@/amplify_outputs.json";

Amplify.configure(outputs, { ssr: true });

function Auth({ children }: { children: React.ReactNode }) {
  return <Authenticator.Provider>{children}</Authenticator.Provider>;
}

export default Auth;
