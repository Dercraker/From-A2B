"use client";

import { NavigationLinksGroups } from "@/features/navigation/navigation.type";
import { NavigationLinks } from "@/features/navigation/navigationLinks";
import { OrganizationMembershipRole } from "@prisma/client";
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
