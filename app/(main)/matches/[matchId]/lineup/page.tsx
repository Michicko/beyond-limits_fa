import React from "react";
import styles from "../../Match.module.css";
import clsx from "clsx";
import MatchLayout from "@/components/main/Layouts/MatchLayout/MatchLayout";
import Card from "@/components/main/Card/Card";
import CardHeader from "@/components/main/Card/CardHeader";
import Heading from "@/components/main/Typography/Heading";
import CardBody from "@/components/main/Card/CardBody";
import Text from "@/components/main/Typography/Text";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import { groupPlayersByPositions } from "@/lib/helpers";
import { IMatch } from "@/lib/definitions";

async function Lineup({ params }: { params: { matchId: string } }) {
  const authMode = (await isAuthenticated()) ? "userPool" : "iam";

  const { data: matchData, errors: matchErrors } =
    await cookiesClient.models.Match.get(
      { id: params.matchId },
      {
        authMode,
        selectionSet: [
          "id",
          "homeTeam.*",
          "awayTeam.*",
          "lineup",
          "substitutes",
          "coach.*",
          "competitionSeason.*",
          "date",
          "time",
          "venue",
          "status",
          "keyPlayerId",
          "aboutKeyPlayer",
          "mvpId",
          "aboutMvp",
          "scorers",
          "review",
          "report",
          "createdAt",
        ],
      }
    );

  const { data: playersData, errors: playerErrors } =
    await cookiesClient.models.Player.list({
      authMode,
      selectionSet: [
        "id",
        "squadNo",
        "firstname",
        "lastname",
        "playerPosition.id",
        "playerPosition.longName",
        "playerPosition.shortName",
      ],
    });

  const match = matchData ?? ([] as unknown as IMatch);
  const players = playersData ?? [];

  if (!match)
    return (
      <MatchLayout>
        <div className={clsx(styles["error-box"])}>
          <Heading level={2} type="secondary" letterCase="capitalize" mb={"sm"}>
            No Match
          </Heading>
          <Text
            color="white"
            size="base"
            weight="regular"
            letterCase="lower"
            mb={"sm"}
          >
            {matchErrors ? matchErrors[0].message : "Something went wrong!"}
          </Text>
        </div>
      </MatchLayout>
    );

  const lineup =
    match.lineup &&
    match.lineup
      .map((el) => players.find((player) => player.id === el))
      .filter((el) => el !== undefined);
  const subs =
    match.substitutes &&
    match.substitutes
      .map((el) => players.find((player) => player.id === el))
      .filter((el) => el !== undefined);

  const starters = lineup && groupPlayersByPositions(lineup);
  const substitutes = subs && groupPlayersByPositions(subs);

  return (
    <MatchLayout match={match} currentLink={`/matches/${match.id}/lineup`}>
      {matchErrors ? (
        <div className={clsx(styles["error-box"])}>
          <Text color="white" letterCase={"lower"} size="base" weight="regular">
            {matchErrors[0].message}
          </Text>
        </div>
      ) : (
        <div className={clsx(styles.lineup)}>
          <Card theme={"trans"}>
            <>
              <CardHeader theme={"dark"} border={true} as="div">
                <div className={clsx(styles.preview__heading)}>
                  <Heading
                    level={3}
                    letterCase="capitalize"
                    color="secondary"
                    type="section"
                  >
                    Composition
                  </Heading>
                </div>
              </CardHeader>
              <CardBody as="div" theme={"light"}>
                <div className={clsx(styles.preview__body, styles.grid)}>
                  <ul>
                    {starters &&
                      starters.map((lineup_obj, i) => {
                        if (!lineup_obj) return;
                        return (
                          <li
                            className={clsx(styles["preview-item"], styles.col)}
                            key={lineup_obj.position + "-" + i}
                          >
                            <Text
                              color="secondary"
                              size="sm"
                              weight="bold"
                              letterCase="capitalize"
                            >
                              {`${lineup_obj.position}s`.toLowerCase()}
                            </Text>

                            {lineup_obj.players.map((el, i) => {
                              return (
                                <Text
                                  color="white"
                                  size="base"
                                  weight="regular"
                                  letterCase="capitalize"
                                  key={el.squadNo}
                                >
                                  {`${el.squadNo}. ${el.firstname} ${el.lastname}`.toLowerCase()}
                                </Text>
                              );
                            })}
                          </li>
                        );
                      })}
                  </ul>
                  <ul>
                    <li className={clsx(styles["preview-item"], styles.col)}>
                      <Text
                        color="secondary"
                        size="sm"
                        weight="semibold"
                        letterCase="capitalize"
                      >
                        coach
                      </Text>
                      <Text
                        color="white"
                        size="base"
                        weight="regular"
                        letterCase="capitalize"
                      >
                        {match.coach && match.coach.name.toLowerCase()}
                      </Text>
                    </li>
                    <li className={clsx(styles["preview-item"], styles.col)}>
                      <Text
                        color="secondary"
                        size="sm"
                        weight="semibold"
                        letterCase="capitalize"
                      >
                        Substitutes
                      </Text>
                      {substitutes &&
                        substitutes.map((sub, i) => {
                          if (!sub) return;
                          return (
                            <React.Fragment key={sub.position + "-" + i + 2}>
                              {sub.players.map((el, i) => {
                                return (
                                  <Text
                                    color="white"
                                    size="base"
                                    weight="regular"
                                    letterCase="capitalize"
                                    key={el.squadNo + "-" + i}
                                  >
                                    {`${el.squadNo}. ${el.firstname} ${el.lastname}`}
                                  </Text>
                                );
                              })}
                            </React.Fragment>
                          );
                        })}
                    </li>
                  </ul>
                </div>
              </CardBody>
            </>
          </Card>
        </div>
      )}
    </MatchLayout>
  );
}

export default Lineup;
