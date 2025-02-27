"use client";

import type { phFeatureFlags } from "@lib/postHog/phFeatureFlags";
import { useFeatureFlagPayload } from "posthog-js/react";

type useClientFeatureFlagPayloadProps = {
  flag: phFeatureFlags;
};

export const useClientFeatureFlagPayload = ({
  flag,
}: useClientFeatureFlagPayloadProps) => {
  const payload = useFeatureFlagPayload("isMaintenanceEnabled");
  console.log("🚀 ~ payload:", payload);

  return payload;
};
