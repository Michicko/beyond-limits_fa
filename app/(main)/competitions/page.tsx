import CompetitionsLayout from "@/components/main/Layouts/CompetitionsLayout/CompetitionsLayout";
import React from "react";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import CompetitionList from "@/components/main/Competition/CompetitionList";
import Text from "@/components/main/Typography/Text";

export const metadata = {
  title: "Competitions",
  description:
    "Find competitions for Beyond Limits Fa. First team on the official website, Beyondlimitsfa.com.",
};

async function Competitions() {
  const auth = await isAuthenticated();

  const { data: competitions, errors } =
    await cookiesClient.models.Competition.list({
      authMode: auth ? "userPool" : "iam",
      selectionSet: ["id", "logo", "longName"],
    });

  return (
    <CompetitionsLayout pageTitle="Competitions" hideTabs={true}>
      <>
        {errors && (
          <Text color="white" letterCase={"lower"} size="base" weight="regular">
            {errors[0].message}
          </Text>
        )}
        {competitions && <CompetitionList competitions={competitions} />}
      </>
    </CompetitionsLayout>
  );
}

export default Competitions;
