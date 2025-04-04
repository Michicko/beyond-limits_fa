import CustomAlert from "@/components/admin/Alert/CustomAlert";
import ArticleForm from "@/components/admin/Forms/ArticleForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { articles } from "@/lib/placeholder-data";
import { Box } from "@chakra-ui/react";
import React from "react";

function EditArticle({ params }: { params: { articleId: string } }) {
  const article = articles.find((article) => article.id === params.articleId);
  return (
    <>
      <PageTitle pageTitle="Edit Article" />
      <Box w={"full"} h={"full"} mt={"20px"}>
        {!article ? (
          <CustomAlert
            status="error"
            title={`No article with id ${params.articleId}`}
          />
        ) : (
          <ArticleForm article={article} />
        )}
      </Box>
    </>
  );
}

export default EditArticle;
