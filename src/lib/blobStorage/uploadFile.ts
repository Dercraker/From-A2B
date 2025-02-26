import { fileToBlob } from "@utils/file";
import { nanoid } from "nanoid";
import { z } from "zod";
import { backendClient } from "./edgestore-server";
import { getEnvPath } from "./getEnvPath";

const UploadProfileSchema = z.object({
  file: z.instanceof(File),
  userId: z.string(),
  oldPicturePath: z.string().url().optional(),
});

type UploadProfileInput = z.infer<typeof UploadProfileSchema>;

export const uploadProfilePicture = async ({
  file,
  userId,
  oldPicturePath,
}: UploadProfileInput) =>
  backendClient.profilePictures.upload({
    content: {
      blob: await fileToBlob(file),
      extension: file.type,
    },
    ctx: {
      userId: userId,
      envPath: getEnvPath(),
    },
    options: {
      manualFileName: `${userId}-${nanoid()}`,
      replaceTargetUrl: oldPicturePath,
    },
  });
