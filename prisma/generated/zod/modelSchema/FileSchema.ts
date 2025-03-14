import { z } from "zod";
import {
  StepWithRelationsSchema,
  StepOptionalDefaultsWithRelationsSchema,
} from "./StepSchema";
import type {
  StepWithRelations,
  StepOptionalDefaultsWithRelations,
} from "./StepSchema";

/////////////////////////////////////////
// FILE SCHEMA
/////////////////////////////////////////

export const FileSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  url: z.string(),
  type: z.string(),
  size: z.number().int(),
  uploadedAt: z.coerce.date(),
  stepId: z.string(),
});

export type File = z.infer<typeof FileSchema>;

/////////////////////////////////////////
// FILE OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const FileOptionalDefaultsSchema = FileSchema.merge(
  z.object({
    id: z.string().cuid().optional(),
    uploadedAt: z.coerce.date().optional(),
  }),
);

export type FileOptionalDefaults = z.infer<typeof FileOptionalDefaultsSchema>;

/////////////////////////////////////////
// FILE RELATION SCHEMA
/////////////////////////////////////////

export type FileRelations = {
  step?: StepWithRelations | null;
};

export type FileWithRelations = z.infer<typeof FileSchema> & FileRelations;

export const FileWithRelationsSchema: z.ZodType<FileWithRelations> =
  FileSchema.merge(
    z.object({
      step: z.lazy(() => StepWithRelationsSchema).nullable(),
    }),
  );

/////////////////////////////////////////
// FILE OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type FileOptionalDefaultsRelations = {
  step?: StepOptionalDefaultsWithRelations | null;
};

export type FileOptionalDefaultsWithRelations = z.infer<
  typeof FileOptionalDefaultsSchema
> &
  FileOptionalDefaultsRelations;

export const FileOptionalDefaultsWithRelationsSchema: z.ZodType<FileOptionalDefaultsWithRelations> =
  FileOptionalDefaultsSchema.merge(
    z.object({
      step: z.lazy(() => StepOptionalDefaultsWithRelationsSchema).nullable(),
    }),
  );

export default FileSchema;
