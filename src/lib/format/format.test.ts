import { beforeEach, describe, expect, it, vi } from "vitest";
import { formatDate } from "./date";
import { displayName } from "./displayName";
import { formatId, generateSlug, getIdFromUser, getNameFromEmail } from "./id";

describe("formatDate", () => {
  it("should format date correctly in English locale", () => {
    const testDate = new Date("2024-01-15");
    const result = formatDate(testDate);
    expect(result).toBe("January 15, 2024");
  });

  it("should format date with single digit day", () => {
    const testDate = new Date("2024-03-05");
    const result = formatDate(testDate);
    expect(result).toBe("March 5, 2024");
  });

  it("should format date with double digit day", () => {
    const testDate = new Date("2024-12-25");
    const result = formatDate(testDate);
    expect(result).toBe("December 25, 2024");
  });

  it("should format leap year date", () => {
    const testDate = new Date("2024-02-29");
    const result = formatDate(testDate);
    expect(result).toBe("February 29, 2024");
  });

  it("should format date from different years", () => {
    const testDate = new Date("2023-07-04");
    const result = formatDate(testDate);
    expect(result).toBe("July 4, 2023");
  });

  it("should handle edge case of year 2000", () => {
    const testDate = new Date("2000-01-01");
    const result = formatDate(testDate);
    expect(result).toBe("January 1, 2000");
  });

  it("should handle future dates", () => {
    const testDate = new Date("2030-11-11");
    const result = formatDate(testDate);
    expect(result).toBe("November 11, 2030");
  });
});

describe("displayName", () => {
  it("should return user name when provided", () => {
    const user = {
      email: "john.doe@example.com",
      name: "John Doe",
    };
    const result = displayName(user);
    expect(result).toBe("John Doe");
  });

  it("should return formatted email when name is null", () => {
    const user = {
      email: "john.doe@example.com",
      name: null,
    };
    const result = displayName(user);
    expect(result).toBe("John doe");
  });

  it("should return formatted email when name is undefined", () => {
    const user = {
      email: "jane.smith@example.com",
      name: undefined,
    };
    const result = displayName(user);
    expect(result).toBe("Jane smith");
  });

  it("should capitalize first letter of email username", () => {
    const user = {
      email: "alice@example.com",
      name: undefined,
    };
    const result = displayName(user);
    expect(result).toBe("Alice");
  });

  it("should handle email with multiple dots", () => {
    const user = {
      email: "john.michael.doe@example.com",
      name: undefined,
    };
    const result = displayName(user);
    expect(result).toBe("John michael doe");
  });

  it("should handle email with numbers", () => {
    const user = {
      email: "user123@example.com",
      name: undefined,
    };
    const result = displayName(user);
    expect(result).toBe("User123");
  });

  it("should handle email with underscores", () => {
    const user = {
      email: "john_doe@example.com",
      name: undefined,
    };
    const result = displayName(user);
    expect(result).toBe("John_doe");
  });

  it("should handle email with hyphens", () => {
    const user = {
      email: "john-doe@example.com",
      name: undefined,
    };
    const result = displayName(user);
    expect(result).toBe("John-doe");
  });

  it("should prioritize name over email", () => {
    const user = {
      email: "john.doe@example.com",
      name: "John Smith",
    };
    const result = displayName(user);
    expect(result).toBe("John Smith");
  });

  it("should handle empty name string", () => {
    const user = {
      email: "john.doe@example.com",
      name: "",
    };
    const result = displayName(user);
    expect(result).toBe("John doe");
  });
});

describe("formatId", () => {
  it("should convert spaces to hyphens", () => {
    const result = formatId("hello world");
    expect(result).toBe("hello-world");
  });

  it("should remove special characters", () => {
    const result = formatId("hello@world#123");
    expect(result).toBe("helloworld123");
  });

  it("should convert to lowercase", () => {
    const result = formatId("Hello World");
    expect(result).toBe("hello-world");
  });

  it("should keep alphanumeric characters, hyphens and underscores", () => {
    const result = formatId("hello-world_123");
    expect(result).toBe("hello-world_123");
  });

  it("should handle empty string", () => {
    const result = formatId("");
    expect(result).toBe("");
  });

  it("should handle string with only special characters", () => {
    const result = formatId("@#$%^&*()");
    expect(result).toBe("");
  });

  it("should handle multiple spaces", () => {
    const result = formatId("hello   world");
    expect(result).toBe("hello---world");
  });

  it("should handle with .", () => {
    const result = formatId("hello.world");
    expect(result).toBe("helloworld");
  });

  it("should handle mixed case and special characters", () => {
    const result = formatId("Hello@World#123");
    expect(result).toBe("helloworld123");
  });
});

