"use client";
import {
  Avatar,
  AvatarGroup,
  Float,
  HStack,
  Skeleton,
  Circle,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CustomMenu from "../CustomMenu/CustomMenu";
import CustomMenuItem from "../CustomMenu/CustomMenuItem";
import Logout from "@/components/Auth/Logout";
import { getCurrentUserRole } from "@/app/_actions/actions";

interface IUser {
  name: string;
  avatar: string;
}

function ProfileMenu() {
  return (
    <Skeleton asChild loading={false}>
      <HStack>
        <HStack>
          <AvatarGroup>
            <Avatar.Root size={"md"}>
              <Avatar.Fallback name="M" />
              <Float placement="bottom-end" offsetX="1" offsetY="1">
                <Circle
                  bg="green.500"
                  size="8px"
                  outline="0.2em solid"
                  outlineColor="bg"
                />
              </Float>
              <Avatar.Image src={"/images/avatar.webp"} />
            </Avatar.Root>
          </AvatarGroup>
          <Stack gap={0}>
            <Heading as={"h3"} fontWeight={"bold"}>
              John
            </Heading>
            <Text fontSize={"sm"} fontWeight={400} color={"gray.500"}>
              Admin
            </Text>
          </Stack>
        </HStack>
        <CustomMenu
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="200"
              viewBox="0 0 48 48"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d="M36 18L24 30L12 18"
              />
            </svg>
          }
        >
          <CustomMenuItem label="Logout" showBorder={false}>
            <Logout />
          </CustomMenuItem>
        </CustomMenu>
      </HStack>
    </Skeleton>
  );
}

export default ProfileMenu;
