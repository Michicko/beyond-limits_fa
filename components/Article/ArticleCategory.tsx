import styles from "./Article.module.css";
import clsx from "clsx";
import slugify from "slugify";
import Link from "next/link";

const ArticleCategory = ({
  category,
  link,
}: {
  category: string;
  link: string;
}) => {
  return (
    <Link
      href={link}
      className={clsx(
        styles.article__category,
        category && styles[slugify(category.toLowerCase())]
      )}
    >
      <p>{category}</p>
    </Link>
  );
};

export default ArticleCategory;
