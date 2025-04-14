import BackButton from "@/components/admin/BackButton";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";
import MatchFormWrapper from "@/components/admin/Forms/MatchFormWrapper";

async function page() {
  return (
    <>
      <PageTitle pageTitle="Create Match" />
      <Box w={"full"} h={"full"} mt={"20px"}>
        <HStack mb={"3"} justifyContent={"space-between"} gap={"4"} w={"full"}>
          <BackButton />
        </HStack>
        <MatchFormWrapper method="CREATE" />
      </Box>
    </>
  );
}

export default page;
