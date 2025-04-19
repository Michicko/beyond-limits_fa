import { getCurrentNnlStanding } from "@/app/_actions/actions";
import CompetitionsLayout from "@/components/main/Layouts/CompetitionsLayout/CompetitionsLayout";
import StandingComp from "@/components/main/Standing/Standing";
import React from "react";

async function Standing() {
  const nnlStanding = await getCurrentNnlStanding("guest");

  return (
    <CompetitionsLayout pageTitle="Nigerian National League">
      <StandingComp
        standings={nnlStanding}
        showFull={true}
        showLongName={true}
      />
    </CompetitionsLayout>
  );
}

export default Standing;
