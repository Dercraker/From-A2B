"use client";

import { GlobalDialogLazy } from "@components/globalDialog/GlobalDialogLazy";
import { SearchParamsMessageToastSuspended } from "@components/searchparams-message/SearchParamsMessageToast";
import { Toaster } from "@components/ui/sonner";
import { AlertDialogRenderer } from "@feat/alert-dialog/AlertDialogRenderer";
import { EdgeStoreProvider } from "@lib/blobStorage/edgestore";
import { env } from "@lib/env/client";
import { logger } from "@lib/logger";
import { getTours, tourTrackProgress } from "@lib/onBoarding/nextStepTours";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Analytics } from "@vercel/analytics/react";
import { APIProvider } from "@vis.gl/react-google-maps";
import { SessionProvider, useSession } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { NextStep, NextStepProvider } from "nextstepjs";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect, type PropsWithChildren } from "react";

const queryClient = new QueryClient({});

type ProvidersProps = PropsWithChildren<{
  GOOGLE_MAPS_JS_API_KEY: string;
}>;

if (typeof window !== "undefined") {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
    ui_host: "https://eu.posthog.com",
    person_profiles: "always", // or 'always' to create profiles for anonymous users as well
  });
}

export const Providers = ({
  children,
  GOOGLE_MAPS_JS_API_KEY,
}: ProvidersProps) => {
  const nextStepTours = getTours();

  return (
    <PostHogProvider client={posthog}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <APIProvider
          apiKey={GOOGLE_MAPS_JS_API_KEY}
          onLoad={() => logger.debug("Maps api logged")}
        >
          <EdgeStoreProvider>
            <SessionProvider>
              <QueryClientProvider client={queryClient}>
                <NextStepProvider>
                  <NextStep steps={nextStepTours} {...tourTrackProgress}>
                    <Analytics />
                    <Toaster />
                    <AlertDialogRenderer />
                    <GlobalDialogLazy />
                    <SearchParamsMessageToastSuspended />
                    <ReactQueryDevtools />
                    <IdentifyUserPosthog />

                    {children}
                  </NextStep>
                </NextStepProvider>
              </QueryClientProvider>
            </SessionProvider>
          </EdgeStoreProvider>
        </APIProvider>
      </ThemeProvider>
    </PostHogProvider>
  );
};

const IdentifyUserPosthog = () => {
  const session = useSession();

  useEffect(() => {
    if (!session.data?.user) return;

    posthog.identify(session.data.user.id, {
      email: session.data.user.email,
      name: session.data.user.name,
    });
  }, [session.data?.user]);

  return null;
};
