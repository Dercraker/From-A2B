import { z } from "zod";

export const FileTypeSchema = z.enum(["Account", "Trip"]);

export type FileType = z.infer<typeof FileTypeSchema>;
