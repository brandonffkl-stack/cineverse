import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CineVerse — Film Intelligence",
  description: "Tu universo cinematográfico.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}