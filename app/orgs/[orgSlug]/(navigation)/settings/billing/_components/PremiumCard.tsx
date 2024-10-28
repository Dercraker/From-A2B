import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { formatDate } from "@/lib/format/date";
import { CurrentOrgPayload } from "@/lib/organizations/getOrg";
import { getServerUrl } from "@/lib/server-url";
import { stripe } from "@/lib/stripe";
import { Separator } from "@radix-ui/react-separator";
import { Link } from "lucide-react";

export type PremiumCardProps = {
  org: CurrentOrgPayload;
};

export const PremiumCard = async ({ org }: PremiumCardProps) => {
  if (!org.stripeCustomerId) {
    throw new Error("Organization has no Stripe customer");
  }

  const stripeCustomer = await stripe.customers.retrieve(org.stripeCustomerId);
  const subscriptions = await stripe.subscriptions.list({
    customer: stripeCustomer.id,
  });

  const firstSubscription = subscriptions.data[0];
  const nextRenewDate = firstSubscription?.current_period_end;
  const price = firstSubscription?.items.data[0].price;

  const customerPortal = await stripe.billingPortal.sessions.create({
    customer: stripeCustomer.id,
    return_url: `${getServerUrl()}/orgs/${org.slug}/settings/billing`,
  });

  return (
    <Card>
      <CardHeader>
        <CardDescription>Plan</CardDescription>
        <CardTitle>
          {org.plan.name} {firstSubscription?.cancel_at ? "(Canceled)" : ""}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 md:flex-row">
        {firstSubscription ? (
          <>
            <div>
              <Typography variant="muted">Price</Typography>
              <Typography variant="large">
                ${(price.unit_amount ?? 0) / 100}
              </Typography>
            </div>
            <Separator
              orientation="vertical"
              className="hidden h-10 self-center md:block"
            />
            <div>
              <Typography variant="muted">
                {firstSubscription.cancel_at ? "Cancel at" : "Renew at"}
              </Typography>
              <Typography variant="large">
                {formatDate(new Date(nextRenewDate * 1000))}
              </Typography>
            </div>
          </>
        ) : (
          <div>
            <Typography variant="muted">Renew at</Typography>
            <Typography variant="large">LIFETIME</Typography>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link className={buttonVariants()} href={customerPortal.url}>
          Manage subscriptions and invoices
        </Link>
      </CardFooter>
    </Card>
  );
};
