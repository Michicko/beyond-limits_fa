import { Table, Card, Heading, HStack } from "@chakra-ui/react";
import React from "react";
import MatchIcon from "../Card/MatchIcon";
import { IStandingRow } from "@/lib/definitions";
import { teams } from "@/lib/placeholder-data";

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

  const populatedStanding = standings
    .map((row) => {
      const team = teams.find((team) => team.id === row.team_id);
      if (!team) return;
      return {
        ...row,
        team,
      };
    })
    .filter((el) => el !== undefined);

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
          {populatedStanding
            .sort((a, b) => a.position - b.position)
            .map((standing, i) => (
              <Table.Row
                key={standing.team.id}
                h={"40px"}
                borderBottom={"1px solid"}
                borderColor={
                  i === populatedStanding.length - 1 ? "transparent" : "neutral"
                }
                bg={
                  standing.team && standing.team.isBeyondLimits
                    ? "neutral"
                    : "transparent"
                }
              >
                <Table.Cell css={tdStyles} pl={"4px"}>
                  {standing.position}
                </Table.Cell>
                <Table.Cell
                  css={tdStyles}
                  pl={"4px"}
                  display={{ base: "table-cell", md: "none" }}
                >
                  <HStack>
                    {standing.team && (
                      <MatchIcon
                        size="md"
                        src={standing.team.logo}
                        radius={false}
                      />
                    )}
                    {standing.team && standing.team.shortName}
                  </HStack>
                </Table.Cell>
                <Table.Cell
                  css={tdStyles}
                  pl={"4px"}
                  display={{ base: "none", md: "table-cell" }}
                >
                  <HStack>
                    {standing.team && (
                      <MatchIcon
                        size="md"
                        src={standing.team.logo}
                        radius={false}
                      />
                    )}
                    {standing.team && standing.team.longName}
                  </HStack>
                </Table.Cell>
                <Table.Cell css={tdStyles} textAlign="center">
                  {standing.stats.p}
                </Table.Cell>
                <Table.Cell css={tdStyles} textAlign="center">
                  {standing.stats.w}
                </Table.Cell>
                <Table.Cell css={tdStyles} textAlign="center">
                  {standing.stats.d}
                </Table.Cell>
                <Table.Cell css={tdStyles} textAlign="center">
                  {standing.stats.l}
                </Table.Cell>
                <Table.Cell
                  css={tdStyles}
                  textAlign="center"
                  display={{ base: "none", md: "table-cell" }}
                >
                  {standing.stats.g}
                </Table.Cell>
                <Table.Cell
                  css={tdStyles}
                  textAlign="center"
                  display={{ base: "none", md: "table-cell" }}
                >
                  {standing.stats.gd}
                </Table.Cell>
                <Table.Cell css={tdStyles} textAlign="center">
                  {standing.stats.pts}
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </Card.Root>
  );
}

export default Standing;
