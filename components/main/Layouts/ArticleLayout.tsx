import React, { Suspense } from "react";
import { ILink } from "@/lib/definitions";
import Tab from "../Tab/Tab";
import LinkTab from "../Tab/LinkTab";
import clsx from "clsx";
import styles from "./Layout.module.css";

const ArticleLayout = ({
  children,
  links,
  theme,
  bg,
}: {
  children: React.ReactElement;
  links: ILink[];
  theme: "theme-1" | "theme-2";
  bg: "trans" | "white";
}) => {
  return (
    <main className={clsx(styles["article-layout"])}>
      <Suspense key={bg} fallback={null}>
        <Tab bg={bg} theme={theme}>
          <>
            {links.map((link) => {
              return <LinkTab link={link} theme="theme-1" />;
            })}
          </>
        </Tab>
      </Suspense>
      {children}
    </main>
  );
};

export default ArticleLayout;
