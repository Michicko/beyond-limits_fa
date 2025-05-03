import React from "react";
import clsx from "clsx";
import styles from "./Layout.module.css";

interface Info {
  title: string;
  options: string[];
}

function LegalComp({
  title,
  introText,
  infos,
  endNote,
}: {
  title: string;
  introText: string;
  infos: Info[];
  endNote: string;
}) {
  return (
    <>
      <header className={clsx(styles["legal-header"])}>
        <h1 className={clsx(styles["legal-main-title"])}>{title}</h1>
      </header>
      <main className={clsx(styles["legal-main"])}>
        <p className={clsx(styles["legal-intro-text"])}>{introText}</p>
        <>
          {infos.map((info, i) => {
            return (
              <React.Fragment key={i + (i + 3)}>
                <h3 className={clsx(styles["legal-options-title"])}>
                  {info.title}
                </h3>
                <ul className={clsx(styles["legal-options"])}>
                  {info.options.map((option) => {
                    return (
                      <li
                        className={clsx(styles["legal-option"])}
                        key={option.substring(0, 10)}
                      >
                        {option}
                      </li>
                    );
                  })}
                </ul>
              </React.Fragment>
            );
          })}
        </>
        <p className={clsx(styles["legal-intro-text"], styles["end-note"])}>
          {endNote}
        </p>
      </main>
    </>
  );
}

export default LegalComp;
