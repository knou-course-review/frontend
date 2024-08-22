"use client";

import { useContext } from "react";
import { TerminationContext } from "@/contexts/termination/TerminationContextProvider";

export const useTerminationContext = () => {
  return useContext(TerminationContext);
};
