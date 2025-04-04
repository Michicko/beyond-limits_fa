"use client";

import { Button, Dialog, Field, Input, Portal, Stack } from "@chakra-ui/react";
import React, { useRef } from "react";

function FormDialog({
  btn,
  children,
  scrollable,
  name,
}: {
  btn: React.ReactElement;
  children: React.ReactElement;
  scrollable?: boolean;
  name: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <Dialog.Root
      initialFocusEl={() => ref.current}
      placement={"center"}
      scrollBehavior={scrollable ? "inside" : "outside"}
    >
      <Dialog.Trigger asChild>{btn}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner p={"5"}>
          <Dialog.Content p={"4"}>
            <Dialog.Header px={"10px"}>
              <Dialog.Title
                color={"text_lg"}
                fontSize={"xl"}
                fontWeight={"semibold"}
                mb={"20px"}
              >
                Create {name}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body px={"10px"} pb={"20px"}>
              {children}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default FormDialog;
