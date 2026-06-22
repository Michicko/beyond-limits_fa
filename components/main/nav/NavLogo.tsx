import ImageComp from "@/components/ImageComp/ImageComp";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import styles from "./Nav.module.css";
import Image from "next/image";

function NavLogo({ size }: { size: "sm" | "md" | "lg" }) {
  return (
    <Link className={clsx(styles["nav-logo"], styles[size])} href={"/"}>
      <Image
        alt="Beyond Limits FA Logo"
        src="/images/bright-logo.png"
        width={"72"}
        height={"72"}
        priority={true}
      />
    </Link>
  );
}

export default NavLogo;
