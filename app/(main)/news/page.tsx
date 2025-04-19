import ArticleList from "@/components/Article/ArticleList";
import ArticleLayout from "@/components/main/Layouts/ArticleLayout";
import Pagination from "@/components/Pagination/Pagination";
import { cookiesClient } from "@/utils/amplify-utils";
import React from "react";

const links = [
  { name: "Academy news", href: "/news" },
  { name: "Beyon limits tv", href: "/beyond-tv" },
];

async function News({
  searchParams,
}: {
  searchParams: { page?: string; category?: string };
}) {
  const currentPage = +(searchParams.page ?? 1);
  const limit = 1;
  let token;
  let articleList;

  if (searchParams.category) {
    const { data: articleData } =
      await cookiesClient.models.ArticleCategory.listArticleCategoryByCategory(
        {
          category: searchParams.category,
        },
        {
          authMode: "iam",
          selectionSet: [
            "id",
            "articles.*",
            "category",
            "articles.articleCategory.category",
          ],
        }
      );
    articleList = articleData[0].articles;
  } else {
    const {
      data: articles,
      errors,
      nextToken,
    } = await cookiesClient.models.Article.list({
      limit,
      authMode: "iam",
      nextToken: token,
      selectionSet: [
        "id",
        "articleCategory.category",
        "content",
        "tags",
        "title",
        "coverImage",
        "status",
        "createdAt",
      ],
    });

    articleList = articles;
  }

  return (
    <ArticleLayout links={links} theme="theme-1" bg="trans">
      <div className="main-container">
        {searchParams.category && (
          <h3>Fetching articles for {searchParams.category}</h3>
        )}
        <ArticleList articles={articleList} />
        {/* <Pagination
          currentPage={currentPage}
          hasNextPage={!nextToken}
          basePath="/news"
        /> */}
      </div>
    </ArticleLayout>
  );
}

export default News;
