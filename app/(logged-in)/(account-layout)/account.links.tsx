import { LINKS } from "@feat/navigation/Links";
import type {
  NavigationLinks,
  NavigationLinksGroup,
  NavigationLinksGroups,
} from "@feat/navigation/navigation.type";

export const getAccountNavigation = (): NavigationLinksGroups => {
  return ACCOUNT_LINKS;
};

const ACCOUNT_LINKS: NavigationLinksGroups = [
  {
    title: "Your profile",
    links: [
      LINKS.Account.Profile,
      LINKS.Account.Mail,
      LINKS.Account.Danger,
      LINKS.Account.Billing,
    ] satisfies NavigationLinks,
  } satisfies NavigationLinksGroup,
] satisfies NavigationLinksGroups;
