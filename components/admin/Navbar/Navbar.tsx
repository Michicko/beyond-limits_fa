import React from "react";
import {
  Box,
  HStack,
  Flex,
  Heading,
  IconButton,
  Skeleton,
} from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import Notification from "../Notification/Notification";
import { getIcon } from "@/lib/icons";
import { usePageContext } from "@/contexts/pageContext";
import ProfileMenu from "../ProfileMenu/ProfileMenu";

function Navbar({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { pageTitle } = usePageContext();

  return (
    <Box
      h={"60px"}
      w={"full"}
      px={{ base: "10px", sm: "20px" }}
      bg={"white"}
      borderBottom={"1px solid"}
      borderColor={"neutral"}
    >
      <Flex justify={"space-between"} align={"center"} h={"full"} gap={"sm"}>
        <HStack>
          <IconButton
            aria-label="Search database"
            variant="ghost"
            size={"md"}
            display={{ base: "auto", lg: "none" }}
            onClick={() => setIsOpen(true)}
          >
            {getIcon("menu")}
          </IconButton>
          <Heading
            fontFamily={"font"}
            textTransform={"capitalize"}
            fontWeight={"bold"}
            color="text_lg"
            letterSpacing={"1px"}
            as={"h1"}
            fontSize={{ base: "md", md: "xl" }}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            title={pageTitle ?? ""}
            maxW={{ base: "100px", sm: "unset" }}
          >
            {pageTitle || <Skeleton height={"25px"} w={"150px"} />}
          </Heading>
        </HStack>
        <HStack gap={{ base: "1", sm: "3" }} align={"center"}>
          <ColorModeButton />
          {/* <Notification count={5} /> */}
          <ProfileMenu />
        </HStack>
      </Flex>
    </Box>
  );
}

export default Navbar;
