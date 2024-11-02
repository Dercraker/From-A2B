import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { Prisma } from "@prisma/client";

export const createOrganizationQuery = async (
  params: Prisma.OrganizationUncheckedCreateInput,
) => {
  const customer = await stripe.customers.create({
    email: params.email,
    name: params.name,
  });
  console.log("🚀 ~ customer:", customer)

  const organization = await prisma.organization.create({
    data: {
      ...params,
      planId: "FREE",
      stripeCustomerId: customer.id,
    },
  });
  console.log("🚀 ~ organization:", organization)

  return organization;
};
