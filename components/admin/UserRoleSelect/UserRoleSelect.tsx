"use client";
import React, { useState } from "react";
import CustomSelect from "../CustomSelect/CustomSelect";
import { Box, Button, HStack } from "@chakra-ui/react";
import useToast from "@/hooks/useToast";
import { addUserToGroup, removeUserFromGroup } from "@/app/_actions/actions";
import { toast } from "react-hot-toast";
import { usePageContext } from "@/contexts/pageContext";

const groups = [
  {
    label: "Admin",
    value: "Admin",
  },
  {
    label: "Writer",
    value: "Writer",
  },
  {
    label: "User",
    value: "User",
  },
];

function UserRoleSelect({ role, userId }: { role: string; userId: string }) {
  const [userRole, setUserRole] = useState(role);
  const [assigning, setAssigning] = useState(false);
  const { authenticatedUserId } = usePageContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let promises: Promise<any>[] = [];
    const cogGroups = ["Admin", "Writer"];
    if (cogGroups.includes(role)) {
      if (userRole === "User") {
        promises = [removeUserFromGroup(userId, role)];
      } else if (userRole !== role) {
        promises = [
          removeUserFromGroup(userId, role),
          addUserToGroup(userId, userRole),
        ];
      }
    } else {
      promises = [addUserToGroup(userId, userRole)];
    }
    setAssigning(true);

    try {
      const res = await Promise.all(promises);
      let results;
      if (res) {
        results = res.map((el) => {
          return el.status;
        });
      }
      const allSuccess = results?.every((el) => el === "success");
      if (allSuccess) {
        toast.success("Successfully Assigned role", { duration: 6000 });
      }
      setAssigning(false);
    } catch (error) {
      toast.error(`Something went wrong. ${(error as Error).message}`, {
        duration: 6000,
      });
      setAssigning(false);
    } finally {
      setAssigning(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack>
        <Box
          as={"span"}
          h={"6px"}
          w={"6px"}
          borderRadius={"50%"}
          bg={authenticatedUserId === userId ? "green.500" : "white"}
          flexShrink={0}
        ></Box>
        <CustomSelect
          selectedValue={userRole}
          name={"groupName"}
          description={"user role"}
          options={groups}
          fixedWidth={true}
          disabled={authenticatedUserId === userId}
          handleOnChange={(e: { target: { name: string; value: string } }) => {
            const { value } = e.target;
            setUserRole(value);
          }}
        />
        <Button
          size={"sm"}
          colorPalette={"cyan"}
          variant={"solid"}
          px={"5"}
          disabled={
            role === userRole ||
            role === "" ||
            (role === "User" && userRole === "") ||
            authenticatedUserId === userId
          }
          type="submit"
        >
          {assigning ? "Assigning role" : "Save"}
        </Button>
      </HStack>
    </form>
  );
}

export default UserRoleSelect;
