import {
  Field,
  Flex,
  Input,
  Stack,
  HStack,
  Button,
  Text,
  Card,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import FormLabel from "../Forms/FormLabel";
import { getIcon } from "@/lib/icons";

function ListItemAdd({
  name,
  setName,
  names,
  setNames,
  desc,
}: {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  names: string[];
  setNames: React.Dispatch<React.SetStateAction<string[]>>;
  desc: string;
}) {
  const handleAddName = () => {
    const trimmed = name.trim();
    if (trimmed && !names.includes(trimmed)) {
      setNames([...names, trimmed]);
    }
    setName("");
  };

  const removeName = (attr: string) => {
    setNames(names.filter((name) => name !== attr));
  };

  return (
    <Stack>
      <Flex mb={4} alignItems={"flex-end"} gap={4}>
        <Field.Root>
          <FormLabel>{desc}</FormLabel>
          <Input
            name={desc}
            type={"text"}
            placeholder={`Enter ${desc}`}
            px={"2"}
            color={"text_lg"}
            fontSize={"sm"}
            fontWeight={"medium"}
            value={name}
            onChange={(e: { target: HTMLInputElement }) =>
              setName(e.target.value)
            }
          />
        </Field.Root>
        <Button
          p={4}
          variant={"outline"}
          colorPalette={"blue"}
          type="button"
          onClick={handleAddName}
        >
          Add {desc}
        </Button>
      </Flex>
      <HStack gap={3}>
        {names.map((nameItem) => {
          if (!nameItem) return;
          return (
            <Card.Root key={nameItem} maxW={"200px"} p={3}>
              <Card.Body>
                <HStack justifyContent={"space-between"}>
                  <Text
                    fontSize={"md"}
                    fontWeight={"400"}
                    color={"text_lg"}
                    textTransform={"capitalize"}
                  >
                    {nameItem}
                  </Text>
                  <IconButton
                    size={"2xs"}
                    variant={"solid"}
                    colorPalette={"red"}
                    onClick={() => removeName(nameItem)}
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
  );
}

export default ListItemAdd;
