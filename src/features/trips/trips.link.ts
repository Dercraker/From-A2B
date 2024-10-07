import { LINKS } from "../navigation/Links";

export const GenerateTripLink = ({
  orgId,
  tripId,
}: {
  orgId: string;
  tripId: string;
}) =>
  LINKS.Trip.href
    .replace(":organizationSlug", orgId)
    .replace(":tripId", tripId);
