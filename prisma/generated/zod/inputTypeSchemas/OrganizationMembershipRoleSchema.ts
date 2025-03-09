import { z } from "zod";

export const OrganizationMembershipRoleSchema = z.enum([
  "OWNER",
  "ADMIN",
  "MEMBER",
]);

export type OrganizationMembershipRoleType =
  `${z.infer<typeof OrganizationMembershipRoleSchema>}`;

export default OrganizationMembershipRoleSchema;
