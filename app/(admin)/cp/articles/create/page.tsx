import BackButton from "@/components/admin/BackButton";
import ArticleForm from "@/components/admin/Forms/ArticleForm";
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
        <ArticleForm />
      </Box>
    </>
  );
}

export default CreateArticle;
