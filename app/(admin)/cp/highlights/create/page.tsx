import BackButton from "@/components/admin/BackButton";
import HighlightForm from "@/components/admin/Forms/HighlightForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { Box, HStack } from "@chakra-ui/react";
import React from "react";

function CreateHighlight() {
  return (
    <>
      <PageTitle pageTitle="Create Highlight" />
      <Box w={"full"} h={"full"} mt={"20px"}>
        <HStack mb={"5"} justifyContent={"space-between"} gap={"4"} w={"full"}>
          <BackButton />
        </HStack>
        <HighlightForm method="CREATE" />
      </Box>
    </>
  );
}

export default CreateHighlight;
