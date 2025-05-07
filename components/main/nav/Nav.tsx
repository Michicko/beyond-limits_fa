"use client";
import React, { useEffect, useRef, useState } from "react";
import Search from "../search/Search";
import NavMenu from "./NavMenu";
import clsx from "clsx";
import styles from "./Nav.module.css";
import NavLink from "./NavLink";
import Hamburger from "./Hamburger";
import NavLogo from "./NavLogo";
import NavSearchBtn from "./NavSearchBtn";
import { usePathname } from "next/navigation";
import { fetchAuthSession } from "@aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

function Nav() {
  const [authenticated, setAuthenticated] = useState(false);
  const pathname = usePathname();
  const isStatePopped = useRef(false);

  const [isSearchBarOpened, setIsSearchBarOpened] = useState(false);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [show, setShow] = useState(true);
  const lastScrollYRef = useRef<number | null>(null);

  const openSearchBar = () => {
    setIsSearchBarOpened(true);
  };

  // Handling the scroll position to ensure clicking on the links
  // scrolls the page to the top with the sticky positioned navbar.
  useEffect(() => {
    const onPopState = () => (isStatePopped.current = true);

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (!isStatePopped.current) {
      // navigation occurred without pressing
      // the browser's back or forward buttons
      window.scrollTo(0, 0);
    } else {
      isStatePopped.current = false;
    }
  }, [pathname]);

  const controlNavbar = () => {
    const lastScrollY = lastScrollYRef.current;
    if (lastScrollY && lastScrollY > 35 && window.scrollY > lastScrollY) {
      // if scroll down hide the navbar
      setShow(false);
    } else {
      // if scroll up show the navbar
      setShow(true);
    }

    // remember current page location to use in the next move
    lastScrollYRef.current = window.scrollY;
  };

  //   handling nav on scroll
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    // cleanup function
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollYRef.current]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const { tokens } = await fetchAuthSession();
        if (tokens) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        setAuthenticated(false);
      }
    };
    checkAuthStatus();
  }, []);

  useEffect(() => {
     const hubListenerCancel = Hub.listen("auth", ({ payload }) => {
      if (payload.event === "signedIn") {
        setAuthenticated(true);
      }
    });

    return () => {
      hubListenerCancel();
    };
  }, [])

  return (
    <>
      <Search isOpened={isSearchBarOpened} setIsOpened={setIsSearchBarOpened} />
      <NavMenu isMenuOpened={isMenuOpened} setIsMenuOpened={setIsMenuOpened} />
      <nav
        className={clsx(styles.nav, {
          [styles.show]: show,
          [styles.hide]: !show,
        })}
      >
        <div className={clsx(styles["nav-sm"])}>
          <div className={clsx(styles.left)}>
            <NavLink link={{ href: "/gallery", name: "gallery" }} />
            <NavLink link={{ href: "/contact", name: "Contact us" }} />
          </div>
          <p className={clsx(styles["nav-text"])}>No Limits</p>
          <div className={clsx(styles.right)}>
            <NavLink
              link={
                authenticated
                  ? { href: "/cp/dashboard", name: "Dashboard" }
                  : { href: "/login", name: "Login" }
              }
            />
          </div>
        </div>
        <div className={clsx(styles["nav-main"])}>
          <Hamburger setIsMenuOpened={setIsMenuOpened} />
          <NavLogo size="md" />
          <NavSearchBtn handleOnClick={openSearchBar} />
        </div>
      </nav>
    </>
  );
}
export default Nav;
