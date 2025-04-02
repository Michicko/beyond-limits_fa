import React from "react";
import { Box } from "@chakra-ui/react";

function Main({ children }: { children: React.ReactNode }) {
  return (
    <Box
      minH={0}
      w={"full"}
      p={{ base: "20px 10px", sm: "20px" }}
      overflow={"auto"}
      h={"97%"}
    >
      {children}
    </Box>
  );
}

export default Main;
