"use client";

import { GlobalDialogLazy } from "@/components/globalDialog/GlobalDialogLazy";
import { SearchParamsMessageToastSuspended } from "@/components/searchparams-message/SearchParamsMessageToast";
import { Toaster } from "@/components/ui/sonner";
import { AlertDialogRenderer } from "@/features/alert-dialog/AlertDialogRenderer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <AlertDialogRenderer />
          <GlobalDialogLazy />
          <SearchParamsMessageToastSuspended />
          <ReactQueryDevtools />
          {children}
        </QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
  );
};
