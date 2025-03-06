"use server";

import { authAction } from "@lib/actions/safe-actions";
import { backendClient } from "@lib/blobStorage/edgestore-server";
import { getEnvPath } from "@lib/blobStorage/getEnvPath";
import { fileToBlob } from "@utils/file";
import { AddFileQuery } from "./addFile.query";
import { AddFileSchema } from "./file.schema";

export const AddFileAction = authAction
  .schema(AddFileSchema)
  .action(async ({ parsedInput: { file, stepSlug }, ctx: { user } }) => {
    try {
      const res = await backendClient.stepFiles.upload({
        content: {
          blob: await fileToBlob(file),
          extension: file.type,
        },
        ctx: {
          userId: user.id,
          envPath: getEnvPath(),
        },
        input: { stepSlug },
      });

      return await AddFileQuery({
        stepSlug,
        data: {
          name: file.name,
          url: res.url,
          type: file.type,
          size: file.size,
          step: {
            connect: {
              slug: stepSlug,
            },
          },
        },
      });
    } catch (error) {
      console.error("Error adding file:", error);
      throw new Error("Failed to add file");
    }
  });
