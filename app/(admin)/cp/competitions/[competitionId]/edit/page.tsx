import CustomAlert from "@/components/admin/Alert/CustomAlert";
import BackButton from "@/components/admin/BackButton";
import CompetitionForm from "@/components/admin/Forms/CompetitionForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { cookiesClient } from "@/utils/amplify-utils";
import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";

async function EditCompetition({
  params,
}: {
  params: { competitionId: string };
}) {
  const competitionTypes = cookiesClient.enums.CompetitionType.values();
  const { data: competition, errors } =
    await cookiesClient.models.Competition.get(
      {
        id: params.competitionId,
      },
      {
        selectionSet: [
          "id",
          "shortName",
          "longName",
          "logo",
          "competitionType",
          "trophyImage",
          "trophyArticleId",
        ],
      }
    );

  return (
    <>
      <PageTitle
        pageTitle={`Edit ${competition ? competition.longName : ""}`}
      />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <HStack mb={8}>
          <BackButton />
        </HStack>
        {errors ? (
          <CustomAlert
            title={`No season with id ${params.competitionId}`}
            status="error"
          />
        ) : (
          <CompetitionForm
            competition={competition}
            competitionTypes={competitionTypes}
          />
        )}
      </Box>
    </>
  );
}

export default EditCompetition;
