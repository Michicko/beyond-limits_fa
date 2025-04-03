import { Field, Text } from "@chakra-ui/react";
import React from "react";

function FormLabel({
  children,
  as,
}: {
  children: React.ReactNode;
  as?: string;
}) {
  const labelStyles = {
    color: "text_lg",
    alignSelf: "flex-start",
    textTransform: "capitalize",
  };
  return as === "Text" ? (
    <Text css={labelStyles} mb={"5"} fontWeight={500}>
      {children}
    </Text>
  ) : (
    <Field.Label css={labelStyles} fontSize={"sm"} color={"text_md"}>
      {children}
    </Field.Label>
  );
}

export default FormLabel;
