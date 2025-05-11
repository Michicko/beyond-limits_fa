import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import styles from './Search.module.css';
import { appendMonthToLink } from '@/lib/helpers';

function EmptyResult({keyword}: {keyword: string}) {
  return (
    <div className={clsx(styles['search-box'])}>
      <div className={clsx(styles["error-search"])}>
        <h2>
          No results were found matching your search request for "
          <b>{keyword}</b>"
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
  </div>
  )
}

export default EmptyResult