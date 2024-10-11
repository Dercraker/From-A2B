export const STEP_KEY_FACTORY = {
  All: (tripSlug: string): string[] => ["trips", tripSlug, "steps"],
  byId: (stepId: string): string[] => ["steps", stepId],
};
