"use client";
import {
  Button,
  Card,
  Field,
  Flex,
  HStack,
  IconButton,
  Input,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useRef, useState, useTransition } from "react";
import FormLabel from "./FormLabel";
import { getIcon } from "@/lib/icons";
import FormBtn from "./FormBtn";
import { createPosition, updatePosition } from "@/app/_actions/actions";
import useToast from "@/hooks/useToast";
import { getButtonStatus } from "@/lib/helpers";
import { Schema } from "@/amplify/data/resource";

type Nullable<T> = T | null;
type IAttributes = string[] | Nullable<string>[];
type IPosition = Pick<
  Schema["PlayerPosition"]["type"],
  "id" | "shortName" | "longName" | "attributes" | "createdAt"
>;

function PlayerPositionForm({ position }: { position: IPosition }) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isPending, startTransition] = useTransition();
  const [attribute, setAttribute] = useState("");
  const [attributes, setAttributes] = useState<Nullable<string>[] | string[]>(
    position ? (position.attributes as IAttributes) : []
  );
  const { errorToast, mutationToast } = useToast();

  const handleAddAttribute = () => {
    const trimmed = attribute.trim();
    if (trimmed && !attributes.includes(trimmed)) {
      setAttributes([...attributes, trimmed]);
    }
    setAttribute("");
  };

  const removeAttribute = (attr: string) => {
    setAttributes(attributes.filter((attribute) => attribute !== attr));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.delete("attribute");

    if (position) {
      startTransition(() => {
        updatePosition(position.id, formData, attributes, position.shortName)
          .then((data: IPosition | null) => {
            if (data) {
              mutationToast("player Position", data.longName, "update");
            }
          })
          .catch((err) => {
            console.log(err);
            errorToast(err);
          });
      });
    } else {
      startTransition(() => {
        createPosition(formData, attributes)
          .then((data: IPosition | null) => {
            if (data) {
              mutationToast("player Position", data.longName, "create");
              setAttributes([]);
              formRef.current?.reset();
            }
          })
          .catch((err) => {
            console.log(err);
            errorToast(err);
          });
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <Stack gap={5} mb={10}>
        <Skeleton asChild loading={false}>
          <Field.Root required>
            <FormLabel>Short name</FormLabel>
            <Input
              name={"shortName"}
              type={"text"}
              placeholder="Enter short name"
              px={"2"}
              color={"text_lg"}
              fontSize={"sm"}
              fontWeight={"medium"}
              mb={"5px"}
              defaultValue={position ? position.shortName : ""}
            />
          </Field.Root>
        </Skeleton>
        <Field.Root required>
          <FormLabel>Long name</FormLabel>
          <Input
            name={"longName"}
            type={"text"}
            placeholder="Enter long name"
            px={"2"}
            color={"text_lg"}
            fontSize={"sm"}
            fontWeight={"medium"}
            mb={"5px"}
            defaultValue={position ? position.longName : ""}
          />
        </Field.Root>
        <Stack>
          <Flex mb={4} alignItems={"flex-end"} gap={4}>
            <Field.Root>
              <FormLabel>attribue</FormLabel>
              <Input
                name={"attribute"}
                type={"text"}
                placeholder="Enter attribute"
                px={"2"}
                color={"text_lg"}
                fontSize={"sm"}
                fontWeight={"medium"}
                value={attribute}
                onChange={(e: { target: HTMLInputElement }) =>
                  setAttribute(e.target.value)
                }
              />
            </Field.Root>
            <Button
              p={4}
              variant={"outline"}
              colorPalette={"blue"}
              type="button"
              onClick={handleAddAttribute}
            >
              Add Attribue
            </Button>
          </Flex>
          <HStack gap={3}>
            {attributes.map((attribute) => {
              if (!attribute) return;
              return (
                <Card.Root key={attribute} maxW={"200px"} p={3}>
                  <Card.Body>
                    <HStack justifyContent={"space-between"}>
                      <Text
                        fontSize={"md"}
                        fontWeight={"400"}
                        color={"text_lg"}
                        textTransform={"capitalize"}
                      >
                        {attribute}
                      </Text>
                      <IconButton
                        size={"2xs"}
                        variant={"solid"}
                        colorPalette={"red"}
                        onClick={() => removeAttribute(attribute)}
                      >
                        {getIcon("close")}
                      </IconButton>
                    </HStack>
                  </Card.Body>
                </Card.Root>
              );
            })}
          </HStack>
        </Stack>
        <FormBtn disabled={isPending}>
          {getButtonStatus(position, "Player Position", isPending)}
        </FormBtn>
      </Stack>
    </form>
  );
}

export default PlayerPositionForm;
