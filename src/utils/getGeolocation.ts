import "server-only";

import type { CountryCode } from "libphonenumber-js";
import { headers } from "next/headers";

export async function getGeolocation() {
  const headerList = await headers();
  const ipCountry = headerList.get("x-vercel-ip-country") as CountryCode | null;

  return ipCountry;
}
