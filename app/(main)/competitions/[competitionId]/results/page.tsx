import Calendar from "@/components/main/Calendar/Calendar";
import Grid from "@/components/main/Container/Grid";
import CompetitionsLayout from "@/components/main/Layouts/CompetitionsLayout/CompetitionsLayout";
import MatchCard from "@/components/main/MatchCard/MatchCard";
import Text from "@/components/main/Typography/Text";
import { getMatches } from "@/lib/helpers";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import React, { Suspense } from "react";

async function CompetitionResults({
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

  let results;
  if (competition) {
    results = getMatches(competition?.matches, "COMPLETED", searchParam.month);
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
        {!results ? (
          <Text size="md" color="white" letterCase="normal">
            No Results available
          </Text>
        ) : results && results.length < 1 ? (
          <Text size="md" color="white" letterCase="normal">
            No Results available
          </Text>
        ) : (
          <Grid gap="sm">
            {results.map((match) => {
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

export default CompetitionResults;
