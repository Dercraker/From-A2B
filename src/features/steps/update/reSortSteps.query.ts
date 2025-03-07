import { ReSortEntities } from "@utils/reSort";
import type { StepDto } from "../dto/stepDto.schema";

type ReSortStepsQueryType = {
  steps: StepDto[];
};

export const ReSortStepsQuery = async ({ steps }: ReSortStepsQueryType) => {
  await ReSortEntities({
    entities: steps,
    entityType: "step",
  });
};
