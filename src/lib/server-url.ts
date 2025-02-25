import { SiteConfig } from "site-config";
import { env } from "./env/server";

/**
 * This method return the server URL based on the environment.
 */
export const getServerUrl = () => {
  console.log("🚀 ~ getServerUrl ~ env.VERCEL_URL:", env.VERCEL_URL);
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  // If we are in production, we return the production URL.
  if (env.VERCEL_ENV === "production") {
    return SiteConfig.prodUrl;
  }

  // If we are in "stage" environment, we return the staging URL.
  if (env.VERCEL_URL) {
    return `https://${env.VERCEL_URL}`;
  }

  // If we are in development, we return the localhost URL.
  return "http://localhost:3000";
};
