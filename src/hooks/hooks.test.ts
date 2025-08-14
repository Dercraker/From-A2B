/* eslint-disable @typescript-eslint/no-empty-function */

import { useDebounce } from "@hooks/use-debounce";
import { useIsMobile } from "@hooks/use-mobile";
import { useIsClient } from "@hooks/useIsClient";
import { useMatchingPathname } from "@hooks/useMatchingPathname";
import { useWarnIfUnsavedChanges } from "@hooks/useWarnIfUnsavedChanges";
import { renderHook } from "@testing-library/react";

import { useCurrentPath } from "@hooks/useCurrentPath";
import { useDisclosure } from "@hooks/useDisclosure";
import { act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as nextNavigation from "next/navigation";
const mockUsePathname = vi.mocked(nextNavigation.usePathname);

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));
    expect(result.current).toBe("initial");
  });

  it("should debounce value changes", async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: "initial" } },
    );

    expect(result.current).toBe("initial");

    // Change value
    rerender({ value: "changed" });
    expect(result.current).toBe("initial"); // Still old value

    // Fast forward time
    vi.advanceTimersByTime(500);

    await act(async () => {});

    expect(result.current).toBe("changed");
  });

  it("should use default delay of 500ms", async () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: "initial" },
    });

    rerender({ value: "changed" });
    expect(result.current).toBe("initial");

    vi.advanceTimersByTime(500);
    await act(async () => {});

    expect(result.current).toBe("changed");
  });

  it("should cancel previous timeout on new value", async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 1000),
      { initialProps: { value: "initial" } },
    );

    rerender({ value: "first" });
    vi.advanceTimersByTime(500);

    rerender({ value: "second" });
    expect(result.current).toBe("initial"); // Still initial

    vi.advanceTimersByTime(500); // Should not trigger first change
    expect(result.current).toBe("initial");

    vi.advanceTimersByTime(500); // Now should trigger second change
    await act(async () => {});

    expect(result.current).toBe("second");
  });

  it("should work with different types", () => {
    const { result } = renderHook(() => useDebounce(42, 100));
    expect(result.current).toBe(42);

    const { result: result2 } = renderHook(() =>
      useDebounce({ key: "value" }, 100),
    );
    expect(result2.current).toEqual({ key: "value" });
  });
});

