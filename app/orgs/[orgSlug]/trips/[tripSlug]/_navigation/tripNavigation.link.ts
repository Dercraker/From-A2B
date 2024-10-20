import { LINKS } from "@/features/navigation/Links";
import {
  NavigationLink,
  NavigationLinks,
  NavigationLinksGroup,
  NavigationLinksGroups,
} from "@/features/navigation/navigation.type";

const replaceSlugs = (href: string, orgSlug: string, tripSlug: string) => {
  return href
    .replace(":organizationSlug", orgSlug)
    .replace(":tripSlug", tripSlug);
};

export const getTripNavigationLinks = (
  orgSlug: string,
  tripSlug: string,
): NavigationLinksGroups => {
  return TRIP_LINKS.map((group: NavigationLinksGroup) => {
    return {
      ...group,
      links: group.links.map((link: NavigationLink) => {
        return {
          ...link,
          href: replaceSlugs(link.href, orgSlug, tripSlug),
        };
      }),
    };
  });
};

export const TRIP_LINKS: NavigationLinksGroups = [
  {
    title: "Current Trip",
    links: [
      LINKS.Trips.Itinerary,
      // LINKS.Trips.Details,
    ] satisfies NavigationLinks,
  },
  {
    title: "Dashboard",
    links: [
      LINKS.Organization.Dashboard,
      LINKS.Organization.Trips,
      LINKS.Organization.History,
    ] satisfies NavigationLinks,
  } satisfies NavigationLinksGroup,
] satisfies NavigationLinksGroups;
