"use client";
import { Nullable } from "@/lib/definitions";
import { Card, Heading, Stack, Table, HStack, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import CustomSeparator from "../CustomSeparator";
import LeagueStandingRow from "./LeagueStandingRow";

interface IStanding {
  position: number;
  p: number;
  w: number;
  d: number;
  l: number;
  g: string;
  gd: number;
  pts: number;
  teamId: Nullable<string>;
  id?: string;
}
interface ITeam {
  logo: string;
  shortName: string;
  longName: string;
  isBeyondLimits: boolean;
  stadium: Nullable<string>;
  id: string;
}

function LeagueStanding({
  serverStanding,
  teams,
}: {
  serverStanding?: IStanding[];
  teams: ITeam[];
}) {
  const cH = {
    fontWeight: "700",
    h: "50px",
    textAlign: "center",
    verticalAlign: "middle",
  };

  const [standing, setStanding] = useState(serverStanding || []);

  const generateStanding = () => {
    const standing = teams
      .sort((a, b) =>
        a.longName > b.longName ? 1 : b.longName > a.longName ? -1 : 0
      )
      .map((team, i) => {
        const row = {
          teamId: team.id,
          position: i + 1,
          pts: 0,
          p: 0,
          w: 0,
          d: 0,
          l: 0,
          g: "0:0",
          gd: 0,
        };
        return row;
      });
    setStanding(standing);
  };

  const getStandingRow = (standing: IStanding) => {
    const team = teams.find((el) => el.id === standing.teamId);
    if (!team) return;
    return <LeagueStandingRow team={team} standing={standing} />;
  };

  return (
    <Card.Root size="md" p={"5"} border={"1px solid"} borderColor={"gray.200"}>
      <Card.Body color="fg.muted">
        <HStack justifyContent={"space-between"} alignItems={"center"}>
          <Heading mb="2">Standing</Heading>
          <Button
            px={"20px"}
            variant={"solid"}
            colorPalette={"teal"}
            disabled={standing.length > 0}
            onClick={generateStanding}
          >
            Generate Standing
          </Button>
        </HStack>
        <CustomSeparator />
        <Stack>
          <Table.ScrollArea maxW="5xl">
            <Table.Root showColumnBorder={false}>
              <Table.Header>
                <Table.Row textAlign={"center"}>
                  <Table.ColumnHeader css={cH} columnCount={4}>
                    Team
                  </Table.ColumnHeader>
                  <Table.ColumnHeader css={cH}>Position</Table.ColumnHeader>
                  <Table.ColumnHeader css={cH}>Pts</Table.ColumnHeader>
                  <Table.ColumnHeader css={cH}>P</Table.ColumnHeader>
                  <Table.ColumnHeader css={cH}>W</Table.ColumnHeader>
                  <Table.ColumnHeader css={cH}>D</Table.ColumnHeader>
                  <Table.ColumnHeader css={cH}>L</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign={"center"} css={cH}>
                    G
                  </Table.ColumnHeader>
                  <Table.ColumnHeader css={cH}>GD</Table.ColumnHeader>
                  <Table.ColumnHeader></Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <>
                  {standing
                    .sort((a, b) =>
                      a.position > b.position
                        ? 1
                        : b.position > a.position
                        ? -1
                        : 0
                    )
                    .map((team) => {
                      return getStandingRow(team);
                    })}
                </>
              </Table.Body>
            </Table.Root>
          </Table.ScrollArea>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
}

export default LeagueStanding;
