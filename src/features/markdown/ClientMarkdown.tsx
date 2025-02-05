import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";
import Markdown from "react-markdown";
import { rehypePlugins, remarkPlugins } from "./markdown.config";

type ClientMarkdownProps = ComponentPropsWithoutRef<typeof Markdown>;

export const ClientMarkdown = ({
  children,
  className,
  ...props
}: ClientMarkdownProps) => {
  return (
    <Markdown
      rehypePlugins={rehypePlugins}
      remarkPlugins={remarkPlugins}
      className={cn("prose dark:prose-invert", className)}
      {...props}
    >
      {children}
    </Markdown>
  );
};
