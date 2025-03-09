import { GetRequiredUser } from "@lib/auth/helper";
import { combineWithParentMetadata } from "@lib/metadata";
import { OrgSelectQuery } from "@lib/organizations/getOrg";
import { prisma } from "@lib/prisma";
import { notFound } from "next/navigation";
import { OrganizationBilling } from "../../../../orgs/[orgSlug]/(navigation)/settings/billing/_components/OrganizationBilling";

export const generateMetadata = combineWithParentMetadata({
  title: "Billing",
  description: "Manage your billing settings.",
});

const RoutePage = async () => {
  const user = await GetRequiredUser();
  const org = await prisma.organization.findFirst({
    where: {
      members: {
        some: {
          userId: user.id,
        },
      },
    },
    select: OrgSelectQuery(user.id),
  });

  if (!org) {
    notFound();
  }

  return <OrganizationBilling org={org} />;
};

export default RoutePage;
