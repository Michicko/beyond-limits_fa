import {
  Button,
  Dialog,
  Field,
  HStack,
  Input,
  Portal,
  Stack,
} from "@chakra-ui/react";
import React, { useRef, useState, useTransition } from "react";
import CustomSelect from "../CustomSelect/CustomSelect";
import { Nullable } from "@/lib/definitions";
import { getButtonStatus, objectToFormData } from "@/lib/helpers";
import useToast from "@/hooks/useToast";
import { createPlayOff } from "@/app/_actions/actions";

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
  date: string;
}

function PlayOffRoundForm({
  playOffsLabels,
  matches,
  cupId,
  competitionStatus,
}: {
  playOffsLabels: { label: string; value: string }[];
  matches: IMatch[];
  cupId: Nullable<string>;
  competitionStatus: "PENDING" | "COMPLETED" | null;
}) {
  const [tempData, setTempData] = useState({
    cupId,
    matchId: "",
    round: "",
    homeForm: "",
    awayForm: "",
    status: "PENDING",
  });

  const handleOnChange = (e: {
    target: {
      name: string;
      value: string;
    };
  }) => {
    const { name, value } = e.target;
    setTempData({ ...tempData, [name]: value });
  };

  const formRef = useRef<HTMLFormElement | null>(null);
  const [isPending, startTransition] = useTransition();
  const { mutationToast, errorToast } = useToast();

  const handleSubmit = () => {
    const form = formRef.current;
    const formData = objectToFormData(tempData);
    if (form) {
      startTransition(async () => {
        const res = await createPlayOff(formData);
        if (res.status === "success" && res.data) {
          mutationToast("PlayOff", `${res.data.round}`, "create");
          formRef.current?.reset();
        }
        if (res.status === "error") {
          errorToast(res.message);
        }
      });
    }
  };

  return (
    <Dialog.Root lazyMount placement={"center"} scrollBehavior="inside">
      <Dialog.Trigger asChild>
        <Button
          px={"20px"}
          variant={"solid"}
          colorPalette={"teal"}
          disabled={!matches || competitionStatus === "COMPLETED"}
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
              <form ref={formRef}>
                <Stack>
                  <Field.Root>
                    <Field.Label>Round</Field.Label>
                    <CustomSelect
                      name={"round"}
                      description={"Round"}
                      selectedValue={tempData.round}
                      options={playOffsLabels}
                      handleOnChange={handleOnChange}
                      id={"round"}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Match</Field.Label>
                    <CustomSelect
                      name={"matchId"}
                      description={"Match"}
                      selectedValue={tempData.matchId}
                      options={matches.map((match) => {
                        return {
                          label:
                            match.homeTeam?.longName +
                            " vs " +
                            match.awayTeam?.longName +
                            ` (${match.date})`,
                          value: match.id,
                        };
                      })}
                      handleOnChange={handleOnChange}
                      id={"match"}
                    />
                  </Field.Root>
                  <HStack gap={"2"}>
                    <Field.Root>
                      <Field.Label>Home Form</Field.Label>
                      <Input
                        placeholder="Enter Home Form"
                        name={"homeForm"}
                        value={tempData.homeForm}
                        onChange={handleOnChange}
                        px={1}
                      />
                      <Field.HelperText>
                        Enter form e.g: w,w,l,l,d
                      </Field.HelperText>
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Away Form</Field.Label>
                      <Input
                        placeholder="Enter Away Form"
                        name={"awayForm"}
                        px={1}
                        value={tempData.awayForm}
                        onChange={handleOnChange}
                      />
                      <Field.HelperText>
                        Enter form e.g: w,w,l,l,d
                      </Field.HelperText>
                    </Field.Root>
                  </HStack>
                </Stack>
              </form>
            </Dialog.Body>
            <Dialog.Footer px={"4"} mt={"2"}>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" px={"10px"}>
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button
                px={"10px"}
                variant={"solid"}
                colorPalette={"teal"}
                disabled={isPending || competitionStatus === "COMPLETED"}
                type="button"
                onClick={handleSubmit}
              >
                {getButtonStatus(null, "Round", isPending)}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default PlayOffRoundForm;
