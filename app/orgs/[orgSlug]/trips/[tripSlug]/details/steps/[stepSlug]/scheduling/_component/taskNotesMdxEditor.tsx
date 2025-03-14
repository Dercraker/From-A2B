import { MdxEditor } from "@feat/markdown/mdxEditor";
import {
  MdxEditorSyncStateSchema,
  type MdxEditorSyncState,
} from "@feat/markdown/MdxEditorSyncState";
import { UpdateTaskNoteActionAction } from "@feat/scheduling/task/updateTaskNote.action";
import { STEP_KEY_FACTORY } from "@feat/steps/stepKey.factory";
import { isActionSuccessful } from "@lib/actions/actions-utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDebounceValue } from "usehooks-ts";

export type TaskNotesMdxEditorProps = {
  markdown: string;
  stepSlug: string;
  tripSlug: string;
  taskId: string;
  msToDebounce?: number;
};

export const TaskNotesMdxEditor = ({
  markdown,
  stepSlug,
  tripSlug,
  taskId,
  msToDebounce = 1000,
}: TaskNotesMdxEditorProps) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async ({
      markdown,
      taskId,
    }: {
      markdown: string;
      tripSlug: string;
      stepSlug: string;
      taskId: string;
    }) => {
      setSyncState(MdxEditorSyncStateSchema.enum.Syncing);
      const result = await UpdateTaskNoteActionAction({
        markdown,
        taskId,
      });

      if (!isActionSuccessful(result)) {
        setSyncState(MdxEditorSyncStateSchema.enum.Error);
        toast.error("An error has occurred", {
          description: "Please try again later or contact support",
        });
        return;
      }

      toast.success("Task Notes as been updated");

      setSyncState(MdxEditorSyncStateSchema.enum.Sync);
      await queryClient.invalidateQueries({
        queryKey: STEP_KEY_FACTORY.Tasks(tripSlug, stepSlug),
      });

      return result.data;
    },
  });

  const [debouncedMarkdown, SetMarkdown] = useDebounceValue<string | undefined>(
    markdown ?? undefined,
    msToDebounce,
  );

  const [syncState, setSyncState] = useState<MdxEditorSyncState>(
    MdxEditorSyncStateSchema.enum.Sync,
  );

  useEffect(() => {
    if (!debouncedMarkdown || debouncedMarkdown === markdown) return;

    mutate({ markdown: debouncedMarkdown, stepSlug, tripSlug, taskId });
  }, [debouncedMarkdown]);

  return (
    <MdxEditor
      markdown={markdown}
      syncState={syncState}
      placeholder="Add notes for this task :"
      onChange={(s) => {
        setSyncState("Not-Sync");
        SetMarkdown(s);
      }}
    />
  );
};
