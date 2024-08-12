import { AuthContextProvider } from "./auth/AuthContextProvider";
import { DraftContextProvider } from "./draft/DraftContextProvider";
import TanstackQueryProvider from "./tanstack/TanstackQueryProvider";
import ThemeContextProvider from "./theme/ThemeContextProvider";
import type { ReactNode } from "react";

export default function ContextProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeContextProvider>
      <TanstackQueryProvider>
        <AuthContextProvider>
          <DraftContextProvider>{children}</DraftContextProvider>
        </AuthContextProvider>
      </TanstackQueryProvider>
    </ThemeContextProvider>
  );
}
