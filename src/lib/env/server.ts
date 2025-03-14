import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    GITHUB_ID: z.string().optional(),
    GITHUB_SECRET: z.string().optional(),
    GOOGLE_ID: z.string().optional(),
    GOOGLE_SECRET: z.string().optional(),
    RESEND_API_KEY: z.string().min(1),
    RESEND_AUDIENCE_ID: z.string().optional(),
    RESEND_EMAIL_FROM: z.string().min(1),
    STRIPE_SECRET_KEY: z.string().min(1),
    NODE_ENV: z.enum(["development", "production", "test"]),
    VERCEL_ENV: z.enum(["production", "preview"]).optional(),
    VERCEL_URL: z.string().optional(),
    STRIPE_WEBHOOK_SECRET: z.string().optional(),
    NEXTAUTH_SECRET: z.string().min(1),
    GOOGLE_PLACES_API_KEY: z.string().min(1),
    GOOGLE_GEOCODING_API_KEY: z.string().min(1),
    GOOGLE_MAPS_JS_API_KEY: z.string().min(1),
    GOOGLE_ROUTES_API_KEY: z.string().min(1),
    OPENAI_API_KEY: z.string().min(1),
    EDGE_STORE_ACCESS_KEY: z.string().min(1),
    EDGE_STORE_SECRET_KEY: z.string().min(1),
    POSTHOG_KEY: z.string().min(1),
    POSTHOG_HOST: z.string().min(1),
    POSTHOG_API_URL: z.string().min(1),
  },
  experimental__runtimeEnv: process,
});
