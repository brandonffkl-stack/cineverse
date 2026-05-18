import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Une clases de Tailwind sin conflictos
// Uso: cn("px-4 py-2", isActive && "bg-violet-600", className)
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}