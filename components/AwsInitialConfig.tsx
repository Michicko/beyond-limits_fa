"use client";

import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

Amplify.configure(outputs, { ssr: true });

function AwsInitialConfig() {
  return <></>;
}

export default AwsInitialConfig;
