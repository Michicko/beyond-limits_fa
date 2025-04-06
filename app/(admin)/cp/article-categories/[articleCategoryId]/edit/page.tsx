import CustomAlert from "@/components/admin/Alert/CustomAlert";
import BackButton from "@/components/admin/BackButton";
import ArticleCategoryForm from "@/components/admin/Forms/ArticleCategoryForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { cookiesClient } from "@/utils/amplify-utils";
import { Box, HStack } from "@chakra-ui/react";
import React from "react";

async function EditCategory({
  params,
}: {
  params: { articleCategoryId: string };
}) {
  const { data: articleCategory, errors } =
    await cookiesClient.models.ArticleCategory.get(
      { id: params.articleCategoryId },
      {
        selectionSet: ["id", "category", "createdAt"],
        authMode: "userPool",
      }
    );

  return (
    <>
      <PageTitle pageTitle="Edit Article Category" />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <HStack mb={8}>
          <BackButton />
        </HStack>
        {errors ? (
          <CustomAlert
            status="error"
            title="Something went wrong."
            message={errors[0].message}
          />
        ) : !articleCategory ? (
          <CustomAlert
            status="info"
            title="No articleCategory."
            message={`No article category with id ${params.articleCategoryId} available.`}
          />
        ) : (
          <ArticleCategoryForm articleCategory={articleCategory} />
        )}
      </Box>
    </>
  );
}

export default EditCategory;
