import CustomAlert from "@/components/admin/Alert/CustomAlert";
import SeasonForm from "@/components/admin/Forms/SeasonForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { seasons } from "@/lib/placeholder-data";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

function EditSeason({ params }: { params: { seasonId: string } }) {
  const season = seasons.find((season) => season.id === params.seasonId);
  return (
    <>
      <PageTitle pageTitle="Edit Season" />
      <Box w={"full"} h={"full"} mt={"30px"}>
        {!season ? (
          <CustomAlert
            title={`No season with id ${params.seasonId}`}
            status="error"
          />
        ) : (
          <SeasonForm />
        )}
      </Box>
    </>
  );
}

export default EditSeason;
