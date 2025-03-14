import { z } from "zod";

export const IsMaintenanceEnabledSchema = z.object({
  time: z.string(),
});

export type IsMaintenanceEnabled = z.infer<typeof IsMaintenanceEnabledSchema>;
