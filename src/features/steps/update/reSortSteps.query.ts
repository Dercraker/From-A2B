import type { Step } from "@generated/modelSchema";
import { ReSortEntities } from "@utils/reSort";

type ReSortStepsQueryType = {
  steps: Step[];
};

export const ReSortStepsQuery = async ({ steps }: ReSortStepsQueryType) => {
  await ReSortEntities({
    entities: steps,
    entityType: "step",
  });
};
