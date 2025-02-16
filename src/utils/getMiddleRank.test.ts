import { describe, expect, it } from "vitest";
import { getTheMiddleRank } from "./getMiddleRank";

const testUpsideRank = (upsideRank: string, rank: string) =>
  expect(upsideRank < rank).toBeTruthy();
const testDownsideRank = (downsideRank: string, rank: string) =>
  expect(downsideRank > rank).toBeTruthy();

describe("getTheMiddleRank", () => {
  // Test des arguments
  it("should throw an error if both ranks are equal and defined", () => {
    expect(() => getTheMiddleRank("abc", "abc")).toThrow();
  });

  it("should throw an error if upsideRank is empty", () => {
    const result = getTheMiddleRank("", "abc");
    expect(result).toBe("`bcaaaaaaaaaaaa");
  });

  it("should throw an error if downsideRank is empty", () => {
    const result = getTheMiddleRank("abc", "");

    expect(result).toBe("baaaaaaaaaaaaaa");
  });

  it("should return aaaaaaabaaaaaaa if both ranks are undefined", () => {
    const result = getTheMiddleRank(undefined, undefined);
    expect(result).toBe("aaaaaaabaaaaaaa");
  });

  it("should return the next character of downsideRank when upsideRank is undefined", () => {
    const result = getTheMiddleRank(undefined, "abc");
    expect(result).toBe(`\`${"bc".padEnd(14, "a")}`); // 'a' + 'bc' + 'aaaaaaaaaaaa'
  });

  it("should return the next character of upsideRank when downsideRank is undefined", () => {
    const result = getTheMiddleRank("abc", undefined);
    expect(result).toBe(`b${"a".padEnd(14, "a")}`); // 'ab' + 'c' + 'aaaaaaaaaaaa'
  });

  it("should return the intersection value when both ranks are defined and different", () => {
    const result = getTheMiddleRank("abc", "abd");
    expect(result).toBe("abd" + "aaaaaaaaaaaa"); // 'abd' + 'aaaaaaaaaaaa'
  });

  it("should return the intersection value when both ranks are defined and different with longer strings", () => {
    const result = getTheMiddleRank("xyz", "xza");
    expect(result).toBe("xzaaaaaaaaaaaaa"); // 'xya' + 'aaaaaaaaaaaa'
  });

  // Test des erreurs pour index out of bounds
  it("should throw an error if indexToChange is out of bounds", () => {
    expect(() => getTheMiddleRank("abc", "abcd")).toThrow(
      "Index to change is out of bounds for upsideRank",
    );
  });

  // Test pour vérifier le bon fonctionnement avec des valeurs limites
  it("should handle edge cases correctly", () => {
    const result = getTheMiddleRank("aaaaaaaaaaaaaaaa", "zzzzzzzzzzzzzzzz");
    expect(result).toBe("baaaaaaaaaaaaaa".padEnd(15, "a")); // 'zzzzzzzzzzzzzzzz' + 'a'
  });
});
