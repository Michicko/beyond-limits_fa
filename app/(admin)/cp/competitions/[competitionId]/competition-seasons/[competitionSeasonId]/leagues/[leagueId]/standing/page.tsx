import BackButton from "@/components/admin/BackButton";
import MatchIcon from "@/components/admin/Card/MatchIcon";
import StandingForm from "@/components/admin/Forms/StandingForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { leagues, standing, teams } from "@/lib/placeholder-data";
import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";

function LeagueStanding({
  params,
}: {
  params: { competitionId: string; leagueId: string };
}) {
  const league = leagues.find((el) => el.id === params.leagueId);

  if (!league) return <div>No League</div>;

  const standingTeams = standing
    .filter((el) => el.league_id === league.id)
    .map((el) => {
      const team = teams.find((team) => team.id === el.team_id);
      return {
        ...el,
        team,
      };
    })
    .sort((a, b) => a.position - b.position);
  return (
    <>
      <PageTitle
        pageTitle={`${league.competition?.longName} - ${league.season?.season} Standing`}
      />
      <HStack mb={8}>
        <BackButton />
      </HStack>
      <Stack w={"full"} h={"full"} mt={"20px"} gap={5}>
        {standingTeams.map((standing) => {
          return (
            <Box>
              <HStack gap={"2.5"} flexShrink={0} mb={3}>
                {standing.team && (
                  <>
                    <MatchIcon size="lg" src={standing.team.logo} />

                    <Text textTransform={"uppercase"}>
                      {standing.team.longName}
                    </Text>
                  </>
                )}
              </HStack>
              <StandingForm standing={standing} />
            </Box>
          );
        })}
      </Stack>
    </>
  );
}

export default LeagueStanding;
