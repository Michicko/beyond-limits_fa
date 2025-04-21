"use client";
import React from "react";
import ErrorBoundary from "@/components/admin/ErrorBoundary/ErrorBoundary";

function Error({ error, reset }: { error: Error; reset: () => void }) {
  return <ErrorBoundary error={error} reset={reset} />;
}

export default Error;
