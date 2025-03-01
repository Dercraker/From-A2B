"use client";

import type { SchedulingSyncState } from "@feat/steps/scheduling/schedulingSyncState";
import { SchedulingSyncStateSchema } from "@feat/steps/scheduling/schedulingSyncState";
import { UpdateSchedulingNoteActionAction } from "@feat/steps/scheduling/updateSchedulingNote.action";
import { isActionSuccessful } from "@lib/actions/actions-utils";
import { cn } from "@lib/utils";
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
import { useMutation } from "@tanstack/react-query";
import { Badge } from "@ui/badge";
import { RefreshCw } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useDebounceValue } from "usehooks-ts";

type ScheduleNotesMdxEditorProps = {
  markdown?: string;
};

/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs.
 */
export const ScheduleNotesMdxEditor = ({
  markdown,
}: ScheduleNotesMdxEditorProps) => {
  const { stepSlug } = useParams<{
    stepSlug: string;
  }>();

  const [debouncedMarkdown, SetMarkdown] = useDebounceValue<string | undefined>(
    markdown ?? undefined,
    1000,
  );

  const [syncState, setSyncState] = useState<SchedulingSyncState>(
    SchedulingSyncStateSchema.enum.Sync,
  );

  const { mutate } = useMutation({
    mutationFn: async ({
      markdown,
      stepSlug,
    }: {
      markdown: string;
      stepSlug: string;
    }) => {
      setSyncState(SchedulingSyncStateSchema.enum.Syncing);
      const result = await UpdateSchedulingNoteActionAction({
        markdown,
        stepSlug,
      });

      if (!isActionSuccessful(result)) {
        setSyncState(SchedulingSyncStateSchema.enum.Error);
        return toast.error("An error has occurred", {
          description: "Please try again later or contact support",
        });
      }

      toast.success("Scheduling Note as been updated");

      setSyncState(SchedulingSyncStateSchema.enum.Sync);

      return result.data;
    },
  });

  useEffect(() => {
    if (!debouncedMarkdown || debouncedMarkdown === markdown) return;

    mutate({ markdown: debouncedMarkdown, stepSlug });
  }, [debouncedMarkdown]);

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
        markdown={debouncedMarkdown ?? ""}
        placeholder="What you need to prepare your step : "
        onChange={async (s) => {
          setSyncState(SchedulingSyncStateSchema.enum["Not-Sync"]);
          SetMarkdown(s);
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
    </div>
  );
};
