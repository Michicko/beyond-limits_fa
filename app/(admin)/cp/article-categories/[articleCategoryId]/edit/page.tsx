"use client";
import CustomAlert from "@/components/admin/Alert/CustomAlert";
import BackButton from "@/components/admin/BackButton";
import ArticleCategoryForm from "@/components/admin/Forms/ArticleCategoryForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { Box, HStack } from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";
import { getArticleCategory } from "@/app/_actions/article-category-actions";

function EditCategory({ params }: { params: { articleCategoryId: string } }) {
  const { data, error, isLoading } = useSWR("article-categories", () =>
    getArticleCategory(params.articleCategoryId),
  );
  const articleCategory = data?.data ?? null;

  return (
    <>
      <PageTitle pageTitle="Edit Article Category" />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <HStack mb={8}>
          <BackButton />
        </HStack>
        {error ? (
          <CustomAlert
            status="error"
            title="Something went wrong."
            message={error.message}
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
