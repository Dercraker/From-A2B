import { z } from "zod";

export const MdxEditorSyncStateSchema = z.enum([
  "Sync",
  "Not-Sync",
  "Syncing",
  "Error",
]);

export type MdxEditorSyncState = z.infer<typeof MdxEditorSyncStateSchema>;
