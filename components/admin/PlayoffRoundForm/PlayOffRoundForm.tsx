import {
  Button,
  Dialog,
  Field,
  Input,
  NativeSelect,
  Portal,
  Stack,
} from "@chakra-ui/react";
import React from "react";

interface IMatch {
  id: string;
  homeTeam: {
    id: string;
    logo: string;
    shortName: string;
    longName: string;
  } | null;
  awayTeam: {
    id: string;
    logo: string;
    shortName: string;
    longName: string;
  } | null;
}

function PlayOffRoundForm({
  playOffsLabels,
  matches,
}: {
  playOffsLabels: { label: string; value: string }[];
  matches: IMatch[];
}) {
  return (
    <Dialog.Root lazyMount placement={"center"} scrollBehavior="inside">
      <Dialog.Trigger asChild>
        <Button
          px={"20px"}
          variant={"solid"}
          colorPalette={"teal"}
          disabled={!matches}
        >
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
                    <NativeSelect.Root size="md" w={"full"} margin={"0 auto"}>
                      <NativeSelect.Field
                        placeholder="Select result"
                        pl={"10px"}
                        lineHeight={1.5}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          const { value } = e.target;
                          // handleOnChange(value, id);
                        }}
                        textTransform={"capitalize"}
                      >
                        {playOffsLabels.map((el) => {
                          return (
                            <option
                              value={el.value}
                              style={{
                                textTransform: "capitalize",
                              }}
                            >
                              {el.label}
                            </option>
                          );
                        })}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Match</Field.Label>
                    <NativeSelect.Root size="md" w={"full"} margin={"0 auto"}>
                      <NativeSelect.Field
                        placeholder="Select match"
                        pl={"10px"}
                        lineHeight={1.5}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          const { value } = e.target;
                          // handleOnChange(value, id);
                        }}
                        textTransform={"capitalize"}
                      >
                        {matches.map((el) => {
                          return (
                            <option
                              value={el.id}
                              style={{
                                textTransform: "capitalize",
                              }}
                            >
                              {el.homeTeam?.longName +
                                " - " +
                                el.awayTeam?.longName}
                            </option>
                          );
                        })}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
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
}

export default PlayOffRoundForm;
