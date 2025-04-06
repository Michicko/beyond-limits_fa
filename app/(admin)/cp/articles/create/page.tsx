import BackButton from "@/components/admin/BackButton";
import ArticleFormWrapper from "@/components/admin/Forms/ArticleFormWrapper";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { Box, HStack } from "@chakra-ui/react";
import React from "react";

function CreateArticle() {
  return (
    <>
      <PageTitle pageTitle="Create Article" />
      <Box w={"full"} h={"full"} mt={"20px"}>
        <HStack mb={"3"} justifyContent={"space-between"} gap={"4"} w={"full"}>
          <BackButton />
        </HStack>
        <ArticleFormWrapper />
      </Box>
    </>
  );
}

export default CreateArticle;
