import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { TripListDtoSchema } from "@/features/trips/dto/tripsListDto.schema";
import { GenerateTripLink } from "@/features/trips/trips.link";
import { format } from "date-fns";
import { PlaneLanding, PlaneTakeoff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CardDeleteButton } from "./cardDeleteButton";

export type TripCardProps = {
  trip: TripListDtoSchema;
};

export const TripCard = ({
  trip: { endDate, id: tripId, image, name, startDate, orgSlug },
}: TripCardProps) => {
  return (
    <Card className="group max-h-96 max-w-[422px]">
      <CardHeader className="flex flex-col">
        <div className="flex items-center justify-between">
          <CardTitle>
            <Typography variant="link">
              <Link href={GenerateTripLink({ orgSlug, tripId })}>
                <div>{name}</div>
              </Link>
            </Typography>
          </CardTitle>
          <CardDeleteButton tripId={tripId} tripName={name} />
        </div>
        <div className="flex select-none gap-4">
          <Typography variant="muted" className="flex items-baseline gap-1">
            <PlaneTakeoff size={16} />
            {format(startDate, "yyyy/MM/dd")}
          </Typography>
          {startDate.getTime() === endDate.getTime() && (
            <Typography variant="muted" className="flex items-baseline gap-1 ">
              <PlaneLanding size={16} />
              {format(endDate, "yyyy/MM/dd")}
            </Typography>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Image
          src={image ?? "https://loremflickr.com/600/400"}
          alt={"Trip Picture"}
          width={600}
          height={400}
          className="max-h-64"
        />
      </CardContent>
    </Card>
  );
};
