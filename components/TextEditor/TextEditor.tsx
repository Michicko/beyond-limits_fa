"use client";
import React, { Component, useEffect } from "react";
import clsx from "clsx";
import styles from "./TextEditor.module.css";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle, { TextStyleOptions } from "@tiptap/extension-text-style";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] } as Partial<TextStyleOptions>),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

function TextEditor({
  content,
  setContent,
  handleOnUpdate,
  readOnly,
}: {
  content: JSONContent | string;
  setContent?: React.Dispatch<React.SetStateAction<JSONContent>>;
  handleOnUpdate?: (json: JSONContent) => void;
  readOnly?: boolean;
}) {
  const editor = useEditor({
    extensions,
    content: Object.keys(content).length > 0 ? content : ``,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      if (setContent) {
        setContent(editor.getJSON());
      }
      if (handleOnUpdate) {
        handleOnUpdate(editor.getJSON());
      }
    },
  });

  if (!editor) {
    return <div className={clsx(styles["editor-dummy"])}></div>;
  }

  if (readOnly) {
    editor.setEditable(false);
  }

  return (
    <div className={clsx(styles.editor, readOnly && styles["read-only"])}>
      {!readOnly && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}

export default TextEditor;
