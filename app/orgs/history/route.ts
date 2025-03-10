import { LINKS } from "@feat/navigation/Links";
import { GetCurrentUser } from "@lib/auth/helper";
import { prisma } from "@lib/prisma";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const user = await GetCurrentUser();

  if (!user) {
    url.pathname = LINKS.Auth.SignIn.href({});
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
    url.pathname = LINKS.Organization.New.href({});
    return NextResponse.redirect(url.toString());
  }

  url.pathname = LINKS.Organization.History.href({
    orgSlug: organization.slug,
  });
  return NextResponse.redirect(url.toString());
};
