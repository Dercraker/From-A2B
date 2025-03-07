import {
  AlertCircle,
  Calendar,
  ChartArea,
  CreditCard,
  Files,
  History,
  Home,
  Mail,
  Map,
  Plane,
  StepForwardIcon,
  User2,
} from "lucide-react";
import { SiteConfig } from "site-config";
import type { GenericLinkSchema, NavigationLink } from "./navigation.type";

// Constantes pour les chemins
const PATHS = {
  ORG: `/orgs/:orgSlug`,
  TRIP: `/trips/:tripSlug`,
  STEP: `/steps/:stepSlug`,
};

// Fonction utilitaire pour remplacer les paramètres dans les URLs
const createLinkGenerator = (path: string, needsParams = false) => {
  if (!needsParams) {
    return () => path;
  }

  return (params: Record<string, string> = {}) => {
    let result = path;
    Object.entries(params).forEach(([key, value]) => {
      result = result.replace(`:${key}`, value);
    });
    return result;
  };
};

// Fonction pour créer un lien de navigation
const createLink = (
  href: string,
  label: string,
  options: Partial<
    Omit<NavigationLink, "href" | "label" | "generateLink">
  > = {},
  needsParams = false,
): NavigationLink => ({
  href: createLinkGenerator(href, needsParams),
  label,
  ...options,
});

// Définition des liens
export const LINKS = {
  Landing: {
    Landing: createLink("/", "Landing"),
    Home: createLink("/home", "Landing"),
    Features: createLink("{LandingPath}#features", "Features"),
    Pricing: createLink("{LandingPath}#pricing", "Pricing"),
  },

  Organization: {
    Dashboard: createLink(`${PATHS.ORG}`, "Dashboard", { Icon: Home }, true),
    Trips: createLink(`${PATHS.ORG}/trips`, "Trips", { Icon: Plane }, true),
    History: createLink(
      `${PATHS.ORG}/history`,
      "Travel history",
      { Icon: History },
      true,
    ),
  },

  Account: {
    Profile: createLink("/account", "Profile", { Icon: User2 }),
    Mail: createLink("/account/email", "Mail", { Icon: Mail }),
    Danger: createLink("/account/danger", "Danger", { Icon: AlertCircle }),
    DangerConfirmation: createLink(
      "/account/danger/confirm",
      "DangerConfirmation",
      { hidden: true },
    ),
    Billing: createLink("/account/billing", "Billing", {
      hidden: !SiteConfig.features.enableSingleMemberOrg,
      Icon: CreditCard,
    }),
  },

  Trips: {
    Trip: createLink(`${PATHS.ORG}${PATHS.TRIP}`, "Trip", {}, true),
    Itinerary: createLink(
      `${PATHS.ORG}${PATHS.TRIP}`,
      "Itinerary",
      { Icon: Map },
      true,
    ),
    Details: createLink(
      `${PATHS.ORG}${PATHS.TRIP}/details`,
      "Details",
      { Icon: ChartArea },
      true,
    ),

    Steps: {
      StepsList: createLink(
        `${PATHS.ORG}${PATHS.TRIP}/details/steps`,
        "Steps",
        { Icon: StepForwardIcon },
        true,
      ),
      Detail: createLink(
        `${PATHS.ORG}${PATHS.TRIP}/details${PATHS.STEP}`,
        "Detail",
        { Icon: Map },
        true,
      ),
      Scheduling: createLink(
        `${PATHS.ORG}${PATHS.TRIP}/details${PATHS.STEP}/scheduling`,
        "Scheduling",
        { Icon: Calendar },
        true,
      ),
      Files: createLink(
        `${PATHS.ORG}${PATHS.TRIP}/details${PATHS.STEP}/files`,
        "Files",
        {
          Icon: Files,
        },
        true,
      ),
    },
  },

  Maintenance: createLink("/maintenance", "Maintenance", {
    hidden: true,
    disabled: true,
  }),
} satisfies GenericLinkSchema;

