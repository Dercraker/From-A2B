"use client";

import { StartTourBadge } from "@components/nextStepJs/StartTourBadge";
import { MdxEditor } from "@feat/markdown/mdxEditor";
import type { MdxEditorSyncState } from "@feat/markdown/MdxEditorSyncState";
import { MdxEditorSyncStateSchema } from "@feat/markdown/MdxEditorSyncState";
import { UpdateSchedulingNoteActionAction } from "@feat/steps/scheduling/updateSchedulingNote.action";
import { isActionSuccessful } from "@lib/actions/actions-utils";
import { getTourStepSelector, TourNames } from "@lib/onBoarding/nextStepTours";
import "@mdxeditor/editor/style.css";
import { useMutation } from "@tanstack/react-query";
import type { StepPathParams } from "@type/next";
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
  const { stepSlug } = useParams<StepPathParams>();

  const { mutate } = useMutation({
    mutationFn: async ({
      markdown,
      stepSlug,
    }: {
      markdown: string;
      stepSlug: string;
    }) => {
      setSyncState(MdxEditorSyncStateSchema.enum.Syncing);
      const result = await UpdateSchedulingNoteActionAction({
        markdown,
        stepSlug,
      });

      if (!isActionSuccessful(result)) {
        setSyncState(MdxEditorSyncStateSchema.enum.Error);
        return toast.error("An error has occurred", {
          description: "Please try again later or contact support",
        });
      }

      toast.success("Scheduling Note as been updated");

      setSyncState(MdxEditorSyncStateSchema.enum.Sync);

      return result.data;
    },
  });

  const [debouncedMarkdown, SetMarkdown] = useDebounceValue<string | undefined>(
    markdown ?? undefined,
    1000,
  );

  const [syncState, setSyncState] = useState<MdxEditorSyncState>(
    MdxEditorSyncStateSchema.enum.Sync,
  );

  useEffect(() => {
    if (!debouncedMarkdown || debouncedMarkdown === markdown) return;

    mutate({ markdown: debouncedMarkdown, stepSlug });
  }, [debouncedMarkdown]);

  return (
    <div id={getTourStepSelector(TourNames.StepSchedulingTour, "Notes")}>
      <Typography variant="h2" className="flex items-center gap-2">
        Notes
        <StartTourBadge
          tourName={TourNames.StepSchedulingTour}
          tooltip="Tour : Step Scheduling"
          className="size-5"
        />
      </Typography>
      <MdxEditor
        markdown={debouncedMarkdown ?? ""}
        syncState={syncState}
        placeholder="What you need to prepare your step : "
        onChange={(s) => {
          setSyncState(MdxEditorSyncStateSchema.enum["Not-Sync"]);
          SetMarkdown(s);
        }}
        enableBlockTypeSelect
        enableInsertTable
        enableLinkDialog
      />
    </div>
  );
};
