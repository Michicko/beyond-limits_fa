import React from "react";
import MatchForm from "./MatchForm";
import { cookiesClient } from "@/utils/amplify-utils";
import CustomAlert from "../Alert/CustomAlert";
import { Schema } from "@/amplify/data/resource";

type IMatchI = Pick<
  Schema["Match"]["type"],
  | "id"
  | "aboutKeyPlayer"
  | "aboutMvp"
  | "awayTeam"
  | "homeTeam"
  | "coach"
  | "date"
  | "lineup"
  | "keyPlayerId"
  | "mvpId"
  | "report"
  | "review"
  | "venue"
  | "scorers"
  | "substitutes"
  | "time"
  | "status"
  | "competitionSeasonId"
>;

async function MatchFormWrapper({
  match,
  method,
}: {
  match?: IMatchI;
  method: "UPDATE" | "CREATE";
}) {
  const { data: competitions, errors } =
    await cookiesClient.models.Competition.list({
      selectionSet: ["id", "longName", "competitionSeasons.*"],
    });

  const { data: teams } = await cookiesClient.models.Team.list({
    selectionSet: ["id", "longName", "shortName", "logo"],
  });

  const { data: players } = await cookiesClient.models.Player.list({
    selectionSet: [
      "id",
      "firstname",
      "lastname",
      "homeKit",
      "squadNo",
      "status",
      "playerPosition.shortName",
      "ageGroup",
    ],
  });
  const statuses = cookiesClient.enums.MatchStatus.values();

  return errors ? (
    <CustomAlert
      status="error"
      title="Something went wrong."
      message={errors[0].message}
    />
  ) : competitions.length < 1 ? (
    <CustomAlert
      status="info"
      title="No Competition."
      message={
        "No competition available, You can't create a match without starting a competition season."
      }
    />
  ) : (
    <MatchForm
      competitions={competitions}
      teams={teams}
      players={players}
      method={method}
      match={match}
      statuses={statuses}
    />
  );
}

export default MatchFormWrapper;
