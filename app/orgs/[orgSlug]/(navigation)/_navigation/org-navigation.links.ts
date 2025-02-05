import { LINKS } from "@/features/navigation/Links";
import type {
  NavigationLink,
  NavigationLinks,
  NavigationLinksGroup,
  NavigationLinksGroups,
} from "@/features/navigation/navigation.type";
import { isInRoles } from "@/lib/organizations/isInRoles";
import type { OrganizationMembershipRole } from "@prisma/client";

const replaceSlug = (href: string, slug: string) => {
  return href.replace(":organizationSlug", slug);
};

export const getOrganizationNavigation = (
  slug: string,
  userRoles: OrganizationMembershipRole[] | undefined,
): NavigationLinksGroups => {
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
            href: replaceSlug(link.href, slug),
          };
        }),
    };
  });
};

export const GenerateOrganizationLink = (href: string, orgSlug: string) =>
  replaceSlug(href, orgSlug);

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
