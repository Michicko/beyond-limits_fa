"use client";
import { Button, Card, Field, HStack, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import Info from "@/components/admin/Info/Info";
import { IDTeam } from "@/lib/definitions";
import CustomSelect from "../CustomSelect/CustomSelect";
import useToast from "@/hooks/useToast";
import { updateCompetitionSeason } from "@/app/_actions/competition-season-actions";

function CompetitionSeasonCard({
  competitionSeasonId,
  competitionName,
  competitionType,
  season,
  status,
  teams,
}: {
  competitionSeasonId: string;
  competitionName: string;
  competitionType?: string | null;
  season: string;
  status: string | null;
  teams?: IDTeam[];
}) {
  const [winnerId, setWinnerId] = useState("");

  const { mutationPromiseToast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSetWinner = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = {
      title: "Season winner updated",
      desc: `Season winner updated successfully!`,
    };
    const err = {
      title: "Error updating season winner",
      desc: `Failed to update season winner`,
    };
    const loading = {
      title: "updating season winner",
      desc: `updating season winner, please wait...`,
    };

    const formData = new FormData();
    formData.append("winnerId", winnerId);

    const promise = updateCompetitionSeason(
      competitionSeasonId,
      formData,
      competitionName
    );

    mutationPromiseToast(promise, success, err, loading, setIsUpdating);
  };

  return (
    <Card.Root size="md" p={"5"} border={"1px solid"} borderColor={"gray.200"}>
      <Card.Body color="fg.muted">
        <HStack
          w={"full"}
          justifyContent={"space-between"}
          flexWrap={{ base: "wrap", lg: "unset" }}
          gap={4}
        >
          <Stack>
            <Info name="Competition" value={competitionName} />
            {competitionType && (
              <Info
                name="Competition Type"
                value={competitionType.toLowerCase()}
              />
            )}
            <Info name="Season" value={season} />
            {status && <Info name="Status" value={status.toLowerCase()} />}
          </Stack>
          <Stack alignSelf={"flex-end"}>
            <form onSubmit={handleSetWinner}>
              <HStack flexWrap={{ base: "wrap", md: "unset" }} gap={2}>
                <Field.Root>
                  {teams && (
                    <CustomSelect
                      name={"winnerId"}
                      description={"winner"}
                      selectedValue={winnerId}
                      options={teams.map((team) => {
                        return { label: team.longName, value: team.id };
                      })}
                      handleOnChange={(e: {
                        target: { name: string; value: string };
                      }) => setWinnerId(e.target.value)}
                      fixedWidth={true}
                      disabled={status === "PENDING"}
                    />
                  )}
                </Field.Root>
                <Button
                  size={"sm"}
                  variant={"solid"}
                  colorPalette={"cyan"}
                  type="submit"
                  px={"15px"}
                  disabled={status === "PENDING" || isUpdating}
                >
                  {isUpdating ? "Saving..." : "Save"}
                </Button>
              </HStack>
            </form>
          </Stack>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}

export default CompetitionSeasonCard;
