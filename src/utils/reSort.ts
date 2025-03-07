import { prisma } from "@lib/prisma";
import { GetStepRank, RankStep } from "@utils/GetStepRank";

/**
 * Type générique pour les entités avec un ID et un rang
 */
export type RankableEntity = {
  [key: string]: unknown;
  id: string;
  rank: number;
};

/**
 * Type pour les paramètres de la fonction de tri
 */
export type ReSortEntitiesParams<T extends RankableEntity> = {
  entities: T[];
  entityType: "task" | "step";
};

/**
 * Met à jour le rang d'une entité
 */
const updateEntityRank = async <T extends RankableEntity>(
  entity: T,
  previousRank: number | undefined,
  entityType: "task" | "step",
) => {
  const newRank = GetStepRank({
    previousRank: undefined,
    nextRank: previousRank,
  });

  // Utilise le type d'entité pour déterminer quelle table mettre à jour
  if (entityType === "task") {
    await prisma.task.update({
      where: { id: entity.id },
      data: { rank: newRank },
    });
  } else if (entityType === "step") {
    await prisma.step.update({
      where: { id: entity.id },
      data: { rank: newRank },
    });
  }

  return newRank;
};

/**
 * Fonction générique pour trier des entités par rang
 */
export const ReSortEntities = async <T extends RankableEntity>({
  entities,
  entityType,
}: ReSortEntitiesParams<T>) => {
  if (!entities.length) return;

  const updatePromises = entities.map(async (entity, idx) => {
    await updateEntityRank(entity, RankStep * (idx + 1), entityType);
  });

  await Promise.all(updatePromises);
};
