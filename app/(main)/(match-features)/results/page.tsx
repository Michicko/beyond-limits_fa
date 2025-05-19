import Calendar from "@/components/main/Calendar/Calendar";
import Flex from "@/components/main/Container/Flex";
import CompetitionsLayout from "@/components/main/Layouts/CompetitionsLayout/CompetitionsLayout";
import { getMatchesByDateRange } from "@/lib/helpers";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import React, { Suspense } from "react";
import Text from "@/components/main/Typography/Text";
import MatchCard from "@/components/main/MatchCard/MatchCard";
import { months } from "@/lib/placeholder-data";


export const metadata = {
  title: 'Fixtures & Results',
  description: "Find fixtures and results for Beyond Limits Fa. First team on the official website, Beyondlimitsfa.com.",
};

async function Results(props: {
  searchParams: Promise<{
    season?: string;
    month: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const date = new Date();
  const year = date.getFullYear();
  const monthIndex = months.indexOf(searchParams.month.toLowerCase()); 
    const auth = await isAuthenticated()

  const { data: competitionSeasons, errors } =
    await cookiesClient.models.CompetitionSeason.list({
      filter: {
        season: {
          contains: `${year}`,
        },
        status: {
          eq: "PENDING",
        },
      },
      authMode: auth ? "userPool" : "iam",
      selectionSet: ["id", "matches.*", "matches.competitionSeason.*"],
    });

    const startDate = new Date(year, monthIndex, 1); 
    const endDate = new Date(year, monthIndex + 1, 1);

  const results =
    competitionSeasons[0] &&
     getMatchesByDateRange(competitionSeasons[0]?.matches, "COMPLETED", startDate, endDate);

  return (
    <CompetitionsLayout pageTitle="Results">
      <>
        <Suspense fallback={null}>
          <Calendar />
        </Suspense>
        {
          errors ? 
          <Text color="white" letterCase={"lower"} size="base" weight="regular">
          {errors[0].message}
        </Text>
        :
        !results || (results && results.length < 1) ? (
          <Text color="white" letterCase={"lower"} size="base" weight="regular">
            No Results available at the moment.
          </Text>
        ) : (
          <Flex
            align="center"
            justify="between"
            direction="col"
            gap="sm"
            my="lg"
          >
            {results.map((match) => {
              return (
                <MatchCard
                  match={match}
                  showName={true}
                  theme="light"
                  key={match.id}
                />
              );
            })}
          </Flex>
        )}
      </>
    </CompetitionsLayout>
  );
}

export default Results;
