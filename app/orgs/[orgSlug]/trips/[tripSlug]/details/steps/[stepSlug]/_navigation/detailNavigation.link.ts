import { LINKS } from "@feat/navigation/Links";
import type {
  GeneratedNavigationLinks,
  NavigationLinks,
} from "@feat/navigation/navigation.type";

export const DETAIL_LINKS = [
  LINKS.Trips.Steps.Detail,
  LINKS.Trips.Steps.Scheduling,
  LINKS.Trips.Steps.Files,
] satisfies NavigationLinks;

export const GetDetailLinks = (
  orgSlug: string,
  tripSlug: string,
  stepSlug: string,
): GeneratedNavigationLinks => {
  return DETAIL_LINKS.map((link) => {
    return {
      ...link,
      href: link.href({ orgSlug, tripSlug, stepSlug }),
    };
  });
};
