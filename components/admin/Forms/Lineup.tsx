import CheckBox from "@/components/admin/CheckBox/CheckBox";
import { IMatch, IStackStyles, Nullable } from "@/lib/definitions";
import {
  Box,
  Field,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  Separator,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Substitutes from "./Substitutes";
import CustomSelect from "@/components/admin/CustomSelect/CustomSelect";
import FormLabel from "./FormLabel";
import { Schema } from "@/amplify/data/resource";

interface IPlayer {
  id: string;
  firstname: string;
  lastname: string;
  squadNo: Nullable<number>;
  homeKit: Nullable<string>;
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

function Lineup({
  stackStyles,
  matchForm,
  setMatchForm,
  handleOnChange,
  players,
}: {
  stackStyles: IStackStyles;
  matchForm: IMatchI;
  setMatchForm: React.Dispatch<React.SetStateAction<IMatchI>>;
  handleOnChange: (e: { target: { name: string; value: any } }) => void;
  players: IPlayer[];
}) {
  const remainingPlayers = players.filter((player) => {
    if (matchForm.lineup && matchForm.lineup.includes(player.id)) return;
    return player;
  });

  return (
    <Box css={stackStyles} my={"5"}>
      <FormLabel as="Text">Lineup</FormLabel>
      <Box>
        <FormLabel as="Text">Starting Lineup</FormLabel>
        <Flex flexWrap={"wrap"} gap={"4"} alignItems={"center"}>
          {players.map((player) => {
            return (
              <Flex
                key={player.id}
                alignItems={"center"}
                gap={"2"}
                bg={"card_bg"}
                p={"2"}
                maxH={'40px'}
                borderRadius={"xs"}
              >
                {matchForm.lineup && (
                  <Field.Root>
                    <CheckBox
                      name={player.id}
                      checked={matchForm.lineup.includes(player.id)}
                      size="xs"
                      label={player.firstname}
                      onCheckedChange={() => {
                        const tempLineup = matchForm.lineup
                          ? [...matchForm.lineup]
                          : [];
                        let lineup = tempLineup;
                        const currPlayer = lineup.find(
                          (el) => el === player.id
                        );
                        if (currPlayer) {
                          lineup = lineup.filter((el) => el !== currPlayer);
                        } else {
                          lineup = [...lineup, player.id];
                        }
                        setMatchForm({
                          ...matchForm,
                          lineup,
                        });
                      }}
                      showLabel={false}
                    />
                  </Field.Root>
                )}
                {player.homeKit && (
                  <Image src={player.homeKit} width={"25px"} />
                )}
                <Text whiteSpace={"nowrap"}>
                  {player.squadNo}. {player.firstname} {player.lastname}
                </Text>
              </Flex>
            );
          })}
        </Flex>
      </Box>
      <Separator
        my={"5"}
        height={"1px"}
        variant={"solid"}
        colorPalette={"gray"}
        bg={"gray"}
      />
      <Substitutes
        matchForm={matchForm}
        setMatchForm={setMatchForm}
        players={remainingPlayers}
      />
      <Separator
        my={"5"}
        height={"1px"}
        variant={"solid"}
        colorPalette={"gray"}
        bg={"gray"}
      />
      {matchForm.coach && (
        <Grid
          gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={"4"}
        >
          <GridItem>
            <Field.Root>
              <FormLabel>Coach</FormLabel>
              <Input
                name="coach"
                p={"0 10px"}
                placeholder="Enter Coach Name"
                type="text"
                variant={"outline"}
                color={"text_lg"}
                value={matchForm.coach.name || ""}
                onChange={handleOnChange}
              />
            </Field.Root>
          </GridItem>
          <GridItem>
            <Field.Root>
              <FormLabel>Role</FormLabel>
              <CustomSelect
                name="coachRole"
                description="role"
                options={["HEAD", "ASSISTANT"].map((el) => ({
                  label: el,
                  value: el,
                }))}
                selectedValue={matchForm.coach.role || ""}
                handleOnChange={handleOnChange}
              />
            </Field.Root>
          </GridItem>
        </Grid>
      )}
    </Box>
  );
}

export default Lineup;
