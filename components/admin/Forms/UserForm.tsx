"use client";
import React, { useRef, useState, useTransition } from "react";
import FormContainer from "./FormContainer";
import { Field, Input, Skeleton, Stack } from "@chakra-ui/react";
import FormLabel from "./FormLabel";
import RequiredLabel from "./RequiredLabel";
import FormBtn from "./FormBtn";
import { formDataToObject, getButtonStatus } from "@/lib/helpers";
import useToast from "@/hooks/useToast";
import { useRouter } from "next/navigation";

function UserForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const { mutationPromiseToast } = useToast();
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const success = {
    title: "user created",
    desc: `user created successfully!`,
  };
  const err = {
    title: "Error creating user",
    desc: `Failed to create user`,
  };
  const loading = {
    title: "creating user",
    desc: `creating user, please wait...`,
  };

  const onSuccess = () => {
    router.refresh();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userDetails = formDataToObject(formData);
    setIsPending(true);

    const promise = fetch("/api/create-user", {
      method: "POST",
      body: JSON.stringify(userDetails),
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "failed creating user");
      }
      return data;
    });

    mutationPromiseToast(
      promise,
      success,
      err,
      loading,
      setIsPending,
      onSuccess
    );
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit} ref={formRef}>
        <Stack gap={5} mb={10}>
          <Skeleton asChild loading={false}>
            <Field.Root required>
              <FormLabel>
                username <RequiredLabel />
              </FormLabel>
              <Input
                name={"username"}
                type={"text"}
                placeholder="Enter username"
                px={"2"}
                color={"text_lg"}
                fontSize={"sm"}
                fontWeight={"medium"}
                mb={"5px"}
              />
            </Field.Root>
          </Skeleton>
          <Field.Root required>
            <FormLabel>
              name <RequiredLabel />
            </FormLabel>
            <Input
              name={"name"}
              type={"text"}
              placeholder="Enter name"
              px={"2"}
              color={"text_lg"}
              fontSize={"sm"}
              fontWeight={"medium"}
              mb={"5px"}
            />
          </Field.Root>
          <Field.Root required>
            <FormLabel>
              email <RequiredLabel />
            </FormLabel>
            <Input
              name={"email"}
              type={"email"}
              placeholder="Enter email"
              px={"2"}
              color={"text_lg"}
              fontSize={"sm"}
              fontWeight={"medium"}
              mb={"5px"}
            />
          </Field.Root>
          <Field.Root required>
            <FormLabel>
              password <RequiredLabel />
            </FormLabel>
            <Input
              name={"password"}
              type={"text"}
              placeholder="Enter password"
              px={"2"}
              color={"text_lg"}
              fontSize={"sm"}
              fontWeight={"medium"}
              mb={"5px"}
            />
          </Field.Root>
          <FormBtn disabled={isPending}>
            {getButtonStatus(null, "user", isPending)}
          </FormBtn>
        </Stack>
      </form>
    </FormContainer>
  );
}

export default UserForm;
