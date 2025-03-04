"use client";

import { MdxEditor } from "@feat/markdown/mdxEditor";
import type { SchedulingSyncState } from "@feat/steps/scheduling/schedulingSyncState";
import { SchedulingSyncStateSchema } from "@feat/steps/scheduling/schedulingSyncState";
import { UpdateSchedulingNoteActionAction } from "@feat/steps/scheduling/updateSchedulingNote.action";
import { isActionSuccessful } from "@lib/actions/actions-utils";
import "@mdxeditor/editor/style.css";
import { useMutation } from "@tanstack/react-query";
import { Typography } from "@ui/typography";
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

  const [debouncedMarkdown, SetMarkdown] = useDebounceValue<string | undefined>(
    markdown ?? undefined,
    1000,
  );

  const [syncState, setSyncState] = useState<SchedulingSyncState>(
    SchedulingSyncStateSchema.enum.Sync,
  );

  useEffect(() => {
    if (!debouncedMarkdown || debouncedMarkdown === markdown) return;

    mutate({ markdown: debouncedMarkdown, stepSlug });
  }, [debouncedMarkdown]);

  return (
    <div>
      <Typography variant="h2">Notes</Typography>
      <MdxEditor
        markdown={debouncedMarkdown ?? ""}
        syncState={syncState}
        onChange={(s) => {
          setSyncState(SchedulingSyncStateSchema.enum["Not-Sync"]);
          SetMarkdown(s);
        }}
      />
    </div>
  );
};
