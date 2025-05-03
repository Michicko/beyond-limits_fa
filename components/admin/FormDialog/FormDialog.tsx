"use client";

import { Button, Dialog, HStack, Portal } from "@chakra-ui/react";
import React, { useRef } from "react";

function FormDialog({
  btn,
  children,
  scrollable,
  name,
  openForm,
  setOpenForm,
}: {
  btn: React.ReactElement;
  children: React.ReactElement;
  scrollable?: boolean;
  name: string;
  openForm?: boolean;
  setOpenForm?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <Dialog.Root
      initialFocusEl={() => ref.current}
      placement={"center"}
      scrollBehavior={scrollable ? "inside" : "outside"}
      closeOnInteractOutside={false}
      modal={false}
      open={openForm}
      onOpenChange={(details) => setOpenForm?.(details.open)} //
    >
      <Dialog.Trigger asChild>{btn}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner p={"5"} pointerEvents={"none"}>
          <Dialog.Content p={"4"}>
            <Dialog.Header px={"10px"} w={"full"}>
              <HStack justifyContent={"space-between"} w={"full"}>
                <Dialog.Title
                  color={"text_lg"}
                  fontSize={"xl"}
                  fontWeight={"semibold"}
                  mb={"20px"}
                >
                  Create {name}
                </Dialog.Title>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline" px={"10px"}>
                    Cancel
                  </Button>
                </Dialog.ActionTrigger>
              </HStack>
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
