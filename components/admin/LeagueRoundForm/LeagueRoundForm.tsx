"use client";
import { Nullable } from "@/lib/definitions";
import { Button, Dialog, Field, Input, Portal, Stack } from "@chakra-ui/react";
import { useState } from "react";

interface ILeagueRoundStanding {
  position: number;
  p: number;
  w: number;
  d: number;
  l: number;
  g: string;
  gd: number;
}

interface ILeagueRound {
  leagueId: Nullable<string>;
  round: string;
  standing: ILeagueRoundStanding | null;
  matchId: Nullable<string>;
  homeForm: Nullable<string>;
  awayForm: Nullable<string>;
  result: "WIN" | "LOSE" | "DRAW" | null;
  status: "PENDING" | "COMPLETED" | null;
}

const LeagueRoundForm = ({ dbRounds }: { dbRounds: ILeagueRound[] }) => {
  const [rounds, setRounds] = useState(dbRounds || []);

  return (
    <Dialog.Root lazyMount placement={"center"} scrollBehavior="inside">
      <Dialog.Trigger asChild>
        <Button px={"20px"} variant={"solid"} colorPalette={"teal"}>
          Create Round
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner p={5}>
          <Dialog.Content p={5}>
            <Dialog.Header mb={2}>
              <Dialog.Title>Create Round</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body px={"2"}>
              <form>
                <Stack>
                  <Field.Root>
                    <Field.Label>Round</Field.Label>
                    <Input
                      placeholder="Enter Round"
                      name={"round"}
                      px={1}
                      defaultValue={rounds.length + 1}
                    />
                    <Field.HelperText>Enter Round e.g: 1</Field.HelperText>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Position</Field.Label>
                    <Input
                      placeholder="Enter Position"
                      name={"position"}
                      px={1}
                    />
                    <Field.HelperText>Enter Position e.g: 1</Field.HelperText>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Points</Field.Label>
                    <Input placeholder="Enter Points" name={"pts"} px={1} />
                    <Field.HelperText>Enter Points e.g: 1</Field.HelperText>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Played</Field.Label>
                    <Input placeholder="Enter Played" name={"p"} px={1} />
                    <Field.HelperText>Enter Played e.g: 1</Field.HelperText>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Win</Field.Label>
                    <Input placeholder="Enter Win" name={"w"} px={1} />
                    <Field.HelperText>Enter Win e.g: 1</Field.HelperText>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Draw</Field.Label>
                    <Input placeholder="Enter Draw" name={"d"} px={1} />
                    <Field.HelperText>Enter Draw e.g: 1</Field.HelperText>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Lose</Field.Label>
                    <Input placeholder="Enter Lose" name={"l"} px={1} />
                    <Field.HelperText>Enter Lose e.g: 1</Field.HelperText>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Goals Scored</Field.Label>
                    <Input placeholder="Enter Goals Scored" name={"g"} px={1} />
                    <Field.HelperText>
                      Enter Goals scored e.g: 5
                    </Field.HelperText>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Goals Conceded</Field.Label>
                    <Input
                      placeholder="Enter Goals Conceded"
                      name={"g"}
                      px={1}
                    />
                    <Field.HelperText>
                      Enter Goals Conceded e.g: 2
                    </Field.HelperText>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Goal Difference</Field.Label>
                    <Input
                      placeholder="Goal Difference"
                      name={"gd"}
                      px={1}
                      disabled={true}
                    />
                  </Field.Root>
                </Stack>
              </form>
            </Dialog.Body>
            <Dialog.Footer px={"4"} mt={"2"}>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" px={"10px"}>
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button px={"10px"} variant={"solid"} colorPalette={"teal"}>
                Save
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default LeagueRoundForm;
