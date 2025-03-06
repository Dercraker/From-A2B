import { LINKS } from "@feat/navigation/Links";
import type { NavigationLinks } from "@feat/navigation/navigation.type";

export const DETAIL_LINKS = [
  LINKS.Trips.Steps.Detail,
  LINKS.Trips.Steps.Scheduling,
  LINKS.Trips.Steps.Files,
] satisfies NavigationLinks;
