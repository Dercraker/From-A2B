"use client";

import { STEP_KEY_FACTORY } from "@feat/steps/stepKey.factory";
import { isActionSuccessful } from "@lib/actions/actions-utils";
import { useEdgeStore } from "@lib/blobStorage/edgestore";
import { logger } from "@lib/logger";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DeleteFileAction } from "./deleteFile.action";

type UseDeleteFileProps = {
  stepSlug: string;
  tripSlug: string;
};

export const useDeleteFile = ({ stepSlug, tripSlug }: UseDeleteFileProps) => {
  const queryClient = useQueryClient();
  const { edgestore } = useEdgeStore();

  return useMutation({
    mutationFn: async ({ fileId, url }: { fileId: string; url: string }) => {
      try {
        // 1. Supprimer le fichier de EdgeStore
        await edgestore.stepFiles.delete({
          url,
        });

        // 2. Supprimer les métadonnées de la base de données
        const result = await DeleteFileAction({
          fileId,
          url,
        });

        if (!isActionSuccessful(result)) {
          toast.error(result?.serverError ?? "Failed to delete file");
          return null;
        }

        toast.success("File deleted successfully");

        await queryClient.invalidateQueries({
          queryKey: STEP_KEY_FACTORY.Files(tripSlug, stepSlug),
        });
        return result.data;
      } catch (error) {
        logger.error("Error deleting file:", error);
        toast.error("Failed to delete file");
        return null;
      }
    },
    onError: () => {
      toast.error("Failed to delete file");
    },
  });
};
