import { LINKS } from "../navigation/Links";

export const GenerateStepLink = ({
  orgSlug,
  tripSlug,
  stepSlug,
}: {
  orgSlug: string;
  tripSlug: string;
  stepSlug: string;
}) =>
  LINKS.Trips.Step.href
    .replace(":organizationSlug", orgSlug)
    .replace(":tripSlug", tripSlug)
    .replace(":stepSlug", stepSlug);
