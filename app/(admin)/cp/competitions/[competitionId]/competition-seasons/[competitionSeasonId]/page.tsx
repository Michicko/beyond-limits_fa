import CustomAlert from "@/components/admin/Alert/CustomAlert";
import BackButton from "@/components/admin/BackButton";
import CompetitionSeasonCard from "@/components/admin/CompetitionSeasonCard/CompetitionSeasonCard";
import Cup from "@/components/admin/Cup/Cup";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { cookiesClient } from "@/utils/amplify-utils";
import { Box, HStack, Stack, Tabs } from "@chakra-ui/react";

async function CompetitionSeason({
  params,
}: {
  params: { competitionId: string; competitionSeasonId: string };
}) {
  const { data: competitionSeason, errors } =
    await cookiesClient.models.CompetitionSeason.get({
      id: params.competitionSeasonId,
    });

  const competitionData = await competitionSeason?.competition();
  const competition = competitionData?.data;

  const cup = await competitionSeason?.cup();
  const league = await competitionSeason?.league();

  return (
    <>
      <PageTitle pageTitle={`${competitionSeason?.season} season`} />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <HStack mb={8}>
          <BackButton />
        </HStack>
        {errors ? (
          <CustomAlert
            status="error"
            title="Something went wrong."
            message={errors[0].message}
          />
        ) : !competition ? (
          <CustomAlert
            status="error"
            title={`Competition seasonm does not belong to any competition`}
          />
        ) : !competitionSeason ? (
          <CustomAlert
            status="error"
            title={`No season with id ${params.competitionSeasonId}`}
          />
        ) : (
          <Box p={"5"} w={"full"}>
            <Stack maxW={"960px"} m={"0 auto"} gap={"5"}>
              <CompetitionSeasonCard
                competitionName={competition.longName}
                competitionType={competition.competitionType}
                season={competitionSeason.season}
                status={competitionSeason.status}
              />
              {competition.competitionType === "LEAGUE" ? (
                <Box>
                  <h1>League</h1>
                </Box>
              ) : competition.competitionType === "CUP" ? (
                <Cup />
              ) : (
                <Tabs.Root defaultValue="league">
                  <Tabs.List>
                    <Tabs.Trigger value="league">League</Tabs.Trigger>
                    <Tabs.Trigger value="cup">Cup</Tabs.Trigger>
                  </Tabs.List>
                  <Tabs.Content value="league">League: Main</Tabs.Content>
                  <Tabs.Content value="cup">Cup: Knockout stage</Tabs.Content>
                </Tabs.Root>
              )}
            </Stack>
          </Box>
        )}
      </Box>
    </>
  );
}

export default CompetitionSeason;
