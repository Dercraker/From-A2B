import { fileToBlob } from "@utils/file";
import { nanoid } from "nanoid";
import { z } from "zod";
import { backendClient } from "./edgestore-server";
import { getEnvPath } from "./getEnvPath";

const UploadPictureSchema = z.object({
  file: z.instanceof(File).or(z.instanceof(Blob)),
  entityId: z.string(),
  userId: z.string(),
  oldPicturePath: z.string().url().optional(),
});

type UploadPictureSchema = z.infer<typeof UploadPictureSchema>;

export const uploadProfilePicture = async ({
  file,
  userId,
  oldPicturePath,
}: UploadPictureSchema) =>
  backendClient.profilePictures.upload({
    content: {
      blob: file instanceof Blob ? file : await fileToBlob(file),
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

export const uploadTripPicture = async ({
  file,
  entityId: tripSlug,
  userId,
  oldPicturePath,
}: UploadPictureSchema) =>
  backendClient.tripPictures.upload({
    content: {
      blob: file instanceof Blob ? file : await fileToBlob(file),
      extension: file.type,
    },
    ctx: {
      userId: userId,
      envPath: getEnvPath(),
    },
    input: {
      tripSlug,
    },
    options: {
      manualFileName: `${tripSlug}-${nanoid()}`,
      replaceTargetUrl: oldPicturePath,
    },
  });
