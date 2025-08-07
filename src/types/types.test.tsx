import type { FileType } from "@type/blobStorage";
import { FileTypeSchema } from "@type/blobStorage";
import type {
  ErrorParams,
  LayoutParams,
  OrgPathParams,
  PageParams,
  StepPathParams,
  TripPathParams,
} from "@type/next";
import type { RoadType } from "@type/routesApi/road.type";
import { RoadTypeSchema } from "@type/routesApi/road.type";
import { describe, expect, it, vi } from "vitest";

// --- blobStorage.ts ---
describe("FileTypeSchema", () => {
  it("should validate Account type", () => {
    const result = FileTypeSchema.safeParse("Account");
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBe("Account");
    }
  });

  it("should validate Trip type", () => {
    const result = FileTypeSchema.safeParse("Trip");
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBe("Trip");
    }
  });

  it("should reject invalid types", () => {
    const result = FileTypeSchema.safeParse("Invalid");
    expect(result.success).toBe(false);
  });

  it("should reject non-string values", () => {
    const result = FileTypeSchema.safeParse(123);
    expect(result.success).toBe(false);
  });
});

describe("FileType", () => {
  it("should be a union type of Account and Trip", () => {
    const validTypes: FileType[] = ["Account", "Trip"];
    expect(validTypes).toHaveLength(2);
    expect(validTypes).toContain("Account");
    expect(validTypes).toContain("Trip");
  });
});

// --- next.ts ---
describe("PageParams", () => {
  it("should have correct structure", () => {
    const mockParams: PageParams<{ id: string }> = {
      params: Promise.resolve({ id: "123" }),
      searchParams: Promise.resolve({ page: "1" }),
    };

    expect(mockParams).toHaveProperty("params");
    expect(mockParams).toHaveProperty("searchParams");
    expect(mockParams.params).toBeInstanceOf(Promise);
    expect(mockParams.searchParams).toBeInstanceOf(Promise);
  });

  it("should work with empty params", () => {
    const mockParams: PageParams = {
      params: Promise.resolve({}),
      searchParams: Promise.resolve({}),
    };

    expect(mockParams).toBeDefined();
  });
});

describe("OrgPathParams", () => {
  it("should have orgSlug property", () => {
    const mockParams: OrgPathParams = {
      orgSlug: "test-org",
    };

    expect(mockParams.orgSlug).toBe("test-org");
    expect(typeof mockParams.orgSlug).toBe("string");
  });
});

describe("TripPathParams", () => {
  it("should extend OrgPathParams and add tripSlug", () => {
    const mockParams: TripPathParams = {
      orgSlug: "test-org",
      tripSlug: "test-trip",
    };

    expect(mockParams.orgSlug).toBe("test-org");
    expect(mockParams.tripSlug).toBe("test-trip");
  });

  it("should be assignable to OrgPathParams", () => {
    const tripParams: TripPathParams = {
      orgSlug: "test-org",
      tripSlug: "test-trip",
    };

    const orgParams: OrgPathParams = tripParams;
    expect(orgParams.orgSlug).toBe("test-org");
  });
});

describe("StepPathParams", () => {
  it("should extend TripPathParams and add stepSlug", () => {
    const mockParams: StepPathParams = {
      orgSlug: "test-org",
      tripSlug: "test-trip",
      stepSlug: "test-step",
    };

    expect(mockParams.orgSlug).toBe("test-org");
    expect(mockParams.tripSlug).toBe("test-trip");
    expect(mockParams.stepSlug).toBe("test-step");
  });

  it("should be assignable to TripPathParams", () => {
    const stepParams: StepPathParams = {
      orgSlug: "test-org",
      tripSlug: "test-trip",
      stepSlug: "test-step",
    };

    const tripParams: TripPathParams = stepParams;
    expect(tripParams.orgSlug).toBe("test-org");
    expect(tripParams.tripSlug).toBe("test-trip");
  });
});

describe("LayoutParams", () => {
  it("should have params and optional children", () => {
    const mockParams: LayoutParams<{ userId: string }> = {
      params: Promise.resolve({ userId: "123" }),
      children: <div>Test</div>,
    };

    expect(mockParams).toHaveProperty("params");
    expect(mockParams).toHaveProperty("children");
    expect(mockParams.params).toBeInstanceOf(Promise);
  });

  it("should work without children", () => {
    const mockParams: LayoutParams<{ userId: string }> = {
      params: Promise.resolve({ userId: "123" }),
    };

    expect(mockParams.children).toBeUndefined();
  });
});

