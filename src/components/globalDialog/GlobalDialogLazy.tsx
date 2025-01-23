"use client";

import dynamic from "next/dynamic";

export const GlobalDialogLazy = dynamic(
  async () =>
    import("./GlobalDialog").then((mod) => ({
      default: mod.GlobalDialog,
    })),
  { ssr: false },
);
