import CustomAlert from "@/components/admin/Alert/CustomAlert";
import PageTitle from "@/components/admin/Layout/PageTitle";
import Table from "@/components/admin/Table/Table";
import TableBody from "@/components/admin/Table/TableBody";
import TableCell from "@/components/admin/Table/TableCell";
import TableColumnHeader from "@/components/admin/Table/TableColumnHeader";
import TableHeader from "@/components/admin/Table/TableHeader";
import TableRows from "@/components/admin/Table/TableRows";
import UserRoleSelect from "@/components/admin/UserRoleSelect/UserRoleSelect";
import { formatDate } from "@/lib/helpers";
import { cookiesClient } from "@/utils/amplify-utils";
import { Badge, Box, Container, HStack } from "@chakra-ui/react";
import React from "react";

interface IAttribute {
  Name: string;
  Value: string;
}

interface IUser {
  Attributes: IAttribute[];
  Enabled: boolean;
  UserCreateDate: string;
  UserLastModifiedDate: string;
  UserStatus: string;
  Username: string;
}

const cogGroups = ["Admin", "Writer"];

const findAttribute = (attributes: IAttribute[], name: string) => {
  const attribute = attributes.find((el) => el.Name === name);
  return attribute?.Value || name;
};

async function Users() {
  const { data: usersData, errors } = await cookiesClient.queries.listUsers({
    authMode: "userPool",
  });

  let usersWithGroups: (IUser & { groups: string[] })[] = [];

  if (usersData) {
    const res = JSON.parse(usersData as string);
    const users: IUser[] = res.Users;

    usersWithGroups = await Promise.all(
      users.map(async (user) => {
        const userGroupData = (
          await cookiesClient.queries.listGroupsForUser(
            {
              userId: user.Username,
            },
            { authMode: "userPool" },
          )
        ).data;

        const parsedGroups = JSON.parse(userGroupData as string);

        const groups =
          parsedGroups?.Groups?.map((group: any) => group.GroupName) || [];
        return {
          ...user,
          groups, // Add the groups array here
        };
      }),
    );
  }

  return (
    <>
      <PageTitle pageTitle="Users" />
      <Box>
        <Container maxW={"4xl"} fluid margin={"0 auto"}>
          {errors ? (
            <CustomAlert
              status="error"
              title="Something went wrong."
              message={errors[0].message}
            />
          ) : !usersWithGroups ? (
            <CustomAlert
              status="info"
              title="No Users."
              message={"No user available, create some to get started."}
            />
          ) : (
            <HStack>
              <>
                <Table>
                  <>
                    <TableHeader>
                      <TableRows>
                        <>
                          {[
                            "username",
                            "email",
                            "date registered",
                            "status",
                            "role",
                          ].map((head, i) => {
                            return (
                              <TableColumnHeader
                                key={head}
                                textAlign={"left"}
                                pl={i === 0 || i === 4 ? "10px" : "0"}
                                fontWeight={"700"}
                              >
                                {head}
                              </TableColumnHeader>
                            );
                          })}
                        </>
                      </TableRows>
                    </TableHeader>
                    <TableBody>
                      <>
                        {usersWithGroups.map((user) => {
                          return (
                            <TableRows key={user.Username} h={"65px"}>
                              <>
                                <TableCell pl={"10px"}>
                                  {findAttribute(
                                    user.Attributes,
                                    "preferred_username",
                                  )}
                                </TableCell>
                                <TableCell textTransform={"lowercase"}>
                                  {findAttribute(
                                    user.Attributes,
                                    "email",
                                  ).toLowerCase()}
                                </TableCell>
                                <TableCell textTransform={"lowercase"}>
                                  {formatDate(user.UserCreateDate)}
                                </TableCell>
                                <TableCell textTransform={"lowercase"}>
                                  <Badge
                                    variant="solid"
                                    colorPalette={
                                      user.UserStatus === "CONFIRMED"
                                        ? "green"
                                        : "red"
                                    }
                                    px={5}
                                    py={"2px"}
                                  >
                                    {user.UserStatus === "CONFIRMED"
                                      ? "verified"
                                      : "unverified"}
                                  </Badge>
                                </TableCell>
                                <TableCell px={"10px"}>
                                  <UserRoleSelect
                                    role={
                                      cogGroups.includes(user.groups[0])
                                        ? user.groups[0]
                                        : "User"
                                    }
                                    userId={user.Username}
                                  />
                                </TableCell>
                              </>
                            </TableRows>
                          );
                        })}
                      </>
                    </TableBody>
                  </>
                </Table>
              </>
            </HStack>
          )}
        </Container>
      </Box>
    </>
  );
}

export default Users;
