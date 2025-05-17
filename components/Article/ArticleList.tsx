import { IArticle } from "@/lib/definitions";
import Article from "./Article";
import styles from "./Article.module.css";
import clsx from "clsx";
import slugify from "slugify";
import { sortByCreatedAt } from "@/lib/helpers";

const ArticleList = ({ articles }: { articles: IArticle[] }) => {
  const sortedArticles = sortByCreatedAt(articles);
  return (
    <div className={clsx(styles.articles)}>
      {sortedArticles.map((article) => {
        return <Article article={article} key={slugify(article.title)} />;
      })}
    </div>
  );
};

export default ArticleList;
