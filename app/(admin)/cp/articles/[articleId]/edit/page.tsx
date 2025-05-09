import CustomAlert from "@/components/admin/Alert/CustomAlert";
import BackButton from "@/components/admin/BackButton";
import ArticleFormWrapper from "@/components/admin/Forms/ArticleFormWrapper";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { cookiesClient } from "@/utils/amplify-utils";
import { Box, HStack } from "@chakra-ui/react";
import React from "react";

async function EditArticle({ params }: { params: { articleId: string } }) {
  const { data: article, errors } = await cookiesClient.models.Article.get(
    { id: params.articleId },
    {
      selectionSet: [
        "id",
        "title",
        "status",
        "category",
        "coverImage",
        "content",
        "articleCategoryId",
        "matchId",
      ],
      authMode: "userPool",
    }
  );
  return (
    <>
      <PageTitle pageTitle="Edit Article" />
      <Box w={"full"} h={"full"} mt={"20px"}>
        <HStack mb={"3"} justifyContent={"space-between"} gap={"4"} w={"full"}>
          <BackButton />
        </HStack>
        {errors ? (
          <CustomAlert
            status="error"
            title="Something went wrong."
            message={errors[0].message}
          />
        ) : !article ? (
          <CustomAlert
            status="error"
            title={`No article with id ${params.articleId}`}
          />
        ) : (
          <ArticleFormWrapper article={article} />
        )}
      </Box>
    </>
  );
}

export default EditArticle;
