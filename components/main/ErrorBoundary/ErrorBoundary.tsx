"use client";

import clsx from "clsx";
import React, { useEffect } from "react";
import styles from "./Error.module.css";

function ErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("Error from component:", error);

    if ("digest" in error) {
      console.error("Error digest:", (error as any).digest);
    }
  }, [error]);

  return (
    <div className={clsx(styles["error-container"])}>
      <h1 className={clsx(styles["error-code"])}>{error.name}!</h1>
      <h2 className={clsx(styles["error-message"])}>Something went wrong!</h2>
      <p>{error.message}</p>
      <button className={clsx(styles["error-btn"])} onClick={() => reset()}>
        Please try again
      </button>
    </div>
  );
}

export default ErrorBoundary;
