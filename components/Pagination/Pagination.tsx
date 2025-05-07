import Link from "next/link";
import styles from "./Pagination.module.css"; // assuming you're using CSS modules
import clsx from "clsx";
import { getIcon } from "@/lib/icons";

type Props = {
  currentPage: number;
  hasNextPage: boolean;
  basePath: string;
};

export default function Pagination({
  currentPage,
  hasNextPage,
  basePath,
}: Props) {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return !hasNextPage ? <></> : (
    <div className={clsx(styles["pagination-box"])}>
      <div className={styles.pagination}>
        <Link
          href={currentPage > 1 ? `${basePath}?page=${prevPage}` : "#"}
          className={clsx(styles.link, {
            [styles.disabled]: currentPage === 1,
          })}
        >
          {getIcon("prev")}
        </Link>
        <Link
          href={hasNextPage ? `${basePath}?page=${nextPage}` : "#"}
          className={clsx(styles.link, { [styles.disabled]: !hasNextPage })}
        >
          {getIcon("next")}
        </Link>
      </div>
    </div>
  );
}
