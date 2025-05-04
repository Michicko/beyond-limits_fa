"use client";
import React from "react";
import { Box, List, Flex, IconButton, Image, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getIcon } from "@/lib/icons";

const links = [
  {
    name: "dashboard",
    link: "/cp/dashboard",
    icon: getIcon("dashboard"),
  },
  {
    name: "competitions",
    link: "/cp/competitions",
    icon: getIcon("competition"),
  },
  {
    name: "teams",
    link: "/cp/teams",
    icon: getIcon("team"),
  },
  // {
  //   name: "positions",
  //   link: "/cp/positions",
  //   icon: getIcon("player_position"),
  // },
  {
    name: "players",
    link: "/cp/players",
    icon: getIcon("players"),
  },
  {
    name: "users",
    link: "/cp/users",
    icon: getIcon("user"),
  },
  {
    name: "matches",
    link: "/cp/matches",
    icon: getIcon("ball"),
  },
  // {
  //   name: "trophies",
  //   link: "/cp/trophies",
  //   icon: getIcon("trophy"),
  // },
  {
    name: "articles",
    link: "/cp/articles",
    icon: getIcon("articles"),
  },
  {
    name: "highlights",
    link: "/cp/highlights",
    icon: getIcon("video"),
  },
  // {
  //   name: "settings",
  //   link: "/cp/settings",
  //   icon: getIcon("settings"),
  // },
];

const filteredLinks = links.filter(
  (el) =>
    el.name === "articles" ||
    el.name === "dashboard" ||
    el.name === "highlights"
);

function Sidebar({
  isOpen,
  setIsOpen,
  userGroup,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userGroup: string;
}) {
  const boxStyles = {
    bg: "white",
    h: "100vh",
    w: { base: "250px", lg: "100%" },
    color: "text_lg",
    position: { base: "fixed", lg: "relative" },
    transform: { base: "translateX(-100%)", lg: "translateX(0)" },
    transition: "transform .3s linear",
    zIndex: 400,
    "&[data-state=open]": { transform: "translateX(0)" },
  };

  const pathname = usePathname();

  const linkStyles = {
    h: "45px",
    w: "full",
    gap: "10px",
    alignItems: "center",
    justify: "flex-start",
    textTransform: "capitalize",
    px: "20px",
    fontSize: "sm",
    fontWeight: "medium",
    "&.current": {
      color: "primary",
    },
    "&.current svg": {
      color: "primary",
    },
    "&:hover": {
      bg: "neutral",
      borderRight: "4px solid",
      borderColor: "primary",
      color: "primary",
    },
    "&:hover svg": {
      color: "primary",
    },
  };

  const closeSidebar = () => {
    if (!isOpen) return;
    setIsOpen(false);
  };

  return (
    <Box
      css={boxStyles}
      data-state={isOpen ? "open" : "closed"}
      shadow="lg"
      p={"20px 0"}
    >
      <Flex
        direction={"column"}
        h={"full"}
        w={"full"}
        position={"relative"}
        overflowY={"auto"}
      >
        <IconButton
          aria-label="Search database"
          variant="ghost"
          size={"md"}
          display={{ base: "auto", lg: "none" }}
          position={"absolute"}
          top={"5px"}
          right={"5px"}
          onClick={() => setIsOpen(false)}
        >
          {getIcon("close")}
        </IconButton>
        <Image
          src="/images/bright-logo.png"
          boxSize="60px"
          borderRadius="full"
          fit="cover"
          alt="Naruto Uzumaki"
          mb={"20px"}
          alignSelf={"center"}
          loading={"eager"}
        />
        <List.Root>
          {(userGroup === "Writer" ? filteredLinks : links).map((el) => {
            return (
              <List.Item w={"full"} key={el.name}>
                <Link href={el.link} onClick={closeSidebar}>
                  <Flex
                    css={linkStyles}
                    bg={pathname === el.link ? "neutral" : "transparent"}
                    borderRight={"4px solid"}
                    borderColor={
                      pathname === el.link ? "primary" : "transparent"
                    }
                    mb={"5px"}
                    className={pathname === el.link ? "current" : ""}
                  >
                    {el.icon && (
                      <Icon color={"text_lg"} size={"lg"}>
                        {el.icon}
                      </Icon>
                    )}
                    {el.name}
                  </Flex>
                </Link>
              </List.Item>
            );
          })}
        </List.Root>
      </Flex>
    </Box>
  );
}

export default Sidebar;
