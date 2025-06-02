import React, { Suspense } from "react";
import styles from "../Layout.module.css";
import clsx from "clsx";
import { IMatch } from "@/lib/definitions";
import Tab from "../../Tab/Tab";
import LinkTab from "../../Tab/LinkTab";
import Logo from "../../MatchCard/Logo";
import Heading from "../../Typography/Heading";
import MatchDate from "../../MatchCard/MatchDate";
import MatchLocation from "../../MatchCard/MatchLocation";
import Flex from "../../Container/Flex";
import Text from "../../Typography/Text";
import { getFirstLetter } from "@/lib/helpers";
import MatchScores from "../../MatchCard/MatchScores";

const generateLink = (matchId: string) => {
  const links = [
    {
      name: "preview",
      href: `/matches/${matchId}/preview`,
    },
    {
      name: "report",
      href: `/matches/${matchId}/report`,
    },
    {
      name: "lineup",
      href: `/matches/${matchId}/lineup`,
    },
    {
      name: "stats",
      href: `/matches/${matchId}/stats`,
    },
  ];

  return links;
};

function MatchLayout({
  match,
  children,
  currentLink,
}: {
  match?: IMatch;
  children: React.ReactNode;
  currentLink?: string;
}) {
  return !match ? (
    <div className={clsx(styles["match-layout"])}>{children}</div>
  ) : (
    <div className={clsx(styles["match-layout"])}>
      <div className={clsx(styles["match-layout__header-box"])}>
        <div className={clsx(styles["match-layout__header"])}>
          {match.homeTeam && (
            <Logo
              logo={match.homeTeam.logo}
              name={match.homeTeam.longName}
              size="xxl"
            />
          )}
          <div className={clsx(styles["match-header__details"])}>
            <MatchDate date={match.date} time={match.time} size="md" />
            {match.homeTeam && match.awayTeam && (
              <MatchScores
                status={match.status ? match.status : ""}
                time={match.time}
                home_score={match.homeTeam.goals ? match.homeTeam.goals : ""}
                away_score={match.awayTeam.goals ? match.awayTeam.goals : ""}
                size="iv"
              />
            )}
            <MatchLocation hightlight={true} location={match.venue} size="sm" />
          </div>
          {match.awayTeam && (
            <Logo
              logo={match.awayTeam.logo}
              name={match.awayTeam.longName}
              size="xxl"
            />
          )}
        </div>
        <Heading
          level={2}
          letterCase="capitalize"
          center={true}
          type="section"
        >{`${match.homeTeam?.longName.toLowerCase()} vs ${match.awayTeam?.longName.toLowerCase()}`}</Heading>
        <Flex align="center" justify="center" gap="xs">
          {match.competitionSeason && (
            <>
              <Logo
                logo={match.competitionSeason.logo}
                name={match.competitionSeason.name}
                size="lg"
              />
              <Text size="md" weight="bold" letterCase="upper" color="white">
                {getFirstLetter(match.competitionSeason.name)}
              </Text>
            </>
          )}
        </Flex>
      </div>
      <Suspense key={match.id} fallback={null}>
        <Tab bg="white" theme="theme-2">
          <>
            {match.id &&
              generateLink(match.id).map((link) => {
                return (
                  <LinkTab
                    link={link}
                    theme="theme-2"
                    key={link.name}
                    currentLink={currentLink}
                  />
                );
              })}
          </>
        </Tab>
      </Suspense>

      <div className={clsx(styles["match-layout__main"])}>{children}</div>
    </div>
  );
}

export default MatchLayout;
