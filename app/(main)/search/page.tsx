import React from "react";
import styles from "./Search.module.css";
import clsx from "clsx";
import Link from "next/link";
import { appendMonthToLink } from "@/lib/helpers";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";

async function search(props: {
  searchParams: Promise<{
    q: string;
  }>;
}) {
  const searchParams = await props.searchParams;
    const {q} = searchParams;

    const { data: searchResults, errors } = await cookiesClient.queries.globalSearch({ 
      keyword: q
      });

    console.log(searchResults);

  return (
    <div className={clsx(styles.container)}>
      <>
        <h1>Search results for: "{searchParams.q}"</h1>
        <div className={clsx(styles["error-search"])}>
          <h2>
            No results were found matching your search request for "
            <b>{searchParams.q}</b>"
          </h2>
          <p>Try different search words.</p>
          <p>check your spellings.</p>
          <p>use exact phrase.</p>
          <div>
            <p>
              Browse{" "}
              <Link href={"/news"} className={clsx(styles.link)}>
                Articles
              </Link>
              ,{" "}
              <Link href={"/competitions"} className={clsx(styles.link)}>
                Competitions
              </Link>
              ,{" "}
              <Link
                href={appendMonthToLink("/fixtures")}
                className={clsx(styles.link)}
              >
                Fixtures
              </Link>
              ,{" "}
              <Link href={"/players/under_19"} className={clsx(styles.link)}>
                Players
              </Link>
              ,{" "}
              <Link href={"/beyond-tv"} className={clsx(styles.link)}>
                Highlights
              </Link>
            </p>
          </div>
        </div>
        <p>
          If you can't find what you're looking for,{" "}
          <a
            href="mailto:info@beyondlimitsfa.com"
            className={clsx(styles["contact-link"])}
          >
            Send feedback
          </a>{" "}
          to help improve our site.
        </p>
        <div className={clsx(styles["result-box"])}></div>
      </>
    </div>
  );
}

export default search;
