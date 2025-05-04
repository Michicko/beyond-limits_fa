"use client";
import { fetchAll } from "@/app/_actions/actions";
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
  const { data, error, isLoading } = useSWR(
    ["competition-season", params.competitionSeasonId],
    () => fetchAll(params.competitionSeasonId)
  );

  const standings = data?.standings.data ?? [];
  const matches = data?.matches.data ?? [];
  const playOffs = data?.playOffs.data ?? [];
  const teams = data?.teams.data ?? [];
  const competitionSeason = data?.competitionSeason.data ?? null;
  const leagueRounds = data?.leagueRounds.data ?? [];

  return (
    <>
      <PageTitle pageTitle={`${competitionSeason?.season ?? ""} season`} />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <HStack mb={8}>
          <Skeleton h={"40px"} w={"80px"} loading={isLoading}>
            <BackButton />
          </Skeleton>
        </HStack>
        {isLoading ? (
          <Stack maxW={"960px"} m={"0 auto"} gap={"5"}>
            <Skeleton h={"165px"} w={"full"} loading={isLoading} />
            <Skeleton h={"400px"} w={"full"} loading={isLoading} />
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
                />
                {competitionSeason.type === "LEAGUE" &&
                  matches &&
                  competitionSeason.teamIds &&
                  teams && (
                    <League
                      teams={teams}
                      leagueRounds={leagueRounds}
                      matches={matches}
                      competitionStatus={competitionSeason.status}
                      selectedTeams={competitionSeason.teamIds}
                      competitionSeasonId={competitionSeason.id}
                      standings={standings}
                    />
                  )}
                {competitionSeason.type === "CUP" &&
                  competitionSeason &&
                  matches &&
                  playOffs && (
                    <Cup
                      rounds={playOffs}
                      matches={matches}
                      competitionSeasonId={competitionSeason.id}
                      competitionStatus={competitionSeason.status}
                    />
                  )}
                {competitionSeason.type === "MIXED" && (
                  <Tabs.Root defaultValue="league" fitted w={"full"}>
                    <Tabs.List mb={5}>
                      <Tabs.Trigger value="league">Main</Tabs.Trigger>
                      <Tabs.Trigger
                        value="cup"
                        disabled={!competitionSeason.groupStageEnded}
                      >
                        Knockout
                      </Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="league">
                      {competitionSeason &&
                        standings &&
                        matches &&
                        teams &&
                        competitionSeason.teamIds && (
                          <League
                            teams={teams}
                            leagueRounds={leagueRounds}
                            matches={matches}
                            competitionStatus={competitionSeason.status}
                            selectedTeams={competitionSeason.teamIds}
                            competitionSeasonId={competitionSeason.id}
                            standings={standings}
                          />
                        )}
                    </Tabs.Content>
                    <Tabs.Content value="cup">
                      {playOffs && matches && (
                        <Cup
                          rounds={playOffs}
                          matches={matches}
                          competitionSeasonId={competitionSeason.id}
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
