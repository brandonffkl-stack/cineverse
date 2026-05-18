import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES  = ["/", "/login", "/register"];
const PROTECTED_BASE = ["/dashboard", "/discover", "/rankings",
                        "/profile", "/mascot", "/history",
                        "/favorites", "/analytics", "/movie"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("cineverse_token")?.value;

  const isProtected = PROTECTED_BASE.some((r) => pathname.startsWith(r));
  const isPublic    = PUBLIC_ROUTES.includes(pathname);
  const isAuth      = pathname.startsWith("/login") ||
                      pathname.startsWith("/register");

  // Sin token en ruta protegida → redirigir a login
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Con token en login/register → redirigir a dashboard
  if (isAuth && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};  