import React, { Suspense } from "react";
import styles from "../Layout.module.css";
import clsx from "clsx";
import { IMatch } from "@/lib/definitions";
import Tab from "../../Tab/Tab";
import LinkTab from "../../Tab/LinkTab";
import Logo from "../../MatchCard/Logo";
import Heading from "../../Typography/Heading";
import MatchScoreBoard from "../../MatchCard/MatchScoreBoard";
import MatchDate from "../../MatchCard/MatchDate";
import MatchLocation from "../../MatchCard/MatchLocation";
import Flex from "../../Container/Flex";
import Text from "../../Typography/Text";

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
  match: IMatch;
  children: React.ReactNode;
  currentLink: string;
}) {
  return (
    <div className={clsx(styles["match-layout"])}>
      <div className={clsx(styles["match-layout__header-box"])}>
        <div className={clsx(styles["match-layout__header"])}>
          {match.home.team && (
            <Logo
              logo={match.home.team.logo}
              name={match.home.team.longName}
              size="xxl"
            />
          )}
          <div className={clsx(styles["match-header__details"])}>
            <MatchDate date={match.date} size="lg" />
            <MatchScoreBoard
              status={match.status}
              time={match.time}
              home_score={match.home.goals}
              away_score={match.away.goals}
              size="iv"
            />
            <MatchLocation hightlight={true} location={match.venue} size="sm" />
          </div>
          {match.away.team && (
            <Logo
              logo={match.away.team.logo}
              name={match.away.team.longName}
              size="xxl"
            />
          )}
        </div>
        <Heading
          level={1}
          letterCase="upper"
          center={true}
          type="section"
        >{`${match.home.team?.longName} vs ${match.away.team?.longName}`}</Heading>
        <Flex align="center" justify="center" gap="xs">
          {match.competition && (
            <>
              <Logo
                logo={match.competition.logo}
                name={match.competition.long_name}
                size="lg"
              />
              <Text size="md" weight="bold" letterCase="upper" color="white">
                {match.competition.short_name}
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
