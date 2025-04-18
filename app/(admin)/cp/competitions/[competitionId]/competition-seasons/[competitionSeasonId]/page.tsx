import CustomAlert from "@/components/admin/Alert/CustomAlert";
import BackButton from "@/components/admin/BackButton";
import CompetitionSeasonCard from "@/components/admin/CompetitionSeasonCard/CompetitionSeasonCard";
import Cup from "@/components/admin/Cup/Cup";
import PageTitle from "@/components/admin/Layout/PageTitle";
import League from "@/components/admin/League/League";
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

  const competition =
    competitionSeason && (await competitionSeason.competition()).data;

  const league =
    competitionSeason &&
    competitionSeason.leagueId &&
    (await cookiesClient.models.League.get(
      {
        id: competitionSeason.leagueId,
      },
      {
        selectionSet: [
          "id",
          "competitionNameSeason",
          "teams",
          "standings.*",
          "leagueRounds.*",
        ],
      }
    ));

  const cupRoundsData =
    competitionSeason &&
    competitionSeason.cupId &&
    (await cookiesClient.models.PlayOff.list({
      filter: {
        cupId: {
          eq: competitionSeason.cupId,
        },
      },
      selectionSet: [
        "id",
        "homeForm",
        "awayForm",
        "matchId",
        "round",
        "result",
        "status",
      ],
    }));

  const matchesData =
    competitionSeason &&
    (await cookiesClient.models.Match.list({
      filter: {
        competitionSeasonId: {
          eq: competitionSeason.id,
        },
      },
      selectionSet: [
        "id",
        "homeTeam.id",
        "awayTeam.id",
        "homeTeam.logo",
        "homeTeam.shortName",
        "homeTeam.longName",
        "awayTeam.logo",
        "awayTeam.shortName",
        "awayTeam.longName",
        "date",
      ],
    }));

  const teams = (
    await cookiesClient.models.Team.list({
      selectionSet: [
        "id",
        "logo",
        "shortName",
        "longName",
        "isBeyondLimits",
        "stadium",
      ],
    })
  ).data;

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
          <>
            <Box p={"5"} w={"full"}>
              <Stack maxW={"960px"} m={"0 auto"} gap={"5"}>
                <CompetitionSeasonCard
                  competitionName={competition.longName}
                  competitionType={competition.competitionType}
                  season={competitionSeason.season}
                  status={competitionSeason.status}
                />
                {competition.competitionType === "LEAGUE" &&
                  league &&
                  league.data &&
                  league.data.standings &&
                  matchesData && (
                    <League
                      teams={teams}
                      leagueRounds={league.data?.leagueRounds}
                      matches={matchesData.data}
                      league={league.data}
                    />
                  )}
                {competition.competitionType === "CUP" &&
                  competitionSeason &&
                  cupRoundsData &&
                  matchesData &&
                  competitionSeason.cupId && (
                    <Cup
                      rounds={cupRoundsData.data}
                      matches={matchesData.data}
                      cupId={competitionSeason.cupId}
                    />
                  )}
                {competition.competitionType === "MIXED" && (
                  <Tabs.Root defaultValue="league">
                    <Tabs.List>
                      <Tabs.Trigger value="league">League</Tabs.Trigger>
                      <Tabs.Trigger value="cup">Cup</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="league">
                      {league &&
                        league.data &&
                        league.data.standings &&
                        matchesData && (
                          <League
                            teams={teams}
                            leagueRounds={league.data?.leagueRounds}
                            matches={matchesData.data}
                            league={league.data}
                          />
                        )}
                    </Tabs.Content>
                    <Tabs.Content value="cup">
                      {cupRoundsData &&
                        competitionSeason &&
                        matchesData &&
                        competitionSeason.cupId && (
                          <Cup
                            rounds={cupRoundsData.data}
                            matches={matchesData.data}
                            cupId={competitionSeason.cupId}
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
