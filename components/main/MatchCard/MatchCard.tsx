import React from "react";
import styles from "./MatchCard.module.css";
import clsx from "clsx";
import Card from "../Card/Card";
import { Nullable } from "@/lib/definitions";
import CardHeader from "../Card/CardHeader";
import Text from "../Typography/Text";
import moment from "moment";
import Logo from "./Logo";
import CardBody from "../Card/CardBody";
import Details from "./Details";
import MatchCardTeam from "./MatchCardTeam";
import Link from "next/link";
import { getFirstLetter } from "@/lib/helpers";

interface ICompetitionSeason {
  id: string;
  logo: string;
  name: string;
  // season: string;
}

interface IMatch {
  id?: string;
  competitionSeasonId?: Nullable<string>;
  competitionSeason?: ICompetitionSeason;
  date: string;
  time: string;
  venue: string;
  status: "UPCOMING" | "COMPLETED" | "CANCELED" | "ABANDONED" | null;
  result?: "WIN" | "DRAW" | "LOSE" | null;
  homeTeam: {
    id: string;
    logo: string;
    shortName: string;
    longName: string;
    goals: Nullable<string>;
  } | null;
  awayTeam: {
    id: string;
    logo: string;
    shortName: string;
    longName: string;
    goals: Nullable<string>;
  } | null;
  scorers: any;
}

function MatchCard({
  match,
  theme,
  iconSize,
  showName,
}: {
  match: IMatch;
  theme?: "dark" | "light" | "trans";
  iconSize: "sm" | "md" | "lg" | "xl" | "xxl";
  showName?: boolean;
}) {
  return (
    <Card theme={theme || "trans"}>
      <>
        <CardHeader theme={theme ? theme : "light"} border={true} as="div">
          <div className={clsx(styles["matchcard-header"])}>
            {match.competitionSeason && (
              <div className={clsx(styles["matchcard-comp"])}>
                <Logo
                  logo={match.competitionSeason.logo}
                  name={getFirstLetter(match.competitionSeason.name)}
                  size="md"
                />
                <Text
                  color="white"
                  letterCase={"upper"}
                  size="sm"
                  weight="semibold"
                >
                  {getFirstLetter(match.competitionSeason.name)}
                </Text>
              </div>
            )}
            <Text color="white" letterCase={"upper"} size="sm" weight="regular">
              {moment(match.date).format("L")}
            </Text>
          </div>
        </CardHeader>
        <CardBody as="div" theme={theme || "light"} fixedBodyHeight={false}>
          <>
            {match.homeTeam && match.awayTeam && match.competitionSeason && (
              <div className={clsx(styles["matchcard-body"])}>
                <div className={clsx(styles["matchcard-status"])}>
                  <Text
                    color="secondary"
                    letterCase="upper"
                    size="xs"
                    weight="semibold"
                    center={true}
                  >
                    {match.status}
                  </Text>
                </div>
                <div className={clsx(styles["matchcard-info"])}>
                  <p className={clsx(styles.time)}>{match.time}</p>
                  <span>|</span>
                  <p className={clsx(styles.venue)}>{match.venue}</p>
                </div>
                <Link
                  href={
                    match.status === "COMPLETED"
                      ? `/matches/${match.id}/report`
                      : match.status === "UPCOMING"
                      ? `/matches/${match.id}/preview`
                      : "#"
                  }
                  className={clsx(
                    styles["matchcard-teams"],
                    styles[match.status ? match.status.toLowerCase() : ""],
                    showName && styles["full"]
                  )}
                >
                  <MatchCardTeam
                    long_name={match.homeTeam.longName}
                    short_name={match.homeTeam.shortName}
                    iconSize={iconSize}
                    logo={match.homeTeam.logo}
                    showName={showName}
                    team={"home"}
                  />
                  {match.status && (
                    <Details
                      home_score={match.homeTeam.goals}
                      away_score={match.awayTeam.goals}
                      status={match.status}
                    />
                  )}
                  <MatchCardTeam
                    long_name={match.awayTeam.longName}
                    short_name={match.awayTeam.shortName}
                    iconSize={iconSize}
                    logo={match.awayTeam.logo}
                    showName={showName}
                    team={"away"}
                  />
                </Link>
              </div>
            )}
          </>
        </CardBody>
      </>
    </Card>
  );
}

export default MatchCard;
