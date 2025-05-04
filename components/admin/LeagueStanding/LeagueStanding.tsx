"use client";
import { IDBStandings, IDTeam, Nullable } from "@/lib/definitions";
import {
  Card,
  Heading,
  Stack,
  Table,
  HStack,
  Button,
  Spinner,
  Alert,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import CustomSeparator from "../CustomSeparator";
import LeagueStandingRow from "./LeagueStandingRow";
import { createStandingRow, endLeague } from "@/app/_actions/actions";
import { objectToFormData, sortArray } from "@/lib/helpers";
import toast from "react-hot-toast";
import useToast from "@/hooks/useToast";

function LeagueStanding({
  teams,
  selectedTeams,
  serverStanding,
  competitionStatus,
  competitionSeasonId,
}: {
  teams: IDTeam[];
  selectedTeams: Nullable<string>[];
  serverStanding: IDBStandings[];
  competitionStatus: "PENDING" | "COMPLETED" | null;
  competitionSeasonId: string;
}) {
  const cH = {
    fontWeight: "700",
    h: "50px",
    textAlign: "center",
    verticalAlign: "middle",
  };

  const [standing, setStanding] = useState(serverStanding || []);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const generateStanding = async () => {
    setError("");
    if (!teams || teams.length < 1) {
      toast("No teams available, please add teams to generate standing");
      return;
    }

    setIsGenerating(true);

    const leagueTeams = selectedTeams
      .map((teamId) => {
        const currTeam = teams.find((team) => team.id === teamId);
        return currTeam;
      })
      .filter((el) => el !== undefined)
      .sort((a, b) => a.longName.localeCompare(b.longName));

    const standing = leagueTeams.map((team, index) => ({
      competitionSeasonId: competitionSeasonId,
      teamId: team.id,
      name: team.longName,
      logo: team.logo,
      isBeyondLimits: team.isBeyondLimits,
      position: index + 1, // Sorted index determines position
      pts: 0,
      p: 0,
      w: 0,
      d: 0,
      l: 0,
      g: "0:0",
      gd: 0,
    }));

    const promises = standing.map((row) => {
      const formData = objectToFormData(row);
      return createStandingRow(formData);
    });

    try {
      const results = await Promise.allSettled(promises);

      results.forEach((result, i) => {
        if (result.status === "fulfilled") {
          if (result.value.data) {
            const newData = result.value.data;
            setStanding((prevStanding) => {
              const isDataAlreadyInStanding = prevStanding.some(
                (row) => row.teamId === newData.teamId
              );

              if (!isDataAlreadyInStanding) {
                // Add the newData if it is not already in standing
                return [...prevStanding, newData];
              }

              return prevStanding;
            });
          }
          setIsGenerating(false);
        } else {
          setError(result.reason);
        }
      });
      setIsGenerating(false);
    } catch (error: unknown) {
      setIsGenerating(false);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        console.error("An unknown error occurred", error);
      }
    }
  };

  console.log(standing);

  const getStandingRow = (standing: IDBStandings) => {
    const team = teams.find((el) => el.id === standing.teamId);

    if (!team) {
      toast("No teams available, please add teams to generate standing");
      return;
    }

    return (
      <LeagueStandingRow
        competitionSeasonId={competitionSeasonId}
        team={team}
        standing={standing}
        key={(standing.teamId as string) + standing.position}
        competitionStatus={competitionStatus}
      />
    );
  };

  const sortedStanding = standing.length > 0 && sortArray(standing, "position");

  return (
    <>
      <Card.Root
        size="md"
        p={"5"}
        border={"1px solid"}
        borderColor={"gray.200"}
      >
        <Card.Body color="fg.muted">
          <HStack
            justifyContent={"space-between"}
            alignItems={"center"}
            flexWrap={"wrap"}
            gap={2}
          >
            <Heading mb="2">Standing</Heading>
            <Button
              px={"20px"}
              variant={"solid"}
              colorPalette={"teal"}
              disabled={
                standing.length > 0 ||
                isGenerating ||
                competitionStatus === "COMPLETED"
              }
              onClick={async () => await generateStanding()}
            >
              {isGenerating ? (
                <HStack gap={2} alignItems={"center"}>
                  <Spinner size="sm" border={"1px solid blue"} />
                  <Text as={"span"}>Generating...</Text>
                </HStack>
              ) : (
                "Generate Standing"
              )}
            </Button>
          </HStack>
          <CustomSeparator />
          <Stack>
            <Table.ScrollArea maxW="5xl">
              <Table.Root showColumnBorder={false}>
                <Table.Header>
                  <Table.Row
                    textAlign={"center"}
                    borderBottom={"1px solid"}
                    borderColor={"neutral"}
                  >
                    <Table.ColumnHeader css={cH} columnCount={4}>
                      Team
                    </Table.ColumnHeader>
                    <Table.ColumnHeader css={cH}>Position</Table.ColumnHeader>
                    <Table.ColumnHeader css={cH}>Pts</Table.ColumnHeader>
                    <Table.ColumnHeader css={cH}>P</Table.ColumnHeader>
                    <Table.ColumnHeader css={cH}>W</Table.ColumnHeader>
                    <Table.ColumnHeader css={cH}>D</Table.ColumnHeader>
                    <Table.ColumnHeader css={cH}>L</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign={"center"} css={cH}>
                      G
                    </Table.ColumnHeader>
                    <Table.ColumnHeader css={cH}>GD</Table.ColumnHeader>
                    <Table.ColumnHeader></Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <>
                    <Table.Row>
                      <Table.Cell
                        verticalAlign={"middle"}
                        h={"55px"}
                        colSpan={10}
                      >
                        {error ? (
                          <Alert.Root status="error" p={"4"} w={"full"}>
                            <Alert.Indicator />
                            <Alert.Title>{error}</Alert.Title>
                          </Alert.Root>
                        ) : (
                          isGenerating && (
                            <HStack
                              alignItems={"center"}
                              gap={2}
                              justifyContent={"center"}
                            >
                              <Spinner
                                border={"1px solid"}
                                borderColor={"blue"}
                                size="sm"
                              />
                              <Text fontSize={"sm"}>
                                Generating Table. Please wait...
                              </Text>
                            </HStack>
                          )
                        )}
                      </Table.Cell>
                    </Table.Row>
                    {standing &&
                      sortedStanding &&
                      standing.length > 0 &&
                      sortedStanding.map((team) => {
                        return getStandingRow(team);
                      })}
                  </>
                </Table.Body>
              </Table.Root>
            </Table.ScrollArea>
          </Stack>
        </Card.Body>
      </Card.Root>
    </>
  );
}

export default LeagueStanding;
