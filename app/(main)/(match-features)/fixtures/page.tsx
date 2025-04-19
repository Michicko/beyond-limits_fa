import MatchCard from "@/components/main/MatchCard/MatchCard";
import React, { Suspense } from "react";
import Flex from "@/components/main/Container/Flex";
import Calendar from "@/components/main/Calendar/Calendar";
import CompetitionsLayout from "@/components/main/Layouts/CompetitionsLayout/CompetitionsLayout";
import { cookiesClient } from "@/utils/amplify-utils";
import { months } from "@/lib/placeholder-data";

async function Fixtures(props: {
  searchParams: Promise<{
    season?: string;
    month: string;
    page?: string;
  }>;
}) {
  const date = new Date();
  const year = date.getFullYear();
  const searchParams = await props.searchParams;

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

  const fixtures = competitionSeasons[0].matches.filter((el) => {
    const date = new Date(el.date);
    const month = date.getUTCMonth();
    const paramsMonth = searchParams.month;
    if (paramsMonth) {
      return el.status === "UPCOMING" && months.indexOf(paramsMonth) === month;
    } else {
      return el.status === "UPCOMING";
    }
  });

  const month = date.getUTCMonth();

  return (
    <CompetitionsLayout pageTitle="Fixtures">
      <>
        <Suspense fallback={null}>
          <Calendar slice={month} />
        </Suspense>
        {fixtures && fixtures.length < 1 ? (
          <div>No Fixtures available at the moment.</div>
        ) : (
          <Flex
            align="center"
            direction="col"
            justify="between"
            gap="sm"
            my="lg"
          >
            {fixtures.map((match) => {
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

export default Fixtures;
