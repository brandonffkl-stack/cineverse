"use client";

import { useState }    from "react";
import { useRouter }   from "next/navigation";
import { useForm }     from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn }          from "@/lib/utils/cn";
import { loginSchema, type LoginForm } from "@/lib/utils/validators";
import { usersApi }    from "@/lib/api/users.api";
import { useUserStore } from "@/store/useUserStore";

export default function LoginPage() {
  const router  = useRouter();
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginForm) {
    setLoading(true);
    setError("");
    try {
      await usersApi.login(data as { email: string; password: string });
      router.push("/dashboard");
    } catch (e: any) {
      setError(e?.response?.data?.error?.message ?? "Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#04040e] flex">

      {/* Panel izquierdo — decorativo */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-[#04040e] to-pink-900/20" />
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-30"
          style={{ background:"radial-gradient(circle, #7c3aed, transparent)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full blur-3xl opacity-20"
          style={{ background:"radial-gradient(circle, #ec4899, transparent)" }}
        />
        <div className="relative z-10 flex flex-col justify-center px-16">
          <div
            className="font-display text-2xl font-black bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent mb-8 cursor-pointer"
            onClick={() => router.push("/")}
          >
            ⬡ CineVerse
          </div>
          <h2 className="font-display text-5xl font-black text-[#f1f0ff] leading-tight mb-4">
            Bienvenido
            <br />
            de vuelta
          </h2>
          <p className="text-[#7070a0] text-base leading-relaxed mb-8">
            Tu historial, favoritos, XP y logros
            te están esperando.
          </p>
          <div className="space-y-4">
            {[
              { icon:"🎬", text:"16+ películas en tu historial" },
              { icon:"⚡", text:"Tu XP y nivel guardados"        },
              { icon:"🤖", text:"Cinebot listo para evolucionar" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm text-[#7070a0]">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panel derecho — formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* Logo mobile */}
          <div
            className="lg:hidden font-display text-xl font-black bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent mb-8 cursor-pointer"
            onClick={() => router.push("/")}
          >
            ⬡ CineVerse
          </div>

          <h1 className="font-display text-4xl font-black text-[#f1f0ff] mb-2">
            Iniciar sesión
          </h1>
          <p className="text-sm text-[#7070a0] mb-8">
            ¿No tienes cuenta?{" "}
            <span
              onClick={() => router.push("/auth/register")}
              className="text-violet-400 hover:text-violet-300 cursor-pointer font-medium"
            >
              Crear cuenta gratis
            </span>
          </p>

          {/* Demo credentials */}
          <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-4 mb-6">
            <p className="text-xs font-bold text-violet-400 mb-2">
              🎭 Cuenta de demo
            </p>
            <p className="text-xs text-[#7070a0]">
              Email: <span className="text-[#f1f0ff] font-mono">demo@cineverse.app</span>
            </p>
            <p className="text-xs text-[#7070a0] mt-1">
              Password: <span className="text-[#f1f0ff] font-mono">Demo1234!</span>
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4">
              <p className="text-xs text-red-400">⚠ {error}</p>
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div>
              <label className="text-xs font-semibold text-[#7070a0] uppercase tracking-wide block mb-1.5">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="tu@email.com"
                className={cn(
                  "w-full bg-[#0d0d22] border rounded-xl px-4 py-3",
                  "text-sm text-[#f1f0ff] placeholder:text-[#3a3a5c]",
                  "outline-none transition-all duration-200",
                  "focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20",
                  errors.email ? "border-red-500/50" : "border-[#1e1e3a]"
                )}
              />
              {errors.email && (
                <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold text-[#7070a0] uppercase tracking-wide block mb-1.5">
                Contraseña
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className={cn(
                  "w-full bg-[#0d0d22] border rounded-xl px-4 py-3",
                  "text-sm text-[#f1f0ff] placeholder:text-[#3a3a5c]",
                  "outline-none transition-all duration-200",
                  "focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20",
                  errors.password ? "border-red-500/50" : "border-[#1e1e3a]"
                )}
              />
              {errors.password && (
                <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full py-3.5 rounded-xl font-bold text-sm text-white",
                "bg-gradient-to-r from-violet-600 to-pink-500",
                "hover:opacity-90 transition-all hover:scale-[1.01]",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100",
                "flex items-center justify-center gap-2"
              )}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar sesión →"
              )}
            </button>

          </form>

          <p className="text-xs text-[#3a3a5c] text-center mt-6">
            Al continuar aceptas nuestros{" "}
            <span className="text-violet-400 cursor-pointer">Términos de servicio</span>
          </p>

        </div>
      </div>
    </div>
  );
}