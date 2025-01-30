import { UserDropdown } from "@/components/auth/UserDropDown";
import { NavigationWrapper } from "@/components/navigation/NavigationWrapper";
import { Layout } from "@/components/page/layout";
import { Alert } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { IsTripExistQuery } from "@/features/trip/get/isTripExist.query";
import { GetTripsByCurrentOrgQuery } from "@/features/trips/getTripsByCurrentOrgQuery.query";
import { getRequiredCurrentOrgCache } from "@/lib/react/cache";
import type { LayoutParams } from "@/types/next";
import { Rabbit } from "lucide-react";
import Link from "next/link";
import { TripNavigation } from "./_navigation/tripNavigation";
import { TripNavigationLinks } from "./_navigation/tripNavigationLinks";
import { TripSelect } from "./_navigation/tripSelect";

const RouteLayout = async ({
  children,
  params,
}: LayoutParams<{ orgSlug: string; tripSlug: string }>) => {
  const { orgSlug, tripSlug } = await params;

  const { org, user } = await getRequiredCurrentOrgCache();

  const isTripExist = await IsTripExistQuery({
    where: {
      slug: tripSlug,
      Organization: {
        slug: orgSlug,
      },
    },
  });

  const orgTrips = await GetTripsByCurrentOrgQuery({
    order: {
      startDate: "asc",
    },
  });

  if (isTripExist)
    return (
      <TripNavigation
        logoChildren={
          <TripSelect
            currentTripSlug={tripSlug}
            orgSlug={org.slug}
            trips={orgTrips.map((t) => ({
              slug: t.slug,
              name: t.name,
              image: t.image,
            }))}
          />
        }
        navigationChildren={
          <TripNavigationLinks orgSlug={org.slug} tripSlug={tripSlug} />
        }
        topBarCornerLeftChildren={
          <>
            <UserDropdown>
              <Button
                variant="ghost"
                className="size-10 rounded-full"
                size="sm"
              >
                <Avatar className="size-8">
                  <AvatarFallback>
                    {user.email ? user.email.slice(0, 2) : "??"}
                  </AvatarFallback>
                  {user.image && <AvatarImage src={user.image} />}
                </Avatar>
              </Button>
            </UserDropdown>
          </>
        }
      >
        {children}
      </TripNavigation>
    );

  return (
    <NavigationWrapper>
      <Layout>
        <Alert>
          <Rabbit className="size-4" />
          <div>
            <Typography variant="large">
              Oh! You are not logged in or the organization with the ID{" "}
              <Typography variant="code">{orgSlug}</Typography> was not found or
              the trip with the ID{" "}
              <Typography variant="code">{tripSlug}</Typography> doesn't exist.
            </Typography>
            {user ? (
              <Link
                href="/orgs"
                className={buttonVariants({
                  className: "mt-2",
                })}
              >
                Return to your organizations
              </Link>
            ) : (
              <Link
                href="/auth/signin"
                className={buttonVariants({
                  className: "mt-2",
                })}
              >
                Sign in
              </Link>
            )}
          </div>
        </Alert>
      </Layout>
    </NavigationWrapper>
  );
};

export default RouteLayout;
