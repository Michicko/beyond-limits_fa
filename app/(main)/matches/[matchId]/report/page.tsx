import React, { Suspense } from "react";
import styles from "../../Match.module.css";
import clsx from "clsx";
import MatchLayout from "@/components/main/Layouts/MatchLayout/MatchLayout";
import Card from "@/components/main/Card/Card";
import CardHeader from "@/components/main/Card/CardHeader";
import Heading from "@/components/main/Typography/Heading";
import CardBody from "@/components/main/Card/CardBody";
import Text from "@/components/main/Typography/Text";
import MatchScoreTime from "@/components/main/MatchCard/MatchScoreTime";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import TextEditor from "@/components/TextEditor/TextEditor";
import { IMatchScorer } from "@/lib/definitions";

async function Report({ params }: { params: { matchId: string } }) {
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
          "scorers",
          "createdAt",
        ],
      }
    );

  const match = matchData && matchData;
  const mvp =
    (match &&
      match.mvpId &&
      (
        await cookiesClient.models.Player.get(
          {
            id: match.mvpId,
          },
          {
            authMode,
          }
        )
      ).data) ||
    null;

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

  return (
    <MatchLayout match={match} currentLink={`/matches/${match.id}/report`}>
      {matchErrors ? (
        <Text color="white" letterCase={"lower"} size="base" weight="regular">
          {matchErrors[0].message}
        </Text>
      ) : (
        <div className={clsx(styles.preview)}>
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
                    Match Context
                  </Heading>
                </div>
              </CardHeader>
              <CardBody as="div" theme={"light"}>
                <Suspense fallback={null}>
                  <TextEditor
                    content={JSON.parse(match.report as string)}
                    readOnly={true}
                  />
                </Suspense>
              </CardBody>
            </>
          </Card>
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
                    Goal Scorers
                  </Heading>
                </div>
              </CardHeader>
              <CardBody as="div" theme={"light"}>
                <div className={clsx(styles.preview__body, styles["py-b"])}>
                  {match.scorers &&
                  JSON.parse(match.scorers as string).length > 0 ? (
                    <ul className={clsx(styles["team-form__list"])}>
                      {JSON.parse(match.scorers as string).map(
                        (scorer: IMatchScorer, i: number) => {
                          if (!scorer.isOpponent) {
                            return (
                              <li
                                className={clsx(styles["preview-item"])}
                                key={scorer.name + "-" + i}
                              >
                                <Text
                                  color="white"
                                  size="base"
                                  weight="regular"
                                  letterCase="capitalize"
                                >
                                  {scorer.name.toLowerCase()}
                                </Text>
                                <MatchScoreTime
                                  time={scorer.time}
                                  theme="light"
                                />
                              </li>
                            );
                          }
                          return (
                            <li
                              className={clsx(
                                styles["preview-item"],
                                styles.col
                              )}
                              key={scorer.name + "-" + i}
                            >
                              <Text
                                color="secondary"
                                size="sm"
                                weight="semibold"
                                letterCase="normal"
                              >
                                Opponent
                              </Text>
                              <div className={clsx(styles["match-score-tile"])}>
                                <Text
                                  color="white"
                                  size="sm"
                                  weight="regular"
                                  letterCase="capitalize"
                                >
                                  {scorer.name}
                                </Text>
                              </div>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  ) : (
                    <></>
                  )}
                </div>
              </CardBody>
            </>
          </Card>
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
                    Mvp
                  </Heading>
                </div>
              </CardHeader>
              <CardBody as="div" theme={"light"}>
                {match.aboutMvp ? (
                  <div className={clsx(styles.preview__body, styles.p)}>
                    <Text
                      color="secondary"
                      size="sm"
                      weight="semibold"
                      letterCase="capitalize"
                      mb={"sm"}
                    >
                      {mvp?.firstname} {mvp?.lastname}
                    </Text>
                    <Text
                      color="white"
                      size="base"
                      weight="regular"
                      letterCase="normal"
                    >
                      {match.aboutMvp}
                    </Text>
                  </div>
                ) : (
                  <></>
                )}
              </CardBody>
            </>
          </Card>
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
                    Brief
                  </Heading>
                </div>
              </CardHeader>
              <CardBody as="div" theme={"light"}>
                <div className={clsx(styles.preview__body, styles["py-b"])}>
                  <ul className={clsx(styles["preview-list"])}>
                    <li className={clsx(styles["preview-item"], styles.col)}>
                      <Text
                        color="secondary"
                        size="sm"
                        letterCase="capitalize"
                        weight="semibold"
                      >
                        Competition
                      </Text>
                      {match.competitionSeason && (
                        <Text
                          color="white"
                          size="base"
                          letterCase="capitalize"
                          weight="semibold"
                        >
                          {match.competitionSeason.name}
                        </Text>
                      )}
                    </li>
                    <li className={clsx(styles["preview-item"], styles.col)}>
                      <Text
                        color="secondary"
                        size="sm"
                        letterCase="capitalize"
                        weight="semibold"
                      >
                        Location
                      </Text>
                      <Text
                        color="white"
                        size="base"
                        letterCase={"capitalize"}
                        weight="semibold"
                      >
                        {match.venue}
                      </Text>
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

export default Report;
