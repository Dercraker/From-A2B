export const STEP_KEY_FACTORY = {
  All: (tripSlug: string): string[] => ["trips", tripSlug, "steps"],
  bySlug: (tripSlug: string, stepSlug: string): string[] => [
    ...STEP_KEY_FACTORY.All(tripSlug),
    stepSlug,
  ],
};
