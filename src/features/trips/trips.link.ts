import { LINKS } from "../navigation/Links";

export const GenerateTripLink = ({
  orgSlug,
  tripSlug,
}: {
  orgSlug: string;
  tripSlug: string;
}) =>
  LINKS.Trips.Trip.href
    .replace(":organizationSlug", orgSlug)
    .replace(":tripSlug", tripSlug);

export const ConstructTripLink = ({
  orgSlug,
  tripSlug,
  href,
}: {
  orgSlug: string;
  tripSlug: string;
  href: string;
}) => href.replace(":organizationSlug", orgSlug).replace(":tripSlug", tripSlug);
