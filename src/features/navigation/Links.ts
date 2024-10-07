import { SiteConfig } from "@/site-config";
import {
  AlertCircle,
  ChartArea,
  CreditCard,
  History,
  Home,
  Mail,
  Plane,
  User2,
} from "lucide-react";
import { GenericLinkSchema } from "./navigation.type";

const ORGANIZATION_PATH = `/orgs/:organizationSlug`;

export const LINKS = {
  Landing: {
    Landing: {
      href: "/",
      label: "Landing",
    },
    Home: {
      href: "/home",
      label: "Landing",
    },
    Features: {
      href: "{LandingPath}#features",
      label: "Features",
    },
    Pricing: {
      href: "{LandingPath}#pricing",
      label: "Pricing",
    },
  },
  Organization: {
    Dashboard: {
      href: "/Dashboard",
      label: "Dashboard",
      Icon: Home,
    },
    Statistics: {
      href: `${ORGANIZATION_PATH}/statistics`,
      label: "Statistics",
      Icon: ChartArea,
    },
    Trips: {
      href: `${ORGANIZATION_PATH}/trips`,
      label: "Trips",
      Icon: Plane,
    },
    History: {
      href: `${ORGANIZATION_PATH}/history`,
      label: "History",
      Icon: History,
    },
  },
  Account: {
    Profile: {
      href: "/account",
      label: "Profile",
      Icon: User2,
    },
    Mail: {
      href: "/account/email",
      label: "Mail",
      Icon: Mail,
    },
    Danger: {
      href: "/account/danger",
      label: "Danger",
      Icon: AlertCircle,
    },
    Billing: {
      href: "/account/billing",
      label: "Billing",
      hidden: !SiteConfig.features.enableSingleMemberOrg,
      Icon: CreditCard,
    },
  },
  Trip: {
    href: `${ORGANIZATION_PATH}/trips/:tripId`,
    label: "Trip",
  },
} satisfies GenericLinkSchema;
