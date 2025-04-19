import React, { Suspense } from "react";
import styles from "./Player.module.css";
import clsx from "clsx";
import Heading from "@/components/main/Typography/Heading";
import PlayerList from "@/components/main/Player/PlayerList";
import Header from "@/components/main/Header/Header";
import LayoutHeader from "@/components/main/Layouts/CompetitionsLayout/LayoutHeader";
import LayoutMain from "@/components/main/Layouts/CompetitionsLayout/LayoutMain";
import Tab from "@/components/main/Tab/Tab";
import LinkTab from "@/components/main/Tab/LinkTab";
import { cookiesClient } from "@/utils/amplify-utils";

const links = [
  { name: "Under-19", href: "/players/under_19" },
  { name: "Under-17", href: "/players/under_17" },
];

async function Players({ params }: { params: { playersSlug: string } }) {
  const { data: positions, errors } =
    await cookiesClient.models.PlayerPosition.list({
      authMode: "iam",
      selectionSet: [
        "id",
        "longName",
        "players.*",
        "players.playerPosition.id",
        "players.playerPosition.longName",
        "players.playerPosition.shortName",
      ],
    });

  const rows = () => {
    return positions.map((row) => {
      const filteredPlayers = row.players.filter(
        (player) => player.ageGroup === params.playersSlug.toUpperCase()
      );
      return (
        <div key={row.longName}>
          <Heading
            letterCase="capitalize"
            level={2}
            mb="sm"
            type="section"
          >{`${row.longName}s`}</Heading>
          <PlayerList players={filteredPlayers} />
        </div>
      );
    });
  };

  return (
    <>
      <Header
        bg={"/images/under-19-bg.png"}
        alt="2024 / 2025 ongoing campaign"
        overlay={true}
      >
        <LayoutHeader>
          <>
            <Heading
              level={1}
              letterCase="upper"
              type="primary"
              color="white"
            >{`Beyond Limits ${params.playersSlug}`}</Heading>
          </>
        </LayoutHeader>
      </Header>
      <LayoutMain>
        <>
          <div className={clsx(styles["tab-container"])}>
            <Suspense fallback={null}>
              <Tab theme="theme-2" bg="trans">
                <>
                  {links.map((link, i) => {
                    return (
                      <LinkTab
                        link={link}
                        theme="theme-2"
                        key={i + (i + 2) + 3}
                      />
                    );
                  })}
                </>
              </Tab>
            </Suspense>
          </div>
          <div className={clsx(styles["team-container"])}>{rows()}</div>
        </>
      </LayoutMain>
    </>
  );
}

export default Players;
