"use client";

import { createContext, useState, type ReactNode } from "react";

export const TerminationContext = createContext({ isTerminated: false, setTerminatedStatus: () => {} });

export const TerminationContextProvider = ({ children }: { children: ReactNode }) => {
  const [isTerminated, setIsTerminated] = useState(false);
  const setTerminatedStatus = () => setIsTerminated(true);
  return (
    <TerminationContext.Provider value={{ isTerminated, setTerminatedStatus }}>{children}</TerminationContext.Provider>
  );
};
