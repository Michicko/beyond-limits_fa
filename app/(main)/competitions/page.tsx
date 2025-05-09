import CompetitionsLayout from "@/components/main/Layouts/CompetitionsLayout/CompetitionsLayout";
import React from "react";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import CompetitionList from "@/components/main/Competition/CompetitionList";
import Text from "@/components/main/Typography/Text";

async function Competitions() {
  const date = new Date();
  const year = date.getUTCFullYear();

  const { data: competitions, errors } =
    await cookiesClient.models.CompetitionSeason.list({
      filter: {
        season: {
          contains: `${year}`,
        },
      },
      authMode: (await isAuthenticated()) ? "userPool" : "iam",
      selectionSet: ["id", "logo", "name"],
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
       {competitions && <CompetitionList competitions={competitions} />}
      </>
    </CompetitionsLayout>
  );
}

export default Competitions;
