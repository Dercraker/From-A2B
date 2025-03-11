import { StartTourBadge } from "@components/nextStepJs/StartTourBadge";
import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@components/page/layout";
import { buttonVariants } from "@components/ui/button";
import { Typography } from "@components/ui/typography";
import { combineWithParentMetadata } from "@lib/metadata";
import { getTourStepSelector, TourNames } from "@lib/onBoarding/nextStepTours";
import { isInRoles } from "@lib/organizations/isInRoles";
import { getRequiredCurrentOrgCache } from "@lib/react/cache";
import type { OrgPathParams, PageParams } from "@type/next";
import Link from "next/link";
import { NextStepViewport } from "nextstepjs";
import { Suspense } from "react";
import { SiteConfig } from "site-config";
import { DashboardContentLoader } from "./_loader/dashboardContentLoader";

export const generateMetadata = combineWithParentMetadata({
  title: "Dashboard",
  description: "Dashboard",
});

const RoutePage = async ({ params }: PageParams<OrgPathParams>) => {
  const { orgSlug } = await params;

  const org = await getRequiredCurrentOrgCache();
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle className="flex items-center gap-2">
          Dashboard
          <StartTourBadge
            tourName={TourNames.OnBoardingTour}
            tooltip="Tour : Onboarding"
          />
        </LayoutTitle>
      </LayoutHeader>
      <LayoutActions>
        {isInRoles(org.roles, ["ADMIN"]) &&
        !SiteConfig.features.enableSingleMemberOrg ? (
          <Link
            href={`/orgs/${orgSlug}/settings/members`}
            className={buttonVariants({ variant: "filled" })}
          >
            Invite member
          </Link>
        ) : null}
      </LayoutActions>
      <NextStepViewport
        id={getTourStepSelector(TourNames.OnBoardingTour, "Dashboard")}
      >
        <LayoutContent className="flex  gap-6">
          <Suspense fallback={<DashboardContentLoader />}>
            <Typography>TODO : ADD CONTENT</Typography>
          </Suspense>
        </LayoutContent>
      </NextStepViewport>
    </Layout>
  );
};

export default RoutePage;
