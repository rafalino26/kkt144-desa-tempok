'use client';

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import AppShell from "./AppShell";
import SessionWatcher from "./SessionWatcher";

export default function ClientLayout({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  return (
    <SessionProvider session={session}>
      <AppShell session={session}>
        {children}
      </AppShell>
      <SessionWatcher />
    </SessionProvider>
  );
}
