"use client";

import ErrorBoundary from "@/components/main/ErrorBoundary/ErrorBoundary";

import React from "react";

function Error({ error, reset }: { error: Error; reset: () => void }) {
  return <ErrorBoundary error={error} reset={() => window.location.reload()} />;
}

export default Error;
