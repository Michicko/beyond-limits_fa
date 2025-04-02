import {
  Avatar,
  AvatarGroup,
  Float,
  HStack,
  Skeleton,
  Circle,
} from "@chakra-ui/react";
import React from "react";
import CustomMenu from "../admin/CustomMenu/CustomMenu";
import CustomMenuItem from "../admin/CustomMenu/CustomMenuItem";
import Logout from "../Auth/Logout";

interface IUser {
  name: string;
  avatar: string;
}

function ProfileMenu({ user }: { user: IUser }) {
  return (
    <Skeleton asChild loading={!user}>
      <HStack>
        <AvatarGroup>
          <Avatar.Root size={"sm"}>
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
