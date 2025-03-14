import { LINKS } from "@feat/navigation/Links";
import type {
  GeneratedNavigationLinksGroups,
  NavigationLink,
  NavigationLinks,
  NavigationLinksGroup,
  NavigationLinksGroups,
} from "@feat/navigation/navigation.type";

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

export const getAccountNavigation = (): GeneratedNavigationLinksGroups => {
  return ACCOUNT_LINKS.map((group: NavigationLinksGroup) => {
    return {
      ...group,
      links: group.links.map((link: NavigationLink) => ({
        ...link,
        href: link.href({}),
      })),
    };
  });
};
