"use client";
import { Nullable } from "@/lib/definitions";
import {
  Button,
  Dialog,
  Field,
  HStack,
  Input,
  Portal,
  Stack,
} from "@chakra-ui/react";
import { useRef, useState, useTransition } from "react";
import FormLabel from "../Forms/FormLabel";
import CustomSelect from "../CustomSelect/CustomSelect";
import useToast from "@/hooks/useToast";
import { createLeagueRound } from "@/app/_actions/actions";
import { getButtonStatus } from "@/lib/helpers";

interface ILeagueRoundStanding {
  position: number;
  p: number;
  w: number;
  d: number;
  l: number;
  g: string;
  gd: number;
}

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

const LeagueRoundForm = ({
  leagueId,
  dbRounds,
  matches,
}: {
  leagueId: string;
  dbRounds: ILeagueRound[];
  matches: IMatch[];
}) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [isPending, startTransition] = useTransition();
  const { mutationToast, errorToast } = useToast();
  const [status, setStatus] = useState("PENDING");
  const [result, setResult] = useState("");

  const [standing, setStanding] = useState({
    position: "",
    pts: "",
    p: "",
    w: "",
    d: "",
    l: "",
    g: "",
    gd: "",
  });

  const [match, setMatch] = useState("");

  const handleSubmit = () => {
    const form = formRef.current;
    if (form) {
      const formData = new FormData(form);
      [...Object.keys(standing), "match"].forEach((el) => {
        formData.delete(el);
      });
      formData.append("matchId", match);
      formData.delete("result");
      formData.append("standing", JSON.stringify(standing));
      startTransition(async () => {
        const res = await createLeagueRound(formData);
        if (res.status === "success" && res.data) {
          mutationToast("League Round", `${res.data.round}`, "create");
          formRef.current?.reset();
        }
        if (res.status === "error") {
          errorToast(res.message);
        }
      });
    }
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setStanding({ ...standing, [name]: value });
  };

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
              <form ref={formRef}>
                <Stack>
                  <Field.Root>
                    <Field.Label>Round</Field.Label>
                    <Input
                      placeholder="Enter Round"
                      name={"round"}
                      px={1}
                      defaultValue={dbRounds.length + 1}
                    />
                    <Field.HelperText>Enter Round e.g: 1</Field.HelperText>
                  </Field.Root>
                  <Field.Root>
                    <FormLabel>Match</FormLabel>
                    {matches && (
                      <CustomSelect
                        name="match"
                        id={"match"}
                        description="match"
                        options={matches.map((match) => {
                          return {
                            label:
                              match.homeTeam?.longName +
                              " vs " +
                              match.awayTeam?.longName +
                              ` (${match.date}) `,
                            value: match.id,
                          };
                        })}
                        selectedValue={match}
                        handleOnChange={(e: {
                          target: { name: string; value: string };
                        }) => {
                          const { value } = e.target;
                          const curr = matches.find((el) => el.id === value);
                          if (!curr) return;
                          setMatch(curr.id);
                        }}
                      />
                    )}
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Position</Field.Label>
                    <Input
                      placeholder="Enter Position"
                      name={"position"}
                      px={1}
                      value={standing.position}
                      onChange={handleChange}
                    />
                    <Field.HelperText>Enter Position e.g: 1</Field.HelperText>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Points</Field.Label>
                    <Input
                      placeholder="Enter Points"
                      name={"pts"}
                      px={1}
                      value={standing.pts}
                      onChange={handleChange}
                    />
                    <Field.HelperText>Enter Points e.g: 1</Field.HelperText>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Played</Field.Label>
                    <Input
                      placeholder="Enter Played"
                      name={"p"}
                      px={1}
                      value={standing.p}
                      onChange={handleChange}
                    />
                    <Field.HelperText>Enter Played e.g: 1</Field.HelperText>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Win</Field.Label>
                    <Input
                      placeholder="Enter Win"
                      name={"w"}
                      px={1}
                      value={standing.w}
                      onChange={handleChange}
                    />
                    <Field.HelperText>Enter Win e.g: 1</Field.HelperText>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Draw</Field.Label>
                    <Input
                      placeholder="Enter Draw"
                      name={"d"}
                      px={1}
                      value={standing.d}
                      onChange={handleChange}
                    />
                    <Field.HelperText>Enter Draw e.g: 1</Field.HelperText>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Lose</Field.Label>
                    <Input
                      placeholder="Enter Lose"
                      name={"l"}
                      px={1}
                      value={standing.l}
                      onChange={handleChange}
                    />
                    <Field.HelperText>Enter Lose e.g: 1</Field.HelperText>
                  </Field.Root>
                  <HStack gap={"2"}>
                    <Field.Root>
                      <Field.Label>Home Form</Field.Label>
                      <Input
                        placeholder="Enter Home Form"
                        name={"homeForm"}
                        px={1}
                      />
                      <Field.HelperText>
                        Enter form e.g: w,w,l,l,d
                      </Field.HelperText>
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Away Form</Field.Label>
                      <Input
                        placeholder="Enter Lose"
                        name={"awayForm"}
                        px={1}
                      />
                      <Field.HelperText>
                        Enter form e.g: w,w,l,l,d
                      </Field.HelperText>
                    </Field.Root>
                  </HStack>
                  <Field.Root>
                    <Field.Label>Goals Scored</Field.Label>
                    <Input
                      placeholder="Enter Goals Scored and conceded"
                      name={"g"}
                      px={1}
                      onChange={handleChange}
                    />
                    <Field.HelperText>
                      Enter Goals scored and conceded e.g: 5:4
                    </Field.HelperText>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Goal Difference</Field.Label>
                    <Input
                      placeholder="Goal Difference"
                      name={"gd"}
                      px={1}
                      // disabled={true}
                      value={standing.gd}
                      onChange={handleChange}
                    />
                  </Field.Root>
                  <Field.Root>
                    <FormLabel>Status</FormLabel>
                    <CustomSelect
                      name="status"
                      id={"status"}
                      description="status"
                      options={["PENDING", "COMPLETED"].map((el) => {
                        return {
                          label: el,
                          value: el,
                        };
                      })}
                      selectedValue={status}
                      handleOnChange={(e) => setStatus(e.target.value)}
                    />
                  </Field.Root>
                  <Field.Root>
                    <FormLabel>Result</FormLabel>
                    <CustomSelect
                      name="result"
                      id={"result"}
                      description="result"
                      options={["WIN", "DRAW", "LOSE"].map((el) => {
                        return {
                          label: el,
                          value: el,
                        };
                      })}
                      selectedValue={result}
                      handleOnChange={(e) => setResult(e.target.value)}
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
              <Button
                px={"10px"}
                variant={"solid"}
                colorPalette={"teal"}
                type="button"
                onClick={handleSubmit}
                disabled={isPending}
              >
                {getButtonStatus(null, "Round", isPending)}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default LeagueRoundForm;
