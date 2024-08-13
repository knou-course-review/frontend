"use client";

import { type ReactNode, useState, createContext, useEffect } from "react";

export type AuthContextProps = AuthContextState | null;

export type AuthContextState = {
  session: SessionUser | null;
  updateSession: (sessionData: SessionUser) => void;
};

export type SessionUser = {
  username: string;
  token: string;
};

export const AuthContext = createContext<AuthContextProps>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<SessionUser | null>(null);

  useEffect(() => {
    const getExistingSession = async () => {
      const res = await fetch("/api/check-session");
      const user = await res.json();
      if (user.isLoggedIn && user.payload) {
        // fetch username
        setSession({ username: "temp", token: user.token });
      }
    };
    getExistingSession();
  }, []);

  const updateSession = (sessionData: SessionUser) => setSession(sessionData);
  return <AuthContext.Provider value={{ session, updateSession }}>{children}</AuthContext.Provider>;
};
