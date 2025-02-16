const CONTROL_VALUE = "a";
const CONTROL_LEN = 15;

const getNextChar = (char = "a", step = 1): string =>
  String.fromCharCode(char.charCodeAt(0) + step);

const padWithControlValue = (length: number) =>
  Array.from({ length }).fill(CONTROL_VALUE).join("");

const findIndexToChange = (upsideRank: string, downsideRank: string) => {
  let index = 0;
  while (upsideRank[index] === downsideRank[index]) {
    index++;
  }
  return index;
};

const ensureMinLen = (value: string) =>
  value.padEnd(CONTROL_LEN, CONTROL_VALUE);

export const getTheMiddleRank = (
  upsideRank?: string,
  downsideRank?: string,
): string => {
  if (upsideRank === downsideRank && upsideRank && downsideRank)
    throw new Error("Section cannot be moved.");

  if (
    (upsideRank && upsideRank.length === 0) ||
    (downsideRank && downsideRank.length === 0)
  )
    throw new Error("Ranks cannot be empty.");

  if (!upsideRank && downsideRank)
    return ensureMinLen(
      getNextChar(downsideRank[0], -1) + downsideRank.slice(1),
    );

  if (upsideRank && !downsideRank) {
    let index = 0;
    while (upsideRank[index] === "z") {
      index++;
    }
    return ensureMinLen(
      upsideRank.slice(0, index) +
        getNextChar(upsideRank[index], 1) +
        upsideRank.slice(index + 1).replaceAll(/./g, CONTROL_VALUE),
    );
  }

  if (!upsideRank || !downsideRank) {
    const value = padWithControlValue(CONTROL_LEN).split("");
    value[7] = "b";
    return ensureMinLen(value.join(""));
  }

  const indexToChange = findIndexToChange(upsideRank, downsideRank);
  if (indexToChange < 0 || indexToChange >= upsideRank.length)
    throw new Error("Index to change is out of bounds for upsideRank");

  if (upsideRank && downsideRank && upsideRank !== downsideRank) {
    const nextChar = getNextChar(upsideRank[indexToChange], 1);

    const intersectionValue =
      upsideRank.slice(0, indexToChange) +
      nextChar +
      CONTROL_VALUE.repeat(
        CONTROL_LEN - (upsideRank.slice(0, indexToChange).length + 1),
      );

    return ensureMinLen(intersectionValue);
  }

  throw new Error(
    "Unexpected state: both ranks are defined but no valid condition met.",
  );
};