describe("generateSlug", () => {
  it("should generate slug with formatted id and random suffix", () => {
    const result = generateSlug("Hello World");
    expect(result).toBe("hello-world-abcd1234");
  });

  it("should handle special characters in input", () => {
    const result = generateSlug("Hello@World#123");
    expect(result).toBe("helloworld123-abcd1234");
  });

  it("should handle empty string", () => {
    const result = generateSlug("");
    expect(result).toBe("-abcd1234");
  });

  it("should handle single word", () => {
    const result = generateSlug("Test");
    expect(result).toBe("test-abcd1234");
  });
});

describe("getNameFromEmail", () => {
  it("should extract username from email", () => {
    const result = getNameFromEmail("john.doe@example.com");
    expect(result).toBe("john.doe");
  });

  it("should handle email with plus sign", () => {
    const result = getNameFromEmail("john+test@example.com");
    expect(result).toBe("john");
  });

  it("should handle email without plus sign", () => {
    const result = getNameFromEmail("jane@example.com");
    expect(result).toBe("jane");
  });

  it("should handle email with multiple plus signs", () => {
    const result = getNameFromEmail("john+test+dev@example.com");
    expect(result).toBe("john");
  });

  it("should handle email with dots and plus", () => {
    const result = getNameFromEmail("john.doe+test@example.com");
    expect(result).toBe("john.doe");
  });

  it("should handle email with only username", () => {
    const result = getNameFromEmail("john@example.com");
    expect(result).toBe("john");
  });
});

describe("getIdFromUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should generate id from user name", () => {
    const user = {
      name: "John Doe",
      email: "john@example.com",
    };
    const result = getIdFromUser(user);
    expect(result).toBe("john-doe-xyz789");
  });

  it("should generate id from email when name is null", () => {
    const user = {
      name: null,
      email: "john.doe@example.com",
    };
    const result = getIdFromUser(user);
    expect(result).toBe("johndoe-xyz789");
  });

  it("should generate id from email when name is undefined", () => {
    const user = {
      name: undefined,
      email: "jane.smith@example.com",
    };
    const result = getIdFromUser(user);
    expect(result).toBe("janesmith-xyz789");
  });

  it("should generate random id when both name and email are null", () => {
    const user = {
      name: null,
      email: null,
    };
    const result = getIdFromUser(user);
    expect(result).toBe("xyz789");
  });

  it("should generate random id when both name and email are undefined", () => {
    const user = {
      name: undefined,
      email: undefined,
    };
    const result = getIdFromUser(user);
    expect(result).toBe("xyz789");
  });

  it("should handle user with special characters in name", () => {
    const user = {
      name: "John@Doe#123",
      email: "john@example.com",
    };
    const result = getIdFromUser(user);
    expect(result).toBe("johndoe123-xyz789");
  });

  it("should handle user with special characters in email", () => {
    const user = {
      name: null,
      email: "john+test@example.com",
    };
    const result = getIdFromUser(user);
    expect(result).toBe("john-xyz789");
  });

  it("should prioritize name over email", () => {
    const user = {
      name: "John Doe",
      email: "different@example.com",
    };
    const result = getIdFromUser(user);
    expect(result).toBe("john-doe-xyz789");
  });
});

describe("getSlugFromUser", () => {
  it("should be an alias for getIdFromUser", () => {
    const user = {
      name: "John Doe",
      email: "john@example.com",
    };
    const idResult = getIdFromUser(user);
    const slugResult = getIdFromUser(user); // getSlugFromUser is an alias
    expect(slugResult).toBe(idResult);
  });
});

