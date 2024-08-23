"use client";

import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContextProvider";

export default function useAuthContext() {
  return useContext(AuthContext);
}
