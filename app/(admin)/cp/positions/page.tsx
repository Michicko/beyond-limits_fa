import CustomMenu from "@/components/admin/CustomMenu/CustomMenu";
import CustomMenuItem from "@/components/admin/CustomMenu/CustomMenuItem";
import PageTitle from "@/components/admin/Layout/PageTitle";
import CreateButton from "@/components/Buttons/CreateButton";
import {
  Box,
  Card,
  Flex,
  HStack,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import CustomAlert from "@/components/admin/Alert/CustomAlert";
import { cookiesClient } from "@/utils/amplify-utils";
import DeletePositionBtn from "@/components/admin/DeleteBtn/DeletePositionBtn";

async function Positions() {
  const { data: positions, errors } =
    await cookiesClient.models.PlayerPosition.list({
      selectionSet: ["id", "longName", "attributes"],
      authMode: "userPool",
    });

  return (
    <>
      <PageTitle pageTitle="Positions" />
      <Box w={"full"} h={"full"} mt={"10px"}>
        <HStack justify={"flex-end"} mb={"20px"} gap="2">
          <CreateButton link="/cp/positions/create" text="Create Position" />
        </HStack>
        {errors ? (
          <CustomAlert
            status="error"
            title="Something went wrong."
            message={errors[0].message}
          />
        ) : positions.length < 1 ? (
          <CustomAlert
            status="info"
            title="No Positions."
            message={
              "No player position available, create some to get started."
            }
          />
        ) : (
          <Flex wrap={"wrap"} gap={"5"}>
            {positions.map((position) => {
              return (
                <Card.Root
                  key={position.id}
                  w={"100%"}
                  maxW={"250px"}
                  p={"5"}
                  bg={"card_bg"}
                  flexShrink={0}
                >
                  <Card.Body>
                    <HStack justifyContent={"space-between"} mb={"2"}>
                      <Text
                        color={"text_lg"}
                        textTransform={"capitalize"}
                        fontSize={"md"}
                        fontWeight={"500"}
                      >
                        {position.longName}
                      </Text>
                      <CustomMenu>
                        <>
                          <CustomMenuItem label="Edit" showBorder={true}>
                            <Link href={`/cp/positions/${position.id}/edit`}>
                              Edit
                            </Link>
                          </CustomMenuItem>
                          <DeletePositionBtn
                            name={position.longName}
                            id={position.id}
                          />
                        </>
                      </CustomMenu>
                    </HStack>
                    {position.attributes && (
                      <List.Root listStyleType={"disc"}>
                        <HStack flexWrap={"wrap"} columnGap={3.5}>
                          {position.attributes.map((attribute) => {
                            return (
                              <ListItem
                                key={attribute}
                                ml={2.5}
                                fontSize={"sm"}
                                fontWeight={"500"}
                                color={"text_md"}
                              >
                                {attribute}
                              </ListItem>
                            );
                          })}
                        </HStack>
                      </List.Root>
                    )}
                  </Card.Body>
                </Card.Root>
              );
            })}
          </Flex>
        )}
      </Box>
    </>
  );
}

export default Positions;
