"use client";

import { createContext, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type AuthContextState = {
  session: SessionState;
  isLoading: boolean;
  updateSession: (sessionData: SessionState) => void;
};

export type SessionState = {
  isLoggedIn: boolean;
};

export const AuthContext = createContext<AuthContextState>({
  session: { isLoggedIn: false },
  isLoading: true,
  updateSession: () => {},
});

const getSession = async () => {
  const res = await fetch("/api/session");
  const session = await res.json();
  return session;
};

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [session, setSession] = useState<SessionState>({ isLoggedIn: false });

  useEffect(() => {
    const getExistingSession = async () => {
      const session = await getSession();
      if (session.isLoggedIn) {
        setSession({ isLoggedIn: true });
      }
    };
    const checkSession = async () => {
      if (document.visibilityState !== "visible") return;
      const session = await getSession();
      if (!session.isLoggedIn) {
        setSession({ isLoggedIn: false });
        router.refresh();
      }
    };

    getExistingSession();
    setIsLoading(false);
    window.addEventListener("visibilitychange", checkSession);
    return () => window.removeEventListener("visibilitychange", checkSession);
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (!session.isLoggedIn) {
        setSession({ isLoggedIn: false });
      }
    };

    checkSession();
  }, [pathname, searchParams]);

  const updateSession = (sessionData: SessionState) => setSession(sessionData);

  return <AuthContext.Provider value={{ session, isLoading, updateSession }}>{children}</AuthContext.Provider>;
};
