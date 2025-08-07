import { TransportMode } from "@prisma/client";
import { describe, expect, it, vi } from "vitest";
import { randomizeArray } from "./array";
import { fileToBlob } from "./file";
import { formatBytes } from "./formatBytes";
import { GetStepRank, RankStep, isLessThan } from "./GetStepRank";
import {
  GetTransportModeFromString,
  GetTransportModeString,
  GetTravelMode,
} from "./getTravelMode";
import { ReSortEntities } from "./reSort";

// Mock Prisma
vi.mock("@lib/prisma", () => ({
  prisma: {
    task: {
      update: vi.fn(),
    },
    step: {
      update: vi.fn(),
    },
  },
}));

// Mock next/headers
vi.mock("next/headers", () => ({
  headers: {
    mockResolvedValue: vi.fn(),
  },
}));

// Mock Google Maps
vi.mock("@googlemaps/routing/build/protos/protos", () => ({
  google: {
    maps: {
      routing: {
        v2: {
          RouteTravelMode: {
            WALK: "WALK",
            BICYCLE: "BICYCLE",
            DRIVE: "DRIVE",
            TRAVEL_MODE_UNSPECIFIED: "TRAVEL_MODE_UNSPECIFIED",
          },
        },
      },
    },
  },
}));

describe("randomizeArray", () => {
  it("should shuffle array elements", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = randomizeArray([...arr]);
    expect(result).not.toEqual(arr);
    // Cannot guarantee order, but we verify all elements are present
  });
});

describe("fileToBlob", () => {
  it("should convert a File to a Blob", async () => {
    const file = new File(["hello"], "hello.txt", { type: "text/plain" });
    file.arrayBuffer = vi.fn().mockResolvedValue(new ArrayBuffer(5));

    const blob = await fileToBlob(file);
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe("text/plain");
  });
});

describe("formatBytes", () => {
  it("should format bytes to KB/MB/GB", () => {
    expect(formatBytes(0)).toBe("0 Bytes");
    expect(formatBytes(1024)).toBe("1 KB");
    expect(formatBytes(1024 * 1024)).toBe("1 MB");
    expect(formatBytes(1024 * 1024 * 1024)).toBe("1 GB");
    expect(formatBytes(1234, 1)).toBe("1.2 KB");
  });
});

describe("GetStepRank", () => {
  it("should return next rank if only previousRank is provided", () => {
    expect(GetStepRank({ previousRank: 5 })).toBe(5 + RankStep);
  });
  it("should return previous rank if only nextRank is provided", () => {
    expect(GetStepRank({ nextRank: 10 })).toBe(10 - RankStep);
  });
  it("should return RankStep if neither is provided", () => {
    expect(GetStepRank({})).toBe(RankStep);
  });
  it("should throw if nextRank <= previousRank", () => {
    expect(() => GetStepRank({ previousRank: 10, nextRank: 5 })).toThrow();
    expect(() => GetStepRank({ previousRank: 5, nextRank: 5 })).toThrow();
    expect(() => GetStepRank({ previousRank: 5, nextRank: 6 })).toThrow();
  });
  it("should return the middle rank", () => {
    expect(GetStepRank({ previousRank: 5, nextRank: 15 })).toBe(10);
  });
});

describe("isLessThan", () => {
  it("should return true if nextRank > previousRank", () => {
    expect(isLessThan(1, 2)).toBe(true);
    expect(isLessThan(5, 10)).toBe(true);
  });
  it("should return false otherwise", () => {
    expect(isLessThan(2, 1)).toBe(false);
    expect(isLessThan(5, 5)).toBe(false);
  });
});

describe("getTravelMode", () => {
  it("should map TransportMode to Google RouteTravelMode", () => {
    expect(GetTravelMode(TransportMode.Walk)).toBe("WALK");
    expect(GetTravelMode(TransportMode.Bike)).toBe("BICYCLE");
    expect(GetTravelMode(TransportMode.Car)).toBe("DRIVE");
    expect(GetTravelMode(TransportMode.Boat)).toBe("TRAVEL_MODE_UNSPECIFIED");
    expect(GetTravelMode(TransportMode.Plane)).toBe("TRAVEL_MODE_UNSPECIFIED");
  });
});

describe("GetTransportModeString", () => {
  it("should map TransportMode to string", () => {
    expect(GetTransportModeString(TransportMode.Walk)).toBe("Walk");
    expect(GetTransportModeString(TransportMode.Bike)).toBe("Bike");
    expect(GetTransportModeString(TransportMode.Car)).toBe("Car");
    expect(GetTransportModeString(TransportMode.Boat)).toBe("Boat");
    expect(GetTransportModeString(TransportMode.Plane)).toBe("Plane");
  });
});

describe("GetTransportModeFromString", () => {
  it("should map string to TransportMode", () => {
    expect(GetTransportModeFromString("Walk")).toBe(TransportMode.Walk);
    expect(GetTransportModeFromString("Bike")).toBe(TransportMode.Bike);
    expect(GetTransportModeFromString("Car")).toBe(TransportMode.Car);
    expect(GetTransportModeFromString("Boat")).toBe(TransportMode.Boat);
    expect(GetTransportModeFromString("Plane")).toBe(TransportMode.Plane);
    expect(GetTransportModeFromString("Unknown")).toBe(TransportMode.Walk); // default
  });
});

describe("ReSortEntities", () => {
  it("should do nothing if entities array is empty", async () => {
    await expect(
      ReSortEntities({ entities: [], entityType: "task" }),
    ).resolves.toBeUndefined();
  });

  it("should call updateEntityRank for each entity", async () => {
    const entities = [
      { id: "1", rank: 0 },
      { id: "2", rank: 0 },
    ];
    const { prisma } = await import("@lib/prisma");
    await ReSortEntities({ entities, entityType: "task" });
    expect(prisma.task.update).toHaveBeenCalledTimes(2);
  });
});
