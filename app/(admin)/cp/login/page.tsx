import Login from "@/components/Auth/Login";
import { Box } from "@chakra-ui/react";
import React from "react";

function LoginPage() {
  return (
    <Box
      position={"relative"}
      zIndex={"3000"}
      bg={"white"}
      top={0}
      left={0}
      right={0}
      bottom={0}
    >
      <Login />
    </Box>
  );
}

export default LoginPage;
