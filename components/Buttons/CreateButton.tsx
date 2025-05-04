import { Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

function CreateButton({
  text,
  link,
  type,
  onClick,
}: {
  text: string;
  link?: string;
  type?: "btn" | "link";
  onClick?: () => void;
}) {
  const btnStyles = {
    p: "10px 20px",
    fontSize: "md",
    fontWeight: "semibold",
  };

  return type === "btn" && onClick ? (
    <Button
      colorPalette={"blue"}
      variant={"solid"}
      css={btnStyles}
      size={"md"}
      onClick={onClick}
    >
      {text}
    </Button>
  ) : (
    <Button
      colorPalette={"blue"}
      variant={"solid"}
      css={btnStyles}
      size={"md"}
      asChild
    >
      {type !== "link" && link && <Link href={link}>{text}</Link>}
    </Button>
  );
}

export default CreateButton;
