import { cn } from "@lib/utils";
import { describe, expect, it } from "vitest";

describe("cn utility function", () => {
  it("should merge class names correctly", () => {
    const result = cn("px-2 py-1", "bg-red-500", "text-white");
    expect(result).toBe("px-2 py-1 bg-red-500 text-white");
  });

  it("should handle conditional classes", () => {
    const isActive = true;
    const isDisabled = false;

    const result = cn(
      "base-class",
      isActive && "active-class",
      isDisabled && "disabled-class",
    );

    expect(result).toBe("base-class active-class");
  });

  it("should handle arrays of classes", () => {
    const result = cn(
      "base-class",
      ["nested-class-1", "nested-class-2"],
      "another-class",
    );

    expect(result).toBe(
      "base-class nested-class-1 nested-class-2 another-class",
    );
  });

  it("should handle objects with boolean values", () => {
    const result = cn("base-class", {
      "active-class": true,
      "disabled-class": false,
      "conditional-class": true,
    });

    expect(result).toBe("base-class active-class conditional-class");
  });

  it("should handle mixed input types", () => {
    const isActive = true;
    const classes = ["class1", "class2"];

    const result = cn(
      "base-class",
      isActive && "active",
      classes,
      { "object-class": true, "false-class": false },
      "string-class",
    );

    expect(result).toBe(
      "base-class active class1 class2 object-class string-class",
    );
  });

  it("should handle empty inputs", () => {
    const result = cn();
    expect(result).toBe("");
  });

  it("should handle falsy values", () => {
    const result = cn(
      "base-class",
      false,
      null,
      undefined,
      "",
      0,
      "valid-class",
    );

    expect(result).toBe("base-class valid-class");
  });

  it("should deduplicate conflicting Tailwind classes", () => {
    const result = cn(
      "px-2 py-1 bg-red-500",
      "px-4 bg-blue-500", // px-4 should override px-2, bg-blue-500 should override bg-red-500
      "py-2", // py-2 should override py-1
    );

    expect(result).toBe("px-4 bg-blue-500 py-2");
  });

  it("should handle complex Tailwind conflicts", () => {
    const result = cn(
      "text-sm font-medium text-gray-900",
      "text-lg font-bold text-blue-600",
      "text-base", // Should override both text-sm and text-lg
    );

    expect(result).toBe("font-bold text-blue-600 text-base");
  });

  it("should preserve non-Tailwind classes", () => {
    const result = cn(
      "custom-class px-2",
      "another-custom bg-red-500",
      "px-4", // Should override px-2 but keep custom classes
    );

    expect(result).toBe("custom-class another-custom bg-red-500 px-4");
  });

  it("should handle deeply nested arrays", () => {
    const result = cn(
      "base-class",
      ["nested-1", ["deeply-nested-1", "deeply-nested-2"], "nested-2"],
      "final-class",
    );

    expect(result).toBe(
      "base-class nested-1 deeply-nested-1 deeply-nested-2 nested-2 final-class",
    );
  });

  it("should handle complex conditional logic", () => {
    const user = { role: "admin", isActive: true };
    const theme = "dark";

    const result = cn(
      "base-button",
      user.role === "admin" && "admin-button",
      user.isActive && "active-button",
      theme === "dark" && "dark-theme",
      user.role === "user" && "user-button", // Should not be included
    );

    expect(result).toBe("base-button admin-button active-button dark-theme");
  });

  it("should handle function calls that return classes", () => {
    const getThemeClasses = () => "theme-light";
    const getSizeClasses = () => "text-sm";

    const result = cn("base-class", getThemeClasses(), getSizeClasses());

    expect(result).toBe("base-class theme-light text-sm");
  });

  it("should handle edge cases with special characters", () => {
    const result = cn(
      "class-with-dash",
      "class_with_underscore",
      "class.with.dots",
      "class:with:colons",
    );

    expect(result).toBe(
      "class-with-dash class_with_underscore class.with.dots class:with:colons",
    );
  });

  it("should handle whitespace in class names", () => {
    const result = cn(
      "  class-with-spaces  ",
      "  another-class  ",
      "normal-class",
    );

    expect(result).toBe("class-with-spaces another-class normal-class");
  });

  it("should handle numbers as class names", () => {
    const result = cn("base-class", 123, "text-class", 456);

    expect(result).toBe("base-class 123 text-class 456");
  });

  it("should handle empty strings and whitespace-only strings", () => {
    const result = cn("base-class", "", "   ", "valid-class", "\t\n");

    expect(result).toBe("base-class valid-class");
  });
});
