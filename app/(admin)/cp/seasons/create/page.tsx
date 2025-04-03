import SeasonForm from "@/components/admin/Forms/SeasonForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { Box } from "@chakra-ui/react";
import React from "react";

function CreateSeason() {
  return (
    <>
      <PageTitle pageTitle="Create Season" />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <SeasonForm />
      </Box>
    </>
  );
}

export default CreateSeason;
