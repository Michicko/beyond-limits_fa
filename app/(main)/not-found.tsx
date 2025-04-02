import React from "react";
import clsx from "clsx";
import styles from "./Not-Found.module.css";
import Link from "next/link";
// import Text from "@/components/main/Typography/Text";

function NotFound() {
  return (
    <>
      <div className={clsx(styles["not-found__container"])}>
        <div className={clsx(styles.container)}>
          <h1 className={clsx(styles["error-code"])}>404</h1>
          <h2 className={styles["error-message"]}>Oops! Page Not Found</h2>
          {/* <Text size="md" color="white" letterCase="normal"> */}
          It looks like the page you're looking for doesn't exist or has been
          moved. You can go back to the homepage.
          {/* </Text> */}
          <Link href="/" className={styles["home-link"]}>
            Go to Homepage
          </Link>
        </div>
      </div>
    </>
  );
}

export default NotFound;
