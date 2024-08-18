"use client";

import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContextProvider";

export const useAuthContext = () => {
  return useContext(AuthContext);
};
