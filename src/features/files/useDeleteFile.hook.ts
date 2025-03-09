"use client";

import { STEP_KEY_FACTORY } from "@feat/steps/stepKey.factory";
import { isActionSuccessful } from "@lib/actions/actions-utils";
import { useEdgeStore } from "@lib/blobStorage/edgestore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DeleteFileAction } from "./deleteFile.action";
import { logger } from "@lib/logger";

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
          toast.error(
            result?.serverError ?? "Échec de la suppression du fichier",
          );
          return null;
        }

        return result.data;
      } catch (error) {
        logger.error("Error deleting file:", error);
        toast.error("Échec de la suppression du fichier");
        return null;
      }
    },
    onSuccess: async (data) => {
      if (data) {
        await queryClient.invalidateQueries({
          queryKey: STEP_KEY_FACTORY.Files(tripSlug, stepSlug),
        });
        toast.success("Fichier supprimé avec succès");
      }
    },
    onError: () => {
      toast.error("Échec de la suppression du fichier");
    },
  });
};
