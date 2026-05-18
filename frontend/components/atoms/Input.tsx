import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?:     string;
  error?:     string;
  icon?:      React.ReactNode;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">

        {label && (
          <label className="text-sm font-medium text-[#a09ccc]">
            {label}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7070a0]">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            className={cn(
              "w-full bg-[#0d0d22] border rounded-lg px-3 py-2.5",
              "text-sm text-[#f1f0ff] placeholder:text-[#3a3a5c]",
              "outline-none transition-all duration-200",
              "focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30",
              error
                ? "border-red-500/50 focus:border-red-500"
                : "border-[#1e1e3a]",
              icon && "pl-10",
              className
            )}
            {...props}
          />
        </div>

        {error && (
          <p className="text-xs text-red-400 flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}

      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;