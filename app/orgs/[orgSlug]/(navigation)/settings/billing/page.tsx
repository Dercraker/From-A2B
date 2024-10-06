import { Pricing } from "@/components/plans/PricingSection";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import { formatDate } from "@/lib/format/date";
import { combineWithParentMetadata } from "@/lib/metadata";
import { getRequiredCurrentOrgCache } from "@/lib/react/cache";
import { getServerUrl } from "@/lib/server-url";
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { OrganizationBilling } from "./_components/OrganizationBilling";

export const generateMetadata = combineWithParentMetadata({
  title: "Billing",
  description: "Manage your organization billing.",
});

const OrgBillingPage = async () => {
  const { org } = await getRequiredCurrentOrgCache(["ADMIN"]);
  return <OrganizationBilling org={org} />
  }

export default OrgBillingPage;
