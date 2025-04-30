"use client";
import { getCompetitionSeasonLazyLoaded } from "@/app/_actions/competition-season-actions";
import { getTeamsLazyLoaded } from "@/app/_actions/team-actions";
import CustomAlert from "@/components/admin/Alert/CustomAlert";
import BackButton from "@/components/admin/BackButton";
import CompetitionSeasonCard from "@/components/admin/CompetitionSeasonCard/CompetitionSeasonCard";
import Cup from "@/components/admin/Cup/Cup";
import PageTitle from "@/components/admin/Layout/PageTitle";
import League from "@/components/admin/League/League";
import { Box, HStack, Skeleton, Stack, Tabs } from "@chakra-ui/react";
import useSWR from "swr";

function CompetitionSeason({
  params,
}: {
  params: { competitionId: string; competitionSeasonId: string };
}) {
  const {
    data: competitionSeasonData,
    error,
    isLoading,
  } = useSWR("competition-season", () =>
    getCompetitionSeasonLazyLoaded(params.competitionSeasonId)
  );

  const competitionSeason = competitionSeasonData && competitionSeasonData.data;
  const league = competitionSeason && competitionSeason.league;

  const cupRounds =
    competitionSeason &&
    competitionSeason.cupId &&
    competitionSeason.cup.playOffs;

  const matches = competitionSeason && competitionSeason.matches;

  const {
    data: teamsData,
    error: teamsError,
    isLoading: isTeamsLoading,
  } = useSWR(["lazy-teams", params.competitionSeasonId], getTeamsLazyLoaded);

  const teams = teamsData && teamsData.data;

  return (
    <>
      <PageTitle pageTitle={`${competitionSeason?.season} season`} />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <HStack mb={8}>
          <Skeleton h={"40px"} w={"80px"} loading={isLoading}>
            <BackButton />
          </Skeleton>
        </HStack>
        {isLoading ? (
          <Stack maxW={"960px"} m={"0 auto"} gap={"5"}>
            <Skeleton h={"165px"} w={"full"} loading={isLoading} />
            <Skeleton h={"400px"} w={"full"} loading={isTeamsLoading} />
            <Skeleton h={"300px"} w={"full"} loading={isLoading} />
          </Stack>
        ) : error ? (
          <CustomAlert
            status="error"
            title="Something went wrong."
            message={error.message}
          />
        ) : !competitionSeason ? (
          <CustomAlert
            status="error"
            title={`No season with id ${params.competitionSeasonId}`}
          />
        ) : (
          <>
            <Box p={"5"} w={"full"}>
              <Stack maxW={"960px"} m={"0 auto"} gap={"5"}>
                <CompetitionSeasonCard
                  competitionSeasonId={competitionSeason.id}
                  competitionName={competitionSeason.name}
                  competitionType={competitionSeason.type}
                  season={competitionSeason.season}
                  status={competitionSeason.status}
                  teams={teams}
                />
                {competitionSeason.type === "LEAGUE" &&
                  league &&
                  matches &&
                  teams && (
                    <League
                      teams={teams}
                      leagueRounds={league.leagueRounds}
                      matches={matches}
                      league={league}
                      competitionStatus={competitionSeason.status}
                      type={competitionSeason.type}
                    />
                  )}
                {competitionSeason.type === "CUP" &&
                  competitionSeason &&
                  matches &&
                  cupRounds && (
                    <Cup
                      rounds={cupRounds}
                      matches={matches}
                      cupId={competitionSeason.cupId}
                      competitionStatus={competitionSeason.status}
                    />
                  )}
                {competitionSeason.type === "MIXED" && (
                  <Tabs.Root defaultValue="league" fitted w={"full"}>
                    <Tabs.List mb={5}>
                      <Tabs.Trigger value="league">Main</Tabs.Trigger>
                      <Tabs.Trigger
                        value="cup"
                        disabled={league?.status === "PENDING"}
                      >
                        Knockout
                      </Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="league">
                      {league && league.standings && matches && teams && (
                        <League
                          teams={teams}
                          leagueRounds={league.leagueRounds}
                          matches={matches}
                          league={league}
                          competitionStatus={competitionSeason.status}
                          type={competitionSeason.type}
                        />
                      )}
                    </Tabs.Content>
                    <Tabs.Content value="cup">
                      {competitionSeason.cupId && cupRounds && matches && (
                        <Cup
                          rounds={cupRounds}
                          matches={matches}
                          cupId={competitionSeason.cupId}
                          competitionStatus={competitionSeason.status}
                        />
                      )}
                    </Tabs.Content>
                  </Tabs.Root>
                )}
              </Stack>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}

export default CompetitionSeason;
