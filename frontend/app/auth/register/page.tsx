"use client";

import { useState }    from "react";
import { useRouter }   from "next/navigation";
import { useForm }     from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn }          from "@/lib/utils/cn";
import { registerSchema, type RegisterForm } from "@/lib/utils/validators";
import { usersApi }    from "@/lib/api/users.api";

export default function RegisterPage() {
  const router  = useRouter();
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterForm) {
    setLoading(true);
    setError("");
    try {
      await usersApi.register(data as {
        displayName: string;
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
      });
      router.push("/dashboard");
    } catch (e: any) {
      setError(e?.response?.data?.error?.message ?? "Error al crear la cuenta");
    } finally {
      setLoading(false);
    }
  }

  const fields = [
    {
      name:        "displayName" as const,
      label:       "Nombre completo",
      type:        "text",
      placeholder: "Juan José",
      error:       errors.displayName,
    },
    {
      name:        "username" as const,
      label:       "Username",
      type:        "text",
      placeholder: "juanjo_cine",
      error:       errors.username,
    },
    {
      name:        "email" as const,
      label:       "Email",
      type:        "email",
      placeholder: "tu@email.com",
      error:       errors.email,
    },
    {
      name:        "password" as const,
      label:       "Contraseña",
      type:        "password",
      placeholder: "Mínimo 8 caracteres",
      error:       errors.password,
    },
    {
      name:        "confirmPassword" as const,
      label:       "Confirmar contraseña",
      type:        "password",
      placeholder: "Repite tu contraseña",
      error:       errors.confirmPassword,
    },
  ];

  return (
    <div className="min-h-screen bg-[#04040e] flex">

      {/* Panel izquierdo */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 via-[#04040e] to-violet-900/20" />
        <div
          className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full blur-3xl opacity-25"
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
            Empieza tu
            <br />
            viaje hoy
          </h2>
          <p className="text-[#7070a0] text-base leading-relaxed mb-8">
            Crea tu cuenta gratis y accede a una
            experiencia cinematográfica única.
          </p>
          {/* Niveles preview */}
          <div className="space-y-3">
            {[
              { emoji:"👶", name:"Nuevo Espectador", req:"Al registrarte",   color:"#7070a0" },
              { emoji:"🍿", name:"Cinéfilo Curioso",  req:"3 calificaciones", color:"#10b981" },
              { emoji:"🏆", name:"Maestro del Cine",  req:"15+ calificaciones",color:"#f59e0b" },
            ].map((lv) => (
              <div key={lv.name} className="flex items-center gap-3 bg-[#0d0d22]/50 rounded-xl p-3 border border-[#1e1e3a]">
                <span className="text-2xl">{lv.emoji}</span>
                <div>
                  <p className="text-sm font-bold" style={{ color: lv.color }}>
                    {lv.name}
                  </p>
                  <p className="text-[10px] text-[#3a3a5c]">{lv.req}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panel derecho — formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          <div
            className="lg:hidden font-display text-xl font-black bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent mb-8 cursor-pointer"
            onClick={() => router.push("/")}
          >
            ⬡ CineVerse
          </div>

          <h1 className="font-display text-4xl font-black text-[#f1f0ff] mb-2">
            Crear cuenta
          </h1>
          <p className="text-sm text-[#7070a0] mb-8">
            ¿Ya tienes cuenta?{" "}
            <span
              onClick={() => router.push("/auth/login")}
              className="text-violet-400 hover:text-violet-300 cursor-pointer font-medium"
            >
              Iniciar sesión
            </span>
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4">
              <p className="text-xs text-red-400">⚠ {error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((f) => (
              <div key={f.name}>
                <label className="text-xs font-semibold text-[#7070a0] uppercase tracking-wide block mb-1.5">
                  {f.label}
                </label>
                <input
                  {...register(f.name)}
                  type={f.type}
                  placeholder={f.placeholder}
                  className={cn(
                    "w-full bg-[#0d0d22] border rounded-xl px-4 py-3",
                    "text-sm text-[#f1f0ff] placeholder:text-[#3a3a5c]",
                    "outline-none transition-all duration-200",
                    "focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20",
                    f.error ? "border-red-500/50" : "border-[#1e1e3a]"
                  )}
                />
                {f.error && (
                  <p className="text-xs text-red-400 mt-1">{f.error.message}</p>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full py-3.5 rounded-xl font-bold text-sm text-white mt-2",
                "bg-gradient-to-r from-violet-600 to-pink-500",
                "hover:opacity-90 transition-all hover:scale-[1.01]",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "flex items-center justify-center gap-2"
              )}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                "Crear cuenta gratis →"
              )}
            </button>
          </form>

          <p className="text-xs text-[#3a3a5c] text-center mt-6">
            Al registrarte obtienes{" "}
            <span className="text-violet-400">+50 XP de bienvenida</span>{" "}
            y acceso completo a CineVerse.
          </p>

        </div>
      </div>
    </div>
  );
}