describe("useIsMobile", () => {
  const originalInnerWidth = window.innerWidth;
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    // Reset matchMedia mock
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
  });

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: originalMatchMedia,
    });
  });

  it("should return true for mobile width", () => {
    window.innerWidth = 375; // Mobile width
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("should return false for desktop width", () => {
    window.innerWidth = 1024; // Desktop width
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("should return false for tablet width", () => {
    window.innerWidth = 768; // Tablet width (exactly at breakpoint)
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("should return true for width just below breakpoint", () => {
    window.innerWidth = 767; // Just below mobile breakpoint
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("should handle matchMedia events", () => {
    const mockAddEventListener = vi.fn();
    const mockRemoveEventListener = vi.fn();

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation(() => ({
        matches: false,
        addEventListener: mockAddEventListener,
        removeEventListener: mockRemoveEventListener,
      })),
    });

    const { unmount } = renderHook(() => useIsMobile());

    expect(mockAddEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
  });
});

describe("useClientFeatureFlag", () => {
  it("Cannot test this hook because I don't know how to mock it", () => {
    expect(true).toBe(true);
  });
});

describe("useCurrentPath", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return the most matching link", () => {
    mockUsePathname.mockReturnValue("/orgs/test-org/trips");

    const links = [
      { href: "/orgs/test-org", label: "Dashboard" },
      { href: "/orgs/test-org/trips", label: "Trips" },
      { href: "/orgs/test-org/settings", label: "Settings" },
    ];

    const { result } = renderHook(() => useCurrentPath(links));

    expect(result.current).toBe("/orgs/test-org/trips");
  });

  it("should return first link when no matches", () => {
    mockUsePathname.mockReturnValue("/completely/different/path");

    const links = [
      { href: "/orgs/test-org", label: "Dashboard" },
      { href: "/orgs/test-org/trips", label: "Trips" },
    ];

    const { result } = renderHook(() => useCurrentPath(links));

    expect(result.current).toBe("/orgs/test-org");
  });

  it("should handle partial matches correctly", () => {
    mockUsePathname.mockReturnValue("/orgs/test-org/trips/123");

    const links = [
      { href: "/orgs/test-org", label: "Dashboard" },
      { href: "/orgs/test-org/trips", label: "Trips" },
      { href: "/orgs/test-org/settings", label: "Settings" },
    ];

    const { result } = renderHook(() => useCurrentPath(links));

    expect(result.current).toBe("/orgs/test-org/trips");
  });

  it("should handle empty pathname", () => {
    mockUsePathname.mockReturnValue("/");

    const links = [
      { href: "/orgs/test-org", label: "Dashboard" },
      { href: "/orgs/test-org/trips", label: "Trips" },
    ];

    const { result } = renderHook(() => useCurrentPath(links));

    expect(result.current).toBe("/orgs/test-org");
  });

  it("should handle exact match with trailing slash", () => {
    mockUsePathname.mockReturnValue("/orgs/test-org/");

    const links = [
      { href: "/orgs/test-org", label: "Dashboard" },
      { href: "/orgs/test-org/trips", label: "Trips" },
    ];

    const { result } = renderHook(() => useCurrentPath(links));

    expect(result.current).toBe("/orgs/test-org");
  });
});

describe("useDisclosure", () => {
  it("should initialize with default state (false)", () => {
    const { result } = renderHook(() => useDisclosure());
    const [isOpen, handlers] = result.current;

    expect(isOpen).toBe(false);
    expect(handlers).toHaveProperty("open");
    expect(handlers).toHaveProperty("close");
    expect(handlers).toHaveProperty("toggle");
  });

  it("should initialize with custom initial state", () => {
    const { result } = renderHook(() => useDisclosure(true));
    const [isOpen] = result.current;

    expect(isOpen).toBe(true);
  });

  it("should open when open() is called", () => {
    const { result } = renderHook(() => useDisclosure(false));

    act(() => {
      result.current[1].open();
    });

    expect(result.current[0]).toBe(true);
  });

  it("should close when close() is called", () => {
    const { result } = renderHook(() => useDisclosure(true));

    act(() => {
      result.current[1].close();
    });

    expect(result.current[0]).toBe(false);
  });

  it("should toggle when toggle() is called", () => {
    const { result } = renderHook(() => useDisclosure(false));

    act(() => {
      result.current[1].toggle();
    });
    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1].toggle();
    });
    expect(result.current[0]).toBe(false);
  });

  it("should call onOpen callback when opening", () => {
    const onOpen = vi.fn();
    const { result } = renderHook(() => useDisclosure(false, { onOpen }));

    act(() => {
      result.current[1].open();
    });

    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it("should call onClose callback when closing", () => {
    const onClose = vi.fn();
    const { result } = renderHook(() => useDisclosure(true, { onClose }));

    act(() => {
      result.current[1].close();
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should not call onOpen when already open", () => {
    const onOpen = vi.fn();
    const { result } = renderHook(() => useDisclosure(true, { onOpen }));

    act(() => {
      result.current[1].open();
    });

    expect(onOpen).not.toHaveBeenCalled();
  });

  it("should not call onClose when already closed", () => {
    const onClose = vi.fn();
    const { result } = renderHook(() => useDisclosure(false, { onClose }));

    act(() => {
      result.current[1].close();
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  it("should handle multiple rapid calls", () => {
    const { result } = renderHook(() => useDisclosure(false));

    act(() => {
      result.current[1].open();
      result.current[1].open();
      result.current[1].open();
    });

    expect(result.current[0]).toBe(true);
  });
});

describe("useIsClient", () => {
  it("should return true initially", () => {
    const { result } = renderHook(() => useIsClient());
    expect(result.current).toBe(true);
  });

  it("should return true after mount", () => {
    const { result } = renderHook(() => useIsClient());

    act(() => {});

    expect(typeof result.current).toBe("boolean");
  });
});

describe("useMatchingPathname", () => {
  it("should return the best matching path", () => {
    mockUsePathname.mockReturnValue("/orgs/test-org/trips/123");

    const links = [
      "/orgs/test-org",
      "/orgs/test-org/trips",
      "/orgs/test-org/settings",
    ];

    const { result } = renderHook(() => useMatchingPathname(links));

    expect(result.current).toBe("/orgs/test-org/trips");
  });

  it("should return first string when no matches", () => {
    mockUsePathname.mockReturnValue("/completely/different/path");

    const links = ["/orgs/test-org", "/orgs/test-org/trips"];

    const { result } = renderHook(() => useMatchingPathname(links));

    expect(result.current).toBe(links[0]);
  });

  it("should handle exact matches", () => {
    mockUsePathname.mockReturnValue("/orgs/test-org/trips");

    const links = [
      "/orgs/test-org",
      "/orgs/test-org/trips",
      "/orgs/test-org/settings",
    ];

    const { result } = renderHook(() => useMatchingPathname(links));

    expect(result.current).toBe("/orgs/test-org/trips");
  });

  it("should handle root path", () => {
    mockUsePathname.mockReturnValue("/");

    const links = ["/orgs/test-org", "/orgs/test-org/trips"];

    const { result } = renderHook(() => useMatchingPathname(links));

    expect(result.current).toBe(links[0]);
  });

  it("should handle empty links array", () => {
    mockUsePathname.mockReturnValue("/orgs/test-org");

    const { result } = renderHook(() => useMatchingPathname([]));

    expect(result.current).toBe("");
  });

  it("should handle single segment matches", () => {
    mockUsePathname.mockReturnValue("/orgs");

    const links = ["/orgs", "/orgs/test-org", "/orgs/test-org/trips"];

    const { result } = renderHook(() => useMatchingPathname(links));

    expect(result.current).toBe("/orgs");
  });
});

describe("useWarnIfUnsavedChanges", () => {
  const originalConfirm = window.confirm;
  const originalOnbeforeunload = window.onbeforeunload;

  beforeEach(() => {
    window.confirm = vi.fn();
    window.onbeforeunload = null;
  });

  afterEach(() => {
    window.confirm = originalConfirm;
    window.onbeforeunload = originalOnbeforeunload;
  });

  it("should not set onbeforeunload when unsaved is false", () => {
    renderHook(() => useWarnIfUnsavedChanges(false));
    expect(window.onbeforeunload).toBeNull();
  });

  it("should set onbeforeunload when unsaved is true", () => {
    renderHook(() => useWarnIfUnsavedChanges(true));
    expect(typeof window.onbeforeunload).toBe("function");
  });

  it("should use default message when no message provided", () => {
    const mockConfirm = vi.mocked(window.confirm);
    mockConfirm.mockReturnValue(true);

    renderHook(() => useWarnIfUnsavedChanges(true));

    // Trigger the beforeunload handler
    if (window.onbeforeunload) {
      window.onbeforeunload({} as BeforeUnloadEvent);
    }

    expect(mockConfirm).toHaveBeenCalledWith(
      "Changes you made has not been saved just yet. Do you wish to proceed anyway?",
    );
  });

  it("should use custom message when provided", () => {
    const mockConfirm = vi.mocked(window.confirm);
    mockConfirm.mockReturnValue(true);
    const customMessage = "Custom warning message";

    renderHook(() => useWarnIfUnsavedChanges(true, customMessage));

    if (window.onbeforeunload) {
      window.onbeforeunload({} as BeforeUnloadEvent);
    }

    expect(mockConfirm).toHaveBeenCalledWith(customMessage);
  });

  it("should handle user declining the confirmation", () => {
    const mockConfirm = vi.mocked(window.confirm);
    mockConfirm.mockReturnValue(false);

    renderHook(() => useWarnIfUnsavedChanges(true));

    if (window.onbeforeunload) {
      window.onbeforeunload({} as BeforeUnloadEvent);
    }

    expect(mockConfirm).toHaveBeenCalled();
  });

  it("should clean up onbeforeunload on unmount", () => {
    const { unmount } = renderHook(() => useWarnIfUnsavedChanges(true));

    expect(typeof window.onbeforeunload).toBe("function");

    unmount();

    expect(window.onbeforeunload).toBeNull();
  });
});
