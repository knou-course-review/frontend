"use client";

import { type ReactNode, useState, createContext } from "react";

type AuthContextProps = { session: SessionUser | null; updateSession: (sessionData: SessionUser) => void } | null;

export type SessionUser = {
  username: string;
  token: string;
};

const AuthContext = createContext<AuthContextProps>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<SessionUser | null>(null);
  const updateSession = (sessionData: SessionUser) => setSession(sessionData);
  return <AuthContext.Provider value={{ session, updateSession }}>{children}</AuthContext.Provider>;
};
