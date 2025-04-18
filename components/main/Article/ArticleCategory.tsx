import { IArticleCategory } from "@/lib/definitions";
import styles from "./Article.module.css";
import clsx from "clsx";
import slugify from "slugify";

const ArticleCategory = ({ category }: { category: IArticleCategory }) => {
  return (
    <div
      className={clsx(
        styles.article__category,
        category && styles[slugify(category.name.toLowerCase())],
      )}
    >
      <p>{category && category.name}</p>
    </div>
  );
};

export default ArticleCategory;
