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
import React, { useState } from "react";
import FormLabel from "./FormLabel";
import { getIcon } from "@/lib/icons";
import FormBtn from "./FormBtn";
import type { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import useToast from "@/hooks/useToast";
import { createPosition } from "@/app/_actions/actions";

const client = generateClient<Schema>();

type Nullable<T> = T | null;

interface IPosition {
  id: string;
  shortName: string;
  longName: string;
  attributes?: Nullable<string>[] | null;
}

function PlayerPositionForm({
  position,
  loading,
}: {
  position: IPosition | null;
  loading?: boolean;
}) {
  const { toast } = useToast({
    loading: {
      title: `${position ? "Updating" : "Creating"} position...`,
      description: "Please wait",
    },
    success: {
      title: `Position ${position ? "updated" : "created"} successfully!`,
      description: "Looks great",
    },
    error: {
      title: `Failed to ${position ? "update" : "create"} position`,
      description: "Something wrong please try again.",
    },
  });

  const [formData, setFormData] = useState({
    shortName: position?.shortName || "",
    longName: position?.longName || "",
    attributes: position?.attributes || ([] as string[]),
  });

  const [attribute, setAttribute] = useState("");

  const handleOnChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const attributeChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setAttribute(target.value);
  };

  const addAttribute = () => {
    setFormData({
      ...formData,
      attributes: [...formData.attributes, attribute],
    });
    setAttribute("");
  };

  const removeAttribute = (attr: Nullable<string>) => {
    let attributes = formData.attributes;
    attributes = attributes.filter((el) => el !== attr);
    setFormData({
      ...formData,
      attributes,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const positionFormData = new FormData();
    positionFormData.set("shortName", formData.shortName);
    positionFormData.set("longName", formData.longName);
    positionFormData.set("attributes", JSON.stringify(formData.attributes));

    e.preventDefault();
    await createPosition(positionFormData);
    // const promise = new Promise(async function (resolve, reject) {
    //   let res;
    //   if (!position) {
    //     // res = await client.models.PlayerPosition.create(formData);
    //   } else {
    //     res = await createPosition(positionFormData);
    //   }
    //   if (res && res.data) {
    //     resolve(res.data);
    //   } else {
    //     reject(res);
    //   }
    // });

    // toast(promise);

    // promise.then(() => {
    //   if (!position) {
    //     setFormData({
    //       shortName: "",
    //       longName: "",
    //       attributes: [] as string[],
    //     });
    //   }
    // });
  };

  return (
    <form onSubmit={handleSubmit}>
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
              value={formData.shortName}
              onChange={handleOnChange}
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
            value={formData.longName}
            onChange={handleOnChange}
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
                onChange={attributeChange}
              />
            </Field.Root>
            <Button
              p={4}
              variant={"outline"}
              colorPalette={"blue"}
              type="button"
              onClick={addAttribute}
            >
              Add Attribue
            </Button>
          </Flex>
          <HStack gap={3}>
            {formData.attributes.map((attribue) => {
              return (
                <Card.Root key={attribue} maxW={"200px"} p={3}>
                  <Card.Body>
                    <HStack justifyContent={"space-between"}>
                      <Text
                        fontSize={"md"}
                        fontWeight={"400"}
                        color={"text_lg"}
                        textTransform={"capitalize"}
                      >
                        {attribue}
                      </Text>
                      <IconButton
                        size={"2xs"}
                        variant={"solid"}
                        colorPalette={"red"}
                        onClick={() => removeAttribute(attribue)}
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
        <FormBtn>
          {position ? "Update player position" : "Create Player Position"}
        </FormBtn>
      </Stack>
    </form>
  );
}

export default PlayerPositionForm;
