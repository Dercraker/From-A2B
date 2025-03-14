import { z } from "zod";

export const UserPlanSchema = z.enum(["FREE", "PREMIUM"]);

export type UserPlanType = `${z.infer<typeof UserPlanSchema>}`;

export default UserPlanSchema;
