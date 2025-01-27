/* eslint-disable @typescript-eslint/no-non-null-assertion */
const STEP = 5000;

export const isLessThan = (downRank: number, upRank: number) => {
  return upRank > downRank;
};

type GetMiddleRankProps = {
  downRank?: number;
  upRank?: number;
};
export const getMiddleRank = ({ downRank, upRank }: GetMiddleRankProps) => {
  if (!upRank && downRank) return downRank - STEP;
  if (!downRank && upRank) return upRank + STEP;
  if (!upRank && !downRank) return STEP;

  if (upRank === downRank || downRank! + 1 === upRank)
    throw new Error(
      `No middle rank between upRank ${upRank} and downRank ${downRank}`,
    );

  if (!isLessThan(downRank!, upRank!)) {
    throw new Error("upRank must be greater than downRank");
  }

  return Math.floor((upRank! + downRank!) / 2);
};
