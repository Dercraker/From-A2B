import { LINKS } from "@feat/navigation/Links";
import type {
  GeneratedNavigationLinksGroups,
  NavigationLink,
  NavigationLinks,
  NavigationLinksGroup,
  NavigationLinksGroups,
} from "@feat/navigation/navigation.type";

export const TRIP_LINKS: NavigationLinksGroups = [
  {
    title: "Current Trip",
    links: [
      LINKS.Trips.Itinerary,
      LINKS.Trips.Details,
      LINKS.Trips.Steps.StepsList,
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

export const getTripNavigationLinks = (
  orgSlug: string,
  tripSlug: string,
): GeneratedNavigationLinksGroups => {
  const linkParams = {
    orgSlug,
    tripSlug,
  };

  return TRIP_LINKS.map((group: NavigationLinksGroup) => {
    return {
      ...group,
      links: group.links.map((link: NavigationLink) => {
        return {
          ...link,
          href: link.href(linkParams),
        };
      }),
    };
  });
};
