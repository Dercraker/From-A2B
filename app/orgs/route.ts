import { GetCurrentUser } from "@lib/auth/helper";
import { prisma } from "@lib/prisma";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * If a user arrive to `/orgs` we redirect them to the first organization they are part of.
 *
 * 💡 If you want to redirect user to organization page, redirect them to `/orgs`
 * 💡 If you want them to redirect to a specific organization, redirect them to `/orgs/orgSlug`
 */
export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const user = await GetCurrentUser();

  if (!user) {
    url.pathname = "/auth/signin";
    return NextResponse.redirect(url.toString());
  }

  const organization = await prisma.organization.findFirst({
    where: {
      members: {
        some: {
          userId: user.id,
        },
      },
    },
    select: {
      id: true,
      slug: true,
    },
  });

  if (!organization) {
    url.pathname = "/orgs/new";
    return NextResponse.redirect(url.toString());
  }

  url.pathname = `/orgs/${organization.slug}`;
  return NextResponse.redirect(url.toString());
};
