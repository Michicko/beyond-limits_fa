import { Button, Field, HStack, Input, Steps, Text } from "@chakra-ui/react";
import React from "react";
import CompetitionSeasonCard from "./CompetitionSeasonCard";
import FormLabel from "../Forms/FormLabel";
import { months } from "@/lib/placeholder-data";
import CustomSelect from "../CustomSelect/CustomSelect";

function CompetitionSeasonSelector({
  goToNextStep,
  season,
  setSeason,
  seasonStartMonth,
  setSeasonStartMonth
}: {
  goToNextStep: () => void;
  season: string;
  seasonStartMonth: string;
  setSeasonStartMonth: React.Dispatch<React.SetStateAction<string>>;
  setSeason: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Steps.Content index={0} outline={"transparent"}>
      <HStack outline={"transparent"} border={"none"}>
        <CompetitionSeasonCard title="Enter Season">
          <Text mb={"2"}>Enter season to get started</Text>
          <Field.Root required mb={4}>
            <FormLabel>Select Season Start Month</FormLabel>
            <CustomSelect
              name={"month"}
              description={"Season start month"}
              selectedValue={seasonStartMonth}
              options={months.map((month) => {
                return {
                  label:month,
                  value: month,
                };
              })}
              handleOnChange={(e) => {
                setSeasonStartMonth(e.target.value);
              }}
            id={"month"}
          />
          </Field.Root>
          <Field.Root required>
            <FormLabel>Season</FormLabel>
            <Input
              name={"season"}
              type={"text"}
              placeholder="Enter Season"
              px={"2"}
              color={"text_lg"}
              fontSize={"sm"}
              fontWeight={"medium"}
              mb={"5px"}
              defaultValue={season}
              onChange={(e) => setSeason(e.target.value)}
            />
            <Field.HelperText
              fontSize={"sm"}
              fontWeight={"normal"}
              color={"text_md"}
            >
              Enter season e.g 2023/2024
            </Field.HelperText>
          </Field.Root>
          <HStack justifyContent={"flex-end"} mt={"5"}>
            <Button
              px={"20px"}
              colorPalette={"blue"}
              variant={"outline"}
              disabled={!season && !seasonStartMonth}
              onClick={goToNextStep}
            >
              Next
            </Button>
          </HStack>
        </CompetitionSeasonCard>
      </HStack>
    </Steps.Content>
  );
}

export default CompetitionSeasonSelector;
