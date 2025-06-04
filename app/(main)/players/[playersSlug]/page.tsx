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
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import Text from "@/components/main/Typography/Text";

const links = [
  { name: "Under-19", href: "/players/under_19" },
  { name: "Under-17", href: "/players/under_17" },
];

export const metadata = {
  title: "Beyond Limits Fa. Players Profiles",
  description:
    "Read profiles and stats for the Beyond Limits Fa First Team and Reserves.",
};

async function Players({ params }: { params: { playersSlug: string } }) {
  const { data: positions, errors } =
    await cookiesClient.models.PlayerPosition.list({
      authMode: (await isAuthenticated()) ? "userPool" : "iam",
      selectionSet: [
        "id",
        "longName",
        "players.*",
        "players.playerPosition.id",
        "players.playerPosition.longName",
        "players.playerPosition.shortName",
      ],
    });

  const order = [
    "goal keeper",
    "defender",
    "central back",
    "right back",
    "left back",
    "midfielder",
    "defensive midfielder",
    "central midfielder",
    "attacking midfielder",
    "attacker",
    "wing forward",
    "winger",
    "forward",
    "striker",
  ];

  const rows = () => {
    const sortedPositions = positions.sort((a, b) => {
      return (
        order.indexOf(a.longName.toLowerCase()) -
        order.indexOf(b.longName.toLowerCase())
      );
    });

    return sortedPositions.map((row) => {
      const filteredPlayers = row.players.filter(
        (player) => player.ageGroup === params.playersSlug.toUpperCase()
      );

      return filteredPlayers.length < 1 ? (
        <></>
      ) : (
        <div key={row.longName}>
          <Heading
            letterCase="capitalize"
            level={2}
            mb="md"
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
              center={true}
            >{`${params.playersSlug.replace(/_/g, " ")} Players`}</Heading>
          </>
        </LayoutHeader>
      </Header>
      <LayoutMain>
        <>
          {errors && (
            <Text
              color="white"
              letterCase={"lower"}
              size="base"
              weight="regular"
            >
              {`Something went wrong, ${errors[0].message}`}
            </Text>
          )}
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
