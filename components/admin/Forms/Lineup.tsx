import {
  IMatch,
  IMatchFormData,
  IStackStyles,
  Nullable,
} from "@/lib/definitions";
import {
  Box,
  Field,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  Separator,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React from "react";
import CustomSelect from "@/components/admin/CustomSelect/CustomSelect";
import FormLabel from "./FormLabel";
import { Schema } from "@/amplify/data/resource";
import PlayersLineup from "../PlayersLineup/PlayersLineup";

interface IPlayer {
  id: string;
  firstname: string;
  lastname: string;
  squadNo: Nullable<number>;
  homeKit: Nullable<string>;
  status: string | null;
  ageGroup: string | null;
  playerPosition: {
    shortName: string;
  };
}

function Lineup({
  stackStyles,
  matchForm,
  setMatchForm,
  handleOnChange,
  players,
}: {
  stackStyles: IStackStyles;
  matchForm: IMatchFormData;
  setMatchForm: React.Dispatch<React.SetStateAction<IMatchFormData>>;
  handleOnChange: (e: { target: { name: string; value: any } }) => void;
  players: IPlayer[];
}) {
  const positions = [
    "gk",
    "cb",
    "rb",
    "lb",
    "dm",
    "cm",
    "fw",
    "w",
    "lw",
    "rw",
    "st",
  ];

  const remainingPlayers = players
    .sort((a, b) => {
      return (
        positions.indexOf(a.playerPosition.shortName.toLowerCase()) -
        positions.indexOf(b.playerPosition.shortName.toLowerCase())
      );
    })
    .filter((player) => {
      if (matchForm.lineup && matchForm.lineup.includes(player.id)) return;
      return player;
    });

  const mainPlayers = players.filter(
    (el) => !matchForm.substitutes?.includes(el.id)
  );

  const onCheckedChange = (
    playerId: string,
    selectedPlayers: Nullable<string>[] | null,
    field: "lineup" | "substitutes"
  ) => {
    const tempList = selectedPlayers ? [...selectedPlayers] : [];
    let updatedList = tempList;

    const isAlreadySelected = updatedList.includes(playerId);
    updatedList = isAlreadySelected
      ? updatedList.filter((el) => el !== playerId)
      : [...updatedList, playerId];

    setMatchForm({
      ...matchForm,
      [field]: updatedList,
    });
  };

  return (
    <Box css={stackStyles} my={"5"}>
      <FormLabel as="Text">Lineup</FormLabel>
      {/* lineup */}
      <Box minW={"35px"}>
        <HStack justifyContent={"space-between"} alignItems={"center"}>
          <FormLabel as="Text">Starting Lineup</FormLabel>
          <FormLabel as="Text">
            {matchForm?.lineup?.length ?? 0} Selected
          </FormLabel>
        </HStack>
        <Box w={"full"}>
          <PlayersLineup
            ageGroup="UNDER_19"
            players={mainPlayers}
            selectedPlayers={matchForm.lineup}
            field={"lineup"}
            onCheckedChange={onCheckedChange}
          />
          <PlayersLineup
            ageGroup="UNDER_17"
            players={mainPlayers}
            selectedPlayers={matchForm.lineup}
            onCheckedChange={onCheckedChange}
            field={"lineup"}
          />
        </Box>
      </Box>
      <Separator
        my={"5"}
        height={"1px"}
        variant={"solid"}
        colorPalette={"gray"}
        bg={"gray"}
      />
      {/* subs */}
      <Box>
        <HStack justifyContent={"space-between"} alignItems={"center"}>
          <FormLabel as="Text">Substitutes</FormLabel>
          <FormLabel as="Text">
            {matchForm?.substitutes?.length ?? 0} Selected
          </FormLabel>
        </HStack>
        <Box w={"full"}>
          <PlayersLineup
            ageGroup="UNDER_19"
            players={remainingPlayers}
            selectedPlayers={matchForm.substitutes}
            onCheckedChange={onCheckedChange}
            field={"substitutes"}
          />
          <PlayersLineup
            ageGroup="UNDER_17"
            players={remainingPlayers}
            selectedPlayers={matchForm.substitutes}
            onCheckedChange={onCheckedChange}
            field={"substitutes"}
          />
        </Box>
      </Box>
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
