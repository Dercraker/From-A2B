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
    STRIPE_WEBHOOK_SECRET: z.string().optional(),
    NEXTAUTH_SECRET: z.string().min(1),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_AUDIENCE_ID: process.env.RESEND_AUDIENCE_ID,
    RESEND_EMAIL_FROM: process.env.RESEND_EMAIL_FROM,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NODE_ENV: process.env.NODE_ENV,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
});
