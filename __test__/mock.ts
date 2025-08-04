// src/test/mocks.ts
import { vi } from "vitest";

// Mock Prisma
export const mockPrisma = {
  user: {
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  organization: {
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  trip: {
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  step: {
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  task: {
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  file: {
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  road: {
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  organizationMembership: {
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  verificationToken: {
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  feedback: {
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
};

vi.mock("@lib/prisma", () => ({
  prisma: mockPrisma,
}));

// Mock Server Actions
export const mockServerAction = vi.fn();

// Mock Google Maps API
export const mockGoogleMapsAPI = {
  computeRoutes: vi.fn(),
  searchText: vi.fn(),
  findPlaceFromText: vi.fn(),
};

vi.mock("@lib/api/routes/computeRoutes", () => ({
  ComputeRoutes: mockGoogleMapsAPI.computeRoutes,
}));

vi.mock("@lib/api/places/search", () => ({
  SearchPlaces: mockGoogleMapsAPI.searchText,
}));

// Mock EdgeStore
export const mockEdgeStore = {
  upload: vi.fn(),
  delete: vi.fn(),
};

// Mock Resend
export const mockResend = {
  emails: {
    send: vi.fn(),
  },
  contacts: {
    create: vi.fn(),
    remove: vi.fn(),
  },
};

vi.mock("@lib/mail/resend", () => ({
  resend: mockResend,
}));

// Mock Stripe
export const mockStripe = {
  customers: {
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  subscriptions: {
    create: vi.fn(),
    update: vi.fn(),
    cancel: vi.fn(),
  },
  webhooks: {
    constructEvent: vi.fn(),
  },
};

vi.mock("@lib/stripe", () => ({
  stripe: mockStripe,
}));

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock getComputedStyle
Object.defineProperty(window, "getComputedStyle", {
  value: () => ({
    getPropertyValue: () => "",
  }),
});

// Mock scrollTo
Object.defineProperty(window, "scrollTo", {
  value: vi.fn(),
});