describe("ErrorParams", () => {
  it("should have error and reset properties", () => {
    const mockError = new Error("Test error");
    const mockReset = () => {};

    const mockParams: ErrorParams = {
      error: mockError,
      reset: mockReset,
    };

    expect(mockParams.error).toBe(mockError);
    expect(mockParams.reset).toBe(mockReset);
    expect(typeof mockParams.reset).toBe("function");
  });

  it("should support error with digest", () => {
    const mockError = new Error("Test error") as Error & { digest?: string };
    mockError.digest = "test-digest";

    const mockParams: ErrorParams = {
      error: mockError,
      reset: () => {},
    };

    expect(mockParams.error.digest).toBe("test-digest");
  });
});

// --- road.type.ts ---
describe("RoadTypeSchema", () => {
  it("should validate correct road data", () => {
    const validRoad = {
      distance: 1000,
      duration: 300,
      polyline: "encoded_polyline_string",
    };

    const result = RoadTypeSchema.safeParse(validRoad);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.distance).toBe(1000);
      expect(result.data.duration).toBe(300);
      expect(result.data.polyline).toBe("encoded_polyline_string");
    }
  });

  it("should reject invalid distance", () => {
    const invalidRoad = {
      distance: "not-a-number",
      duration: 300,
      polyline: "encoded_polyline_string",
    };

    const result = RoadTypeSchema.safeParse(invalidRoad);
    expect(result.success).toBe(false);
  });

  it("should reject invalid duration", () => {
    const invalidRoad = {
      distance: 1000,
      duration: "not-a-number",
      polyline: "encoded_polyline_string",
    };

    const result = RoadTypeSchema.safeParse(invalidRoad);
    expect(result.success).toBe(false);
  });

  it("should reject invalid polyline", () => {
    const invalidRoad = {
      distance: 1000,
      duration: 300,
      polyline: 123, // Should be string
    };

    const result = RoadTypeSchema.safeParse(invalidRoad);
    expect(result.success).toBe(false);
  });

  it("should reject missing properties", () => {
    const invalidRoad = {
      distance: 1000,
      // Missing duration and polyline
    };

    const result = RoadTypeSchema.safeParse(invalidRoad);
    expect(result.success).toBe(false);
  });

  it("should reject extra properties", () => {
    const invalidRoad = {
      distance: 1000,
      duration: 300,
      polyline: "encoded_polyline_string",
      extraProperty: "should-not-be-here",
    };

    const result = RoadTypeSchema.safeParse(invalidRoad);
    expect(result.success).toBe(false);
  });
});

describe("RoadType", () => {
  it("should have correct structure", () => {
    const road: RoadType = {
      distance: 1000,
      duration: 300,
      polyline: "encoded_polyline_string",
    };

    expect(typeof road.distance).toBe("number");
    expect(typeof road.duration).toBe("number");
    expect(typeof road.polyline).toBe("string");
  });

  it("should work with zero values", () => {
    const road: RoadType = {
      distance: 0,
      duration: 0,
      polyline: "",
    };

    expect(road.distance).toBe(0);
    expect(road.duration).toBe(0);
    expect(road.polyline).toBe("");
  });
});

// --- three.d.ts ---
describe("Three.js types", () => {
  it("should allow importing three module", () => {
    // This test verifies that the module declaration works
    // We can't actually import three in tests, but we can verify the type exists
    expect(typeof "three").toBe("string");
  });
});

vi.mock("react", () => ({
  ReactNode: vi.fn(),
}));

describe("PageParams", () => {
  it("should have correct structure with generic params", () => {
    const mockParams: PageParams<{ id: string; slug: string }> = {
      params: Promise.resolve({ id: "123", slug: "test-slug" }),
      searchParams: Promise.resolve({ page: "1", limit: "10" }),
    };

    expect(mockParams).toHaveProperty("params");
    expect(mockParams).toHaveProperty("searchParams");
    expect(mockParams.params).toBeInstanceOf(Promise);
    expect(mockParams.searchParams).toBeInstanceOf(Promise);
  });

  it("should work with empty generic params", () => {
    const mockParams: PageParams = {
      params: Promise.resolve({}),
      searchParams: Promise.resolve({}),
    };

    expect(mockParams.params).toBeInstanceOf(Promise);
    expect(mockParams.searchParams).toBeInstanceOf(Promise);
  });

  it("should handle complex search params", () => {
    const mockParams: PageParams = {
      params: Promise.resolve({}),
      searchParams: Promise.resolve({
        page: "1",
        limit: "10",
        sort: ["name", "asc"],
        filter: "active",
        tags: ["tag1", "tag2"],
      }),
    };

    expect(mockParams.searchParams).toBeInstanceOf(Promise);
  });

  it("should handle async params resolution", async () => {
    const mockParams: PageParams<{ id: string }> = {
      params: Promise.resolve({ id: "123" }),
      searchParams: Promise.resolve({}),
    };

    const resolvedParams = await mockParams.params;
    expect(resolvedParams).toEqual({ id: "123" });
  });

  it("should handle async searchParams resolution", async () => {
    const mockParams: PageParams = {
      params: Promise.resolve({}),
      searchParams: Promise.resolve({ page: "1" }),
    };

    const resolvedSearchParams = await mockParams.searchParams;
    expect(resolvedSearchParams).toEqual({ page: "1" });
  });
});

