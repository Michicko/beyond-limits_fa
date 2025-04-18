"use client";
import { IArticle } from "@/lib/definitions";
import styles from "./Article.module.css";
import clsx from "clsx";

import ArticleCategory from "./ArticleCategory";
import Link from "next/link";
import ImageComp from "@/components/ImageComp/ImageComp";
import { formatDate } from "@/lib/helpers";

const Article = ({ article }: { article: IArticle }) => {
  const bg = `linear-gradient(
    to top,
    rgba(4, 48, 91, 0.75),
    rgba(64, 84, 102, 0.02)
  ), url(${article.coverImage})`;

  const cardStyles =
    article.articleCategory.category &&
    article.articleCategory.category === "MATCH PREVIEW"
      ? {
          background: "#30353B",
        }
      : article.articleCategory.category &&
        article.articleCategory.category === "MATCH REPORT"
      ? {
          background: "#01305b",
        }
      : {
          background: bg,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        };

  console.log(article);
  const selected_categories = ["match preview", "match report"];

  return (
    <article
      className={clsx(styles.news__article, {
        [styles["with-bg"]]:
          article.articleCategory.category &&
          !selected_categories.includes(
            article.articleCategory.category.toLowerCase()
          ),
      })}
      style={cardStyles}
    >
      {article.match &&
        article.match.homeTeam &&
        article.match.awayTeam &&
        article.articleCategory.category &&
        selected_categories.includes(
          article.articleCategory.category.toLowerCase()
        ) && (
          <div className={styles.match__teams}>
            <div className={styles["team__img-box"]}>
              <ImageComp
                image={article.match.homeTeam.logo}
                alt={article.match.homeTeam.longName}
              />
            </div>
            <div className={styles["team__img-box"]}>
              <ImageComp
                image={article.match.awayTeam.logo}
                alt={article.match.awayTeam.longName}
              />
            </div>
          </div>
        )}
      <div className={clsx(styles.article__body)}>
        {article.articleCategory.category && (
          <ArticleCategory
            category={article.articleCategory.category}
            link={`/articles?category=${article.articleCategory.category}`}
          />
        )}
        <h3>{article.title}</h3>
        <div className={clsx(styles["news__article-footer"])}>
          <p className={clsx(styles.date)}>{formatDate(article.createdAt)}</p>
          <Link
            href={`/news/${article.id}`}
            className={clsx(styles.article__link)}
          >
            Go
            <svg
              xmlns="http://www.w3.org/2000/svg"
              shapeRendering="geometricPrecision"
              textRendering="geometricPrecision"
              imageRendering="optimizeQuality"
              fillRule="evenodd"
              clipRule="evenodd"
              viewBox="0 0 512 404.39"
            >
              <path
                fillRule="nonzero"
                d="M438.95 219.45 0 219.99v-34.98l443.3-.55L269.8 25.79 293.39 0 512 199.92 288.88 404.39l-23.59-25.8z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Article;
