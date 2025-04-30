import Calendar from "@/components/main/Calendar/Calendar";
import Grid from "@/components/main/Container/Grid";
import CompetitionsLayout from "@/components/main/Layouts/CompetitionsLayout/CompetitionsLayout";
import MatchCard from "@/components/main/MatchCard/MatchCard";
import Text from "@/components/main/Typography/Text";
import { getMatches } from "@/lib/helpers";
import { months } from "@/lib/placeholder-data";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import React, { Suspense } from "react";

async function CompetitionFixtures({
  params,
  searchParams,
}: {
  params: { competitionId: string };
  searchParams: Promise<{
    month: string;
  }>;
}) {
  const searchParam = await searchParams;

  const { data: competition, errors } =
    await cookiesClient.models.CompetitionSeason.get(
      {
        id: params.competitionId,
      },
      {
        authMode: (await isAuthenticated()) ? "userPool" : "iam",
        selectionSet: [
          "id",
          "matches.*",
          "name",
          "matches.competitionSeason.*",
        ],
      }
    );

  let fixtures;
  if (competition) {
    fixtures = getMatches(competition?.matches, "UPCOMING", searchParam.month);
  }

  return (
    <CompetitionsLayout
      pageTitle={competition?.name}
      competitionId={params.competitionId}
    >
      <>
        <Suspense fallback={null}>
          <Calendar />
        </Suspense>
        {!fixtures || (fixtures && fixtures.length < 1) ? (
          <Text color="white" letterCase={"lower"} size="base" weight="regular">
            No Fixtures available at the moment.
          </Text>
        ) : (
          <Grid gap="sm">
            {fixtures.map((match) => {
              return (
                <MatchCard
                  match={match}
                  key={match.id}
                  showName={true}
                  theme="light"
                  iconSize="md"
                />
              );
            })}
          </Grid>
        )}
      </>
    </CompetitionsLayout>
  );
}

export default CompetitionFixtures;
