import Calendar from "@/components/main/Calendar/Calendar";
import Flex from "@/components/main/Container/Flex";
import CompetitionsLayout from "@/components/main/Layouts/CompetitionsLayout/CompetitionsLayout";
import MatchCard from "@/components/main/MatchCard/MatchCard";
import { months } from "@/lib/placeholder-data";
import { cookiesClient } from "@/utils/amplify-utils";
import React, { Suspense } from "react";

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
      authMode: "iam",
      selectionSet: ["id", "matches.*", "matches.competitionSeason.*"],
    });

  const results = competitionSeasons[0].matches.filter((el) => {
    const date = new Date(el.date);
    const month = date.getUTCMonth();
    const paramsMonth = searchParams.month;
    if (paramsMonth) {
      return el.status === "COMPLETED" && months.indexOf(paramsMonth) === month;
    } else {
      return el.status === "COMPLETED";
    }
  });

  return (
    <CompetitionsLayout pageTitle="Results">
      <>
        <Suspense fallback={null}>
          <Calendar />
        </Suspense>
        {results && results.length < 1 ? (
          <div>No Results available at the moment.</div>
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
                  iconSize="xl"
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
