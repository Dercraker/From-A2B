import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { InlineTooltip } from "@components/ui/tooltip";
import { Typography } from "@components/ui/typography";
import { LINKS } from "@feat/navigation/Links";
import type { Trip } from "@generated/modelSchema";
import { format } from "date-fns";
import { PlaneLanding, PlaneTakeoff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CardDeleteButton } from "./cardDeleteButton";

export type TripCardProps = {
  trip: Trip;
  orgSlug: string;
};

export const TripCard = ({
  trip: { endDate, id: tripId, slug: tripSlug, image, name, startDate },
  orgSlug,
}: TripCardProps) => {
  return (
    <Card className="group max-h-96 max-w-[422px]">
      <CardHeader className="flex flex-col">
        <div className="flex items-center justify-between">
          <CardTitle className="overflow-hidden truncate whitespace-nowrap text-primary">
            <Typography variant="link">
              <Link href={LINKS.Trips.Trip.href({ orgSlug, tripSlug })}>
                {name}
              </Link>
            </Typography>
          </CardTitle>
          <CardDeleteButton tripId={tripId} tripName={name} />
        </div>
        <div className="flex select-none gap-4">
          <InlineTooltip title="Start time">
            <Typography variant="muted" className="flex items-baseline gap-1">
              <PlaneTakeoff size={16} />
              {format(startDate, "yyyy/MM/dd")}
            </Typography>
          </InlineTooltip>
          {startDate.getTime() !== endDate.getTime() && (
            <InlineTooltip title="End time">
              <Typography
                variant="muted"
                className="flex items-baseline gap-1 "
              >
                <PlaneLanding size={16} />
                {format(endDate, "yyyy/MM/dd")}
              </Typography>
            </InlineTooltip>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Image
          src={image ?? "https://picsum.photos/600/400"}
          alt={"Trip Picture"}
          width={600}
          height={400}
          className="max-h-64"
        />
      </CardContent>
    </Card>
  );
};
