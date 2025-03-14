/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const RankStep = 1000;

export const isLessThan = (previousRank: number, nextRank: number) => {
  return nextRank > previousRank;
};

type GetMiddleRankProps = {
  previousRank?: number;
  nextRank?: number;
};

/**
 * Permet de définir le rank d'une étape.
 * @param previousRank est le rank inférieur a fournir soit n-1
 * @param nextRank est le rank supérieur soit n+1
 * @description Si ne je fournis que Previous, c'est que je veut le rank suivant -> previous = 5 alors j'obtient 10
 * @description Si ne je fournis que Next, c'est que je veut le rank précédent -> next = 10 alors j'obtient 5
 * @description Si je fournis Previous et Next, alors j'obtient l'intervale des deux -> Previous = 5, Next = 10
 */
export const GetStepRank = ({ previousRank, nextRank }: GetMiddleRankProps) => {
  if (!nextRank && previousRank) return previousRank + RankStep;
  if (!previousRank && nextRank) return nextRank - RankStep;
  if (!nextRank && !previousRank) return RankStep;

  if (nextRank === previousRank || previousRank! + 1 === nextRank)
    throw new Error(
      `No middle rank between nextRank ${nextRank} and previousRank ${previousRank}`,
    );

  if (!isLessThan(previousRank!, nextRank!)) {
    throw new Error("nextRank must be greater than previousRank");
  }

  return Math.floor((nextRank! + previousRank!) / 2);
};
