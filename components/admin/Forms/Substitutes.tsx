import CheckBox from "@/components/CheckBox/CheckBox";
import { IMatch } from "@/lib/definitions";
import { players } from "@/lib/placeholder-data";
import { Box, Field, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import FormLabel from "./FormLabel";

function Substitutes({
  matchForm,
  setMatchForm,
}: {
  matchForm: IMatch;
  setMatchForm: React.Dispatch<React.SetStateAction<IMatch>>;
}) {
  const remainingPlayers = players.filter(
    (el) => !matchForm.lineup.includes(el.id)
  );

  return (
    <Box>
      <FormLabel as="Text">Substitutes</FormLabel>
      <Flex flexWrap={"wrap"} gap={"4"} alignItems={"center"}>
        {remainingPlayers.map((player) => {
          return (
            <Flex
              key={player.id}
              alignItems={"center"}
              gap={"2"}
              bg={"card_bg"}
              p={"2"}
              borderRadius={"xs"}
            >
              <Field.Root>
                <CheckBox
                  name={player.id}
                  checked={matchForm.substitutes.includes(player.id)}
                  size="xs"
                  label={player.firstname}
                  onCheckedChange={() => {
                    let substitutes = [...matchForm.substitutes];
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
              <Image src={player.homeKit} width={"25px"} />
              <Text whiteSpace={"nowrap"}>
                {player.squadNo}. {player.firstname} {player.lastname}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
}

export default Substitutes;