describe("Format Integration Tests", () => {
  it("should work together for user profile creation", () => {
    const user = {
      name: "John Doe",
      email: "john.doe@example.com",
    };

    const displayNameResult = displayName(user);
    const idResult = getIdFromUser(user);
    const emailName = getNameFromEmail(user.email);

    expect(displayNameResult).toBe("John Doe");
    expect(idResult).toContain("john-doe-");
    expect(emailName).toBe("john.doe");
  });

  it("should handle user without name", () => {
    const user = {
      name: null,
      email: "jane.smith@example.com",
    };

    const displayNameResult = displayName(user);
    const idResult = getIdFromUser(user);
    const emailName = getNameFromEmail(user.email);

    expect(displayNameResult).toBe("Jane smith");
    expect(idResult).toContain("janesmith-");
    expect(emailName).toBe("jane.smith");
  });

  it("should format date for user activity", () => {
    const user = {
      name: "Alice Johnson",
      email: "alice@example.com",
    };

    const activityDate = new Date("2024-03-15");
    const formattedDate = formatDate(activityDate);
    const userId = getIdFromUser(user);

    expect(formattedDate).toBe("March 15, 2024");
    expect(userId).toContain("alice-johnson-");
  });

  it("should generate slug from user input", () => {
    const userInput = "My Trip to Paris";
    const slug = generateSlug(userInput);
    const formattedInput = formatId(userInput);

    expect(slug).toContain(formattedInput);
    expect(formattedInput).toBe("my-trip-to-paris");
  });

  it("should handle edge cases consistently", () => {
    const user = {
      name: "",
      email: "test+user@example.com",
    };

    const displayNameResult = displayName(user);
    const idResult = getIdFromUser(user);
    const emailName = getNameFromEmail(user.email);

    expect(displayNameResult).toBe("Test user");
    expect(idResult).toContain("test-");
    expect(emailName).toBe("test");
  });
});

describe("Edge Cases and Error Handling", () => {
  describe("formatDate edge cases", () => {
    it("should handle very old dates", () => {
      const oldDate = new Date("1900-01-01");
      const result = formatDate(oldDate);
      expect(result).toBe("January 1, 1900");
    });

    it("should handle very future dates", () => {
      const futureDate = new Date("2100-12-31");
      const result = formatDate(futureDate);
      expect(result).toBe("December 31, 2100");
    });
  });

  describe("displayName edge cases", () => {
    it("should handle very long names", () => {
      const user = {
        name: "A".repeat(1000),
        email: "test@example.com",
      };
      const result = displayName(user);
      expect(result).toBe("A".repeat(1000));
    });

    it("should handle email with only @ symbol", () => {
      const user = {
        name: null,
        email: "@example.com",
      };
      const result = displayName(user);
      expect(result).toBe("");
    });

    it("should handle email with multiple @ symbols", () => {
      const user = {
        name: null,
        email: "test@@example.com",
      };
      const result = displayName(user);
      expect(result).toBe("Test");
    });
  });

  describe("formatId edge cases", () => {
    it("should handle very long strings", () => {
      const longString = "a".repeat(10000);
      const result = formatId(longString);
      expect(result).toBe("a".repeat(10000));
    });

    it("should handle strings with only spaces", () => {
      const result = formatId("   ");
      expect(result).toBe("---");
    });

    it("should handle strings with only special characters", () => {
      const result = formatId("!@#$%^&*()");
      expect(result).toBe("");
    });

    it("should handle unicode characters", () => {
      const result = formatId("héllö wörld");
      expect(result).toBe("hll-wrld");
    });
  });

  describe("getNameFromEmail edge cases", () => {
    it("should handle email with multiple @ symbols", () => {
      const result = getNameFromEmail("test@@example.com");
      expect(result).toBe("test");
    });

    it("should handle email without @ symbol", () => {
      const result = getNameFromEmail("testexample.com");
      expect(result).toBe("testexample.com");
    });

    it("should handle email starting with @", () => {
      const result = getNameFromEmail("@example.com");
      expect(result).toBe("");
    });

    it("should handle email ending with @", () => {
      const result = getNameFromEmail("test@");
      expect(result).toBe("test");
    });

    it("should handle empty email", () => {
      const result = getNameFromEmail("");
      expect(result).toBe("");
    });

    it("should handle email with multiple plus signs", () => {
      const result = getNameFromEmail("test+++user@example.com");
      expect(result).toBe("test");
    });
  });

  describe("getIdFromUser edge cases", () => {
    it("should handle user with empty name and email", () => {
      const user = {
        name: "",
        email: "",
      };
      const result = getIdFromUser(user);
      expect(result).toMatch(/^xyz789$/);
    });

    it("should handle user with very long name", () => {
      const user = {
        name: "A".repeat(1000),
        email: "test@example.com",
      };
      const result = getIdFromUser(user);
      expect(result).toContain("a".repeat(1000).toLowerCase());
    });

    it("should handle user with very long email", () => {
      const user = {
        name: null,
        email: `${"a".repeat(100)}@example.com`,
      };
      const result = getIdFromUser(user);
      expect(result).toContain("a".repeat(100));
    });

    it("should handle user with special characters in both name and email", () => {
      const user = {
        name: "John@Doe#123",
        email: "john+test@example.com",
      };
      const result = getIdFromUser(user);
      expect(result).toContain("johndoe123-");
    });
  });
});
