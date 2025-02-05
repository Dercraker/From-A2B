"use client";

import type { NavigationLinksGroups } from "@/features/navigation/navigation.type";
import { NavigationLinks } from "@/features/navigation/navigationLinks";
import { getTripNavigationLinks } from "./tripNavigation.link";

export const TripNavigationLinks = ({
  orgSlug,
  tripSlug,
}: {
  orgSlug: string;
  tripSlug: string;
}) => {
  const tripNavigation: NavigationLinksGroups = getTripNavigationLinks(
    orgSlug,
    tripSlug,
  );
  return <NavigationLinks navigation={tripNavigation} />;
};
