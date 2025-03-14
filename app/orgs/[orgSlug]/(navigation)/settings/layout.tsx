import { SettingsNavigation } from "@components/layout/SettingsNavigation";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@components/page/layout";
import { LINKS } from "@feat/navigation/Links";
import { createSearchParamsMessageUrl } from "@feat/searchparams-message/createSearchParamsMessageUrl";
import { combineWithParentMetadata } from "@lib/metadata";
import { getRequiredCurrentOrgCache } from "@lib/react/cache";
import type { LayoutParams, OrgPathParams } from "@type/next";
import { redirect } from "next/navigation";
import { SiteConfig } from "site-config";
import { getOrganizationSettingsNavigation } from "../_navigation/orgNavigation.links";

export const generateMetadata = combineWithParentMetadata({
  title: "Settings",
  description: "Manage your organization settings.",
});

export default async function RouteLayout({
  params,
  children,
}: LayoutParams<OrgPathParams>) {
  const { orgSlug } = await params;

  if (SiteConfig.features.enableSingleMemberOrg) {
    redirect(
      createSearchParamsMessageUrl(LINKS.Organization.Dashboard.href({}), {
        type: "message",
        message: "You need to update your account settings.",
      }),
    );
  }

  const { roles } = await getRequiredCurrentOrgCache();

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Organization</LayoutTitle>
        <LayoutDescription>
          The organization is the hub for your billing, members, and more.
        </LayoutDescription>
      </LayoutHeader>
      <LayoutContent className="mt-8 flex items-start gap-4 max-lg:flex-col">
        <SettingsNavigation
          roles={roles}
          links={getOrganizationSettingsNavigation(orgSlug)}
        />
        <div className="mb-12 w-full flex-1">{children}</div>
      </LayoutContent>
    </Layout>
  );
}
