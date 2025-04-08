"use client";
import {
  Box,
  HStack,
  Button,
  ButtonGroup,
  Steps,
  Stack,
  Text,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import CustomSelect from "../CustomSelect/CustomSelect";
import CompetitionSeasonCard from "./CompetitionSeasonCard";
import FormBtn from "../Forms/FormBtn";
import CompetitionSeasonContent from "./CompetitionSeasonContent";
import CompetitionSeasonInfo from "./CompetitionSeasonInfo";

function CompetitionSeasonSteps({
  competitionType,
  seasons,
  competitionName,
}: {
  competitionType: "CUP" | "LEAGUE" | "MIXED" | null;
  seasons: { season: string }[];
  competitionName: string;
}) {
  const [season, setSeason] = useState("");
  const [cup, setCup] = useState("");
  const [league, setLeague] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [winnerId, setWinnerId] = useState("");
  const stepTitleStyles = {
    display: { base: "none", md: "block" },
  };
  const btnStyles = {
    px: "10px",
  };
  return (
    <Box>
      <Steps.Root
        defaultStep={0}
        count={competitionType === "MIXED" ? 4 : 3}
        // orientation={{ base: "vertical", md: "horizontal" }}
      >
        <Steps.List
          maxW={{ base: "auto", md: "763px" }}
          w={{ base: "auto", md: "full" }}
          margin={{ base: "unset", md: "0 auto" }}
        >
          <Steps.Item index={0} title={"Select Season"}>
            <Steps.Indicator />
            <Steps.Title css={stepTitleStyles}>Select Season</Steps.Title>
            <Steps.Separator />
          </Steps.Item>
          {competitionType === "CUP" && (
            <Steps.Item index={1} title={"Create Cup"}>
              <Steps.Indicator />
              <Steps.Title css={stepTitleStyles}>Create Cup</Steps.Title>
              <Steps.Separator />
            </Steps.Item>
          )}
          {competitionType === "LEAGUE" && (
            <Steps.Item index={1} title={"Create League"}>
              <Steps.Indicator />
              <Steps.Title css={stepTitleStyles}>Create League</Steps.Title>
              <Steps.Separator />
            </Steps.Item>
          )}
          {competitionType === "MIXED" && (
            <>
              <Steps.Item index={1} title={"Create Cup"}>
                <Steps.Indicator />
                <Steps.Title css={stepTitleStyles}>Create Cup</Steps.Title>
                <Steps.Separator />
              </Steps.Item>
              <Steps.Item index={2} title={"Create League"}>
                <Steps.Indicator />
                <Steps.Title css={stepTitleStyles}>Create League</Steps.Title>
                <Steps.Separator />
              </Steps.Item>
            </>
          )}
          <Steps.Item
            index={competitionType === "MIXED" ? 3 : 2}
            title={"Create Competition Season"}
          >
            <Steps.Indicator />
            <Steps.Title css={stepTitleStyles}>Competition Season</Steps.Title>
            <Steps.Separator />
          </Steps.Item>
        </Steps.List>

        <Stack w={"full"} mt={"10"} outline={"transparent"}>
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
              </CompetitionSeasonCard>
            </HStack>
          </Steps.Content>
          {competitionType === "CUP" && (
            <CompetitionSeasonContent
              competitionName={competitionName}
              entity={"Cup"}
              season={season}
              index={1}
            />
          )}
          {competitionType === "LEAGUE" && (
            <CompetitionSeasonContent
              competitionName={competitionName}
              entity={"League"}
              season={season}
              index={1}
            />
          )}
          {competitionType === "MIXED" && (
            <>
              <CompetitionSeasonContent
                competitionName={competitionName}
                entity={"Cup"}
                season={season}
                index={1}
              />
              <CompetitionSeasonContent
                competitionName={competitionName}
                entity={"League"}
                season={season}
                index={2}
              />
            </>
          )}
          <Steps.Content index={competitionType === "MIXED" ? 3 : 2}>
            <CompetitionSeasonCard title="Create Competition Season">
              <Stack gap={2} mb={"5"}>
                <CompetitionSeasonInfo label={"Name"} value={competitionName} />
                <CompetitionSeasonInfo label={"Season"} value={season} />
                {competitionType === "MIXED" ? (
                  <>
                    <CompetitionSeasonInfo
                      label={"Type"}
                      value={competitionType}
                    />
                    <CompetitionSeasonInfo label={"Main"} value={"LEAGUE"} />
                    <CompetitionSeasonInfo label={"Knockout"} value={"CUP"} />
                  </>
                ) : (
                  <CompetitionSeasonInfo
                    label={"Type"}
                    value={competitionType}
                  />
                )}
              </Stack>
              <HStack justifyContent={"flex-end"}>
                <FormBtn type="button">Create Season</FormBtn>
              </HStack>
            </CompetitionSeasonCard>
          </Steps.Content>
          <Steps.CompletedContent>
            <Flex w={"full"} h={"full"} bg={"card_bg"}></Flex>
          </Steps.CompletedContent>
          <ButtonGroup size="sm" variant="outline" m={"15px auto"}>
            <Steps.PrevTrigger asChild>
              <Button css={btnStyles}>Prev</Button>
            </Steps.PrevTrigger>
            <Steps.NextTrigger asChild>
              <Button css={btnStyles}>Next</Button>
            </Steps.NextTrigger>
          </ButtonGroup>
        </Stack>
      </Steps.Root>
    </Box>
  );
}

export default CompetitionSeasonSteps;
