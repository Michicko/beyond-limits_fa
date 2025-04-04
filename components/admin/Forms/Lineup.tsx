import CheckBox from "@/components/CheckBox/CheckBox";
import { IMatch, IStackStyles } from "@/lib/definitions";
import { players } from "@/lib/placeholder-data";
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
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import FormLabel from "./FormLabel";

function Lineup({
  stackStyles,
  matchForm,
  setMatchForm,
  handleMatchFormOnChange,
}: {
  stackStyles: IStackStyles;
  matchForm: IMatch;
  setMatchForm: React.Dispatch<React.SetStateAction<IMatch>>;
  handleMatchFormOnChange: (e: {
    target: { name: string; value: any };
  }) => void;
}) {
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
                borderRadius={"xs"}
              >
                <Field.Root>
                  <CheckBox
                    name={player.id}
                    checked={matchForm.lineup.includes(player.id)}
                    size="xs"
                    label={player.firstname}
                    onCheckedChange={() => {
                      let lineup = [...matchForm.lineup];
                      const currPlayer = lineup.find((el) => el === player.id);
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
                <Image src={player.homeKit} width={"25px"} />
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
      <Substitutes matchForm={matchForm} setMatchForm={setMatchForm} />
      <Separator
        my={"5"}
        height={"1px"}
        variant={"solid"}
        colorPalette={"gray"}
        bg={"gray"}
      />
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
              value={matchForm.coach.name}
              onChange={handleMatchFormOnChange}
            />
          </Field.Root>
        </GridItem>
        <GridItem>
          <Field.Root>
            <FormLabel>Role</FormLabel>
            <CustomSelect
              name="role"
              description="role"
              options={["head", "assistant"].map((el) => ({
                label: el,
                value: el,
              }))}
              selectedValue={matchForm.report.mvp || ""}
              handleOnChange={handleMatchFormOnChange}
            />
          </Field.Root>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Lineup;
