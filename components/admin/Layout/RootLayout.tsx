"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import Sidebar from "../Sidebar/Sidebar";
import Main from "../Main/Main";
import Navbar from "../Navbar/Navbar";

function RootLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [groups, setGroups] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groups = await getCurrentUserRole();
        console.log(groups);
      } catch (error) {
        console.error("Error getting user groups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  return (
    <Box
      w="full"
      h="100vh"
      bg={"white"}
      overflow={"hidden"}
      fontFamily={"font"}
    >
      <Grid templateColumns={{ base: "1fr", lg: "250px calc(100% - 250px)" }}>
        <GridItem colSpan={{ base: 0, lg: "auto" }}>
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </GridItem>
        <GridItem colSpan={{ base: 6, lg: "auto" }} h={"full"} w={"full"}>
          <Navbar setIsOpen={setIsOpen} />
          <Box
            h={"calc(100vh - 60px)"}
            w={"full"}
            bg={"white"}
            overflow={"hidden"}
          >
            <Main>{children}</Main>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default RootLayout;
