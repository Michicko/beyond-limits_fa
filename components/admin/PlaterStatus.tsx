import React from "react";
import { Button, Flex } from "@chakra-ui/react";

function PlaterStatus({
  statuses,
  selectedStatus,
  setSelectedStatus,
}: {
  selectedStatus: string;
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;
  statuses: ("ACTIVE" | "LOAN" | "INJURED" | "INACTIVE")[];
}) {
  const styles = {
    px: "20px",
    borderRadius: "3xl",
    fontSize: "sm",
    textTransform: "uppercase",
    fontWeight: "semibold",
    bg: "blue.100",
    color: "black",
    "&:hover": {
      bg: "primary",
      color: "white",
    },
    "&.current": {
      bg: "primary",
      color: "white",
    },
  };

  return (
    <Flex gap={"2"} flexWrap={"wrap"} mb={"20px"}>
      {["all", ...statuses].map((status) => {
        if (!status) return;

        return (
          <Button
            key={status}
            size={"sm"}
            css={styles}
            className={
              status.toLowerCase() === selectedStatus.toLowerCase()
                ? "current"
                : ""
            }
            onClick={() => setSelectedStatus(status)}
          >
            {status}
          </Button>
        );
      })}
    </Flex>
  );
}

export default PlaterStatus;
