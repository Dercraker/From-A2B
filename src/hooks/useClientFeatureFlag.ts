"use client";

import type { phFeatureFlags } from "@lib/postHog/phFeatureFlags";
import { useFeatureFlagEnabled } from "posthog-js/react";

type useClientFeatureFlagProps = {
  flag: phFeatureFlags;
};

export const useClientFeatureFlag = ({ flag }: useClientFeatureFlagProps) => {
  const data = useFeatureFlagEnabled(flag);

  return data;
};
