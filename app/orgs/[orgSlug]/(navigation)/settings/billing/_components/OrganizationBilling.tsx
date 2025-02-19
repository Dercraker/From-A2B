import { Pricing } from "@components/plans/PricingSection";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import type { CurrentOrgPayload } from "@lib/organizations/getOrg";
import { PremiumCard } from "./PremiumCard";

export const OrganizationBilling = ({ org }: { org: CurrentOrgPayload }) => {
  if (org.plan.id === "FREE") {
    return (
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Free plan</CardTitle>
            <CardDescription>
              Upgrade to premium to unlock all features.
            </CardDescription>
          </CardHeader>
        </Card>
        <Pricing />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <PremiumCard org={org} />
    </div>
  );
};
