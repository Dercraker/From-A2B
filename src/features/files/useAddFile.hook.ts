"use client";

import { STEP_KEY_FACTORY } from "@feat/steps/stepKey.factory";
import { isActionSuccessful } from "@lib/actions/actions-utils";
import { logger } from "@lib/logger";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AddFileAction } from "./addFile.action";

type UseAddFileProps = {
  stepSlug: string;
  tripSlug: string;
};

export const useAddFile = ({ stepSlug, tripSlug }: UseAddFileProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      try {
        const result = await AddFileAction({
          file,
          stepSlug,
        });

        if (!isActionSuccessful(result)) {
          toast.error(result?.serverError ?? "Failed to add file");
          return null;
        }

        return result.data;
      } catch (error) {
        logger.error("Error uploading file:", error);
        toast.error("Failed to upload file");
        return null;
      }
    },
    onSuccess: async (data) => {
      if (data) {
        await queryClient.invalidateQueries({
          queryKey: STEP_KEY_FACTORY.Files(tripSlug, stepSlug),
        });
        toast.success("File added successfully");
      }
    },
    onError: () => {
      toast.error("Failed to add file");
    },
  });
};
