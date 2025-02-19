import { combineWithParentMetadata } from "@lib/metadata";
import { getRequiredCurrentOrgCache } from "@lib/react/cache";
import { OrganizationBilling } from "./_components/OrganizationBilling";

export const generateMetadata = combineWithParentMetadata({
  title: "Billing",
  description: "Manage your organization billing.",
});

const OrgBillingPage = async () => {
  const { org } = await getRequiredCurrentOrgCache(["ADMIN"]);
  return <OrganizationBilling org={org} />;
};

export default OrgBillingPage;
