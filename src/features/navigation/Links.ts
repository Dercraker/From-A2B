import { SiteConfig } from "@/site-config";
import {
  AlertCircle,
  ChartArea,
  CreditCard,
  History,
  Home,
  Mail,
  Map,
  Plane,
  User2,
} from "lucide-react";
import { GenericLinkSchema } from "./navigation.type";

const ORGANIZATION_PATH = `/orgs/:organizationSlug`;
const TRIP_PATH = `/trips/:tripSlug`;

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
      href: `${ORGANIZATION_PATH}`,
      label: "Dashboard",
      Icon: Home,
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
  Trips: {
    Trip: {
      href: `${ORGANIZATION_PATH}${TRIP_PATH}`,
      label: "Trip",
    },
    Itinerary: {
      href: `${ORGANIZATION_PATH}${TRIP_PATH}`,
      label: "Itinerary",
      Icon: Map,
    },
    Details: {
      href: `${ORGANIZATION_PATH}${TRIP_PATH}/details`,
      label: "Details",
      Icon: ChartArea,
    },
  },
} satisfies GenericLinkSchema;
