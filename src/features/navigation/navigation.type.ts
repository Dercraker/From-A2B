import { OrganizationMembershipRole } from "@prisma/client";
import type { LucideIcon } from "lucide-react";
import { z } from "zod";

export type NavigationGroup = {
  title: string;
  roles?: OrganizationMembershipRole[];
  links: NavigationLink[];
};

const NavigationLinkSchema = z.object({
  href: z.string(),
  Icon: z.custom<LucideIcon>().optional(),
  label: z.string(),
  roles: z.array(z.nativeEnum(OrganizationMembershipRole)).optional(),
  hidden: z.boolean().optional(),
  disabled: z.boolean().optional(),
});

const NavigationLinksSchema = z.array(NavigationLinkSchema);

const GenericLinkSchema = z.record(
  z.union([NavigationLinkSchema, z.record(NavigationLinkSchema)]),
);

const NavigationLinksGroup = z.object({
  title: z.string(),
  roles: z.array(z.nativeEnum(OrganizationMembershipRole)).optional(),
  links: NavigationLinksSchema,
});

const NavigationLinksGroups = z.array(NavigationLinksGroup);

export type NavigationLink = z.infer<typeof NavigationLinkSchema>;
export type NavigationLinks = z.infer<typeof NavigationLinksSchema>;
export type GenericLinkSchema = z.infer<typeof GenericLinkSchema>;
export type NavigationLinksGroup = z.infer<typeof NavigationLinksGroup>;
export type NavigationLinksGroups = z.infer<typeof NavigationLinksGroups>;
