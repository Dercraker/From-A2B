const STEP = 5000;

export const isLessThan = (upRank: number, downRank: number) =>
  upRank < downRank;

export const getMiddleRank = (upRank?: number, downRank?: number) => {
  if (!upRank && downRank) return downRank / 2;
  if (!downRank && upRank) return upRank * 2;
  if (!upRank && !downRank) return STEP;

  if (upRank === downRank || upRank! + 1 === downRank)
    throw new Error(
      `No middle rank between upRank ${upRank} and downRank ${downRank}`,
    );

  if (!isLessThan(upRank!, downRank!))
    throw new Error(
      `The upRank ${upRank} must be lower than downRank ${downRank}`,
    );

  return Math.floor((upRank! + downRank!) / 2);
};
