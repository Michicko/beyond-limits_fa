import Card from "@/components/main/Card/Card";
import MatchLayout from "@/components/main/Layouts/MatchLayout/MatchLayout";
import React, { Suspense } from "react";
import styles from "../../Match.module.css";
import clsx from "clsx";
import CardHeader from "@/components/main/Card/CardHeader";
import Heading from "@/components/main/Typography/Heading";
import Text from "@/components/main/Typography/Text";
import CardBody from "@/components/main/Card/CardBody";
import TeamForm from "@/components/main/MatchCard/TeamForm";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import TextEditor from "@/components/TextEditor/TextEditor";

async function Review({ params }: { params: { matchId: string } }) {
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
        ],
      }
    );

  const match = matchData && matchData;
  const keyPlayer =
    (match &&
      match.keyPlayerId &&
      (
        await cookiesClient.models.Player.get(
          {
            id: match.keyPlayerId,
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
          No match available.
        </Text>
      </MatchLayout>
    );

  return (
    <MatchLayout match={match} currentLink={`/matches/${match.id}/preview`}>
      <div className={clsx(styles.preview)}>
        <Card theme={"trans"}>
          <>
            <CardHeader theme={"dark"} border={true} as="div">
              <div className={clsx(styles.preview__heading)}>
                <Heading
                  level={3}
                  letterCase="upper"
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
                  content={JSON.parse(match.review as string)}
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
                  letterCase="upper"
                  color="secondary"
                  type="section"
                >
                  Team Form
                </Heading>
              </div>
            </CardHeader>
            <CardBody as="div" theme={"light"}>
              <div className={clsx(styles.preview__body, styles["py-b"])}>
                <ul className={clsx(styles["team-form__list"])}>
                  <li
                    className={clsx(
                      styles["preview-item"],
                      styles["item-name"]
                    )}
                  >
                    <Text
                      color="white"
                      size="base"
                      weight="semibold"
                      letterCase="upper"
                    >
                      {match.homeTeam?.shortName}
                    </Text>
                    <Text
                      color="white"
                      size="base"
                      weight="semibold"
                      letterCase="capitalize"
                    >
                      {match.homeTeam?.longName}
                    </Text>
                    {/* <div className={clsx(styles["team-form"])}>
                      {match.home.form.split(",").map((el, i) => {
                        return <TeamForm form={el} key={match.id + i} />;
                      })}
                    </div> */}
                  </li>

                  <li
                    className={clsx(
                      styles["preview-item"],
                      styles["item-name"]
                    )}
                  >
                    <Text
                      color="white"
                      size="base"
                      weight="regular"
                      letterCase="upper"
                    >
                      {match.awayTeam?.shortName}
                    </Text>
                    <Text
                      color="white"
                      size="base"
                      weight="regular"
                      letterCase="capitalize"
                    >
                      {match.awayTeam?.longName}
                    </Text>
                    {/* <div className={clsx(styles["team-form"])}>
                      {match.away.form.split(",").map((el, i) => {
                        return <TeamForm form={el} key={match.id + (i + 2)} />;
                      })}
                    </div> */}
                  </li>
                </ul>
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
                  letterCase="upper"
                  color="secondary"
                  type="section"
                >
                  key player
                </Heading>
              </div>
            </CardHeader>
            <CardBody as="div" theme={"light"}>
              <div className={clsx(styles.preview__body, styles.p)}>
                <Text
                  color="secondary"
                  size="sm"
                  letterCase={"upper"}
                  weight="semibold"
                  mb={"sm"}
                >
                  {keyPlayer?.firstname} {keyPlayer?.lastname}
                </Text>
                <Text color="white" size="base" weight="regular">
                  {match.aboutKeyPlayer}
                </Text>
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
                  letterCase="upper"
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
                  {match.competitionSeason && (
                    <li className={clsx(styles["preview-item"], styles.col)}>
                      <Text
                        color="secondary"
                        size="sm"
                        letterCase={"upper"}
                        weight="semibold"
                      >
                        Competition
                      </Text>
                      <Text
                        color="white"
                        size="base"
                        letterCase={"upper"}
                        weight="semibold"
                      >
                        {match.competitionSeason.name}
                      </Text>
                    </li>
                  )}
                  <li className={clsx(styles["preview-item"], styles.col)}>
                    <Text
                      color="secondary"
                      size="sm"
                      letterCase={"upper"}
                      weight="semibold"
                    >
                      Location
                    </Text>
                    <Text
                      color="white"
                      size="base"
                      letterCase={"upper"}
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
    </MatchLayout>
  );
}

export default Review;
