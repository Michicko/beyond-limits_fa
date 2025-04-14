import CustomAlert from "@/components/admin/Alert/CustomAlert";
import BackButton from "@/components/admin/BackButton";
import MatchFormWrapper from "@/components/admin/Forms/MatchFormWrapper";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { cookiesClient } from "@/utils/amplify-utils";
import { Box, HStack } from "@chakra-ui/react";
import React from "react";

async function page({ params }: { params: { matchId: string } }) {
  const { data: match, errors } = await cookiesClient.models.Match.get(
    {
      id: params.matchId,
    },
    {
      selectionSet: [
        "id",
        "status",
        "competitionSeasonId",
        "competitionSeason.logo",
        "competitionSeason.name",
        "competitionSeason.season",
        "date",
        "time",
        "venue",
        "status",
        "aboutKeyPlayer",
        "keyPlayerId",
        "aboutMvp",
        "mvpId",
        "time",
        "status",
        "review",
        "report",
        "lineup",
        "substitutes",
        "homeTeam.*",
        "awayTeam.*",
        "coach.*",
        "scorers",
      ],
    }
  );

  return (
    <>
      <PageTitle pageTitle="Edit Match" />
      <Box w={"full"} h={"full"} mt={"20px"}>
        <HStack justify={"flex-end"} mb={"20px"} gap="2">
          <BackButton />
        </HStack>

        {!match ? (
          <CustomAlert
            status="error"
            title={`No match with id ${params.matchId}`}
          />
        ) : (
          <MatchFormWrapper match={match} method="UPDATE" />
        )}
      </Box>
    </>
  );
}

export default page;
