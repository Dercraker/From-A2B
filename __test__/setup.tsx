/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Mock window.matchMedia pour les tests
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
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

// Cleanup après chaque test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
