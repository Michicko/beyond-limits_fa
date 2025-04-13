import { IDBStandings, IDTeam } from "@/lib/definitions";
import { Button, HStack, Image, Input, Table, Text } from "@chakra-ui/react";
import React from "react";

function LeagueStandingRow({
  team,
  standing,
}: {
  team: IDTeam;
  standing: IDBStandings;
}) {
  const inputStyles = {
    textAlign: "center",
    minW: "60px",
    mozAppearance: "textfield",
    "&::-webkit-outer-spin-button": {
      mg: 0,
      webkitAppearance: "none",
    },
    "&::-webkit-inner-spin-button": {
      mg: 0,
      webkitAppearance: "none",
    },
  };

  const tC = {
    h: "50px",
    textAlign: "center",
    px: "5px",
    verticalAlign: "middle",
  };

  return (
    <Table.Row key={team.id} borderBottom={"1px solid"} borderColor={"neutral"}>
      <Table.Cell columnCount={4} verticalAlign={"middle"}>
        <HStack alignItems={"center"} gap={"2"}>
          <Image
            src={team.logo}
            boxSize="30px"
            borderRadius="full"
            fit="cover"
            alt={team.longName}
            flexShrink={0}
          />
          <Text textTransform={"uppercase"}>{team.shortName}</Text>
        </HStack>
      </Table.Cell>
      <Table.Cell css={tC}>
        <Input
          css={inputStyles}
          defaultValue={standing.position}
          type="number"
        />
      </Table.Cell>
      <Table.Cell css={tC}>
        <Input css={inputStyles} defaultValue={standing.pts} type="number" />
      </Table.Cell>
      <Table.Cell css={tC}>
        <Input css={inputStyles} defaultValue={standing.p} type="number" />
      </Table.Cell>
      <Table.Cell css={tC}>
        <Input css={inputStyles} defaultValue={standing.w} type="number" />
      </Table.Cell>
      <Table.Cell css={tC}>
        <Input css={inputStyles} defaultValue={standing.d} type="number" />
      </Table.Cell>
      <Table.Cell css={tC}>
        <Input css={inputStyles} defaultValue={standing.l} type="number" />
      </Table.Cell>
      <Table.Cell css={tC}>
        <Input css={inputStyles} defaultValue={standing.g} type="string" />
      </Table.Cell>
      <Table.Cell css={tC}>
        <Input css={inputStyles} defaultValue={standing.gd} type="number" />
      </Table.Cell>
      <Table.Cell css={tC}>
        <Button variant={"solid"} colorPalette={"green"} px={"10px"}>
          Update
        </Button>
      </Table.Cell>
    </Table.Row>
  );
}

export default LeagueStandingRow;
