import { Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

function CreateButton({ text, link }: { text: string; link: string }) {
  const btnStyles = {
    p: "10px 20px",
    fontSize: "md",
    fontWeight: "semibold",
  };
  return (
    <Button
      colorPalette={"blue"}
      variant={"solid"}
      css={btnStyles}
      size={"md"}
      asChild
    >
      <Link href={link}>{text}</Link>
    </Button>
  );
}

export default CreateButton;
