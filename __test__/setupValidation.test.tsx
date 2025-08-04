// src/test/validation.test.ts
import { Button } from "@components/ui/button";
import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import { mockOrg, mockTrip, mockUser, renderWithProviders } from "./helper";

describe("Test Setup Validation", () => {
  beforeAll(() => {
    expect(mockUser).toBeDefined();
    expect(mockOrg).toBeDefined();
    expect(mockTrip).toBeDefined();
  });

  it("should render a button component", () => {
    render(<Button>Test Button</Button>);

    const button = screen.getByRole("button", { name: "Test Button" });
    expect(button).toBeInTheDocument();
  });

  it("should render components with providers", () => {
    renderWithProviders(<Button>Test</Button>);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("should render a simple button element", () => {
    render(<button>Test Button</button>);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Test Button");
  });

  it("should render a simple button element with providers", () => {
    renderWithProviders(<button>Test Button</button>);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Test Button");
  });

  it("should have proper styling classes", () => {
    render(<Button>Test Button</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("inline-flex", "items-center", "justify-center");
  });

  it("should have working test data", () => {
    expect(mockUser.id).toBe("user-123");
    expect(mockOrg.slug).toBe("test-org");
    expect(mockTrip.name).toBe("Test Trip");
  });
});
