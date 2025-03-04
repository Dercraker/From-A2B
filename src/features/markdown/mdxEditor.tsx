import type { SchedulingSyncState } from "@feat/steps/scheduling/schedulingSyncState";
import { SchedulingSyncStateSchema } from "@feat/steps/scheduling/schedulingSyncState";
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
  syncState: SchedulingSyncState;
  onChange: (s: string) => void;
};

export const MdxEditor = ({
  markdown,
  syncState,
  onChange,
}: MdxEditorProps) => {
  return (
    <div className="relative">
      <Badge
        className={cn(
          "absolute bottom-3 right-3 z-50",
          syncState === SchedulingSyncStateSchema.enum.Syncing
            ? "border-orange-500"
            : syncState === SchedulingSyncStateSchema.enum["Not-Sync"]
              ? "border-neutral-500"
              : syncState === SchedulingSyncStateSchema.enum.Error
                ? "border-red-500"
                : null,
        )}
        variant="outline"
      >
        {syncState}{" "}
        {syncState === SchedulingSyncStateSchema.enum.Syncing && (
          <RefreshCw className="ml-2 animate-spin text-orange-500" />
        )}
      </Badge>
      <MDXEditor
        className="w-full "
        contentEditableClassName="!pt-7 [&>p]:-mt-6 [&>ul]:-mt-6 [&>ol]:-mt-6 bg-background border-dashed border-2 border-primary/70 rounded-lg rounded-tl-none border-t-0 rounded-tr-none !text-white max-w-none prose prose-invert prose-lg leading-relaxed"
        markdown={markdown ?? ""}
        placeholder="What you need to prepare your step : "
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
    </div>
  );
};
