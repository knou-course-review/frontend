"use client";

import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export type AuthContextState = {
  session: SessionState;
  updateSession: (sessionData: SessionState) => void;
};

export type SessionState = {
  isLoggedIn: boolean;
};

export const AuthContext = createContext<AuthContextState>({ session: { isLoggedIn: false }, updateSession: () => {} });

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [session, setSession] = useState<SessionState>({ isLoggedIn: false });

  useEffect(() => {
    const getExistingSession = async () => {
      const res = await fetch("/api/session");
      const session = await res.json();
      if (session.isLoggedIn) {
        setSession({ isLoggedIn: true });
      }
    };
    const checkSession = async () => {
      if (document.visibilityState !== "visible") return;
      const res = await fetch("/api/session");
      const session = await res.json();
      if (!session.isLoggedIn) {
        setSession({ isLoggedIn: false });
        router.refresh();
      }
    };

    getExistingSession();
    window.addEventListener("visibilitychange", checkSession);
    return () => window.removeEventListener("visibilitychange", checkSession);
  }, []);

  const updateSession = (sessionData: SessionState) => setSession((prev) => ({ ...prev, sessionData }));

  return (
    <AuthContext.Provider value={{ session: { isLoggedIn: session.isLoggedIn }, updateSession }}>
      {children}
    </AuthContext.Provider>
  );
};
