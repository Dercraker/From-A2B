// src/test/helpers.ts
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { APIProvider } from "@vis.gl/react-google-maps";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { NextStepProvider } from "nextstepjs";
import type { ReactElement } from "react";

// Mock Query Client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

// Wrapper pour les tests avec tous les providers
export const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <APIProvider apiKey="test-api-key">
        <SessionProvider session={null}>
          <QueryClientProvider client={queryClient}>
            <NextStepProvider>{children}</NextStepProvider>
          </QueryClientProvider>
        </SessionProvider>
      </APIProvider>
    </ThemeProvider>
  );
};

// Fonction de rendu personnalisée avec providers
export const renderWithProviders = (ui: ReactElement) => {
  return render(ui, { wrapper: TestWrapper });
};

// Données de test
export const mockUser = {
  id: "user-123",
  email: "test@example.com",
  name: "Test User",
  image: "https://example.com/avatar.jpg",
};

export const mockOrg = {
  id: "org-123",
  slug: "test-org",
  name: "Test Organization",
  email: "org@example.com",
  image: "https://example.com/org.jpg",
  plan: {
    id: "FREE",
    name: "Free",
    maximumMembers: 1,
  },
  members: [
    {
      roles: ["OWNER"],
    },
  ],
};

export const mockTrip = {
  id: "trip-123",
  slug: "test-trip",
  name: "Test Trip",
  description: "A test trip",
  startDate: new Date("2024-01-01"),
  endDate: new Date("2024-01-07"),
  organizationId: "org-123",
  image: "https://example.com/trip.jpg",
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const mockStep = {
  id: "step-123",
  slug: "test-step",
  tripId: "trip-123",
  rank: 1,
  name: "Test Step",
  description: "A test step",
  startDate: new Date("2024-01-01T10:00:00Z"),
  endDate: new Date("2024-01-01T12:00:00Z"),
  latitude: 48.8566,
  longitude: 2.3522,
  placeId: "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
  TransportMode: "Car",
  schedulingNotes: "Test notes",
};

export const mockTask = {
  id: "task-123",
  title: "Test Task",
  notes: "Test task notes",
  dueDate: new Date("2024-01-01T14:00:00Z"),
  rank: 1,
  state: "Todo",
  stepId: "step-123",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockFile = {
  id: "file-123",
  name: "test-file.pdf",
  url: "https://example.com/test-file.pdf",
  type: "application/pdf",
  size: 1024,
  uploadedAt: new Date(),
  stepId: "step-123",
};
