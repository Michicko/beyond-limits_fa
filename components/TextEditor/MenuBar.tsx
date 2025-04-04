"use client";
import React, { useState } from "react";
import { Editor } from "@tiptap/react";
import { getIcon } from "@/lib/icons";
import styles from "./TextEditor.module.css";
import clsx from "clsx";
import { Flex, IconButton, Menu, Portal } from "@chakra-ui/react";

const colors = [
  "rgb(97,189,109)",
  "rgb(26,188,156)",
  "rgb(84,172,210)",
  "rgb(44,130,201)",
  "rgb(147,101,184)",
  "rgb(71,85,119)",
  "rgb(204,204,204)",
  "rgb(65,168,95)",
  "rgb(0,168,133)",
  "rgb(61,142,185)",
  "rgb(50, 123, 192)",
  "rgb(1, 48, 91)",
  "rgb(85,57,130)",
  "rgb(40,50,78)",
  "rgb(0,0,0)",
  "rgb(255, 215, 0)",
  "rgb(215, 155, 0)",
  "rgb(235,107,86)",
  "rgb(226,80,65)",
  "rgb(163,143,132)",
  "rgb(239,239,239)",
  "rgb(255,255,255)",
  "rgb(250,197,28)",
  "rgb(243,121,52)",
  "rgb(209,72,65)",
  "rgb(184,49,47)",
  "rgb(124,112,107)",
  "rgb(209,213,216)",
];

function MenuBar({ editor }: { editor: Editor }) {
  const [textColor, setTextColor] = useState("#000000");

  if (!editor) {
    return null;
  }

  const handleColor = (color: string) => {
    setTextColor(color);
    editor.chain().focus().setColor(color).run();
  };

  return (
    <div className={clsx(styles["menubar"])}>
      <div className={clsx(styles["menubar__btns"])}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? styles["is-active"] : ""}
          title="bold"
          style={{ background: "card_bg" }}
        >
          {getIcon("bold")}
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? styles["is-active"] : ""}
          title="italic"
        >
          {getIcon("italic")}
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? styles["is-active"] : ""}
          title="strike"
        >
          {getIcon("strike")}
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? styles["is-active"] : ""}
          title="paragraph"
        >
          {getIcon("paragraph")}
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? styles["is-active"] : ""
          }
          title="h1"
        >
          {getIcon("h1")}
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? styles["is-active"] : ""
          }
          title="h2"
        >
          {getIcon("h2")}
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? styles["is-active"] : ""
          }
          title="h3"
        >
          {getIcon("h3")}
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 }) ? styles["is-active"] : ""
          }
          title="h4"
        >
          {getIcon("h4")}
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive("heading", { level: 5 }) ? styles["is-active"] : ""
          }
          title="h5"
        >
          {getIcon("h5")}
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive("heading", { level: 6 }) ? styles["is-active"] : ""
          }
          title="h6"
        >
          {getIcon("h6")}
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? styles["is-active"] : ""}
          title="bullet list"
        >
          {getIcon("bullet-list")}
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? styles["is-active"] : ""}
          title="ordered list"
        >
          {getIcon("ordered-list")}
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? styles["is-active"] : ""}
          title="blockquote"
        >
          {getIcon("blockquote")}
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="line"
        >
          {getIcon("hr")}
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHardBreak().run()}
          title="return"
        >
          {getIcon("break")}
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          title="undo"
        >
          {getIcon("undo")}
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          title="redo"
        >
          {getIcon("redo")}
        </button>
        <Menu.Root>
          <Menu.Trigger asChild title="color picker">
            <IconButton
              size="md"
              color={
                editor.isActive("textStyle", { color: textColor })
                  ? textColor
                  : "text_lg"
              }
              border={"1px solid gray"}
              borderRadius={"0"}
              bg={"rgba(0, 0,0,0)"}
            >
              {getIcon("color")}
            </IconButton>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Flex flexWrap={"wrap"} p={"2"} gap={"1"}>
                  {colors.map((color) => {
                    return (
                      <Menu.Item
                        value={color}
                        h={"4"}
                        w={"calc(100% / 5)"}
                        bg={color}
                        onClick={() => handleColor(color)}
                        key={color}
                      ></Menu.Item>
                    );
                  })}
                </Flex>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </div>
    </div>
  );
}

export default MenuBar;
