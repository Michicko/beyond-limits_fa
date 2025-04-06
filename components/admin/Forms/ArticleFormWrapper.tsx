import { cookiesClient } from "@/utils/amplify-utils";
import { Box } from "@chakra-ui/react";
import React from "react";
import CustomAlert from "../Alert/CustomAlert";
import ArticleForm from "./ArticleForm";
import { Schema } from "@/amplify/data/resource";

type IArticle = Pick<
  Schema["Article"]["type"],
  "id" | "title" | "coverImage" | "content" | "status"
>;

async function ArticleFormWrapper({ article }: { article?: IArticle | null }) {
  const { data: articleCategories, errors } =
    await cookiesClient.models.ArticleCategory.list({
      selectionSet: ["id", "category", "createdAt"],
      authMode: "userPool",
    });

  return (
    <Box w={"full"}>
      {errors && (
        <CustomAlert
          status="error"
          title="Something went wrong."
          message={errors[0].message}
        />
      )}
      {articleCategories && (
        <ArticleForm article={article} articleCategories={articleCategories} />
      )}
    </Box>
  );
}

export default ArticleFormWrapper;
