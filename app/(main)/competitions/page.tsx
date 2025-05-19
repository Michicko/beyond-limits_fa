import CompetitionsLayout from "@/components/main/Layouts/CompetitionsLayout/CompetitionsLayout";
import React from "react";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import CompetitionList from "@/components/main/Competition/CompetitionList";
import Text from "@/components/main/Typography/Text";
import { months } from "@/lib/placeholder-data";
import { getExpectedSeasonLabel } from "@/lib/helpers";

export const metadata = {
  title: 'Competitions',
  description: 'Find competitions for Beyond Limits Fa. First team on the official website, Beyondlimitsfa.com.',
};

async function Competitions() {
  const date = new Date();
  const year = date.getUTCFullYear();
  const auth = await isAuthenticated()

  const { data: competitions, errors } =
    await cookiesClient.models.CompetitionSeason.list({
      filter: {
        season: {
          contains: `${year}`,
        },
      },
      authMode: auth ? "userPool" : "iam",
      selectionSet: ["id", "logo", "name", "season", "seasonStartMonth"],
    });

  const currentSeasons = competitions?.filter((season) => {
    const startMonth = months.indexOf(season.seasonStartMonth);
    if (typeof startMonth !== 'number') return false;
  
    const expectedLabel = getExpectedSeasonLabel(startMonth, date);
    return season.season === expectedLabel;
  });

  return (
    <CompetitionsLayout pageTitle="Competitions">
      <>
      {
        errors && (
        <Text color="white" letterCase={"lower"} size="base" weight="regular">
          {errors[0].message}
        </Text>)
      }
       {currentSeasons && <CompetitionList competitions={currentSeasons} />}
      </>
    </CompetitionsLayout>
  );
}

export default Competitions;
