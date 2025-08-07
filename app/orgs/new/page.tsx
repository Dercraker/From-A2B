import AuthNavigationWrapper from "@components/navigation/LogInNavigationWrapper";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@components/page/layout";
import { LINKS } from "@feat/navigation/Links";
import { createSearchParamsMessageUrl } from "@feat/searchparams-message/createSearchParamsMessageUrl";
import { GetRequiredUser } from "@lib/auth/helper";
import { redirect } from "next/navigation";
import { SiteConfig } from "site-config";
import { NewOrganizationForm } from "./NewOrgForm";

export default async function RoutePage() {
  await GetRequiredUser();

  if (SiteConfig.features.enableSingleMemberOrg) {
    redirect(
      createSearchParamsMessageUrl(LINKS.Organization.Middleware.href({}), {
        type: "message",
        message: "You can't create an organization.",
      }),
    );
  }

  return (
    <AuthNavigationWrapper>
      <Layout>
        <LayoutHeader>
          <LayoutTitle>Create a new organization</LayoutTitle>
          <LayoutDescription>
            Each organization has its own billing account and can be used to
            manage multiple members.
            <div className="bg-blue-500 px-4 py-1"></div>
          </LayoutDescription>
        </LayoutHeader>
        <LayoutContent>
          <NewOrganizationForm />
        </LayoutContent>
      </Layout>
    </AuthNavigationWrapper>
  );
}
