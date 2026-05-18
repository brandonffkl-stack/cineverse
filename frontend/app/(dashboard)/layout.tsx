"use client";

import { useUIStore }  from "@/store/useUIStore";
import Sidebar         from "@/components/organisms/Sidebar";
import Topbar          from "@/components/organisms/Topbar";
import RatingModal     from "@/components/organisms/RatingModal";
import ToastContainer  from "@/components/organisms/ToastContainer";
import { cn }          from "@/lib/utils/cn";
import { loadMoviesFromAPI } from "@/store/useMovieStore";
import { useEffect } from "react";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
  loadMoviesFromAPI();
}, []);
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);

  return (
    <div className="min-h-screen bg-[#04040e]">

      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <div className={cn(
        "transition-all duration-300 min-h-screen",
        sidebarOpen ? "ml-[220px]" : "ml-0"
      )}>
        <Topbar />
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Modal de calificación */}
      <RatingModal />

      {/* Toasts */}
      <ToastContainer />

    </div>
  );
}