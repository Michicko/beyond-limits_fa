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
    await cookiesClient.models.CompetitionSeason.get(
      {
        id: params.competitionSeasonId,
      },
      {
        selectionSet: [
          "id",
          "name",
          "logo",
          "season",
          "type",
          "status",
          "cupId",
          "leagueId",
          "matches.*",
          "league.*",
          "cup.playOffs.*",
          "league.standings.*",
          "league.leagueRounds.*",
        ],
      }
    );

  const league = competitionSeason && competitionSeason.league;

  const cupRounds =
    competitionSeason &&
    competitionSeason.cupId &&
    competitionSeason.cup.playOffs;

  const matches = competitionSeason && competitionSeason.matches;

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
                  competitionName={competitionSeason.name}
                  competitionType={competitionSeason.type}
                  season={competitionSeason.season}
                  status={competitionSeason.status}
                />
                {competitionSeason.type === "LEAGUE" && league && matches && (
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
                      {league && league.standings && matches && (
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
