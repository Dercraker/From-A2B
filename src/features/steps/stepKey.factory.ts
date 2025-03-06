export const STEP_KEY_FACTORY = {
  All: (tripSlug: string): string[] => ["trips", tripSlug, "steps"],
  bySlug: (tripSlug: string, stepSlug: string): string[] => [
    ...STEP_KEY_FACTORY.All(tripSlug),
    stepSlug,
  ],
  SchedulingNotes: (tripSlug: string, stepSlug: string) => [
    ...STEP_KEY_FACTORY.bySlug(tripSlug, stepSlug),
    "schedulingNotes",
  ],
  Tasks: (tripSlug: string, stepSlug: string) => [
    ...STEP_KEY_FACTORY.bySlug(tripSlug, stepSlug),
    "tasks",
  ],
  Task: (tripSlug: string, stepSlug: string, taskId: string) => [
    ...STEP_KEY_FACTORY.Tasks(tripSlug, stepSlug),
    taskId,
  ],
  Files: (tripSlug: string, stepSlug: string) => [
    ...STEP_KEY_FACTORY.bySlug(tripSlug, stepSlug),
    "files",
  ],
  File: (tripSlug: string, stepSlug: string, fileId: string) => [
    ...STEP_KEY_FACTORY.Files(tripSlug, stepSlug),
    fileId,
  ],
};
