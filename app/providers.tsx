"use client";

import { GlobalDialogLazy } from "@/components/globalDialog/GlobalDialogLazy";
import { SearchParamsMessageToastSuspended } from "@/components/searchparams-message/SearchParamsMessageToast";
import { Toaster } from "@/components/ui/sonner";
import { AlertDialogRenderer } from "@/features/alert-dialog/AlertDialogRenderer";
import { logger } from "@/lib/logger";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { APIProvider } from "@vis.gl/react-google-maps";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { type PropsWithChildren } from "react";

const queryClient = new QueryClient({});

type ProvidersProps = PropsWithChildren<{
  GOOGLE_MAPS_JS_API_KEY: string;
}>;

// if (typeof window !== "undefined") {
//   posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
//     api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
//     person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
//   });
// }

export const Providers = ({
  children,
  GOOGLE_MAPS_JS_API_KEY,
}: ProvidersProps) => {
  return (
    // <PostHogProvider client={posthog}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <APIProvider
        apiKey={GOOGLE_MAPS_JS_API_KEY}
        onLoad={() => logger.debug("Maps api logged")}
      >
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <Toaster />
            <AlertDialogRenderer />
            <GlobalDialogLazy />
            <SearchParamsMessageToastSuspended />
            <ReactQueryDevtools />
            {/* <IdentifyUserPosthog /> */}

            {children}
          </QueryClientProvider>
        </SessionProvider>
      </APIProvider>
    </ThemeProvider>
    // </PostHogProvider>
  );
};

// const IdentifyUserPosthog = () => {
//   const session = useSession();

//   useEffect(() => {
//     if (!session.data?.user) return;

//     posthog.identify(session.data.user.id, {
//       email: session.data.user.email,
//       name: session.data.user.name,
//     });
//   }, [session.data?.user]);

//   return null;
// };
