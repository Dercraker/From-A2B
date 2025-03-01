import { z } from "zod";

export const SchedulingSyncStateSchema = z.enum([
  "Sync",
  "Not-Sync",
  "Syncing",
  "Error",
]);

export type SchedulingSyncState = z.infer<typeof SchedulingSyncStateSchema>;
