import { z } from "zod";

export const FileSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string().url(),
  type: z.string(),
  size: z.number(),
  uploadedAt: z.date(),
  stepId: z.string(),
});

export type FileDto = z.infer<typeof FileSchema>;

export const AddFileSchema = z.object({
  file: z.instanceof(File),
  stepSlug: z.string(),
});

export type AddFileSchemaType = z.infer<typeof AddFileSchema>;

export const DeleteFileSchema = z.object({
  fileId: z.string(),
  url: z.string().url(),
});

export type DeleteFileSchemaType = z.infer<typeof DeleteFileSchema>;
