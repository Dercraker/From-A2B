import { LINKS } from "@feat/navigation/Links";
import { AUTH_COOKIE_NAME } from "@lib/auth/auth.const";
import { getServerFeatureFlags } from "@lib/postHog/phFeatureFlags";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { SiteConfig } from "site-config";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - admin (admin path)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|admin).*)",
  ],
};

export const middleware = async (req: NextRequest) => {
  // Inject the current URL inside the request headers
  // Useful to get the parameters of the current request
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-url", req.url);
  const url = new URL(req.url);

  const isUnderMaintenance = await getServerFeatureFlags({
    flag: "isUnderMaintenance",
  });

  const maintenanceLink = LINKS.Maintenance.href({});

  if (isUnderMaintenance && req.nextUrl.pathname !== maintenanceLink) {
    url.pathname = maintenanceLink;
    return NextResponse.redirect(url.toString());
  } else if (!isUnderMaintenance && req.nextUrl.pathname === maintenanceLink) {
    url.pathname = LINKS.Landing.Home.href({});
    return NextResponse.redirect(url.toString());
  }

  if (
    req.nextUrl.pathname === "/" &&
    SiteConfig.features.enableLandingRedirection
  ) {
    // This settings is used to redirect the user to the organization page if he is logged in
    // The landing page is still accessible with the /home route
    const cookieList = await cookies();
    const authCookie = cookieList.get(AUTH_COOKIE_NAME);

    if (authCookie) {
      url.pathname = "/orgs";
      return NextResponse.redirect(url.toString());
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
};
