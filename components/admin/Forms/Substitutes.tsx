import CheckBox from "@/components/admin/CheckBox/CheckBox";
import { IMatch, Nullable } from "@/lib/definitions";
import { Box, Field, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import FormLabel from "./FormLabel";
import { Schema } from "@/amplify/data/resource";

interface IPlayer {
  id: string;
  firstname: string;
  lastname: string;
  squadNo: Nullable<number>;
  homeKit: Nullable<string>;
  playerPosition: {
    shortName: string
  }
}

type IMatchI = Pick<
  Schema["Match"]["type"],
  | "id"
  | "aboutKeyPlayer"
  | "aboutMvp"
  | "awayTeam"
  | "homeTeam"
  | "coach"
  | "date"
  | "lineup"
  | "keyPlayerId"
  | "mvpId"
  | "report"
  | "review"
  | "venue"
  | "scorers"
  | "substitutes"
  | "time"
  | "status"
  | "competitionSeasonId"
>;
function Substitutes({
  matchForm,
  setMatchForm,
  players,
}: {
  matchForm: IMatchI;
  setMatchForm: React.Dispatch<React.SetStateAction<IMatchI>>;
  players: IPlayer[];
}) {
  return (
    <Box>
      <FormLabel as="Text">Substitutes</FormLabel>
      <Flex flexWrap={"wrap"} gap={"4"} alignItems={"center"}>
        {players.map((player) => {
          return (
            <Flex
              key={player.id}
              alignItems={"center"}
              gap={"2"}
              bg={"card_bg"}
              p={"2"}
              borderRadius={"xs"}
              maxH={'40px'}
            >
              {matchForm.substitutes && (
                <Field.Root>
                  <CheckBox
                    name={player.id}
                    checked={matchForm.substitutes.includes(player.id)}
                    size="xs"
                    label={player.firstname}
                    onCheckedChange={() => {
                      const subs = matchForm.substitutes
                        ? [...matchForm.substitutes]
                        : [];
                      let substitutes = subs;
                      const currPlayer = substitutes.find(
                        (el) => el === player.id
                      );
                      if (currPlayer) {
                        substitutes = substitutes.filter(
                          (el) => el !== currPlayer
                        );
                      } else {
                        substitutes = [...substitutes, player.id];
                      }
                      setMatchForm({
                        ...matchForm,
                        substitutes,
                      });
                    }}
                    showLabel={false}
                  />
                </Field.Root>
              )}
              {player.homeKit && <Image src={player.homeKit} width={"25px"} />}
              <Text whiteSpace={"nowrap"}>
                {player.playerPosition.shortName} {player.squadNo}. {player.firstname} {player.lastname}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
}

export default Substitutes;
