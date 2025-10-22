import type { Metadata } from "next";
import "./globals.css";
import AppShell from "./components/layout/AppShell";
import { AuthProvider } from "./lib/auth";

export const metadata: Metadata = {
  title: "Website Desa Tempok",
  description: "Portal resmi Desa Tempok, Tompaso, Minahasa.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
