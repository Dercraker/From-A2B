import { getRequiredCurrentOrgCache } from "@lib/react/cache";
import { OrgDetailsForm } from "./(details)/OrgDetailsForm";

export default async function RoutePage() {
  const { org: organization } = await getRequiredCurrentOrgCache(["ADMIN"]);
  return <OrgDetailsForm defaultValues={organization} />;
}
