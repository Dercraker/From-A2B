import { z } from "zod";
import { decide } from "./api/decide";

/**Server side ONLY */
export const getServerFeatureFlags = async ({
  flag,
  distinct_id,
}: {
  flag: phFeatureFlags;
  distinct_id?: string;
}) => {
  const data = await decide(distinct_id ?? undefined);

  return data.featureFlags?.[flag];
};
/**Server side ONLY */
export const getServerFeatureFlagPayload = async ({
  flag,
  distinct_id,
}: {
  flag: phFeatureFlags;
  distinct_id?: string;
}) => {
  const data = await decide(distinct_id ?? undefined);

  return data.featureFlagPayloads[flag];
};
export const booleanFeatures = z.enum(["isUnderMaintenance"]);

export const combinedFeatureFlags = z.union([booleanFeatures, booleanFeatures]);

export type phFeatureFlags = z.infer<typeof combinedFeatureFlags>;
