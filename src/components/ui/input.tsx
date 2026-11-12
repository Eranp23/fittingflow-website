import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-[42px] w-full rounded-[8px] border text-gray-600 border-[#1602394D] bg-background px-3 py-2 text-[16px] ring-offset-background file:border-0 file:bg-transparent file:text-[16px] file:font-medium file:text-foreground placeholder:text-[#16023980] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-[16px]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
