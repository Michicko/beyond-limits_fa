"use client";
import { Authenticator } from "@aws-amplify/ui-react";
import React from "react";

function AuthClient() {
  return <Authenticator hideSignUp={true} />;
}

export default AuthClient;
