import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl bg-[var(--surface)] px-4 py-2 text-sm text-foreground",
          "border border-[var(--glass-border)] backdrop-blur-sm",
          "placeholder:text-foreground-subtle",
          "focus:outline-none focus:ring-2 focus:ring-crimson-700/50 focus:border-crimson-700/50",
          "transition-all duration-200",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
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
