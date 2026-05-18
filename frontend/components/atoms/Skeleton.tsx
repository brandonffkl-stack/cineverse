import { cn } from "@/lib/utils/cn";

interface SkeletonProps {
  className?: string;
  rounded?:   "sm" | "md" | "lg" | "full";
}

// Bloque base de skeleton
export default function Skeleton({ className, rounded = "md" }: SkeletonProps) {
  const radii = {
    sm:   "rounded",
    md:   "rounded-lg",
    lg:   "rounded-xl",
    full: "rounded-full",
  };

  return (
    <div
      className={cn(
        "bg-[#1e1e3a] animate-pulse",
        radii[rounded],
        className
      )}
    />
  );
}

// Skeleton completo de una MovieCard
export function MovieCardSkeleton() {
  return (
    <div className="bg-[#0d0d22] border border-[#1e1e3a] rounded-[14px] overflow-hidden">
      <Skeleton className="h-[110px] w-full" rounded="sm" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex justify-between items-center pt-1">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-5 w-10" rounded="sm" />
        </div>
      </div>
    </div>
  );
}

// Skeleton de StatCard
export function StatCardSkeleton() {
  return (
    <div className="bg-[#0d0d22] border border-[#1e1e3a] rounded-[14px] p-5">
      <Skeleton className="h-8 w-8 mb-3" rounded="lg" />
      <Skeleton className="h-8 w-16 mb-2" />
      <Skeleton className="h-3 w-24" />
    </div>
  );
}