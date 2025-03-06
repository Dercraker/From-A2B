export const STEP_KEY_FACTORY = {
  All: (tripSlug: string): string[] => ["trips", tripSlug, "steps"],
  bySlug: (tripSlug: string, stepSlug: string): string[] => [
    ...STEP_KEY_FACTORY.All(tripSlug),
    stepSlug,
  ],
  SchedulingNotes: (tripSlug: string, stepSlug: string) => [
    ...STEP_KEY_FACTORY.bySlug(tripSlug, stepSlug),
    "SchedulingNotes",
  ],
  Tasks: (tripSlug: string, stepSlug: string) => [
    ...STEP_KEY_FACTORY.bySlug(tripSlug, stepSlug),
    "Tasks",
  ],
  Task: (tripSlug: string, stepSlug: string, taskId: string) => [
    ...STEP_KEY_FACTORY.Tasks(tripSlug, stepSlug),
    taskId,
  ],
};
