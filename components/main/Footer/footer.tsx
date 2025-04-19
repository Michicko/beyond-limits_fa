import React from "react";
import Image from "next/image";
import styles from "./Footer.module.css"; // Assuming this CSS module file exists
import Link from "next/link";
import Socials from "../Social/Socials";
import clsx from "clsx";

const Footer = () => {
  return (
    <footer className={clsx(styles.footer)}>
      {/* Logo */}
      <div className={styles.logo}>
        <Image
          src="/images/footerlogo.png"
          alt="Beyond Limits FA Logo"
          width={100}
          height={100}
          unoptimized
        />
      </div>

      {/* Links */}
      <div className={styles.links}>
        <Link href="/contact">Contact Us</Link>
        <Link href="/legal">Legal</Link>
        <Link href="/terms-conditions">Terms & Conditions</Link>
        <Link href="/confidentiality">Confidentiality</Link>
      </div>

      {/* Social Icons */}
      <Socials />

      {/* Copyright */}
      <p className={clsx(styles["footer-copy"])}>
        Beyond Limits FA &copy; {new Date().getUTCFullYear()} All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
