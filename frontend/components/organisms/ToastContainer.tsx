"use client";

import { useUIStore } from "@/store/useUIStore";
import { cn }         from "@/lib/utils/cn";

export default function ToastContainer() {
  const toasts      = useUIStore((s) => s.toasts);
  const removeToast = useUIStore((s) => s.removeToast);

  if (!toasts.length) return null;

  const icons = {
    success: "✅",
    error:   "❌",
    info:    "ℹ️",
    xp:      "⚡",
  };

  const colors = {
    success: "border-emerald-500/40 text-emerald-400",
    error:   "border-red-500/40    text-red-400",
    info:    "border-violet-500/40 text-violet-400",
    xp:      "border-amber-500/40  text-amber-400",
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          onClick={() => removeToast(t.id)}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-xl cursor-pointer",
            "bg-[#0d0d22] border shadow-xl shadow-black/40",
            "text-sm font-medium max-w-xs",
            "animate-[fadeUp_0.3s_ease_forwards]",
            colors[t.type]
          )}
        >
          <span>{icons[t.type]}</span>
          <span className="text-[#f1f0ff]">{t.message}</span>
        </div>
      ))}
    </div>
  );
}