/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PrismaClient } from "@prisma/client";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";

// Mock Prisma
const prisma = mockDeep<PrismaClient>();
vi.mock("@/lib/prisma", () => ({ prisma }));
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

// Mock Next.js
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: vi.fn(),
  useSearchParams: () => new URLSearchParams(),
  redirect: vi.fn(),
  notFound: vi.fn(),
}));

// Mock Next.js headers
vi.mock("next/headers", () => ({
  headers: () => new Map([["x-url", "http://localhost:3000/orgs/test-org"]]),
  cookies: () => new Map(),
}));

// Mock NextAuth
vi.mock("next-auth/react", () => ({
  useSession: () => ({ data: null, status: "unauthenticated" }),
  signIn: vi.fn(),
  signOut: vi.fn(),
  getSession: vi.fn(),
  SessionProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock nanoid
vi.mock("nanoid", () => ({
  customAlphabet: vi.fn(() => () => "abcd1234"),
  nanoid: vi.fn(() => "xyz789"),
}));

// Mock PostHog
vi.mock("posthog-js", () => ({
  default: {
    capture: vi.fn(),
    identify: vi.fn(),
    init: vi.fn(),
  },
}));

// Mock posthog-js/react
vi.mock("posthog-js/react", () => ({
  useFeatureFlagEnabled: vi.fn(),
}));

// Mock Google Maps
vi.mock("@vis.gl/react-google-maps", () => ({
  APIProvider: ({ children }: { children: React.ReactNode }) => children,
  Map: () => <div data-testid="google-map" />,
  Marker: () => <div data-testid="google-marker" />,
  Polyline: () => <div data-testid="google-polyline" />,
}));

// Mock TanStack Query
vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
  useMutation: vi.fn(),
  useQueryClient: vi.fn(() => ({
    invalidateQueries: vi.fn(),
    setQueryData: vi.fn(),
  })),
  QueryClient: vi.fn(),
  QueryClientProvider: ({ children }: { children: React.ReactNode }) =>
    children,
}));

// Mock EdgeStore
vi.mock("@edgestore/react", () => ({
  useEdgeStore: () => ({
    upload: vi.fn(),
    delete: vi.fn(),
  }),
  EdgeStoreProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock Framer Motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
  LayoutGroup: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock NUQS
vi.mock("nuqs", () => ({
  useQueryState: vi.fn(),
  useQueryStates: vi.fn(),
}));

// Mock Zustand
vi.mock("zustand", () => ({
  create: vi.fn(),
}));

// Mock the store
vi.mock("@components/page/NextTopLoader", () => ({
  useNextTopLoaderStore: {
    getState: () => ({
      disable: vi.fn(),
      enable: vi.fn(),
    }),
  },
}));

// Mock sonner toast
vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  },
}));

beforeEach(() => {
  cleanup();
  mockReset(prisma);

  // Mock localStorage
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    },
    writable: true,
  });
});

// Cleanup après chaque test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