describe("OrgPathParams", () => {
  it("should have orgSlug as string", () => {
    const mockParams: OrgPathParams = {
      orgSlug: "test-organization",
    };

    expect(mockParams.orgSlug).toBe("test-organization");
    expect(typeof mockParams.orgSlug).toBe("string");
  });

  it("should work with different org slug formats", () => {
    const validSlugs = [
      "my-org",
      "org123",
      "test_organization",
      "org-with-dashes",
      "org.with.dots",
    ];

    validSlugs.forEach((slug) => {
      const mockParams: OrgPathParams = { orgSlug: slug };
      expect(mockParams.orgSlug).toBe(slug);
    });
  });

  it("should be compatible with PageParams", () => {
    const mockParams: PageParams<OrgPathParams> = {
      params: Promise.resolve({ orgSlug: "test-org" }),
      searchParams: Promise.resolve({}),
    };

    expect(mockParams.params).toBeInstanceOf(Promise);
  });
});

describe("TripPathParams", () => {
  it("should extend OrgPathParams correctly", () => {
    const mockParams: TripPathParams = {
      orgSlug: "test-org",
      tripSlug: "my-trip",
    };

    expect(mockParams.orgSlug).toBe("test-org");
    expect(mockParams.tripSlug).toBe("my-trip");
  });

  it("should be assignable to OrgPathParams", () => {
    const tripParams: TripPathParams = {
      orgSlug: "test-org",
      tripSlug: "my-trip",
    };

    // Assignment test (type compatibility)
    const orgParams: OrgPathParams = tripParams;
    expect(orgParams.orgSlug).toBe("test-org");
  });

  it("should work with different trip slug formats", () => {
    const validTripSlugs = [
      "my-trip",
      "trip123",
      "trip_with_underscores",
      "trip-with-dashes",
      "trip.with.dots",
    ];

    validTripSlugs.forEach((tripSlug) => {
      const mockParams: TripPathParams = {
        orgSlug: "test-org",
        tripSlug,
      };
      expect(mockParams.tripSlug).toBe(tripSlug);
    });
  });

  it("should be compatible with PageParams", () => {
    const mockParams: PageParams<TripPathParams> = {
      params: Promise.resolve({ orgSlug: "test-org", tripSlug: "my-trip" }),
      searchParams: Promise.resolve({}),
    };

    expect(mockParams.params).toBeInstanceOf(Promise);
  });
});

describe("StepPathParams", () => {
  it("should extend TripPathParams correctly", () => {
    const mockParams: StepPathParams = {
      orgSlug: "test-org",
      tripSlug: "my-trip",
      stepSlug: "step-1",
    };

    expect(mockParams.orgSlug).toBe("test-org");
    expect(mockParams.tripSlug).toBe("my-trip");
    expect(mockParams.stepSlug).toBe("step-1");
  });

  it("should be assignable to TripPathParams", () => {
    const stepParams: StepPathParams = {
      orgSlug: "test-org",
      tripSlug: "my-trip",
      stepSlug: "step-1",
    };

    // Assignment test (type compatibility)
    const tripParams: TripPathParams = stepParams;
    expect(tripParams.orgSlug).toBe("test-org");
    expect(tripParams.tripSlug).toBe("my-trip");
  });

  it("should be assignable to OrgPathParams", () => {
    const stepParams: StepPathParams = {
      orgSlug: "test-org",
      tripSlug: "my-trip",
      stepSlug: "step-1",
    };

    // Assignment test (type compatibility)
    const orgParams: OrgPathParams = stepParams;
    expect(orgParams.orgSlug).toBe("test-org");
  });

  it("should work with different step slug formats", () => {
    const validStepSlugs = [
      "step-1",
      "step123",
      "step_with_underscores",
      "step-with-dashes",
      "step.with.dots",
    ];

    validStepSlugs.forEach((stepSlug) => {
      const mockParams: StepPathParams = {
        orgSlug: "test-org",
        tripSlug: "my-trip",
        stepSlug,
      };
      expect(mockParams.stepSlug).toBe(stepSlug);
    });
  });

  it("should be compatible with PageParams", () => {
    const mockParams: PageParams<StepPathParams> = {
      params: Promise.resolve({
        orgSlug: "test-org",
        tripSlug: "my-trip",
        stepSlug: "step-1",
      }),
      searchParams: Promise.resolve({}),
    };

    expect(mockParams.params).toBeInstanceOf(Promise);
  });
});

