import { z } from "zod";

export const FileScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "url",
  "type",
  "size",
  "uploadedAt",
  "stepId",
]);

export default FileScalarFieldEnumSchema;
