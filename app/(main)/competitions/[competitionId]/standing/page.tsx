import CompetitionsLayout from "@/components/main/Layouts/CompetitionsLayout/CompetitionsLayout";
import MixedCup from "@/components/main/MixedCup/MixedCup";
import Standing from "@/components/main/Standing/Standing";
import Text from "@/components/main/Typography/Text";
import React from "react";
import clsx from "clsx";
import styles from "../../Competitions.module.css";
import Knockout from "@/components/main/Knockout/Knockout";
import { cookiesClient } from "@/utils/amplify-utils";
import { fetchPlayOffs, fetchStanding } from "@/app/_actions/actions";
import { getFirstLetter } from "@/lib/helpers";

async function CompetitionStanding({
  params,
}: {
  params: { competitionId: string };
}) {
  const { data: competition, errors } =
    await cookiesClient.models.CompetitionSeason.get(
      {
        id: params.competitionId,
      },
      {
        authMode: "iam",
        selectionSet: ["id", "leagueId", "cupId", "name", "type"],
      }
    );

  let standing;
  let playoffs;

  let leagueStatus;

  if (competition && competition.type === "MIXED" && competition.leagueId) {
    const { data: league } = await cookiesClient.models.League.get(
      {
        id: competition.leagueId,
      },
      {
        authMode: "iam",
        selectionSet: ["status"],
      }
    );
    leagueStatus = league?.status;
  }

  if (competition && competition.cupId) {
    playoffs = await fetchPlayOffs(competition.cupId, params.competitionId);
  }

  if (competition && competition.leagueId) {
    standing = await fetchStanding(competition.leagueId);
  }

  return (
    <CompetitionsLayout
      pageTitle={competition?.name}
      competitionId={params.competitionId}
    >
      <div className={clsx(styles["competition-box"])}>
        {competition &&
          competition.type === "MIXED" &&
          playoffs &&
          standing && (
            <>
              <MixedCup
                league_status={leagueStatus || ""}
                playoffs={playoffs}
                league_standing={standing}
              />
            </>
          )}
        {competition && competition.type === "CUP" && playoffs && (
          <Knockout playOffs={playoffs} />
        )}
        {competition && competition.type === "LEAGUE" && (
          <>
            {standing && (
              <Standing
                name={getFirstLetter(competition.name)}
                standings={standing}
                showFull={true}
                showLongName={true}
              />
            )}
          </>
        )}
      </div>
    </CompetitionsLayout>
  );
}

export default CompetitionStanding;
