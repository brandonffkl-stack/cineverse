import { cn } from "@/lib/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?:    "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant  = "primary",
  size     = "md",
  loading  = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {

  const base = `
    inline-flex items-center justify-center gap-2
    font-medium rounded-lg border
    transition-all duration-200 cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-violet-600 to-pink-500
      border-transparent text-white
      hover:opacity-90 hover:scale-[1.02]
      shadow-lg shadow-violet-900/30
    `,
    secondary: `
      bg-transparent
      border-[#1e1e3a] text-[#f1f0ff]
      hover:border-violet-500 hover:text-violet-400
    `,
    ghost: `
      bg-transparent border-transparent
      text-[#7070a0] hover:text-[#f1f0ff]
      hover:bg-white/5
    `,
    danger: `
      bg-transparent border-red-500/40
      text-red-400 hover:bg-red-500/10
    `,
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2.5",
    lg: "text-base px-6 py-3",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Cargando...
        </>
      ) : (
        children
      )}
    </button>
  );
}