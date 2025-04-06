import BackButton from "@/components/admin/BackButton";
import ArticleCategoryForm from "@/components/admin/Forms/ArticleCategoryForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { Box, HStack } from "@chakra-ui/react";
import React from "react";

async function CreateCategory() {
  return (
    <>
      <PageTitle pageTitle="Create Article Category" />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <HStack mb={8}>
          <BackButton />
        </HStack>
        <ArticleCategoryForm />
      </Box>
    </>
  );
}

export default CreateCategory;
