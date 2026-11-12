import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Loader Component
 *
 * A reusable loading spinner component with multiple variants.
 *
 * Variants:
 * - overlay: Covers parent container with semi-transparent background (for Drawers/Modals)
 * - fullPage: Covers entire screen with white background (for page transitions)
 * - inline: Just the spinner, centered (for cards/sections)
 * - button: Small spinner for inside buttons
 *
 * Usage Examples:
 * - {isLoading && <Loader variant="overlay" />}
 * - {isLoading && <Loader variant="fullPage" />}
 * - {isLoading && <Loader variant="inline" size="sm" />}
 * - {isLoading && <Loader variant="button" />} Saving...
 *
 * Note: Parent container needs position: relative for "overlay" variant to work correctly
 */

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Loader variant type */
  variant?: "overlay" | "fullPage" | "inline" | "button";
  /** Spinner size */
  size?: "sm" | "md" | "lg";
  /** Optional loading text */
  text?: string;
}

const sizeClasses = {
  sm: "w-6 h-6 border-2",
  md: "w-12 h-12 border-4",
  lg: "w-16 h-16 border-4",
};

const buttonSizeClass = "w-4 h-4 border-2";

const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ className, variant = "overlay", size = "md", text, ...props }, ref) => {
    // Spinner element - CSS border spinner (matching existing pattern)
    const spinner = (
      <div
        className={cn(
          "rounded-full animate-spin border-gray-200 border-t-blue-600",
          variant === "button" ? buttonSizeClass : sizeClasses[size]
        )}
      />
    );

    // Variant: button - just the spinner for inside buttons
    if (variant === "button") {
      return (
        <div ref={ref} className={cn("inline-flex items-center", className)} {...props}>
          {spinner}
        </div>
      );
    }

    // Variant: inline - centered spinner without overlay
    if (variant === "inline") {
      return (
        <div
          ref={ref}
          className={cn("flex justify-center items-center py-4", className)}
          {...props}
        >
          <div className="flex flex-col items-center gap-2">
            {spinner}
            {text && <p className="text-sm text-muted-foreground">{text}</p>}
          </div>
        </div>
      );
    }

    // Variant: fullPage - covers entire screen
    if (variant === "fullPage") {
      return (
        <div
          ref={ref}
          className={cn(
            "fixed inset-0 bg-white bg-opacity-95 z-[9999] flex items-center justify-center",
            className
          )}
          {...props}
        >
          <div className="flex flex-col items-center gap-2">
            {spinner}
            {text && <p className="text-sm text-muted-foreground">{text}</p>}
          </div>
        </div>
      );
    }

    // Variant: overlay (default) - covers parent container
    return (
      <div
        ref={ref}
        className={cn(
          "absolute inset-0 bg-black/30 flex justify-center items-center z-50",
          className
        )}
        {...props}
      >
        <div className="flex flex-col items-center gap-2">
          {spinner}
          {text && <p className="text-sm text-white">{text}</p>}
        </div>
      </div>
    );
  }
);

Loader.displayName = "Loader";

export { Loader };
