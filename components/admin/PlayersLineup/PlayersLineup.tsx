import { Box, Field, Flex, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import CheckBox from "../CheckBox/CheckBox";
import { Nullable } from "@/lib/definitions";

interface IPlayer {
  id: string;
  firstname: string;
  lastname: string;
  squadNo: Nullable<number>;
  homeKit: Nullable<string>;
  ageGroup: string | null;
  status: string | null;
  playerPosition: {
    shortName: string;
  };
}

const groupPlayersByGroup = (ageGroup: string, players: IPlayer[]) => {
  return players.filter((el) => el.ageGroup === ageGroup);
};

function PlayersLineup({
  ageGroup,
  players,
  selectedPlayers,
  onCheckedChange,
  field,
}: {
  ageGroup: string;
  players: IPlayer[];
  selectedPlayers?: Nullable<string>[] | null;
  onCheckedChange: (
    playerId: string,
    selectedPlayers: Nullable<string>[],
    field: "lineup" | "substitutes"
  ) => void;
  field: "lineup" | "substitutes";
}) {
  return (
    <Stack mb={1.5}>
      <h3>{ageGroup.replace("_", " ")}</h3>
      <Flex gap={"4"} alignItems={"center"} wrap="wrap" maxW="726px">
        {groupPlayersByGroup(ageGroup, players).map((player) => {
          return (
            <Flex
              key={player.id}
              alignItems={"center"}
              gap={"2"}
              bg={"card_bg"}
              px={"10px"}
              py={"5px"}
              maxH={"40px"}
              overflow={"hidden"}
              borderRadius={"xs"}
              justifyContent={"flex-start"}
              title={`${player.firstname} ${player.lastname}`}
            >
              {selectedPlayers && (
                <Field.Root>
                  <CheckBox
                    name={player.id}
                    checked={selectedPlayers.includes(player.id)}
                    size="xs"
                    label={player.firstname}
                    onCheckedChange={() =>
                      onCheckedChange(player.id, selectedPlayers, field)
                    }
                    showLabel={false}
                  />
                </Field.Root>
              )}
              {player.homeKit && (
                <Image src={player.homeKit} width={"25px"} height={"25px"} />
              )}
              <Text whiteSpace={"nowrap"} textTransform={"capitalize"}>
                <Box
                  as={"span"}
                  fontWeight={"semibold"}
                  textTransform={"uppercase"}
                >
                  {player.playerPosition.shortName}. {player.squadNo}
                </Box>
                . {player.firstname} {player.lastname}{" "}
                {player.status === "INACTIVE" && (
                  <Box as={"span"} color="red">
                    (inactive)
                  </Box>
                )}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Stack>
  );
}

export default PlayersLineup;
