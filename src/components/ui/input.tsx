import { cn } from "@lib/utils";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import * as React from "react";

const inputVariants = cva(
  "flex w-full rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        default: "h-9 px-3 py-1",
        sm: "h-8 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xs: "h-7 px-2 py-1",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export type BaseInputProps = React.InputHTMLAttributes<HTMLInputElement>;

type Size = VariantProps<typeof inputVariants>["size"] | (number & {});

type InputProps = Omit<BaseInputProps, "size"> & {
  size?: Size;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size = "default", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          inputVariants({
            size: size as VariantProps<typeof inputVariants>["size"],
          }),
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export const InputUnit = React.forwardRef<
  HTMLInputElement,
  InputProps & {
    nextChildren?: React.ReactNode;
    prevChildren?: React.ReactNode;
    inputClassName?: string;
  }
>(
  (
    {
      className,
      prevChildren,
      type,
      nextChildren,
      disabled,
      size,
      inputClassName,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          inputVariants({
            size: size as VariantProps<typeof inputVariants>["size"],
          }),
          "px-0",
          {
            "cursor-not-allowed opacity-50": disabled,
          },
          className,
        )}
      >
        {prevChildren && (
          <div
            className={cn(
              "pl-3 py-2 flex items-center justify-center",
              inputClassName,
            )}
          >
            {prevChildren}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "px-3 py-2 bg-transparent border-0 w-full",
            "focus-visible:outline-none",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground",
            inputClassName,
          )}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        {nextChildren && <div className={cn("pr-3")}>{nextChildren}</div>}
      </div>
    );
  },
);

InputUnit.displayName = "InputUnit";

export { Input };
