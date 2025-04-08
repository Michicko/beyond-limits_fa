import { Button, HStack, Steps, Text } from "@chakra-ui/react";
import React from "react";
import CompetitionSeasonCard from "./CompetitionSeasonCard";
import CustomSelect from "../CustomSelect/CustomSelect";

function CompetitionSeasonSelector({
  goToNextStep,
  seasons,
  season,
  setSeason,
}: {
  goToNextStep: () => void;
  seasons: { season: string }[];
  season: string;
  setSeason: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Steps.Content index={0} outline={"transparent"}>
      <HStack outline={"transparent"} border={"none"}>
        <CompetitionSeasonCard title="Select Season">
          <Text mb={"2"}>Select season to get started</Text>
          <CustomSelect
            options={seasons.map((el) => {
              return {
                label: el.season,
                value: el.season,
              };
            })}
            name="season"
            description="season"
            selectedValue={season}
            handleOnChange={(e) => setSeason(e.target.value)}
          />
          <HStack justifyContent={"flex-end"} mt={"5"}>
            <Button
              px={"20px"}
              colorPalette={"blue"}
              variant={"outline"}
              disabled={!season}
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
