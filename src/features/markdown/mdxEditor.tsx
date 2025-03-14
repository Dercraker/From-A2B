import type { MdxEditorSyncState } from "@feat/markdown/MdxEditorSyncState";
import { MdxEditorSyncStateSchema } from "@feat/markdown/MdxEditorSyncState";
import { cn } from "@lib/utils";
import {
  AdmonitionDirectiveDescriptor,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  directivesPlugin,
  headingsPlugin,
  InsertTable,
  InsertThematicBreak,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  Separator,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from "@mdxeditor/editor";
import { Badge } from "@ui/badge";
import { RefreshCw } from "lucide-react";

export type MdxEditorProps = {
  markdown: string;
  syncState: MdxEditorSyncState;
  onChange: (s: string) => void;
  placeholder: string;
  enableBlockTypeSelect?: boolean;
  enableInsertTable?: boolean;
  enableLinkDialog?: boolean;
};

export const MdxEditor = ({
  markdown,
  syncState,
  onChange,
  placeholder,
  enableBlockTypeSelect,
  enableInsertTable,
  enableLinkDialog,
}: MdxEditorProps) => {
  return (
    <div className="relative">
      <Badge
        className={cn(
          "absolute bottom-3 right-3 z-50",
          syncState === MdxEditorSyncStateSchema.enum.Syncing
            ? "border-orange-500"
            : syncState === MdxEditorSyncStateSchema.enum["Not-Sync"]
              ? "border-neutral-500"
              : syncState === MdxEditorSyncStateSchema.enum.Error
                ? "border-red-500"
                : null,
        )}
        variant="outline"
      >
        {syncState}{" "}
        {syncState === MdxEditorSyncStateSchema.enum.Syncing && (
          <RefreshCw className="ml-2 animate-spin text-orange-500" />
        )}
      </Badge>
      <MDXEditor
        className="w-full "
        contentEditableClassName="!pt-7 [&>p]:-mt-6 [&>ul]:-mt-6 [&>ol]:-mt-6 bg-background border-dashed border-2 border-primary/70 rounded-lg rounded-tl-none border-t-0 rounded-tr-none !text-white max-w-none prose prose-invert prose-lg leading-relaxed"
        markdown={markdown ?? ""}
        placeholder={placeholder}
        onChange={onChange}
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
                {enableBlockTypeSelect && <BlockTypeSelect />}
                <Separator />
                {enableInsertTable && <InsertTable />}
                {enableLinkDialog && <CreateLink />}
                <InsertThematicBreak />
              </>
            ),
          }),
        ]}
      />
    </div>
  );
};
