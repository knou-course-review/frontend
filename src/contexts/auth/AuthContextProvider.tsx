"use client";

import { type ReactNode, useState, createContext } from "react";

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
  const updateSession = (sessionData: SessionUser) => setSession(sessionData);
  return <AuthContext.Provider value={{ session, updateSession }}>{children}</AuthContext.Provider>;
};
