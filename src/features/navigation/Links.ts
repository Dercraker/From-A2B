import {
  AlertCircle,
  ChartArea,
  CreditCard,
  History,
  Home,
  Mail,
  Map,
  Plane,
  StepForwardIcon,
  User2,
} from "lucide-react";
import { SiteConfig } from "site-config";
import type { GenericLinkSchema } from "./navigation.type";

const ORGANIZATION_PATH = `/orgs/:organizationSlug`;
const TRIP_PATH = `/trips/:tripSlug`;
const STEP_PATH = `/steps/:stepSlug`;

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
      label: "Travel history",
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
    DangerConfirmation: {
      href: "/account/danger/confirm",
      label: "DangerConfirmation",
      hidden: true,
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

    Steps: {
      StepsList: {
        href: `${ORGANIZATION_PATH}${TRIP_PATH}/details/steps`,
        label: "Steps",
        Icon: StepForwardIcon,
      },
      Detail: {
        href: `${ORGANIZATION_PATH}${TRIP_PATH}/details${STEP_PATH}`,
        label: "Detail",
        generateLink: ({
          orgSlug,
          tripSlug,
          stepSlug,
        }: {
          orgSlug: string;
          tripSlug: string;
          stepSlug: string;
        }) =>
          LINKS.Trips.Steps.Detail.href
            .replace(":organizationSlug", orgSlug)
            .replace(":tripSlug", tripSlug)
            .replace(":stepSlug", stepSlug),
      },
      Scheduling: {
        href: `${ORGANIZATION_PATH}${TRIP_PATH}/details${STEP_PATH}/scheduling`,
        label: "Scheduling",
        generateLink: ({
          orgSlug,
          tripSlug,
          stepSlug,
        }: {
          orgSlug: string;
          tripSlug: string;
          stepSlug: string;
        }) =>
          LINKS.Trips.Steps.Scheduling.href
            .replace(":organizationSlug", orgSlug)
            .replace(":tripSlug", tripSlug)
            .replace(":stepSlug", stepSlug),
      },
      Files: {
        href: `${ORGANIZATION_PATH}${TRIP_PATH}/details${STEP_PATH}/files`,
        label: "Files",
        generateLink: ({
          orgSlug,
          tripSlug,
          stepSlug,
        }: {
          orgSlug: string;
          tripSlug: string;
          stepSlug: string;
        }) =>
          LINKS.Trips.Steps.Files.href
            .replace(":organizationSlug", orgSlug)
            .replace(":tripSlug", tripSlug)
            .replace(":stepSlug", stepSlug),
      },
    },
  },
  Maintenance: {
    href: "/maintenance",
    label: "Maintenance",
    hidden: true,
    disabled: true,
  },
} satisfies GenericLinkSchema;
