"use client";
import React from "react";
import Navbar from "./navbar";
import Footer from "./Footer";
import MobileSidebar from "./MobileSidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col bg-surface">
      {/* Desktop: Navbar + Footer */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Mobile: Sidebar sebagai header */}
      <div className="md:hidden">
        <MobileSidebar />
      </div>

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        {children}
      </main>

      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
}
