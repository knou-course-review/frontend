"use client";

import NotFound from "../not-found";
import TerminationMessage from "@/components/account/TerminationMessage";
import { useTerminationContext } from "@/hooks/useTerminationContext";

export default function AccountTerminated() {
  const { isTerminated } = useTerminationContext();
  if (!isTerminated) return <NotFound />;
  return <TerminationMessage />;
}