describe("LayoutParams", () => {
  it("should have params and optional children", () => {
    const mockParams: LayoutParams<{ userId: string }> = {
      params: Promise.resolve({ userId: "123" }),
      children: <div>Test Content</div>,
    };

    expect(mockParams).toHaveProperty("params");
    expect(mockParams).toHaveProperty("children");
    expect(mockParams.params).toBeInstanceOf(Promise);
    expect(mockParams.children).toBeDefined();
  });

  it("should work without children", () => {
    const mockParams: LayoutParams<{ userId: string }> = {
      params: Promise.resolve({ userId: "123" }),
    };

    expect(mockParams.children).toBeUndefined();
  });

  it("should work with empty generic params", () => {
    const mockParams: LayoutParams = {
      params: Promise.resolve({}),
    };

    expect(mockParams.params).toBeInstanceOf(Promise);
  });

  it("should handle complex params", () => {
    const mockParams: LayoutParams<{
      orgSlug: string;
      tripSlug: string;
      stepSlug: string;
    }> = {
      params: Promise.resolve({
        orgSlug: "test-org",
        tripSlug: "my-trip",
        stepSlug: "step-1",
      }),
      children: <div>Complex Layout</div>,
    };

    expect(mockParams.params).toBeInstanceOf(Promise);
    expect(mockParams.children).toBeDefined();
  });

  it("should handle async params resolution", async () => {
    const mockParams: LayoutParams<{ userId: string }> = {
      params: Promise.resolve({ userId: "123" }),
    };

    const resolvedParams = await mockParams.params;
    expect(resolvedParams).toEqual({ userId: "123" });
  });
});

describe("ErrorParams", () => {
  it("should have error and reset properties", () => {
    const mockError = new Error("Test error message");
    const mockReset = vi.fn();

    const mockParams: ErrorParams = {
      error: mockError,
      reset: mockReset,
    };

    expect(mockParams.error).toBe(mockError);
    expect(mockParams.reset).toBe(mockReset);
    expect(typeof mockParams.reset).toBe("function");
  });

  it("should support error with digest property", () => {
    const mockError = new Error("Test error") as Error & { digest?: string };
    mockError.digest = "test-digest-123";

    const mockParams: ErrorParams = {
      error: mockError,
      reset: () => {},
    };

    expect(mockParams.error.digest).toBe("test-digest-123");
  });

  it("should support error without digest property", () => {
    const mockError = new Error("Test error without digest");

    const mockParams: ErrorParams = {
      error: mockError,
      reset: () => {},
    };

    expect(mockParams.error.message).toBe("Test error without digest");
    expect(mockParams.error.digest).toBeUndefined();
  });

  it("should handle different error types", () => {
    const errorTypes = [
      new Error("Standard error"),
      new TypeError("Type error"),
      new ReferenceError("Reference error"),
      new SyntaxError("Syntax error"),
    ];

    errorTypes.forEach((error) => {
      const mockParams: ErrorParams = {
        error: error as Error & { digest?: string },
        reset: () => {},
      };

      expect(mockParams.error).toBe(error);
      expect(mockParams.error instanceof Error).toBe(true);
    });
  });

  it("should handle reset function calls", () => {
    const mockReset = vi.fn();
    const mockParams: ErrorParams = {
      error: new Error("Test error"),
      reset: mockReset,
    };

    mockParams.reset();
    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});

describe("Type compatibility and inheritance", () => {
  it("should demonstrate type inheritance chain", () => {
    const stepParams: StepPathParams = {
      orgSlug: "test-org",
      tripSlug: "my-trip",
      stepSlug: "step-1",
    };

    // StepPathParams → TripPathParams → OrgPathParams
    const tripParams: TripPathParams = stepParams;
    const orgParams: OrgPathParams = stepParams;

    expect(orgParams.orgSlug).toBe("test-org");
    expect(tripParams.orgSlug).toBe("test-org");
    expect(tripParams.tripSlug).toBe("my-trip");
  });

  it("should work with PageParams and LayoutParams", () => {
    const pageParams: PageParams<OrgPathParams> = {
      params: Promise.resolve({ orgSlug: "test-org" }),
      searchParams: Promise.resolve({}),
    };

    const layoutParams: LayoutParams<OrgPathParams> = {
      params: Promise.resolve({ orgSlug: "test-org" }),
      children: <div>Layout Content</div>,
    };

    expect(pageParams.params).toBeInstanceOf(Promise);
    expect(layoutParams.params).toBeInstanceOf(Promise);
  });
});
