"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import { getSnapshot, getServerSnapshot, subscribe, clearSession } from "./auth-store";
import type { Merchant } from "@/services/types";

type AuthContextValue = {
  merchant: Merchant | null;
  isAuthenticated: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  function logout() {
    clearSession();
    router.push("/login");
  }

  const value: AuthContextValue = {
    merchant: snapshot.merchant,
    isAuthenticated: Boolean(snapshot.token),
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
