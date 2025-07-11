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
import { capitalize, formatDate } from "@/lib/helpers";
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { newsId: string } }): Promise<Metadata>  {
  const auth = await isAuthenticated()

  const { data: article } = await cookiesClient.models.Article.get(
    {
      id: params.newsId,
    },
    {
      authMode: auth ? "userPool" : "iam",
      selectionSet: [
        "id",
        "content",
        "tags",
        "title",
        "coverImage",
        "description"
      ],
    }
  );

  return {
    title: article?.title && capitalize(article?.title),
    description: article?.description,
    keywords: article?.tags as string[],
    openGraph: {
      title: article?.title && capitalize(article?.title),
      description: article?.description || '',
      images: [{ url: article?.coverImage ?? '' }],
    },
  };
}

async function NewsArticle({ params }: { params: { newsId: string } }) {
  let recommendedArticles;
  const auth = await isAuthenticated();
  const { data: article, errors } = await cookiesClient.models.Article.get(
    {
      id: params.newsId,
    },
    {
      authMode: auth ? "userPool" : "iam",
      selectionSet: [
        "id",
        "articleCategoryId",
        "category",
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
    const { data: articles } = await cookiesClient.models.Article.list({
      filter: {
        id: {
          ne: article.id
        },
        category: {eq: article.category}
      },
      authMode: auth ? "userPool" : "iam",
      limit: 4,
      selectionSet: [
        "id",
        "articleCategoryId",
        "category",
        "content",
        "tags",
        "title",
        "coverImage",
        "status",
        "createdAt",
      ],
    });
    recommendedArticles = articles ?? [];
  }

  return (
    <>
      <Header
        bg={article?.coverImage ?? "/images/under-19-bg.png"}
        alt="ongoing campaign"
        overlay={true}
      >
        <LayoutHeader article={true}>
          <>
            <Heading
              level={1}
              letterCase="capitalize"
              type="primary"
              color="white"
              center={true}
            >
              {article?.title}
            </Heading>
            {article && (
              <Text
                letterCase="upper"
                weight="bold"
                size="sm"
                color={"secondary"}
              >
                {formatDate(article.createdAt)}
              </Text>
            )}
            {article && article.category && (
              <ArticleCategory
                category={article.category}
                link={`/news?category=${article.category}`}
              />
            )}
          </>
        </LayoutHeader>
      </Header>
      <LayoutMain>
        <>
          {errors && (
            <Text
              color="white"
              letterCase={"lower"}
              size="base"
              weight="regular"
            >
              {`Something went wrong, ${errors[0].message}`}
            </Text>
          )}
          <div className={clsx(styles["article-container"], styles.article)}>
            <div className={clsx(styles["article-content__box"])}>
              {article && (
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
        </>
      </LayoutMain>
    </>
  );
}

export default NewsArticle;
