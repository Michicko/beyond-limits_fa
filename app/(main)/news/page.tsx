import ArticleList from "@/components/Article/ArticleList";
import ArticleLayout from "@/components/main/Layouts/ArticleLayout";
import Pagination from "@/components/Pagination/Pagination";
import { clientPaginate } from "@/lib/helpers";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import React from "react";
import Text from "@/components/main/Typography/Text";

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
  const limit = 10;
  let articleList;
  let errs;

  if (searchParams.category) {
    const { data: articleData, errors } =
      await cookiesClient.models.ArticleCategory.listArticleCategoryByCategory(
        {
          category: searchParams.category,
        },
        {
          authMode: (await isAuthenticated()) ? "userPool" : "iam",
          selectionSet: [
            "id",
            "articles.*",
            "category",
            "articles.articleCategory.category",
            "articles.matchHomeTeamLogo",
            "articles.matchAwayTeamLogo",
            "articles.matchId",
          ],
        }
      );

    if (errors) {
      errs = [...errors];
    }

    articleList =
      articleData[0] &&
      articleData[0].articles.filter((el) => el.status === "PUBLISHED");
  } else {
    const { data: articles, errors } = await cookiesClient.models.Article.list({
      limit: 150,
      authMode: (await isAuthenticated()) ? "userPool" : "iam",
      selectionSet: [
        "id",
        "articleCategory.category",
        "content",
        "tags",
        "title",
        "coverImage",
        "status",
        "createdAt",
        "matchId",
        "matchHomeTeamLogo",
        "matchAwayTeamLogo",
      ],
    });
    if (errors) {
      errs = [...errors];
    }
    articleList =
      articles && articles.filter((el) => el.status === "PUBLISHED");
  }

  const { paginatedItems: articles, hasNextPage } = clientPaginate(
    articleList,
    currentPage,
    limit
  );

  return (
    <ArticleLayout links={links} theme="theme-1" bg="trans">
      <div className="main-container">
        {errs && (
          <Text color="white" letterCase={"lower"} size="base" weight="regular">
            {`Something went wrong, ${errs[0].message}`}
          </Text>
        )}
        {searchParams.category && (
          <h3>Showing articles for {searchParams.category}</h3>
        )}
        {!articleList ? (
          <div>No Articles</div>
        ) : (
          <>
            <ArticleList articles={articles} />
            <Pagination
              currentPage={currentPage}
              hasNextPage={hasNextPage}
              basePath="/news"
            />
          </>
        )}
      </div>
    </ArticleLayout>
  );
}

export default News;
