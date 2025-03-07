import { LINKS } from "@feat/navigation/Links";
import type {
  GeneratedNavigationLinksGroups,
  NavigationLink,
  NavigationLinks,
  NavigationLinksGroup,
  NavigationLinksGroups,
} from "@feat/navigation/navigation.type";
import { isInRoles } from "@lib/organizations/isInRoles";
import type { OrganizationMembershipRole } from "@prisma/client";

export const ORGANIZATION_LINKS: NavigationLinksGroups = [
  {
    title: "Menu",
    links: [
      LINKS.Organization.Dashboard,
      LINKS.Organization.Trips,
      LINKS.Organization.History,
    ] satisfies NavigationLinks,
  } satisfies NavigationLinksGroup,
] satisfies NavigationLinksGroups;

export const getOrganizationNavigation = (
  orgSlug: string,
  userRoles: OrganizationMembershipRole[] | undefined,
): GeneratedNavigationLinksGroups => {
  return ORGANIZATION_LINKS.map((group: NavigationLinksGroup) => {
    return {
      ...group,
      links: group.links
        .filter((link: NavigationLink) =>
          link.roles ? isInRoles(userRoles, link.roles) : true,
        )
        .map((link: NavigationLink) => {
          return {
            ...link,
            href: link.href({ orgSlug }),
          };
        }),
    };
  });
};
