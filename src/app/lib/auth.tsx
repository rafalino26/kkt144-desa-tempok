"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type AuthContextType = { isAdmin: boolean; setIsAdmin: (v: boolean) => void; };
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("isAdmin") : null;
    if (saved) setIsAdmin(saved === "true");
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("isAdmin", String(isAdmin));
  }, [isAdmin]);

  const value = useMemo(() => ({ isAdmin, setIsAdmin }), [isAdmin]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
