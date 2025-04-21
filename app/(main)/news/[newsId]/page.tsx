import Header from "@/components/main/Header/Header";
import LayoutHeader from "@/components/main/Layouts/CompetitionsLayout/LayoutHeader";
import LayoutMain from "@/components/main/Layouts/CompetitionsLayout/LayoutMain";
import Heading from "@/components/main/Typography/Heading";
import Text from "@/components/main/Typography/Text";
import React, { Suspense } from "react";
import styles from "../News.module.css";
import clsx from "clsx";
import SocialShareLinks from "@/components/main/Social/SocialShareLinks";
import ArticleCategory from "@/components/Article/ArticleCategory";
import TextEditor from "@/components/TextEditor/TextEditor";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import Article from "@/components/Article/Article";

async function NewsArticle({ params }: { params: { newsId: string } }) {
  let recommendedArticles;
  const { data: article, errors } = await cookiesClient.models.Article.get(
    {
      id: params.newsId,
    },
    {
      authMode: (await isAuthenticated()) ? "userPool" : "iam",
      selectionSet: [
        "id",
        "articleCategoryId",
        "articleCategory.category",
        "content",
        "tags",
        "title",
        "coverImage",
        "status",
        "createdAt",
      ],
    }
  );

  if (article && article.articleCategoryId) {
    const { data: categoryArticles } = await cookiesClient.models.Article.list({
      filter: {
        articleCategoryId: {
          eq: article.articleCategoryId,
        },
      },
      authMode: "iam",
      limit: 3,
      selectionSet: [
        "id",
        "articleCategoryId",
        "articleCategory.category",
        "content",
        "tags",
        "title",
        "coverImage",
        "status",
        "createdAt",
      ],
    });

    recommendedArticles = categoryArticles;
  }

  return (
    <>
      <Header
        bg={"/images/under-19-bg.png"}
        alt="2024 / 2025 ongoing campaign"
        overlay={true}
      >
        <LayoutHeader article={true}>
          <>
            <Heading
              level={1}
              letterCase="upper"
              type="secondary"
              center={true}
            >
              {article?.title}
            </Heading>
            <Text
              letterCase="upper"
              weight="bold"
              size="sm"
              color={"secondary"}
            >
              December 15, 2025
            </Text>
            {article && article.articleCategory.category && (
              <ArticleCategory
                category={article.articleCategory.category}
                link={`/news?category=${article.articleCategory.category}`}
              />
            )}
          </>
        </LayoutHeader>
      </Header>
      <LayoutMain>
        <div className={clsx(styles["article-container"], styles.article)}>
          <div className={clsx(styles["article-content__box"])}>
            {article && (
              // <div dangerouslySetInnerHTML={{ __html: article.content }} />
              <Suspense fallback={null}>
                <TextEditor
                  content={JSON.parse(article.content as string)}
                  readOnly={true}
                />
              </Suspense>
            )}
            <SocialShareLinks
              text={`Check out this article: ${article?.title}`}
              url={`/news/${params.newsId}`}
            />
          </div>
          <div className={clsx(styles["articles__box"])}>
            <Heading level={2} letterCase="upper" type="secondary">
              Other Articles
            </Heading>
            <div className={clsx(styles["col-3"])}>
              {recommendedArticles &&
                recommendedArticles.map((article) => {
                  return <Article article={article} />;
                })}
            </div>
          </div>
        </div>
      </LayoutMain>
    </>
  );
}

export default NewsArticle;
