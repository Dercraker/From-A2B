import { buttonVariants } from "@components/ui/button";
import { Typography } from "@components/ui/typography";
import { LINKS } from "@feat/navigation/Links";
import Link from "next/link";

export type TravelHistoryEmptyProps = {
  orgSlug: string;
};

export const TravelHistoryEmpty = async ({
  orgSlug,
}: TravelHistoryEmptyProps) => {
  return (
    <div className="flex w-full select-none items-center justify-center gap-2">
      <Typography variant="h2" className="text-muted-foreground">
        No trips found
      </Typography>
      <Link
        href={LINKS.Organization.Trips.href({ orgSlug })}
        className={buttonVariants({ variant: "outline" })}
      >
        Go to trips
      </Link>
    </div>
  );
};
