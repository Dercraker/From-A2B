"use server";

import { authAction } from "@lib/actions/safe-actions";
import { DeleteFileQuery } from "./deleteFile.query";
import { DeleteFileSchema } from "./file.schema";

export const DeleteFileAction = authAction
  .schema(DeleteFileSchema)
  .action(async ({ parsedInput: { fileId, url } }) => {
    try {
      const file = await DeleteFileQuery({ fileId, url });

      // TODO: La suppression du fichier du stockage doit être gérée côté client
      // car useEdgeStore est un hook client

      return file;
    } catch (error) {
      console.error("Error deleting file:", error);
      throw new Error("Failed to delete file");
    }
  });
