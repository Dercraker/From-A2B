import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/page/layout";
import { Button, buttonVariants } from "@/components/ui/button";
import { isInRoles } from "@/lib/organizations/isInRoles";
import { getRequiredCurrentOrgCache } from "@/lib/react/cache";
import { SiteConfig } from "@/site-config";
import type { PageParams } from "@/types/next";
import Link from "next/link";
import { DonutChart } from "./_components/donuts-chart";
import { UsersChart } from "./_components/users-chart";

export default async function RoutePage(
  props: PageParams<{
    orgSlug: string;
  }>,
) {
  const org = await getRequiredCurrentOrgCache();
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Dashboard</LayoutTitle>
      </LayoutHeader>
      <LayoutActions>
        {isInRoles(org.roles, ["ADMIN"]) &&
        !SiteConfig.features.enableSingleMemberOrg ? (
          <Link
            href={`/orgs/${props.params.orgSlug}/settings/members`}
            className={buttonVariants({ variant: "filled" })}
          >
            Invite member
          </Link>
        ) : null}
        <Button variant="filled">Delete</Button>
        <Button variant="invert">Create</Button>
      </LayoutActions>
      <LayoutContent className="flex  gap-6">
        <UsersChart />
        <DonutChart />
      </LayoutContent>
    </Layout>
  );
}
