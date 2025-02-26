import { env } from "@lib/env/server";

export const getEnvPath = () => {
  const envMap: Record<string, string> = {
    development: "Local",
    preview: "Preview",
    production: "Production",
  };

  return (
    envMap[env.NODE_ENV as keyof typeof envMap] ||
    envMap[env.VERCEL_ENV as keyof typeof envMap] ||
    "noenv"
  );
};
