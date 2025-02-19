"use client";

import type { NavigationLinksGroups } from "@feat/navigation/navigation.type";
import { NavigationLinks } from "@feat/navigation/navigationLinks";
import type { OrganizationMembershipRole } from "@prisma/client";
import { getOrganizationNavigation } from "./org-navigation.links";

export const OrganizationNavigationLinks = ({
  slug,
  roles,
}: {
  slug: string;
  roles: OrganizationMembershipRole[] | undefined;
}) => {
  const organizationNavigation: NavigationLinksGroups =
    getOrganizationNavigation(slug, roles);
  return <NavigationLinks navigation={organizationNavigation} />;
};
