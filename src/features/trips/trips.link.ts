import { LINKS } from "../navigation/Links";

export const GenerateTripLink = ({
  orgSlug,
  tripId,
}: {
  orgSlug: string;
  tripId: string;
}) =>
  LINKS.Trip.href
    .replace(":organizationSlug", orgSlug)
    .replace(":tripId", tripId);
