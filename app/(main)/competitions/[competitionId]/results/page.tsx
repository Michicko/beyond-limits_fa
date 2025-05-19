import Calendar from "@/components/main/Calendar/Calendar";
import Grid from "@/components/main/Container/Grid";
import CompetitionsLayout from "@/components/main/Layouts/CompetitionsLayout/CompetitionsLayout";
import MatchCard from "@/components/main/MatchCard/MatchCard";
import Text from "@/components/main/Typography/Text";
import { getMatchesByDateRange } from "@/lib/helpers";
import { months } from "@/lib/placeholder-data";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import React, { Suspense } from "react";

export const metadata = {
  title: 'Fixtures & Results',
  description: "Find fixtures and results for Beyond Limits Fa. First team on the official website, Beyondlimitsfa.com.",
};

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
  const year = new Date().getUTCFullYear();
  const monthIndex = months.indexOf(searchParam.month.toLowerCase());  
  const auth = await isAuthenticated()

  const { data: competition, errors} =
    await cookiesClient.models.CompetitionSeason.get(
      {
        id: params.competitionId,
      },
      {
        authMode: auth ? "userPool" : "iam",
        selectionSet: [
          "id",
          "matches.*",
          "name",
          "matches.competitionSeason.*",
        ],
      }
    );

  const startDate = new Date(year, monthIndex, 1); 
  const endDate = new Date(year, monthIndex + 1, 1);

  let results;
  if (competition) {
    results = getMatchesByDateRange(competition?.matches, "COMPLETED", startDate, endDate);
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
        {errors ? 
        <Text color="white" letterCase={"lower"} size="base" weight="regular">
          {errors[0].message}
        </Text>:
        !results || (results && results.length < 1) ? (
          <Text color="white" letterCase={"lower"} size="base" weight="regular">
            No Results available at the moment.
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
