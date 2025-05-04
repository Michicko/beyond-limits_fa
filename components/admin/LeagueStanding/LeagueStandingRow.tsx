import { updateStandingRow } from "@/app/_actions/actions";
import useToast from "@/hooks/useToast";
import { IDBStandings, IDTeam } from "@/lib/definitions";
import { getButtonStatus, objectToFormData } from "@/lib/helpers";
import { Button, HStack, Image, Input, Table, Text } from "@chakra-ui/react";
import React, { useState, useTransition } from "react";

function LeagueStandingRow({
  competitionSeasonId,
  team,
  standing,
  competitionStatus,
}: {
  competitionSeasonId: string;
  team: IDTeam;
  standing: IDBStandings;
  competitionStatus: "PENDING" | "COMPLETED" | null;
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

  const [stateStanding, setStateStanding] = useState({
    id: standing.id,
    competitionSeasonId,
    teamId: team.id,
    name: team.longName,
    logo: team.logo,
    isBeyondLimits: team.isBeyondLimits,
    position: standing.position,
    pts: standing.pts,
    p: standing.p,
    w: standing.w,
    d: standing.d,
    l: standing.l,
    g: standing.g,
    gd: standing.gd,
  });

  const [isPending, startTransition] = useTransition();
  const { mutationToast, errorToast } = useToast();

  const onChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setStateStanding({ ...stateStanding, [name]: value });
  };

  const updateStanding = async () => {
    const formData = objectToFormData(stateStanding);

    startTransition(async () => {
      const res = await updateStandingRow(standing.id, formData);
      if (res.status === "success" && res.data) {
        mutationToast("League Standing", `${res.data.name}`, "update");
      }
      if (res.status === "error") {
        errorToast(res.message);
      }
    });
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
          name="position"
          css={inputStyles}
          type="number"
          value={stateStanding.position}
          onChange={onChange}
        />
      </Table.Cell>
      <Table.Cell css={tC}>
        <Input
          name="pts"
          css={inputStyles}
          type="number"
          value={stateStanding.pts}
          onChange={onChange}
        />
      </Table.Cell>
      <Table.Cell css={tC}>
        <Input
          name="p"
          css={inputStyles}
          type="number"
          value={stateStanding.p}
          onChange={onChange}
        />
      </Table.Cell>
      <Table.Cell css={tC}>
        <Input
          name="w"
          css={inputStyles}
          type="number"
          value={stateStanding.w}
          onChange={onChange}
        />
      </Table.Cell>
      <Table.Cell css={tC}>
        <Input
          name="d"
          css={inputStyles}
          type="number"
          value={stateStanding.d}
          onChange={onChange}
        />
      </Table.Cell>
      <Table.Cell css={tC}>
        <Input
          name="l"
          css={inputStyles}
          type="number"
          value={stateStanding.l}
          onChange={onChange}
        />
      </Table.Cell>
      <Table.Cell css={tC}>
        <Input
          name="g"
          css={inputStyles}
          type="string"
          value={stateStanding.g}
          onChange={onChange}
        />
      </Table.Cell>
      <Table.Cell css={tC}>
        <Input
          name="gd"
          css={inputStyles}
          type="number"
          value={stateStanding.gd}
          onChange={onChange}
        />
      </Table.Cell>
      <Table.Cell css={tC}>
        <Button
          variant={"solid"}
          colorPalette={"green"}
          px={"10px"}
          onClick={async () => {
            await updateStanding();
          }}
          disabled={isPending || competitionStatus === "COMPLETED"}
        >
          {getButtonStatus(standing, "Standing", isPending)}
        </Button>
      </Table.Cell>
    </Table.Row>
  );
}

export default LeagueStandingRow;
