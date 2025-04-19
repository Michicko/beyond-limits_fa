import { IArticle } from "@/lib/definitions";
import Article from "./Article";
import styles from "./Article.module.css";
import clsx from "clsx";
import slugify from "slugify";

const ArticleList = ({ articles }: { articles: IArticle[] }) => {
  return (
    <div className={clsx(styles.articles)}>
      {articles.map((article) => {
        return <Article article={article} key={slugify(article.title)} />;
      })}
    </div>
  );
};

export default ArticleList;
