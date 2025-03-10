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
import { z } from "zod";
import type { GenericLinkSchema, NavigationLink } from "./navigation.type";

// Constantes pour les chemins
const PATHS = {
  ORG: `/orgs/:orgSlug`,
  TRIP: `/trips/:tripSlug`,
  STEP: `/steps/:stepSlug`,
};

export const EmptyLinkParamsSchema = z.object({}).strict();

export const OrgLinkParamsSchema = EmptyLinkParamsSchema.extend({
  orgSlug: z.string(),
}).strict();

export const TripLinkParamsSchema = OrgLinkParamsSchema.extend({
  tripSlug: z.string(),
}).strict();

export const StepLinkParamsSchema = TripLinkParamsSchema.extend({
  stepSlug: z.string(),
}).strict();

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
    Middleware: createLink("/orgs", "Middleware", { hidden: true }),
    New: createLink("/orgs/new", "New", { hidden: true }),
    Dashboard: createLink(`${PATHS.ORG}`, "Dashboard", { Icon: Home }, true),
    Trips: createLink(
      `${PATHS.ORG}/trips`,
      "Trips",
      { Icon: Plane, id: "OnboardingTour-Step3" },
      true,
    ),
    History: createLink(
      `${PATHS.ORG}/history`,
      "Travel history",
      { Icon: History, id: "OnboardingTour-Step4" },
      true,
    ),
    Settings: createLink(
      `${PATHS.ORG}/settings`,
      "General",
      { roles: ["ADMIN"] },
      true,
    ),
    Members: createLink(
      `${PATHS.ORG}/settings/members`,
      "Members",
      { roles: ["ADMIN"] },
      true,
    ),
    Billing: createLink(
      `${PATHS.ORG}/settings/billing`,
      "Billing",
      { roles: ["ADMIN"] },
      true,
    ),
    Danger: createLink(
      `${PATHS.ORG}/settings/danger`,
      "Danger",
      { roles: ["OWNER"] },
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

  Auth: {
    SignIn: createLink("/auth/signin", "SignIn", { hidden: true }),
  },

  Onboarding: {
    Trips: createLink("/orgs/trips", "OnboardingTrips", {
      hidden: true,
    }),
    History: createLink("/orgs/history", "OnboardingHistory", {
      hidden: true,
    }),
  },
} satisfies GenericLinkSchema;
