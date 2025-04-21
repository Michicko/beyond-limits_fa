import { Table, Card, Heading, HStack } from "@chakra-ui/react";
import React from "react";
import MatchIcon from "../Card/MatchIcon";
import { Nullable } from "@/lib/definitions";
import { getFirstLetter } from "@/lib/helpers";

interface IStandingRow {
  id: string;
  leagueId: Nullable<string>;
  teamId: Nullable<string>;
  name: string;
  logo: string;
  isBeyondLimits: boolean;
  position: number;
  p: number;
  w: number;
  d: number;
  l: number;
  g: string;
  gd: number;
  pts: number;
  createdAt: string;
  updatedAt: string;
  league?: unknown;
}

function Standing({
  standings,
  name,
}: {
  standings: IStandingRow[];
  name?: string;
}) {
  const statsHead = ["pos", "team", "p", "w", "d", "l", "g", "gd", "pts"];
  const headingStyles = {
    color: "text_lg",
    mb: "10px",
    fontWeight: "semibold",
  };

  const tdStyles = {
    color: "text_lg",
    fontWeight: "medium",
    fontSize: "sm",
    verticalAlign: "middle",
    textTransform: "uppercase",
  };

  const tableRowStyles = {
    h: "45px !important",
    minH: "45px !important",
  };

  return (
    <Card.Root border={"1px solid"} borderColor={"neutral"} p={"10px"}>
      <Card.Header pt={"10px"}>
        <Heading as={"h3"} css={headingStyles}>
          {name} Standing
        </Heading>
      </Card.Header>

      <Table.Root size="sm">
        <Table.Header css={tableRowStyles}>
          <Table.Row verticalAlign={"middle"} css={tableRowStyles}>
            {statsHead.map((el, i) => {
              return (
                <Table.ColumnHeader
                  css={tableRowStyles}
                  textTransform={"uppercase"}
                  verticalAlign={"middle"}
                  textAlign={i <= 1 ? "left" : "center"}
                  key={el}
                  fontSize={"xs"}
                  fontWeight={"semibold"}
                  color={"text_md"}
                  pl={i <= 1 ? "4px" : 0}
                  display={
                    i >= 6 && i <= 7
                      ? { base: "none", md: "table-cell" }
                      : { base: "table-cell" }
                  }
                >
                  {el}
                </Table.ColumnHeader>
              );
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {standings
            .sort((a, b) => a.position - b.position)
            .map((standing, i) => (
              <Table.Row
                key={standing.teamId}
                h={"40px"}
                borderBottom={"1px solid"}
                borderColor={
                  i === standings.length - 1 ? "transparent" : "neutral"
                }
                bg={standing.isBeyondLimits ? "neutral" : "transparent"}
              >
                <Table.Cell css={tdStyles} pl={"4px"}>
                  {standing.position}
                </Table.Cell>
                <Table.Cell
                  css={tdStyles}
                  pl={"4px"}
                  display={{ base: "table-cell", md: "none" }}
                >
                  <HStack title={standing.name}>
                    <MatchIcon size="md" src={standing.logo} radius={false} />
                    {getFirstLetter(standing.name)}
                  </HStack>
                </Table.Cell>
                <Table.Cell
                  css={tdStyles}
                  pl={"4px"}
                  display={{ base: "none", md: "table-cell" }}
                >
                  <HStack>
                    <MatchIcon size="md" src={standing.logo} radius={false} />
                    {standing.name}
                  </HStack>
                </Table.Cell>
                <Table.Cell css={tdStyles} textAlign="center">
                  {standing.p}
                </Table.Cell>
                <Table.Cell css={tdStyles} textAlign="center">
                  {standing.w}
                </Table.Cell>
                <Table.Cell css={tdStyles} textAlign="center">
                  {standing.d}
                </Table.Cell>
                <Table.Cell css={tdStyles} textAlign="center">
                  {standing.l}
                </Table.Cell>
                <Table.Cell
                  css={tdStyles}
                  textAlign="center"
                  display={{ base: "none", md: "table-cell" }}
                >
                  {standing.g}
                </Table.Cell>
                <Table.Cell
                  css={tdStyles}
                  textAlign="center"
                  display={{ base: "none", md: "table-cell" }}
                >
                  {standing.gd}
                </Table.Cell>
                <Table.Cell css={tdStyles} textAlign="center">
                  {standing.pts}
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </Card.Root>
  );
}

export default Standing;
