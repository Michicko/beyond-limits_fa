import CustomAlert from "@/components/admin/Alert/CustomAlert";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { cookiesClient } from "@/utils/amplify-utils";
import { Box, HStack, Stack } from "@chakra-ui/react";
import React from "react";

async function Users() {
  const { data: users, errors } = await cookiesClient.queries.listUsers({
    authMode: "userPool",
  });

  return (
    <>
      <PageTitle pageTitle="Users" />
      <Box>
        {errors ? (
          <CustomAlert
            status="error"
            title="Something went wrong."
            message={errors[0].message}
          />
        ) : !users ? (
          <CustomAlert
            status="info"
            title="No Teams."
            message={"No team available, create some to get started."}
          />
        ) : (
          <HStack>
            <h3>List of users</h3>
          </HStack>
        )}
      </Box>
    </>
  );
}

export default Users;
