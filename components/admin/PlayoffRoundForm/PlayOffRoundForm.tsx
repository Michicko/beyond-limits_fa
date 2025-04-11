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

function PlayOffRoundForm({
  open,
  setOpen,
  play_offs,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  play_offs: { label: string; value: string }[];
}) {
  return (
    <Dialog.Root
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      placement={"center"}
      scrollBehavior="inside"
    >
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
                        {play_offs.map((el) => {
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
                    <Input placeholder="Select Match" name={"matchId"} px={1} />
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
