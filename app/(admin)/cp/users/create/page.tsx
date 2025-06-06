import BackButton from "@/components/admin/BackButton";
import UserForm from "@/components/admin/Forms/UserForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { Box, HStack } from "@chakra-ui/react";
import React from "react";

function createUser() {
  return (
    <>
      <PageTitle pageTitle="Create User" />
      <Box w={"full"} h={"full"} mt={"10px"}>
        <HStack mb={8}>
          <BackButton />
        </HStack>
        <UserForm />
      </Box>
    </>
  );
}

export default createUser;
