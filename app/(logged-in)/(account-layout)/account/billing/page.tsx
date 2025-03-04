import { requiredUser } from "@lib/auth/helper";
import { OrgSelectQuery } from "@lib/organizations/getOrg";
import { prisma } from "@lib/prisma";
import { notFound } from "next/navigation";
import { OrganizationBilling } from "../../../../orgs/[orgSlug]/(navigation)/settings/billing/_components/OrganizationBilling";

const RoutePage = async () => {
  const user = await requiredUser();
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
