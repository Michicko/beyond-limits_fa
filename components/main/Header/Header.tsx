import React from "react";
import styles from "./Header.module.css";
import clsx from "clsx";
import Image from "next/image";

function Header({
  bg,
  alt,
  children,
  overlay,
  loadingScreen,
}: {
  bg: string;
  alt: string;
  children: React.ReactElement;
  overlay?: boolean;
  loadingScreen?: boolean;
}) {
  return (
    <header
      className={clsx(
        styles.header,
        overlay && styles.overlay,
        loadingScreen && styles.loading,
      )}
    >
      {!loadingScreen && bg && (
        <Image
          src={bg}
          alt={alt}
          fill
          priority
          quality={100}
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      )}
      <div className={clsx(styles["header-content"])}>{children}</div>
    </header>
  );
}

export default Header;
