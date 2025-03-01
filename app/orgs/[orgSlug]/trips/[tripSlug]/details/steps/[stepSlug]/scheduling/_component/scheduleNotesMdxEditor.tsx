"use client";

import {
  AdmonitionDirectiveDescriptor,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  MDXEditor,
  Separator,
  UndoRedo,
  directivesPlugin,
  headingsPlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

type ScheduleNotesMdxEditorProps = {};

/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs.
 */
export const ScheduleNotesMdxEditor = (props: ScheduleNotesMdxEditorProps) => {
  const markdown = "What you need to prepare your stage : ";

  return (
    <MDXEditor
      className="w-full"
      contentEditableClassName="prose prose-invert  bg-background border-dashed border-2 border-primary/70 rounded-lg rounded-tl-none border-t-0 rounded-tr-none !text-white max-w-none"
      markdown={markdown}
      onChange={(s) => {
        console.log("ON change !!!");
      }}
      plugins={[
        listsPlugin(),
        quotePlugin(),
        headingsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),

        tablePlugin(),
        thematicBreakPlugin(),
        directivesPlugin({
          directiveDescriptors: [AdmonitionDirectiveDescriptor],
        }),
        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <Separator />
              <BoldItalicUnderlineToggles />
              <Separator />
              <ListsToggle />
              <BlockTypeSelect />
              <Separator />
              <InsertTable />
              <CreateLink />
              <InsertThematicBreak />
            </>
          ),
        }),
      ]}
    />
  );
};
