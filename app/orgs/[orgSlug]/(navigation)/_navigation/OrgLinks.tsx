"use client";

import type { GeneratedNavigationLinksGroups } from "@feat/navigation/navigation.type";
import { NavigationLinks } from "@feat/navigation/navigationLinks";
import type { OrganizationMembershipRole } from "@prisma/client";
import { getOrganizationNavigation } from "./orgNavigation.links";

export const OrganizationNavigationLinks = ({
  slug,
  roles,
}: {
  slug: string;
  roles: OrganizationMembershipRole[] | undefined;
}) => {
  const organizationNavigation: GeneratedNavigationLinksGroups =
    getOrganizationNavigation(slug, roles);
  return <NavigationLinks navigation={organizationNavigation} />;
};
