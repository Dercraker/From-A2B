"use client";

import { NavigationLinks } from "@feat/navigation/navigationLinks";
import { getAccountNavigation } from "./account.links";

export const AccountNavigationLinks = () => {
  const accountNavigation = getAccountNavigation();

  return <NavigationLinks navigation={accountNavigation} />;
};
