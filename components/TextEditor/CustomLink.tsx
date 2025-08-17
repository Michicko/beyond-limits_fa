import Link from "next/link";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { Link as TiptapLink } from "@tiptap/extension-link";
import { mergeAttributes } from "@tiptap/core";

const CustomLinkComponent = (props: any) => {
  const { node, children } = props;
  const { href, target } = node.attrs;

  if (target === "_blank") {
    return (
      <NodeViewWrapper as="span">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.preventDefault()}
        >
          {children}
        </a>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper as="span">
      <Link href={href} onClick={(e) => e.preventDefault()}>
        {children}
      </Link>
    </NodeViewWrapper>
  );
};

export const CustomLink = TiptapLink.extend({
  inclusive: false,

  addOptions() {
    return {
      ...this.parent?.(),
      inclusive: false,
      openOnClick: false,
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ["a", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CustomLinkComponent);
  },
});
